## Goal
Replace the "Email Us" card (which shows your address publicly) with a contact form. Submissions email you at **majestic-it@majestictech.ca** with the visitor's details.

## Contact form fields
- **Name** — required
- **Company** — required
- **Email** — required, validated
- **Phone** — optional
- **Message** ("What are you looking to do?") — required, up to ~1500 chars

Client-side validation with zod + clear inline errors. Submit button shows a loading state, then a success or error toast.

## UI changes (on the existing single page)
- Keep the "Call Us — Coming Soon" card.
- Replace the email card with a styled contact form that matches the dark/purple theme (same card border, hover glow, Orbitron-free body type).
- After a successful send, show a confirmation panel ("Thanks — we'll be in touch shortly").

## How sending works
This needs Lovable Cloud (backend) and an email domain so messages send from your own brand instead of a generic address. I'll enable Cloud and walk you through a one-click email domain setup; nothing for you to copy or paste.

Once that's ready:
1. The form POSTs to a server route that validates inputs server-side (zod) with basic rate-limiting/spam guards (length caps, simple honeypot field).
2. The route enqueues an app email via Lovable's built-in email system to **majestic-it@majestictech.ca**.
3. The email's **Reply-To** is set to the visitor's email so you can reply directly from your inbox.
4. The visitor optionally also gets a short confirmation email ("We got your message").

## Email content you'll receive
Subject: `New inquiry from {Name} ({Company})`
Body includes: name, company, email, phone (or "—"), message, and submission timestamp. Branded with the Majestic purple/dark template.

## Technical notes
- New server route: `src/routes/api/public/contact.ts` (public POST endpoint, signature-free but rate-limited + honeypot + zod-validated).
- New React Email templates in `src/lib/email-templates/`:
  - `contact-inquiry.tsx` (to you)
  - `contact-confirmation.tsx` (to the visitor, optional)
- Registered in `src/lib/email-templates/registry.ts`.
- Frontend form lives in `src/routes/index.tsx` (contact section), using shadcn `Input`, `Textarea`, `Button`, and `sonner` for toasts.
- Recipient `majestic-it@majestictech.ca` is hardcoded as a config constant — easy to change later.

## What I'll need from you mid-build
- One click to set up the email sender domain when the dialog appears. No DNS copy/paste — handled through the setup flow.

## Out of scope
- Storing submissions in a database (can add later if you want a dashboard of inquiries).
- File attachments (not supported on app emails; can add a link-based upload if needed).
- Marketing/newsletter sends.
