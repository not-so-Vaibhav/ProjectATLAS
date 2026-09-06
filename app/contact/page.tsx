"use client";

import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import { useState } from "react";
import { Github, Linkedin, Instagram, Mail, FileText, Send, Gamepad2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { XP_GameModal } from "@/components/game/XP_GameModal";

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function ContactPage() {
  const chapter = getIdentityChapter("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  if (!chapter) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSent(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 8000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(err.message || "Something went wrong. You can also email me directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <XP_RoomPage chapter={chapter}>
      {/* Form + Info Grid */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          
          {/* Info Side */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="atlas-kicker mb-2">Conversation</p>
              <h2 className="text-2xl font-bold text-[var(--color-text)] leading-tight mb-4">
                Let&apos;s build something meaningful together.
              </h2>
              <p className="text-xs text-[var(--color-text-muted)] leading-relaxed max-w-md mb-6">
                Whether you are looking to collaborate on a new startup project, discuss product architecture, review user design systems, or simply swap stories about building in public, my inbox is always open.
              </p>
            </div>

            {/* Neon Glow sign mockup */}
            <div className="my-8 p-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] flex flex-col items-center justify-center min-h-[160px]">
              <span className="font-caveat text-4xl text-neon-gold tracking-wider select-none animate-float-gentle block">
                Let&apos;s Build
              </span>
            </div>

            {/* Resume & Games */}
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)] mb-3">Resume & Games</p>
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--color-gold)] hover:text-[var(--color-text)] transition"
                >
                  <FileText className="w-4 h-4" /> Download Resume (PDF)
                </a>

                <button
                  onClick={() => setIsGameModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[rgb(var(--atlas-gold) / 0.4)] bg-[rgb(var(--atlas-gold) / 0.08)] hover:bg-[rgb(var(--atlas-gold) / 0.18)] hover:border-[var(--color-gold)] text-[var(--color-gold)] transition cursor-pointer"
                >
                  <Gamepad2 className="w-4 h-4 text-[var(--color-gold)] animate-pulse" />
                  <span>Let&apos;s Have a Game</span>
                </button>
              </div>

              <XP_GameModal
                isOpen={isGameModalOpen}
                onClose={() => setIsGameModalOpen(false)}
              />

              <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-text-muted)] mb-3">Or find me elsewhere</p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/not-so-Vaibhav" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/vaibhav-bariyar/" },
                  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/vaibhavbariyar" },
                  { icon: XIcon, label: "Twitter", href: "https://x.com/vaibhavbariyar" },
                  { icon: Mail, label: "Email", href: "mailto:bariyarvaibhav@gmail.com" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="group text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
                  >
                    <Icon className="w-5 h-5 group-hover:text-[var(--color-gold)] transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="atlas-card p-6 md:p-8 bg-[var(--color-bg-card)] border border-[var(--color-border)]">
            <p className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-gold)] mb-4">Send a message</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-0 transition"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-1.5">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-0 transition"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-mono tracking-wider uppercase text-[var(--color-text-muted)] mb-1.5">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What would you like to build?"
                  className="w-full bg-[var(--color-bg-raised)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] focus:outline-none focus:border-[var(--color-gold)] focus:ring-0 resize-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || sent}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition bg-[var(--color-gold)] text-[var(--color-bg)] hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Sending Message...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Message Received!
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Send Message
                  </>
                )}
              </button>

              {sent && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs text-center flex items-center justify-center gap-2 animate-fade-in-up">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Message sent successfully! I&apos;ll be in touch soon.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs text-center space-y-1.5 animate-fade-in-up">
                  <div className="flex items-center justify-center gap-1.5">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <a
                    href={`mailto:bariyarvaibhav@gmail.com?subject=Project%20Inquiry&body=${encodeURIComponent(form.message)}`}
                    className="inline-block text-[11px] underline font-semibold text-[var(--color-gold)] hover:opacity-80"
                  >
                    Send directly via mail app →
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </XP_RoomPage>
  );
}
