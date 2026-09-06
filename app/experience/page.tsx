"use client";

import type { Metadata } from "next";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, Code2, MapPin, Calendar, Briefcase, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Experience data ─────────────────────────────────────────────── */
const experiences = [
  {
    id: "solace",
    role: "Founder & CEO",
    company: "Solace",
    type: "Startup · Full-time",
    location: "Remote",
    period: "2026 — Present",
    status: "active",
    tagline: "Building empathy-driven tools for founders.",
    description:
      "Leading product, engineering and design at Solace — an AI-powered reflection platform helping founders validate ideas, process setbacks and build with clarity. Raised pre-seed interest from angels in the US and India.",
    highlights: [
      "Designed & shipped v1 from zero in under 6 weeks",
      "Architected full-stack AI pipeline with LLMs + RAG",
      "Led user research across 40+ founder interviews",
      "Built GTM strategy and investor narrative",
    ],
    stack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
    Icon: Zap,
    accentRgb: "199,169,102",
    dotColor: "var(--color-gold)",
    statusLabel: "Active",
  },
  {
    id: "mit",
    role: "Software and AI Engineer & Lead",
    company: "MIT Institute of Design",
    type: "Internship · Candidate Experience Pod",
    location: "Pune, India",
    period: "2026",
    status: "completed",
    tagline: "Led the end-to-end candidate experience at scale.",
    description:
      "Interned as Software and AI Engineer and Team Lead for the Candidate Experience team. Built internal tooling that improved the admissions workflow and designed the digital onboarding journey for prospective students.",
    highlights: [
      "Led a cross-functional team of 6 across design & engineering",
      "Shipped an applicant portal used by 1,200+ candidates",
      "Reduced manual follow-up effort by 68% via automation",
      "Delivered the project 2 weeks ahead of schedule",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Figma"],
    Icon: Code2,
    accentRgb: "126,148,125",
    dotColor: "var(--color-green)",
    statusLabel: "Completed",
  },
];

const LETTERS = "EXPERIENCE".split("");

export default function ExperiencePage() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {

      /* ── EXPERIENCE letters drop in ────────────────── */
      gsap.fromTo(
        charRefs.current.filter(Boolean),
        { opacity: 0, y: 80, rotateX: -55, filter: "blur(8px)" },
        {
          opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
          duration: 1.05, ease: "power4.out", stagger: 0.065, delay: 0.25,
        }
      );

      /* ── Left text elements ─────────────────────────── */
      gsap.fromTo(
        [".lp-kicker", ".lp-divider", ".lp-sub", ".lp-stat"],
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger: 0.1, delay: 0.6 }
      );

      /* ── Cards slide in ─────────────────────────────── */
      gsap.fromTo(
        [card1Ref.current, card2Ref.current],
        { opacity: 0, x: 80, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.9, ease: "power3.out", stagger: 0.22, delay: 0.45,
        }
      );

      /* ── Continuous ambient glow pulses ─────────────── */
      gsap.to(".glow-gold", { opacity: 0.9, scale: 1.15, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".glow-green", { opacity: 0.7, scale: 1.1, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.2 });

      /* ── Infinite ticker tape ───────────────────────── */
      gsap.to(".ticker-track", { x: "-50%", duration: 26, ease: "none", repeat: -1 });

    }, pageRef);
    return () => ctx.revert();
  }, { scope: pageRef });

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] flex flex-col"
      id="main-content"
    >
      {/* ── Breadcrumb ─────────────────────────────────── */}
      <div className="flex items-center gap-2 px-8 pt-6 text-[10px] font-mono tracking-widest"
        style={{ color: "var(--color-text-muted)", paddingTop: "calc(var(--topbar-height) + 1.25rem)" }}>
        <Link href="/" className="hover:text-[var(--color-gold)] transition-colors duration-200">Atlas</Link>
        <span>/</span>
        <span style={{ color: "var(--color-gold)" }}>Experience</span>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN — split layout
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 grid lg:grid-cols-[1fr_1.15fr]" style={{ minHeight: "calc(100vh - var(--topbar-height))" }}>

        {/* ── LEFT PANEL ─────────────────────────────── */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center px-8 py-12 lg:px-14 lg:py-16 overflow-hidden"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 28% 48%, rgb(var(--atlas-gold) / 0.08) 0%, transparent 68%)" }} />

          {/* Kicker */}
          <p className="lp-kicker text-[10px] font-bold tracking-[0.24em] uppercase mb-6"
            style={{ opacity: 0, color: "var(--color-gold)" }}>
            03 / Career
          </p>

          {/* Animated heading */}
          <div
            className="mb-6 overflow-hidden leading-none"
            aria-label="Experience"
            style={{ perspective: "800px" }}
          >
            <div className="flex flex-wrap">
              {LETTERS.map((char, i) => (
                <span
                  key={i}
                  ref={el => { charRefs.current[i] = el; }}
                  className="inline-block font-black tracking-tighter"
                  style={{
                    opacity: 0,
                    fontSize: "clamp(3rem, 7.5vw, 5.75rem)",
                    lineHeight: 0.88,
                    color: "var(--color-text)",
                    willChange: "transform,opacity,filter",
                  }}
                >{char}</span>
              ))}
            </div>
          </div>

          {/* Gold divider */}
          <div className="lp-divider mb-6 h-[2px] w-14 rounded-full"
            style={{ opacity: 0, background: "var(--color-gold)" }} />

          {/* Subtitle */}
          <p className="lp-sub text-base md:text-lg leading-relaxed max-w-[300px]"
            style={{ opacity: 0, color: "var(--color-text-muted)" }}>
            Two chapters of building something real — one as a founder,
            one as a developer leading a team.
          </p>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 max-w-[280px]">
            {[
              { value: "2+",    label: "Years building" },
              { value: "1.2K+", label: "Users served" },
              { value: "40+",   label: "Interviews led" },
              { value: "6wk",   label: "Zero → v1 Solace" },
            ].map(s => (
              <div key={s.label} className="lp-stat" style={{ opacity: 0 }}>
                <p className="text-3xl font-black text-[var(--color-text)] leading-none mb-0.5">{s.value}</p>
                <p className="text-[10px] tracking-wide" style={{ color: "var(--color-text-muted)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Nav links */}
          <div className="mt-10 flex items-center gap-3">
            <Link href="/"
              className="lp-stat inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all hover:border-[var(--color-gold)] hover:text-[var(--color-text)]"
              style={{ opacity: 0, borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Atlas
            </Link>
            <Link href="/skills"
              className="lp-stat inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ opacity: 0, background: "rgb(var(--atlas-gold) / 0.12)", border: "1px solid rgb(var(--atlas-gold) / 0.25)", color: "var(--color-gold)" }}>
              Skills Room <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Ticker tape */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
            style={{ borderTop: "1px solid var(--color-border)" }}>
            <div className="ticker-track flex whitespace-nowrap gap-8"
              style={{ width: "200%", color: "var(--color-gold)" }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 flex-shrink-0 text-[9px] font-bold tracking-[0.22em] uppercase opacity-75">
                  <span>Founder</span>
                  <span className="opacity-40">·</span>
                  <span>Engineer</span>
                  <span className="opacity-40">·</span>
                  <span>Builder</span>
                  <span className="opacity-40">·</span>
                  <span>Leader</span>
                  <span className="opacity-40">·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <div
          ref={rightRef}
          className="flex flex-col justify-center gap-5 px-8 py-12 lg:px-12 lg:py-16 overflow-y-auto"
          style={{ background: "var(--color-bg-raised)" }}
        >
          {experiences.map((exp, idx) => {
            const cardRef  = idx === 0 ? card1Ref : card2Ref;
            const glowClass = idx === 0 ? "glow-gold" : "glow-green";
            return (
              <div
                key={exp.id}
                ref={cardRef}
                className="relative rounded-2xl overflow-hidden"
                style={{
                  opacity: 0,
                  background: "var(--color-bg-card)",
                  border: `1px solid var(--color-border)`,
                  transition: "border-color 0.38s ease, box-shadow 0.38s ease, transform 0.3s ease",
                  boxShadow: "var(--shadow-card)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${exp.accentRgb},0.55)`;
                  el.style.boxShadow   = `0 0 36px 8px rgba(${exp.accentRgb},0.2), 0 8px 32px rgba(0,0,0,0.12)`;
                  el.style.transform   = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = `var(--color-border)`;
                  el.style.boxShadow   = "var(--shadow-card)";
                  el.style.transform   = "translateY(0)";
                }}
              >
                {/* Ambient glow orb */}
                <div
                  className={`${glowClass} absolute pointer-events-none`}
                  style={{
                    top: "-35%", right: "-10%",
                    width: "300px", height: "300px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(${exp.accentRgb},0.18) 0%, transparent 70%)`,
                    opacity: 0.45,
                    filter: "blur(28px)",
                    willChange: "opacity,transform",
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, rgba(${exp.accentRgb},0.75), transparent 55%)` }} />

                <div className="relative z-10 p-6 md:p-7">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      {/* Icon badge */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: `rgba(${exp.accentRgb},0.12)`,
                          border: `1px solid rgba(${exp.accentRgb},0.28)`,
                          boxShadow: `0 0 18px rgba(${exp.accentRgb},0.14)`,
                        }}>
                        <exp.Icon style={{ color: exp.dotColor, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-[var(--color-text)] leading-tight">{exp.role}</h2>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: exp.dotColor }}>{exp.company}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full"
                      style={{
                        background: `rgba(${exp.accentRgb},0.12)`,
                        border: `1px solid rgba(${exp.accentRgb},0.28)`,
                        color: exp.dotColor,
                      }}>
                      {exp.status === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full animate-status-blink"
                          style={{ background: exp.dotColor }} />
                      )}
                      {exp.statusLabel}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    {[
                      { I: Briefcase, t: exp.type },
                      { I: MapPin,    t: exp.location },
                      { I: Calendar,  t: exp.period },
                    ].map(({ I, t }) => (
                      <span key={t} className="flex items-center gap-1.5 text-[11px]"
                        style={{ color: "var(--color-text-muted)" }}>
                        <I className="w-3 h-3 flex-shrink-0" />{t}
                      </span>
                    ))}
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-semibold text-[var(--color-text)] mb-2 leading-snug">{exp.tagline}</p>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed mb-4"
                    style={{ color: "var(--color-text-muted)" }}>
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {exp.highlights.map(h => (
                      <li key={h} className="flex items-start gap-2.5 text-[12px]"
                        style={{ color: "var(--color-text)" }}>
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: exp.dotColor }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map(s => (
                      <span key={s}
                        className="text-[9px] px-2.5 py-1 rounded-md font-mono font-medium"
                        style={{
                          background: "var(--color-bg-raised)",
                          border: "1px solid var(--color-border)",
                          color: "var(--color-text-muted)",
                        }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
