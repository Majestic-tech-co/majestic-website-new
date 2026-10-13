import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Server, Bot, Wrench, Sparkles, Phone, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: Index,
});

function Logo({ size = "lg" }: { size?: "lg" | "sm" }) {
  const dims = size === "lg" ? "w-14 h-14 md:w-16 md:h-16" : "w-10 h-10 md:w-12 md:h-12";
  return (
    <div className={`relative flex items-center justify-center shrink-0 group cursor-pointer ${dims}`}>
      <div className="absolute inset-0 bg-purple-600/40 blur-[20px] rounded-full group-hover:bg-purple-500/60 transition-all duration-700 animate-pulse" />
      <div className="absolute inset-[-15%] border border-purple-500/20 rounded-full border-t-purple-400 border-r-purple-400 animate-[spin_3s_linear_infinite] group-hover:border-purple-400/60 transition-all duration-300" />
      <div className="absolute inset-[-30%] border border-white/5 rounded-full border-b-white/30 animate-[spin_5s_linear_infinite_reverse]" />
      <div className="absolute inset-0 bg-[#050505] border-2 border-purple-500/40 rounded-full shadow-[0_0_20px_rgba(147,51,234,0.3),inset_0_0_15px_rgba(147,51,234,0.4)] transform group-hover:scale-110 group-hover:border-purple-400 transition-all duration-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.2)_0%,transparent_70%)]" />
        <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(#a855f7 1px, transparent 1px)", backgroundSize: "4px 4px", opacity: 0.2 }} />
        <img
          src="/logo/majestic_logo.png"
          alt="Majestic IT/AI Solutions logo"
          className="w-full h-full relative z-10 object-cover rounded-full drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transform scale-125 -translate-x-1"
        />
      </div>
    </div>
  );
}

function ServiceCard({
  icon: Icon,
  title,
  desc,
  iconAnim = "animate-[float_3s_ease-in-out_infinite]",
  accent = false,
}: {
  icon: typeof Server;
  title: string;
  desc: string;
  iconAnim?: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] flex items-start gap-6 relative overflow-hidden">
      {accent && (
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all" />
      )}
      <div
        className={`w-16 h-16 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${
          accent
            ? "bg-purple-900/20 border border-purple-500/30"
            : "bg-gray-900 border border-gray-800 group-hover:border-purple-500/30"
        }`}
      >
        <Icon
          className={`w-8 h-8 ${accent ? "text-purple-400" : "text-[#E2E8F0] group-hover:text-purple-400"} transition-colors ${iconAnim}`}
        />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
        <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Index() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="text-white">
      {/* Outer-space starfield */}
      <div className="starfield" aria-hidden="true">
        <div className="stars-far" />
        <div className="stars" />
      </div>

      {/* Purple nebula blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30vw] h-[30vw] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-white/10 py-4"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-center md:justify-start items-center">
          <div className="flex items-center gap-4 md:gap-6 z-50">
            <Logo />
            <span className="font-extrabold text-xl md:text-2xl tracking-tight text-white">
              Majestic <span className="text-purple-400">IT/AI Solutions</span>
            </span>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* Hero */}
        <section className="pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Next-Gen Tech Solutions
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
            Rock-Solid IT.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 drop-shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              Next-Gen AI.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-[#94A3B8] mb-10 leading-relaxed">
            From high-performance custom rigs and robust server architecture to cutting-edge intelligent automation. We are your all-in-one technology partner.
          </p>
        </section>

        {/* Philosophy */}
        <section id="philosophy" className="py-20 bg-[#0a0a0a] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">The Majestic Approach</h2>
                <p className="text-[#94A3B8] mb-6 leading-relaxed">
                  Our name isn't just for show. It represents our core dual-strategy for modern business technology. We believe in providing absolutely stable, reliable, and secure IT systems as your foundation, freeing you up to experiment with revolutionary AI capabilities.
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 border border-gray-700">
                      <Server className="text-gray-300 animate-[float_3s_ease-in-out_infinite] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Business in the Front (IT)</h4>
                      <p className="text-sm text-[#94A3B8]">Robust cloud architecture, zero-downtime networking, and ironclad cybersecurity.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-900/30 flex items-center justify-center shrink-0 border border-purple-500/30">
                      <Bot className="text-purple-400 animate-[float_3s_ease-in-out_1s_infinite] w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Party in the Back (AI)</h4>
                      <p className="text-sm text-[#94A3B8]">Custom LLMs, workflow automation, and predictive analytics that leave competitors behind.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900 to-black overflow-hidden group">
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-gray-600/20 rounded-full blur-2xl -translate-y-1/2 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-1/2 right-1/4 w-40 h-40 bg-purple-600/40 rounded-full blur-3xl -translate-y-1/2 group-hover:scale-125 transition-transform duration-700" />
                <div className="absolute inset-0 flex items-center justify-between px-12">
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-gray-800/80 backdrop-blur rounded-xl border border-gray-600 animate-[bumpIT_4s_ease-in-out_infinite]">
                      <Server className="text-gray-300 animate-[float_3s_ease-in-out_infinite] w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold text-gray-400 tracking-widest">IT CORE</span>
                  </div>
                  <div className="flex-1 h-px bg-gradient-to-r from-gray-600 via-purple-500 to-purple-400 mx-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 overflow-hidden">
                      <div className="w-1/3 h-full bg-white shadow-[0_0_10px_#fff] blur-[1px] animate-[slidePingPong_4s_ease-in-out_infinite] relative" />
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="p-4 bg-purple-900/60 backdrop-blur rounded-xl border border-purple-500/50 shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-[bumpAI_4s_ease-in-out_infinite]">
                      <Bot className="text-purple-300 animate-[float_3s_ease-in-out_1s_infinite] w-8 h-8" />
                    </div>
                    <span className="text-xs font-bold text-purple-400 tracking-widest">AI EDGE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative">
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Our Expertise
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mx-auto">
              Hardware, infrastructure, and intelligent automation. We handle the full spectrum of modern tech.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto relative z-10">
            <ServiceCard
              icon={Wrench}
              title="PC Builds & Upgrade"
              desc="Custom high-performance rigs, component upgrades, and hardware optimization tailored for your specific needs."
              iconAnim="animate-[wiggle_3s_ease-in-out_infinite]"
            />
            <ServiceCard
              icon={Sparkles}
              title="PC Cleaning"
              desc="Deep physical cleaning, dust removal, and thermal paste replacement to keep your systems running cool and quiet."
              iconAnim="animate-[pulseGlow_2s_ease-in-out_infinite]"
            />
            <ServiceCard
              icon={Server}
              title="IT Infrastructure & Management"
              desc="Robust server architecture, proactive maintenance, and secure networking to power your business operations."
              iconAnim="animate-[float_3s_ease-in-out_infinite]"
            />
            <ServiceCard
              icon={Bot}
              title="Custom AI Solutions"
              desc="Intelligent automation, tailored machine learning models, and smart bots designed to give you the competitive edge."
              iconAnim="animate-[float_3s_ease-in-out_1s_infinite]"
              accent
            />
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-24 px-6 relative border-t border-purple-500/20 bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-wide">CONNECT WITH US</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <div className="bg-[#0a0a0a] border border-white/10 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)]">
                <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-2 group-hover:bg-purple-600/20 transition-colors">
                  <Phone className="text-purple-400 group-hover:scale-110 transition-transform animate-[wiggle_2s_ease-in-out_infinite] w-8 h-8" />
                </div>
                <h4 className="text-white font-bold text-lg">Call Us</h4>
                <span className="font-mono text-lg tracking-wider text-gray-400">Coming Soon</span>
              </div>

              <div className="bg-[#0a0a0a] border border-white/10 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-300 flex flex-col items-center gap-4 group hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(147,51,234,0.15)] relative overflow-hidden w-full">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-transparent pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-purple-900/20 flex items-center justify-center mb-2 group-hover:bg-purple-600/20 transition-colors relative z-10">
                  <Mail className="text-purple-400 group-hover:scale-110 transition-transform animate-[float_3s_ease-in-out_infinite] w-8 h-8" />
                </div>
                <h4 className="text-white font-bold text-lg relative z-10">Email Us</h4>
                <p className="text-sm text-[#94A3B8] relative z-10 text-center">
                  Use the form below — we'll reply within one business day.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#050505] pt-12 pb-8 px-6 md:px-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-extrabold text-xl tracking-tight text-white flex items-center gap-4">
            <Logo size="sm" />
            <span className="text-center md:text-left text-lg md:text-xl">
              Majestic <span className="text-purple-400">IT/AI Solutions</span>
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-gray-400">
            <a href="#philosophy" className="hover:text-purple-400 transition-colors">About Us</a>
            <a href="#services" className="hover:text-purple-400 transition-colors">Services</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center text-xs text-[#94A3B8]">
          <p>&copy; {new Date().getFullYear()} Majestic Mullets IT/AI Solutions. All rights reserved.</p>
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
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) next.email = "Valid email required";
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
      <div className="mt-10 max-w-2xl mx-auto bg-[#0a0a0a] border border-purple-500/40 rounded-2xl p-10 text-center shadow-[0_0_40px_rgba(147,51,234,0.15)]">
        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-purple-900/30 border border-purple-500/40 flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7 text-purple-300" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Thanks — we got it.</h3>
        <p className="text-[#94A3B8] mb-6">We'll review your message and get back to you shortly.</p>
        <Button
          variant="outline"
          className="border-purple-500/40 text-purple-200 hover:bg-purple-600/10 hover:text-white"
          onClick={() => setSent(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-10 max-w-2xl mx-auto bg-[#0a0a0a] border border-white/10 hover:border-purple-500/30 transition-colors rounded-2xl p-6 md:p-8 text-left space-y-5"
      noValidate
    >
      {/* Honeypot field — hidden from users */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid md:grid-cols-2 gap-5">
        <Field label="Name" name="name" error={errors.name}>
          <Input name="name" placeholder="Jane Smith" className="bg-[#050505] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50" />
        </Field>
        <Field label="Company" name="company" error={errors.company}>
          <Input name="company" placeholder="Acme Inc." className="bg-[#050505] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50" />
        </Field>
        <Field label="Email" name="email" error={errors.email}>
          <Input name="email" type="email" placeholder="you@company.com" className="bg-[#050505] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50" />
        </Field>
        <Field label="Phone" name="phone" hint="Optional">
          <Input name="phone" type="tel" placeholder="(555) 555-5555" className="bg-[#050505] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50" />
        </Field>
      </div>

      <Field label="What are you looking to do?" name="message" error={errors.message}>
        <Textarea
          name="message"
          rows={5}
          placeholder="A quick overview of the project, timeline, and anything we should know."
          maxLength={2000}
          className="bg-[#050505] border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-purple-500/50"
        />
      </Field>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-6 text-base shadow-[0_0_20px_rgba(147,51,234,0.35)]"
      >
        {submitting ? (
          <span className="inline-flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Sending…</span>
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
      <label htmlFor={name} className="text-sm font-medium text-gray-200 flex items-center justify-between">
        <span>{label}</span>
        {hint && !error && <span className="text-xs text-gray-500 font-normal">{hint}</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
