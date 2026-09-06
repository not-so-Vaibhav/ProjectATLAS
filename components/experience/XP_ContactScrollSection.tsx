"use client";

import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Mail, FileText, Send, ArrowRight, Gamepad2, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { XP_GameModal } from "../game/XP_GameModal";

const XIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SOCIAL_LINKS = [
  { icon: Github,    label: "GitHub",    href: "https://github.com/not-so-Vaibhav" },
  { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/vaibhav-bariyar/" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/vaibhavbariyar" },
  { icon: XIcon,     label: "Twitter",   href: "https://x.com/vaibhavbariyar" },
  { icon: Mail,      label: "Email",     href: "mailto:bariyarvaibhav@gmail.com" },
];

type Props = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

export function XP_ContactScrollSection({ scrollContainerRef: _ }: Props) {
  const sectionRef    = useRef<HTMLElement>(null);
  const formRef        = useRef<HTMLDivElement>(null);
  const formWrapperRef = useRef<HTMLDivElement>(null);
  const leftRef        = useRef<HTMLDivElement>(null);
  const tlRef          = useRef<gsap.core.Timeline | null>(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hovered, setHovered] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

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

  /* ── Entrance animations ─────────────────────────────── */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set([".ctc-kicker", ".ctc-title", ".ctc-divider", ".ctc-sub", ".ctc-actions", ".ctc-bottom"], {
        opacity: 0, y: 24,
      });
      gsap.set(formWrapperRef.current, { opacity: 0, x: 60, scale: 0.97 });
      gsap.set(".ctc-glow", { opacity: 0 });

      const tl = gsap.timeline({ paused: true });

      tl.to(".ctc-kicker",  { opacity: 1, y: 0, duration: 0.6,  ease: "power3.out" }, 0.1)
        .to(".ctc-title",   { opacity: 1, y: 0, duration: 0.85, ease: "power4.out" }, 0.22)
        .to(".ctc-divider", { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, 0.4)
        .to(".ctc-sub",     { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, 0.5)
        .to(".ctc-actions", { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.65)
        .to(".ctc-bottom",  { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, 0.78)
        .to(formWrapperRef.current, { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: "power3.out" }, 0.3)
        .to(".ctc-glow", { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.4);

      tlRef.current = tl;
    }, section);

    return () => ctx.revert();
  }, { scope: sectionRef });

  /* ── IntersectionObserver to trigger/reset ─────────── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) tlRef.current?.restart();
        else tlRef.current?.pause(0);
      });
    }, { threshold: 0.12 });

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  /* ── Ambient glow pulse ─────────────────────────────── */
  useGSAP(() => {
    gsap.to(".ctc-glow-ambient", {
      opacity: 0.85, scale: 1.12,
      duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section
      className="snap-slide relative w-full bg-[var(--color-bg)] overflow-hidden"
      aria-label="Contact Room"
    >
      {/* Ambient background glow */}
      <div
        className="ctc-glow ctc-glow-ambient absolute pointer-events-none"
        style={{
          top: "-20%", left: "-10%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgb(var(--atlas-gold) / 0.07) 0%, transparent 70%)",
          opacity: 0,
          filter: "blur(40px)",
          willChange: "opacity,transform",
        }}
      />

      {/* ── SPLIT LAYOUT — same as Experience ── */}
      <div
        className="h-full w-full flex flex-col lg:grid lg:grid-cols-[1fr_1.15fr]"
        style={{ paddingTop: "var(--topbar-height)" }}
      >

        {/* ── LEFT PANEL ─────────────────────────────── */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center pl-6 pr-12 py-5 md:py-10 lg:px-14 lg:py-12 overflow-hidden shrink-0"
          style={{ borderRight: "1px solid rgb(var(--atlas-line) / 0.07)" }}
        >
          {/* Left ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 28% 48%, rgb(var(--atlas-gold) / 0.055) 0%, transparent 68%)" }}
          />

          {/* Kicker */}
          <p
            className="ctc-kicker text-[9px] lg:text-[10px] font-bold tracking-[0.24em] uppercase mb-1.5 lg:mb-6"
            style={{ opacity: 0, color: "var(--color-gold)" }}
          >
            07 / Contact
          </p>

          {/* Heading */}
          <div className="mb-1.5 lg:mb-5 overflow-hidden" aria-label="Let's Contact">
            <h2
              className="ctc-title font-black tracking-tight leading-[0.92] text-atlas-white"
              style={{
                opacity: 0,
                fontSize: "clamp(1.8rem, 8vw, 5rem)",
              }}
            >
              Let&apos;s build<br />
              <span style={{ color: "var(--color-gold)" }}>something</span><br />
              together<span style={{ color: "var(--color-gold)" }}>.</span>
            </h2>
          </div>

          {/* Gold divider */}
          <div
            className="ctc-divider mb-2 lg:mb-6 h-[2px] w-10 lg:w-14 rounded-full"
            style={{ opacity: 0, background: "var(--color-gold)" }}
          />

          {/* Subtitle */}
          <p
            className="ctc-sub text-[10px] md:text-sm lg:text-[0.95rem] leading-relaxed max-w-[280px] lg:max-w-[300px] mb-4 lg:mb-10"
            style={{ opacity: 0, color: "rgb(var(--atlas-ink) / 0.55)" }}
          >
            Collaboration, opportunities, or simply swapping stories about building in public — my inbox is always open.
          </p>

          {/* CTAs */}
          <div className="ctc-actions flex flex-col items-start gap-2.5 mb-0 lg:mb-12" style={{ opacity: 0 }}>
            <div className="flex flex-wrap gap-2 lg:gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-xl text-[10px] lg:text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
                style={{ background: "var(--color-gold)", color: "var(--color-bg)" }}
              >
                Enter Room <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
              </Link>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-xl text-[10px] lg:text-xs font-semibold border transition-all hover:border-atlas-white/30 hover:text-atlas-white"
                style={{ border: "1px solid rgb(var(--atlas-line) / 0.12)", color: "rgb(var(--atlas-ink) / 0.6)" }}
              >
                <FileText className="w-3 h-3 lg:w-3.5 lg:h-3.5" /> Download Resume
              </a>
            </div>

            {/* Game Button */}
            <button
              onClick={() => setIsGameModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 lg:px-5 lg:py-2 rounded-xl text-[10px] lg:text-xs font-bold transition-all border border-[rgb(var(--atlas-gold) / 0.4)] bg-[rgb(var(--atlas-gold) / 0.08)] hover:bg-[rgb(var(--atlas-gold) / 0.18)] hover:border-[var(--color-gold)] text-[var(--color-gold)] shadow-[0_0_15px_rgb(var(--atlas-gold) / 0.1)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Gamepad2 className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[var(--color-gold)] animate-pulse" />
              <span>Let&apos;s Have a Game</span>
            </button>
          </div>

          <XP_GameModal
            isOpen={isGameModalOpen}
            onClose={() => setIsGameModalOpen(false)}
          />

          {/* Social links */}
          <div 
            className="ctc-bottom absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 lg:static lg:translate-y-0 lg:block lg:mt-auto" 
            style={{ opacity: 0 }}
          >
            <p
              className="hidden lg:block text-[8px] lg:text-[9px] font-bold tracking-[0.22em] uppercase mb-2 lg:mb-3"
              style={{ color: "rgb(var(--atlas-gold) / 0.8)" }}
            >
              Find me elsewhere
            </p>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-5">
              {SOCIAL_LINKS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200"
                >
                  <Icon
                    className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px] group-hover:text-[var(--color-gold)] transition-colors duration-200"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Ticker tape — same style as Experience */}
          <div
            className="hidden lg:block absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
            style={{ borderTop: "1px solid rgb(var(--atlas-line) / 0.06)" }}
          >
            <div
              className="ctc-ticker flex whitespace-nowrap gap-8"
              style={{ width: "200%", color: "rgb(var(--atlas-gold) / 0.32)", animation: "ctc-scroll 28s linear infinite" }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 flex-shrink-0 text-[9px] font-bold tracking-[0.22em] uppercase">
                  <span>Collaborate</span><span style={{ color: "rgb(var(--atlas-gold) / 0.15)" }}>·</span>
                  <span>Build</span><span style={{ color: "rgb(var(--atlas-gold) / 0.15)" }}>·</span>
                  <span>Create</span><span style={{ color: "rgb(var(--atlas-gold) / 0.15)" }}>·</span>
                  <span>Ship</span><span style={{ color: "rgb(var(--atlas-gold) / 0.15)" }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <div
          className="flex-1 flex flex-col justify-start lg:justify-center px-6 py-8 lg:px-8 lg:py-10 overflow-y-auto lg:overflow-visible"
          style={{ background: "var(--color-bg-raised)" }}
        >
          {/*
           * MASCOT MATH (cropped 424×934px, aspect ≈ 0.454):
           * Display: 210×462px. Sitting point = 462×0.5214 ≈ 241px from top.
           * Notch ledge = 155px from card top.
           * Mascot top  = 155 − 241 = −86px (head above card)
           * Mascot left = −18px (slight overhang left)
           */}

          {/* Outer Wrapper — GSAP target + hover detection */}
          <div
            ref={formWrapperRef}
            className="form-outer-wrapper relative w-full my-auto lg:my-0"
            style={{ opacity: 0, willChange: "opacity, transform" }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* ── MASCOT ──────────────────────────────────── */}
            <div className="mascot-container absolute pointer-events-none z-20">
              <Image
                src="/contact-img/resting_cropped.png"
                alt="Mascot resting"
                fill
                sizes="(max-width: 768px) 140px, 180px"
                className="object-contain object-bottom transition-opacity duration-500 ease-out"
                style={{ opacity: hovered ? 0 : 1 }}
              />
              <Image
                src="/contact-img/hey_cropped.png"
                alt="Mascot waving"
                fill
                sizes="(max-width: 768px) 140px, 180px"
                className="object-contain object-bottom transition-opacity duration-500 ease-out"
                style={{ opacity: hovered ? 1 : 0 }}
              />
            </div>

            {/* ── DROP-SHADOW BORDER WRAPPER ─────────────── */}
            <div
              style={{
                filter: "drop-shadow(0 0 0.5px rgb(var(--atlas-gold) / 0.45)) drop-shadow(0 6px 32px rgb(var(--atlas-gold) / 0.1))",
                transition: "filter 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 1px rgb(var(--atlas-gold) / 0.85)) drop-shadow(0 0 32px rgb(var(--atlas-gold) / 0.24))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 0.5px rgb(var(--atlas-gold) / 0.45)) drop-shadow(0 6px 32px rgb(var(--atlas-gold) / 0.1))";
              }}
            >
              {/* ── NOTCHED CARD ────────────────────────── */}
              <div
                ref={formRef}
                className="notched-card relative overflow-hidden"
                style={{
                  background: "var(--color-bg-card)",
                  borderRadius: "16px",
                }}
              >
                {/* Top accent line */}
                <div
                  className="accent-top absolute top-0 h-[1.5px]"
                  style={{
                    right: 0,
                    background: "linear-gradient(90deg, rgb(var(--atlas-gold) / 0.9), rgb(var(--atlas-gold) / 0.2) 50%, transparent)",
                  }}
                />
                {/* Left accent line */}
                <div
                  className="accent-left absolute left-0 w-[1.5px]"
                  style={{
                    bottom: 0,
                    background: "linear-gradient(180deg, rgb(var(--atlas-gold) / 0.7), transparent 70%)",
                  }}
                />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "rgb(var(--atlas-gold) / 0.1)" }} />
                {/* Right accent */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, rgb(var(--atlas-gold) / 0.3), transparent 70%)" }} />

                {/* Glow orb */}
                <div
                  className="ctc-glow absolute pointer-events-none"
                  style={{
                    top: "-15%", right: "-5%",
                    width: "300px", height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgb(var(--atlas-gold) / 0.12) 0%, transparent 65%)",
                    opacity: 0, filter: "blur(28px)",
                  }}
                />

                {/* ZONE A */}
                <div className="zone-a relative z-10">
                  <p
                    className="text-[9px] lg:text-[10px] font-bold tracking-[0.26em] uppercase mb-1.5 lg:mb-3 text-center lg:text-left"
                    style={{ color: "rgb(var(--atlas-gold) / 0.8)" }}
                  >
                    Send a message
                  </p>
                  <div className="h-[1px] w-10 mx-auto lg:mx-0" style={{ background: "rgb(var(--atlas-gold) / 0.5)" }} />
                </div>

                {/* ZONE B */}
                <div className="zone-b relative z-10">
                  <form onSubmit={handleSubmit} className="flex flex-col gap-2 lg:gap-4">
                    
                    {/* Name & Email Row (Side-by-side on mobile) */}
                    <div className="flex flex-row gap-3 lg:flex-col lg:gap-4 w-full">
                      {/* Name */}
                      <div className="flex-1">
                        <label
                          htmlFor="ctc-name"
                          className="block text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 lg:mb-2"
                          style={{ color: "rgb(var(--atlas-ink) / 0.4)" }}
                        >
                          Name
                        </label>
                        <input
                          id="ctc-name"
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full rounded-xl px-3.5 py-3 lg:px-4 lg:py-3.5 text-xs lg:text-sm transition-all focus:outline-none"
                          style={{
                            background: "rgb(var(--atlas-line) / 0.03)",
                            border: "1px solid rgb(var(--atlas-line) / 0.08)",
                            color: "rgb(var(--atlas-ink) / 0.9)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-gold) / 0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgb(var(--atlas-gold) / 0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-line) / 0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex-1">
                        <label
                          htmlFor="ctc-email"
                          className="block text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 lg:mb-2"
                          style={{ color: "rgb(var(--atlas-ink) / 0.4)" }}
                        >
                          Email
                        </label>
                        <input
                          id="ctc-email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@email.com"
                          className="w-full rounded-xl px-3.5 py-3 lg:px-4 lg:py-3.5 text-xs lg:text-sm transition-all focus:outline-none"
                          style={{
                            background: "rgb(var(--atlas-line) / 0.03)",
                            border: "1px solid rgb(var(--atlas-line) / 0.08)",
                            color: "rgb(var(--atlas-ink) / 0.9)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-gold) / 0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgb(var(--atlas-gold) / 0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-line) / 0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="ctc-message"
                        className="block text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 lg:mb-2"
                        style={{ color: "rgb(var(--atlas-ink) / 0.4)" }}
                      >
                        Message
                      </label>
                      <textarea
                        id="ctc-message"
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What would you like to build?"
                        className="w-full rounded-xl px-3.5 py-3 lg:px-4 lg:py-3.5 text-xs lg:text-sm transition-all focus:outline-none resize-none min-h-[70px] lg:min-h-[120px]"
                        style={{
                          background: "rgb(var(--atlas-line) / 0.03)",
                          border: "1px solid rgb(var(--atlas-line) / 0.08)",
                          color: "rgb(var(--atlas-ink) / 0.9)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-gold) / 0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgb(var(--atlas-gold) / 0.08)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgb(var(--atlas-line) / 0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting || sent}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 lg:py-4 rounded-xl text-xs lg:text-sm font-bold tracking-wide transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                      style={{ background: "var(--color-gold)", color: "var(--color-bg)" }}
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
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] lg:text-xs text-center flex items-center justify-center gap-2 animate-fade-in-up">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                        <span>Message sent successfully! I&apos;ll be in touch soon.</span>
                      </div>
                    )}

                    {errorMessage && (
                      <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-[11px] lg:text-xs text-center space-y-1.5 animate-fade-in-up">
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

              </div>{/* /notched card */}
            </div>{/* /drop-shadow wrapper */}
          </div>{/* /outer wrapper */}

          {/* "Let's Build" neon sign (hidden on mobile to save space) */}
          <div
            className="mt-5 w-full hidden lg:flex items-center justify-center rounded-2xl py-5"
            style={{
              border: "1px solid rgb(var(--atlas-gold) / 0.35)",
              background: "rgb(var(--atlas-gold) / 0.06)",
              filter: "drop-shadow(0 0 2px rgb(var(--atlas-gold) / 0.3))",
            }}
          >
            <span
              className="font-caveat text-2xl lg:text-3xl select-none animate-float-gentle"
              style={{
                color: "var(--color-gold)",
                textShadow: "0 0 20px rgb(var(--atlas-gold) / 0.4), 0 0 60px rgb(var(--atlas-gold) / 0.12)",
              }}
            >
              Let&apos;s Build
            </span>
          </div>

        </div>{/* /right panel */}
      </div>

      {/* Footer bar */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 py-3.5 px-6 lg:px-14 flex items-center justify-between"
        style={{ borderTop: "1px solid rgb(var(--atlas-line) / 0.05)", background: "rgb(var(--atlas-black) / 0.8)", backdropFilter: "blur(8px)" }}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase font-bold" style={{ color: "var(--color-gold)" }}>
          ATLAS
        </span>
        <p className="text-[10px]" style={{ color: "rgb(var(--atlas-line) / 0.28)" }}>© 2025 Vaibhav Bariyar</p>
      </div>

      <style jsx>{`
        @keyframes ctc-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        input::placeholder, textarea::placeholder {
          color: rgb(var(--atlas-ink) / 0.2);
        }

        /* Responsive Form Layout */
        .form-outer-wrapper {
          margin-top: 140px;
        }
        .mascot-container {
          top: -126px; 
          left: 50%; 
          transform: translateX(-50%);
          width: 110px; 
          height: 242px;
        }
        .notched-card {
          clip-path: none;
        }
        .accent-top { left: 0; }
        .accent-left { top: 0; }
        .zone-a { padding: 120px 20px 0 20px; }
        .zone-b { padding: 16px 20px 24px 20px; }

        @media (min-width: 1024px) {
          .form-outer-wrapper {
            margin-top: 0;
          }
          .mascot-container {
            top: -86px; 
            left: -18px; 
            transform: none;
            width: 210px; 
            height: 462px;
          }
          .notched-card {
            clip-path: polygon(205px 0, 100% 0, 100% 100%, 0 100%, 0 155px, 205px 155px);
          }
          .accent-top { left: 205px; }
          .accent-left { top: 155px; }
          .zone-a { padding: 28px 28px 0 220px; text-align: left; }
          .zone-b { padding: 20px 28px 36px 220px; }
        }
      `}</style>
    </section>
  );
}
