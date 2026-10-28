import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock,
  Loader2,
  Phone,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: Wrench,
    title: "PC Builds & Upgrades",
    desc: "Custom high-performance rigs, component upgrades, and hardware optimization tailored to your specific needs.",
  },
  {
    icon: Sparkles,
    title: "PC Cleaning",
    desc: "Deep physical cleaning, dust removal, and thermal paste replacement to keep your systems running cool and quiet.",
  },
  {
    icon: Server,
    title: "IT Infrastructure & Management",
    desc: "Robust server architecture, proactive maintenance, and secure networking to power your business operations.",
  },
  {
    icon: Bot,
    title: "Custom AI Solutions",
    desc: "Intelligent automation, tailored machine learning models, and smart bots designed to give you a competitive edge.",
  },
];

function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 overflow-hidden rounded-full bg-[#050505] ring-1 ring-purple-500/40 shadow-[0_0_20px_rgba(147,51,234,0.25)] ${className}`}
    >
      <img src="/logo/majestic_logo.png" alt="" className="h-full w-full scale-125 object-cover" />
    </span>
  );
}

function Brand() {
  return (
    <a href="#top" className="flex items-center gap-3" aria-label="Majestic IT/AI Solutions home">
      <Logo />
      <span className="text-lg font-semibold tracking-tight text-white">
        Majestic <span className="text-purple-400">IT/AI Solutions</span>
      </span>
    </a>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-purple-400">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">{description}</p>
      )}
    </div>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="top" className="text-white">
      <div className="starfield" aria-hidden="true">
        <div className="stars-far" />
        <div className="stars" />
      </div>

      {/* Header */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
          scrolled ? "border-white/10 bg-[#05050c]/80 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20">
          <Brand />
          <nav className="flex items-center gap-8">
            <ul className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="sm"
              className="hidden bg-purple-600 text-white hover:bg-purple-500 sm:inline-flex"
            >
              <a href="#contact">Get in touch</a>
            </Button>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-24 pt-36 md:pb-32 md:pt-48">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-purple-300">
              Next-gen tech solutions
            </p>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
              Rock-solid IT.
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                Next-gen AI.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
              From high-performance custom rigs and robust server architecture to cutting-edge
              intelligent automation. We are your all-in-one technology partner.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="h-12 bg-purple-600 px-6 text-base text-white hover:bg-purple-500"
              >
                <a href="#contact">
                  Start a project <ArrowRight />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white"
              >
                <a href="#services">Explore services</a>
              </Button>
            </div>
          </div>

          <ul className="mt-20 grid gap-6 border-t border-white/10 pt-8 text-sm text-slate-400 sm:grid-cols-3">
            {[
              "Custom builds & upgrades",
              "Infrastructure & networking",
              "AI & intelligent automation",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-purple-400" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Services */}
        <section
          id="services"
          className="scroll-mt-20 border-t border-white/5 bg-[#07070f]/80 py-24 md:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <SectionHeading
              eyebrow="Services"
              title="Our expertise"
              description="Hardware, infrastructure, and intelligent automation. We handle the full spectrum of modern tech."
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {SERVICES.map(({ icon: Icon, title, desc }) => (
                <article
                  key={title}
                  className="group rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-purple-500/40 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10">
                    <Icon className="h-5 w-5 text-purple-300" />
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-400">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Approach */}
        <section id="approach" className="scroll-mt-20 border-t border-white/5 py-24 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Our approach"
                title="The Majestic approach"
                description="Our name isn't just for show. It represents our core dual strategy for modern business technology: absolutely stable, reliable, and secure IT systems as your foundation, freeing you up to experiment with revolutionary AI capabilities."
              />
              <dl className="mt-10 space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Server className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <dt className="font-semibold text-white">Business in the front (IT)</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-400">
                      Robust cloud architecture, zero-downtime networking, and ironclad
                      cybersecurity.
                    </dd>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-purple-500/30 bg-purple-500/10">
                    <Bot className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <dt className="font-semibold text-white">Party in the back (AI)</dt>
                    <dd className="mt-1 text-sm leading-relaxed text-slate-400">
                      Custom LLMs, workflow automation, and predictive analytics that leave
                      competitors behind.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>

            <div
              className="relative flex min-h-72 items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-10 md:min-h-96"
              aria-hidden="true"
            >
              <div className="absolute right-0 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-purple-600/25 blur-3xl" />
              <div className="relative flex w-full items-center justify-between gap-4">
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <Server className="h-7 w-7 text-slate-200" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.18em] text-slate-400">
                    IT CORE
                  </span>
                </div>
                <div className="relative h-px flex-1 bg-gradient-to-r from-white/20 via-purple-500/60 to-purple-400">
                  <span className="absolute -top-[3px] left-0 h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_10px_#fff] animate-[travel_4s_ease-in-out_infinite]" />
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="rounded-xl border border-purple-500/40 bg-purple-500/15 p-4 shadow-[0_0_30px_rgba(147,51,234,0.35)]">
                    <Bot className="h-7 w-7 text-purple-200" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.18em] text-purple-300">
                    AI EDGE
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-white/5 bg-[#07070f]/80 py-24 md:py-32"
        >
          <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading
                eyebrow="Contact"
                title="Let's talk about your project"
                description="Tell us what you're working on, whether it's a new build, a network that needs attention, or an idea for automation."
              />
              <ul className="mt-10 space-y-5 text-sm">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Clock className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Quick response</p>
                    <p className="mt-1 text-slate-400">We reply within one business day.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                    <Phone className="h-5 w-5 text-purple-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Phone support</p>
                    <p className="mt-1 text-slate-400">Coming soon.</p>
                  </div>
                </li>
              </ul>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#05050c]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
          <Brand />
          <ul className="flex gap-8 text-sm text-slate-400">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-white/5 py-6 text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Majestic Mullets IT/AI Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: String(fd.get("phone") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      website: String(fd.get("website") ?? ""), // honeypot
    };

    const next: Record<string, string> = {};
    if (!payload.name) next.name = "Required";
    if (!payload.company) next.company = "Required";
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      next.email = "Valid email required";
    if (payload.message.length < 10) next.message = "Please add a bit more detail";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }
      setSent(true);
      toast.success("Message sent — we'll be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send your message");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-purple-500/30 bg-white/[0.03] p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10">
          <CheckCircle2 className="h-6 w-6 text-purple-300" />
        </div>
        <h3 className="mt-5 text-2xl font-semibold text-white">Thanks — we got it.</h3>
        <p className="mt-2 text-slate-400">
          We'll review your message and get back to you shortly.
        </p>
        <Button
          variant="outline"
          className="mt-6 border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white"
          onClick={() => setSent(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  const fieldClass =
    "h-11 border-white/10 bg-[#05050c] text-white placeholder:text-slate-600 focus-visible:ring-purple-500/50";

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8"
      noValidate
    >
      {/* Honeypot field — hidden from users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Jane Smith"
            className={fieldClass}
          />
        </Field>
        <Field label="Company" name="company" error={errors.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            placeholder="Acme Inc."
            className={fieldClass}
          />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className={fieldClass}
          />
        </Field>
        <Field label="Phone" name="phone" hint="Optional">
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            className={fieldClass}
          />
        </Field>
      </div>

      <Field label="What are you looking to do?" name="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder="A quick overview of the project, timeline, and anything we should know."
          maxLength={2000}
          className="border-white/10 bg-[#05050c] text-white placeholder:text-slate-600 focus-visible:ring-purple-500/50"
        />
      </Field>

      <Button
        type="submit"
        disabled={submitting}
        className="h-12 w-full bg-purple-600 text-base font-semibold text-white hover:bg-purple-500"
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin" /> Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  hint,
  error,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="flex items-center justify-between text-sm font-medium text-slate-200"
      >
        <span>{label}</span>
        {hint && !error && <span className="text-xs font-normal text-slate-500">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
