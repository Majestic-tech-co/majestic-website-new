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

// Rate limits are in-memory, so they apply per server instance.
const IP_WINDOW_MS = 10 * 60 * 1000;
const IP_MAX_REQUESTS = 5;
const ipHits = new Map<string, number[]>();

// Cap on emails sent, so a flood can't fill the inbox or burn the Resend quota.
const GLOBAL_WINDOW_MS = 10 * 60 * 1000;
const GLOBAL_MAX_EMAILS = 30;
let emailsSent: number[] = [];

const DEFAULT_TO_EMAIL = "majestic-it@majestictech.ca";
const DEFAULT_FROM_EMAIL = "Majestic Website <website@majestictech.ca>";

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

function isGloballyRateLimited(): boolean {
  const now = Date.now();
  emailsSent = emailsSent.filter((t) => now - t < GLOBAL_WINDOW_MS);
  return emailsSent.length >= GLOBAL_MAX_EMAILS;
}

type Submission = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  message: string;
};

// Plain text only, so nothing a visitor types can be rendered as HTML.
async function sendInquiryEmail(submission: Submission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] Missing RESEND_API_KEY environment variable");
    return false;
  }

  const { name, company, email, phone, message } = submission;
  const oneLine = (value: string) => value.replace(/[\r\n]+/g, " ");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL || DEFAULT_TO_EMAIL],
      reply_to: email,
      subject: oneLine(`New inquiry from ${name} (${company})`),
      text: [
        `Name: ${oneLine(name)}`,
        `Company: ${oneLine(company)}`,
        `Email: ${email}`,
        `Phone: ${oneLine(phone || "—")}`,
        "",
        "Message:",
        message,
        "",
        `Sent from the website contact form at ${new Date().toISOString()}`,
      ].join("\n"),
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return false;
  }
  return true;
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

        if (isGloballyRateLimited()) {
          return tooManyRequests();
        }

        const sent = await sendInquiryEmail({ name, company, email, phone, message });
        if (!sent) {
          return Response.json(
            { error: "Could not send your message. Please try again." },
            { status: 500 },
          );
        }
        emailsSent.push(Date.now());

        return Response.json({ ok: true }, { status: 200 });
      },
    },
  },
});
