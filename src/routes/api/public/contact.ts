import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a bit more detail").max(2000),
  // Honeypot - bots fill this; real users leave it blank
  website: z.string().max(500).optional(),
});

// Largest body a valid submission can produce, with generous headroom.
const MAX_BODY_BYTES = 10_000;

// Per-IP limit. In-memory, so it only applies within one server instance —
// the global cap below is the backstop across instances.
const IP_WINDOW_MS = 10 * 60 * 1000;
const IP_MAX_REQUESTS = 5;
const ipHits = new Map<string, number[]>();

// Global cap on stored submissions, checked against the database.
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX_SUBMISSIONS = 30;

// Only trust the IP header the hosting platform sets itself. Any other header
// passes through from the client untouched and can be forged per request.
function getClientIp(request: Request): string {
  if (process.env.VERCEL) {
    return (
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown"
    );
  }
  return request.headers.get("cf-connecting-ip") ?? "unknown";
}

function isIpRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (ipHits.get(ip) ?? []).filter((t) => now - t < IP_WINDOW_MS);
  recent.push(now);
  ipHits.set(ip, recent);

  // Keep the map from growing without bound.
  if (ipHits.size > 5_000) {
    for (const [key, hits] of ipHits) {
      if (hits.every((t) => now - t >= IP_WINDOW_MS)) ipHits.delete(key);
    }
  }

  return recent.length > IP_MAX_REQUESTS;
}

// Only accept submissions from this site's own pages.
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  let originHost: string;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const allowedHosts = [
    new URL(request.url).host,
    request.headers.get("x-forwarded-host"),
    request.headers.get("host"),
  ];
  return allowedHosts.includes(originHost);
}

const tooManyRequests = () =>
  Response.json(
    { error: "Too many messages right now. Please try again in a few minutes." },
    { status: 429, headers: { "retry-after": "600" } },
  );

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isSameOrigin(request)) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }

        if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
          return Response.json({ error: "Request too large" }, { status: 413 });
        }

        if (isIpRateLimited(getClientIp(request))) {
          return tooManyRequests();
        }

        const body = await request.text();
        if (body.length > MAX_BODY_BYTES) {
          return Response.json({ error: "Request too large" }, { status: 413 });
        }

        let json: unknown;
        try {
          json = JSON.parse(body);
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400 },
          );
        }

        const { name, company, email, phone, message, website } = parsed.data;

        // Honeypot: silently accept
        if (website && website.length > 0) {
          return Response.json({ ok: true }, { status: 200 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        const since = new Date(Date.now() - GLOBAL_WINDOW_MS).toISOString();
        const { count, error: countError } = await supabaseAdmin
          .from("contact_submissions")
          .select("id", { count: "exact", head: true })
          .gte("created_at", since);

        if (countError) {
          console.error("[contact] rate-limit count error", countError);
        } else if ((count ?? 0) >= GLOBAL_MAX_SUBMISSIONS) {
          return tooManyRequests();
        }

        const { error } = await supabaseAdmin.from("contact_submissions").insert({
          name,
          company,
          email,
          phone: phone || null,
          message,
          user_agent: request.headers.get("user-agent") ?? null,
        });

        if (error) {
          console.error("[contact] insert error", error);
          return Response.json(
            { error: "Could not save your message. Please try again." },
            { status: 500 },
          );
        }

        return Response.json({ ok: true }, { status: 200 });
      },
    },
  },
});
