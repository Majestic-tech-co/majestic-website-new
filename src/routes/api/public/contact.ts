import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please add a bit more detail").max(2000),
  // Honeypot - bots fill this; real users leave it blank
  website: z.string().max(0).optional().or(z.literal("")),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400, headers: corsHeaders });
        }

        const parsed = ContactSchema.safeParse(json);
        if (!parsed.success) {
          return Response.json(
            { error: "Validation failed", issues: parsed.error.flatten() },
            { status: 400, headers: corsHeaders },
          );
        }

        const { name, company, email, phone, message, website } = parsed.data;

        // Honeypot: silently accept
        if (website && website.length > 0) {
          return Response.json({ ok: true }, { status: 200, headers: corsHeaders });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

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
            { status: 500, headers: corsHeaders },
          );
        }

        return Response.json({ ok: true }, { status: 200, headers: corsHeaders });
      },
    },
  },
});
