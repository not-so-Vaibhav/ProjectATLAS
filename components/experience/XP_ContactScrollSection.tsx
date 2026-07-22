"use client";

import { useRef, useState, useEffect } from "react";
import { Github, Linkedin, Instagram, Twitter, Mail, FileText, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const SOCIAL_LINKS = [
  { icon: Github,    label: "GitHub",    href: "https://github.com" },
  { icon: Linkedin,  label: "LinkedIn",  href: "https://linkedin.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter,   label: "Twitter",   href: "https://twitter.com" },
  { icon: Mail,      label: "Email",     href: "mailto:hello@vaibhavbariyar.com" },
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
  const [hovered, setHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 5000);
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
      className="snap-slide relative w-full bg-[#080808] overflow-hidden"
      aria-label="Contact Room"
    >
      {/* Ambient background glow */}
      <div
        className="ctc-glow ctc-glow-ambient absolute pointer-events-none"
        style={{
          top: "-20%", left: "-10%",
          width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(199,169,102,0.07) 0%, transparent 70%)",
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
          style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Left ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 28% 48%, rgba(199,169,102,0.055) 0%, transparent 68%)" }}
          />

          {/* Kicker */}
          <p
            className="ctc-kicker text-[9px] lg:text-[10px] font-bold tracking-[0.24em] uppercase mb-1.5 lg:mb-6"
            style={{ opacity: 0, color: "rgb(199,169,102)" }}
          >
            07 / Contact
          </p>

          {/* Heading */}
          <div className="mb-1.5 lg:mb-5 overflow-hidden" aria-label="Let's Contact">
            <h2
              className="ctc-title font-black tracking-tight leading-[0.92] text-white"
              style={{
                opacity: 0,
                fontSize: "clamp(1.8rem, 8vw, 5rem)",
              }}
            >
              Let&apos;s build<br />
              <span style={{ color: "rgb(199,169,102)" }}>something</span><br />
              together<span style={{ color: "rgb(199,169,102)" }}>.</span>
            </h2>
          </div>

          {/* Gold divider */}
          <div
            className="ctc-divider mb-2 lg:mb-6 h-[2px] w-10 lg:w-14 rounded-full"
            style={{ opacity: 0, background: "rgb(199,169,102)" }}
          />

          {/* Subtitle */}
          <p
            className="ctc-sub text-[10px] md:text-sm lg:text-[0.95rem] leading-relaxed max-w-[280px] lg:max-w-[300px] mb-4 lg:mb-10"
            style={{ opacity: 0, color: "rgba(224,224,218,0.55)" }}
          >
            Collaboration, opportunities, or simply swapping stories about building in public — my inbox is always open.
          </p>

          {/* CTAs */}
          <div className="ctc-actions flex flex-wrap gap-2 lg:gap-3 mb-0 lg:mb-12" style={{ opacity: 0 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-xl text-[10px] lg:text-xs font-bold transition-all hover:scale-[1.03] active:scale-[0.98]"
              style={{ background: "rgb(199,169,102)", color: "#080808" }}
            >
              Enter Room <ArrowRight className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 lg:px-5 lg:py-2.5 rounded-xl text-[10px] lg:text-xs font-semibold border transition-all hover:border-white/30 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(224,224,218,0.6)" }}
            >
              <FileText className="w-3 h-3 lg:w-3.5 lg:h-3.5" /> Download Resume
            </a>
          </div>

          {/* Social links */}
          <div 
            className="ctc-bottom absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 lg:static lg:translate-y-0 lg:block lg:mt-auto" 
            style={{ opacity: 0 }}
          >
            <p
              className="hidden lg:block text-[8px] lg:text-[9px] font-bold tracking-[0.22em] uppercase mb-2 lg:mb-3"
              style={{ color: "rgba(199,169,102,0.5)" }}
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
                  className="group text-white/30 hover:text-white transition-colors duration-200"
                >
                  <Icon
                    className="w-3.5 h-3.5 lg:w-[18px] lg:h-[18px] group-hover:text-[rgb(199,169,102)] transition-colors duration-200"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Ticker tape — same style as Experience */}
          <div
            className="hidden lg:block absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div
              className="ctc-ticker flex whitespace-nowrap gap-8"
              style={{ width: "200%", color: "rgba(199,169,102,0.32)", animation: "ctc-scroll 28s linear infinite" }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 flex-shrink-0 text-[9px] font-bold tracking-[0.22em] uppercase">
                  <span>Collaborate</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                  <span>Build</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                  <span>Create</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                  <span>Ship</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <div
          className="flex-1 flex flex-col justify-start lg:justify-center px-6 py-8 lg:px-8 lg:py-10 overflow-y-auto lg:overflow-visible"
          style={{ background: "rgb(10,10,9)" }}
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
              <img
                src="/contact-img/resting_cropped.png"
                alt="Mascot resting"
                className="absolute inset-0 w-full h-full object-contain object-bottom"
                style={{ opacity: hovered ? 0 : 1, transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)" }}
              />
              <img
                src="/contact-img/hey_cropped.png"
                alt="Mascot waving"
                className="absolute inset-0 w-full h-full object-contain object-bottom"
                style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.45s cubic-bezier(0.4,0,0.2,1)" }}
              />
            </div>

            {/* ── DROP-SHADOW BORDER WRAPPER ─────────────── */}
            <div
              style={{
                filter: "drop-shadow(0 0 0.5px rgba(199,169,102,0.45)) drop-shadow(0 6px 32px rgba(199,169,102,0.1))",
                transition: "filter 0.4s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 1px rgba(199,169,102,0.85)) drop-shadow(0 0 32px rgba(199,169,102,0.24))";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.filter =
                  "drop-shadow(0 0 0.5px rgba(199,169,102,0.45)) drop-shadow(0 6px 32px rgba(199,169,102,0.1))";
              }}
            >
              {/* ── NOTCHED CARD ────────────────────────── */}
              <div
                ref={formRef}
                className="notched-card relative overflow-hidden"
                style={{
                  background: "rgb(14,14,13)",
                  borderRadius: "16px",
                }}
              >
                {/* Top accent line */}
                <div
                  className="accent-top absolute top-0 h-[1.5px]"
                  style={{
                    right: 0,
                    background: "linear-gradient(90deg, rgba(199,169,102,0.9), rgba(199,169,102,0.2) 50%, transparent)",
                  }}
                />
                {/* Left accent line */}
                <div
                  className="accent-left absolute left-0 w-[1.5px]"
                  style={{
                    bottom: 0,
                    background: "linear-gradient(180deg, rgba(199,169,102,0.7), transparent 70%)",
                  }}
                />
                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{ background: "rgba(199,169,102,0.1)" }} />
                {/* Right accent */}
                <div className="absolute right-0 top-0 bottom-0 w-[1px]" style={{ background: "linear-gradient(180deg, rgba(199,169,102,0.3), transparent 70%)" }} />

                {/* Glow orb */}
                <div
                  className="ctc-glow absolute pointer-events-none"
                  style={{
                    top: "-15%", right: "-5%",
                    width: "300px", height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(199,169,102,0.12) 0%, transparent 65%)",
                    opacity: 0, filter: "blur(28px)",
                  }}
                />

                {/* ZONE A */}
                <div className="zone-a relative z-10">
                  <p
                    className="text-[9px] lg:text-[10px] font-bold tracking-[0.26em] uppercase mb-1.5 lg:mb-3 text-center lg:text-left"
                    style={{ color: "rgba(199,169,102,0.8)" }}
                  >
                    Send a message
                  </p>
                  <div className="h-[1px] w-10 mx-auto lg:mx-0" style={{ background: "rgba(199,169,102,0.5)" }} />
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
                          style={{ color: "rgba(224,224,218,0.4)" }}
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
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(224,224,218,0.9)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(199,169,102,0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(199,169,102,0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex-1">
                        <label
                          htmlFor="ctc-email"
                          className="block text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 lg:mb-2"
                          style={{ color: "rgba(224,224,218,0.4)" }}
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
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(224,224,218,0.9)",
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(199,169,102,0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(199,169,102,0.08)"; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="ctc-message"
                        className="block text-[9px] lg:text-[10px] font-bold tracking-[0.18em] uppercase mb-1.5 lg:mb-2"
                        style={{ color: "rgba(224,224,218,0.4)" }}
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
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          color: "rgba(224,224,218,0.9)",
                        }}
                        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(199,169,102,0.55)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(199,169,102,0.08)"; }}
                        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 lg:py-4 rounded-xl text-xs lg:text-sm font-bold tracking-wide transition-all hover:brightness-110 active:scale-[0.98]"
                      style={{ background: "rgb(199,169,102)", color: "#080808" }}
                    >
                      <Send className="w-3.5 h-3.5" /> Send Message
                    </button>

                    {sent && (
                      <p className="text-[11px] text-green-400 font-semibold text-center animate-pulse mt-1">
                        ✓ Message sent. I&apos;ll be in touch soon.
                      </p>
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
              border: "1px solid rgba(199,169,102,0.18)",
              background: "rgba(199,169,102,0.025)",
              filter: "drop-shadow(0 0 0.5px rgba(199,169,102,0.3))",
            }}
          >
            <span
              className="font-caveat text-2xl lg:text-3xl select-none animate-float-gentle"
              style={{
                color: "rgb(199,169,102)",
                textShadow: "0 0 20px rgba(199,169,102,0.4), 0 0 60px rgba(199,169,102,0.12)",
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
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(8,8,8,0.8)", backdropFilter: "blur(8px)" }}
      >
        <span className="text-[9px] tracking-[0.22em] uppercase font-bold" style={{ color: "rgb(199,169,102)" }}>
          ATLAS
        </span>
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.28)" }}>© 2025 Vaibhav Bariyar</p>
      </div>

      <style jsx>{`
        @keyframes ctc-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(224,224,218,0.2);
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
