# Majestic IT/AI Solutions website

Single-page site built with [TanStack Start](https://tanstack.com/start), React and Tailwind CSS, deployed on Vercel.

## Development

Requires [Bun](https://bun.sh).

```sh
bun install
bun run dev
```

## Contact form

`src/routes/api/public/contact.ts` emails each submission through [Resend](https://resend.com).
Set these environment variables in Vercel:

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes | Resend API key with sending access |
| `CONTACT_TO_EMAIL` | No | Where enquiries go (default `majestic-it@majestictech.ca`) |
| `CONTACT_FROM_EMAIL` | No | Sender address (default `Majestic Website <website@majestictech.ca>`) |

Keep secrets in Vercel's environment settings, never in the repo.
