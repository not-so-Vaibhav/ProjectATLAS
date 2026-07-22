"use client";

import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import { useState } from "react";
import { Github, Linkedin, Instagram, Twitter, Mail, FileText, Send } from "lucide-react";

export default function ContactPage() {
  const chapter = getIdentityChapter("contact");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  if (!chapter) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
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
              <h2 className="text-2xl font-bold text-atlas-white leading-tight mb-4">
                Let&apos;s build something meaningful together.
              </h2>
              <p className="text-xs text-atlas-ink/65 leading-relaxed max-w-md mb-6">
                Whether you are looking to collaborate on a new startup project, discuss product architecture, review user design systems, or simply swap stories about building in public, my inbox is always open.
              </p>
            </div>

            {/* Neon Glow sign mockup from screenshot */}
            <div className="my-8 p-6 rounded-xl border border-atlas-line/10 bg-atlas-black/40 flex flex-col items-center justify-center min-h-[160px]">
              <span className="font-caveat text-4xl text-neon-gold tracking-wider select-none animate-float-gentle block">
                Let&apos;s Build
              </span>
            </div>

            {/* Resume / Connect */}
            <div>
              <p className="text-[10px] font-mono tracking-widest uppercase text-atlas-muted mb-3">Resume Access</p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-atlas-gold hover:text-atlas-white transition mb-6"
              >
                <FileText className="w-4 h-4" /> Download Resume (PDF)
              </a>

              <p className="text-[10px] font-mono tracking-widest uppercase text-atlas-muted mb-3">Or find me elsewhere</p>
              <div className="flex items-center gap-4">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
                  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
                  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
                  { icon: Mail, label: "Email", href: "mailto:hello@vaibhavbariyar.com" },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-atlas-muted hover:text-atlas-gold transition flex items-center gap-1.5 text-xs"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="atlas-card p-6 md:p-8">
            <p className="text-[10px] font-mono tracking-widest uppercase text-atlas-muted mb-4">Send a message</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-[10px] font-mono tracking-wider uppercase text-atlas-muted mb-1.5">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-atlas-black/40 border border-atlas-line/10 rounded-lg px-4 py-2.5 text-sm text-atlas-white focus:outline-none focus:border-atlas-gold/50 focus:ring-0"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[10px] font-mono tracking-wider uppercase text-atlas-muted mb-1.5">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  className="w-full bg-atlas-black/40 border border-atlas-line/10 rounded-lg px-4 py-2.5 text-sm text-atlas-white focus:outline-none focus:border-atlas-gold/50 focus:ring-0"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[10px] font-mono tracking-wider uppercase text-atlas-muted mb-1.5">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="What would you like to build?"
                  className="w-full bg-atlas-black/40 border border-atlas-line/10 rounded-lg px-4 py-2.5 text-sm text-atlas-white focus:outline-none focus:border-atlas-gold/50 focus:ring-0 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition bg-atlas-gold text-atlas-black hover:opacity-95"
              >
                <Send className="w-3.5 h-3.5" /> Send Message
              </button>

              {sent && (
                <p className="text-xs text-atlas-green font-semibold mt-2 text-center animate-pulse">
                  Thank you! Your message has been sent successfully.
                </p>
              )}
            </form>
          </div>

        </div>
      </section>
    </XP_RoomPage>
  );
}
