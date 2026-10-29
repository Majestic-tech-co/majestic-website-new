import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Majestic IT/AI Solutions" },
      {
        name: "description",
        content:
          "How Majestic IT/AI Solutions collects, uses and protects your personal information.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

const CONTACT_EMAIL = "majestic-it@majestictech.ca";
const EFFECTIVE_DATE = "October 28, 2026";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight text-white">{title}</h2>
      <div className="space-y-3 text-slate-300">{children}</div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <div className="text-white">
      <div className="starfield" aria-hidden="true">
        <div className="stars-far" />
        <div className="stars" />
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">
          Legal
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Effective {EFFECTIVE_DATE}</p>

        <div className="mt-12 space-y-10 leading-relaxed">
          <Section title="Who we are">
            <p>
              Majestic IT/AI Solutions ("we", "us") provides IT and AI services. This policy
              explains what personal information we collect through majestictech.ca, why we collect
              it, and how we handle it, in line with Canada's Personal Information Protection and
              Electronic Documents Act (PIPEDA).
            </p>
          </Section>

          <Section title="What we collect">
            <p>We only collect what you choose to send us through our contact form:</p>
            <ul className="list-disc space-y-1 pl-6">
              <li>Your name and company</li>
              <li>Your email address</li>
              <li>Your phone number, if you provide it</li>
              <li>The contents of your message</li>
            </ul>
            <p>
              When you send the form, our server also briefly uses your IP address to limit how many
              messages can be sent, which protects us from spam. It is held in memory for about 10
              minutes and is not stored with your message.
            </p>
          </Section>

          <Section title="Cookies and tracking">
            <p>
              This website does not use cookies, analytics, advertising trackers or third-party
              scripts. We do not track your activity across pages or other websites.
            </p>
          </Section>

          <Section title="How we use your information">
            <p>
              We use the information you send only to respond to your inquiry and, if you become a
              client, to provide the services you ask for. We do not sell, rent or share your
              information for marketing purposes.
            </p>
          </Section>

          <Section title="Service providers">
            <p>
              We rely on a small number of trusted providers to run this website and deliver your
              message to us:
            </p>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <span className="text-white">Vercel</span> hosts the website and processes form
                submissions.
              </li>
              <li>
                <span className="text-white">Resend</span> delivers your message to our inbox by
                email.
              </li>
              <li>
                <span className="text-white">Google Workspace</span> hosts our business email, where
                your message is stored.
              </li>
            </ul>
            <p>
              These providers may store or process information outside Canada, including in the
              United States, where it may be accessible to authorities under local law. They are
              only permitted to use it to provide their services to us.
            </p>
          </Section>

          <Section title="How long we keep it">
            <p>
              We keep inquiries for up to two years after our last contact with you, unless you
              become a client and we need to keep records longer for business or legal reasons.
              After that, we delete them.
            </p>
          </Section>

          <Section title="How we protect it">
            <p>
              The website is served only over encrypted HTTPS connections, and access to our email
              and service accounts is restricted and protected with strong authentication.
            </p>
          </Section>

          <Section title="Your rights">
            <p>
              You can ask to see the personal information we hold about you, ask us to correct it,
              or ask us to delete it. Email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-300 underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              and we will respond within 30 days.
            </p>
            <p>
              If you are not satisfied with our response, you can contact the{" "}
              <a
                href="https://www.priv.gc.ca"
                className="text-purple-300 underline-offset-4 hover:underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                Office of the Privacy Commissioner of Canada
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              If we change how we handle personal information, we will update this page and the
              effective date above.
            </p>
          </Section>

          <Section title="Contact">
            <p>
              Questions about this policy or your information can be sent to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-purple-300 underline-offset-4 hover:underline"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Section>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-6 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} Majestic IT/AI Solutions. All rights reserved.
      </footer>
    </div>
  );
}
