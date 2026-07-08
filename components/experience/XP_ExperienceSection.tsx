"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Briefcase, ExternalLink, MapPin, Calendar, Zap, Code2, Users } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Experience data ───────────────────────────────────── */
const experiences = [
  {
    id: "solace",
    role: "Founder & CEO",
    company: "Solace",
    type: "Startup",
    location: "Remote",
    period: "2024 — Present",
    status: "active",
    tagline: "Building empathy-driven tools for founders.",
    description:
      "Leading product, engineering and design of Solace — an AI-powered reflection platform helping founders validate ideas, process setbacks and build with clarity. Raised pre-seed interest from angels in the US and India.",
    highlights: [
      "Designed and shipped v1 from zero in under 6 weeks",
      "Architected full-stack AI pipeline with LLMs + RAG",
      "Led user research across 40+ interviews",
      "Built GTM strategy and investor narrative",
    ],
    stack: ["Next.js", "Node.js", "OpenAI", "PostgreSQL", "Tailwind"],
    icon: Zap,
    color: "gold",
    glowColor: "rgba(199,169,102,0.18)",
    borderGlow: "rgba(199,169,102,0.4)",
    dotColor: "#C7A966",
  },
  {
    id: "mit",
    role: "Full Stack Developer & Lead",
    company: "MIT Institute of Design",
    type: "Internship · Candidate Experience Pod",
    location: "Pune, India",
    period: "2023",
    status: "completed",
    tagline: "Led the end-to-end candidate experience at scale.",
    description:
      "Interned as Full Stack Developer and Pod Lead for the Candidate Experience team at MIT Institute of Design. Built internal tools that improved admissions workflow and designed the digital onboarding journey for prospective students.",
    highlights: [
      "Led a cross-functional team of 6 across design and engineering",
      "Shipped an applicant portal used by 1,200+ candidates",
      "Reduced manual follow-up effort by 68% via automation",
      "Delivered the project 2 weeks ahead of schedule",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Figma"],
    icon: Code2,
    color: "green",
    glowColor: "rgba(126,148,125,0.14)",
    borderGlow: "rgba(126,148,125,0.45)",
    dotColor: "#7E947D",
  },
];

/* ─── Component ─────────────────────────────────────────── */
export function XP_ExperienceSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLDivElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);
  const charsRef    = useRef<HTMLSpanElement[]>([]);
  const card1Ref    = useRef<HTMLDivElement>(null);
  const card2Ref    = useRef<HTMLDivElement>(null);

  /* Register char refs */
  const setCharRef = (i: number) => (el: HTMLSpanElement | null) => {
    if (el) charsRef.current[i] = el;
  };

  /* Split "EXPERIENCE" into individually animated chars */
  const letters = "EXPERIENCE".split("");

  useGSAP(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {

      /* ── Left: char drop-in stagger ─────────────────── */
      gsap.fromTo(
        charsRef.current,
        { opacity: 0, y: 80, rotateX: -45, filter: "blur(4px)" },
        {
          opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
          duration: 0.9, ease: "power4.out",
          stagger: 0.055,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Left: kicker + subtitle ─────────────────────── */
      gsap.fromTo(
        [".xp-kicker", ".xp-subtitle", ".xp-divider"],
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.65, ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
          },
        }
      );

      /* ── Right: card slide-in from right ─────────────── */
      gsap.fromTo(
        [card1Ref.current, card2Ref.current],
        { opacity: 0, x: 60, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.8, ease: "power3.out",
          stagger: 0.18,
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Continuous ambient glow pulse on card 1 (gold) */
      gsap.to(".xp-card-glow-gold", {
        opacity: 0.85, scale: 1.08,
        duration: 2.8, ease: "sine.inOut",
        repeat: -1, yoyo: true,
      });

      /* ── Continuous ambient glow pulse on card 2 (green) */
      gsap.to(".xp-card-glow-green", {
        opacity: 0.7, scale: 1.06,
        duration: 3.4, ease: "sine.inOut",
        repeat: -1, yoyo: true, delay: 0.9,
      });

      /* ── Scrolling ticker text (left panel) */
      gsap.to(".xp-scroll-ticker", {
        x: "-50%",
        duration: 22, ease: "none",
        repeat: -1,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="xp-experience"
      className="relative w-full overflow-hidden"
      style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg)" }}
      aria-label="Experience section"
    >
      <div className="grid lg:grid-cols-2 min-h-[700px]">

        {/* ── LEFT PANEL ──────────────────────────────── */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center px-8 py-16 lg:px-14 lg:py-20 overflow-hidden"
          style={{ borderRight: "1px solid var(--color-border)" }}
        >
          {/* Ambient radial glow behind text */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 55% at 35% 50%, rgba(199,169,102,0.06) 0%, transparent 70%)",
            }}
          />

          {/* Kicker */}
          <p className="xp-kicker atlas-kicker mb-6" style={{ opacity: 0 }}>
            03 / Career
          </p>

          {/* Animated character heading */}
          <div
            className="mb-6 overflow-hidden leading-none"
            aria-label="Experience"
            style={{ perspective: "600px" }}
          >
            <div className="flex flex-wrap gap-0">
              {letters.map((char, i) => (
                <span
                  key={i}
                  ref={setCharRef(i)}
                  className="inline-block text-[clamp(3.5rem,8vw,6.5rem)] font-black tracking-tighter"
                  style={{
                    opacity: 0,
                    color: "rgb(var(--atlas-white))",
                    lineHeight: 0.9,
                    willChange: "transform, opacity, filter",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            className="xp-divider mb-6 h-px w-16"
            style={{ opacity: 0, background: "var(--color-gold)" }}
          />

          {/* Subtitle */}
          <p
            className="xp-subtitle text-base md:text-lg leading-relaxed max-w-sm"
            style={{ opacity: 0, color: "rgba(224,224,218,0.65)" }}
          >
            Two chapters of building something real —
            one as a founder, one as a developer.
          </p>

          {/* Scrolling ticker tape */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3 border-t"
            style={{ borderColor: "var(--color-border)" }}>
            <div
              className="xp-scroll-ticker flex whitespace-nowrap gap-6 text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{ color: "rgba(199,169,102,0.4)", width: "200%" }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <span key={i} className="flex items-center gap-6 flex-shrink-0">
                  <span>Founder</span>
                  <span style={{ color: "rgba(199,169,102,0.2)" }}>·</span>
                  <span>Engineer</span>
                  <span style={{ color: "rgba(199,169,102,0.2)" }}>·</span>
                  <span>Builder</span>
                  <span style={{ color: "rgba(199,169,102,0.2)" }}>·</span>
                  <span>Leader</span>
                  <span style={{ color: "rgba(199,169,102,0.2)" }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <div
          ref={rightRef}
          className="flex flex-col justify-center gap-5 px-8 py-16 lg:px-12 lg:py-20"
          style={{ background: "rgb(10,10,9)" }}
        >
          {experiences.map((exp, idx) => {
            const Icon = exp.icon;
            const cardRef = idx === 0 ? card1Ref : card2Ref;
            const glowClass = exp.color === "gold" ? "xp-card-glow-gold" : "xp-card-glow-green";

            return (
              <div
                key={exp.id}
                ref={cardRef}
                className="xp-exp-card relative rounded-2xl overflow-hidden group"
                style={{
                  opacity: 0,
                  background: "rgb(14,14,13)",
                  border: `1px solid ${exp.color === "gold" ? "rgba(199,169,102,0.15)" : "rgba(126,148,125,0.15)"}`,
                  transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.3s ease",
                  boxShadow: `0 0 0 0 ${exp.glowColor}, 0 2px 12px rgba(0,0,0,0.4)`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = exp.borderGlow;
                  el.style.boxShadow = `0 0 32px 4px ${exp.glowColor}, 0 0 64px 8px ${exp.glowColor}, 0 8px 32px rgba(0,0,0,0.5)`;
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = exp.color === "gold" ? "rgba(199,169,102,0.15)" : "rgba(126,148,125,0.15)";
                  el.style.boxShadow = `0 0 0 0 ${exp.glowColor}, 0 2px 12px rgba(0,0,0,0.4)`;
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Ambient glow orb */}
                <div
                  className={`${glowClass} absolute pointer-events-none`}
                  style={{
                    top: "-30%", right: "-20%",
                    width: "260px", height: "260px",
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${exp.glowColor} 0%, transparent 70%)`,
                    opacity: 0.55,
                    willChange: "opacity, transform",
                    filter: "blur(20px)",
                  }}
                />

                <div className="relative z-10 p-6 md:p-7">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Icon badge */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                          background: exp.color === "gold"
                            ? "rgba(199,169,102,0.1)"
                            : "rgba(126,148,125,0.1)",
                          border: `1px solid ${exp.color === "gold" ? "rgba(199,169,102,0.25)" : "rgba(126,148,125,0.25)"}`,
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: exp.dotColor }}
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">{exp.role}</h3>
                        <p
                          className="text-[11px] font-semibold mt-0.5"
                          style={{ color: exp.dotColor }}
                        >
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className="flex-shrink-0 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                      style={{
                        background: exp.status === "active"
                          ? "rgba(199,169,102,0.12)"
                          : "rgba(126,148,125,0.1)",
                        border: `1px solid ${exp.status === "active" ? "rgba(199,169,102,0.3)" : "rgba(126,148,125,0.25)"}`,
                        color: exp.dotColor,
                      }}
                    >
                      {exp.status === "active" ? (
                        <span className="flex items-center gap-1">
                          <span
                            className="inline-block w-1.5 h-1.5 rounded-full animate-status-blink"
                            style={{ background: exp.dotColor }}
                          />
                          Active
                        </span>
                      ) : "Completed"}
                    </span>
                  </div>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="flex items-center gap-1 text-[11px]"
                      style={{ color: "rgba(224,224,218,0.45)" }}>
                      <Briefcase className="w-3 h-3" />
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]"
                      style={{ color: "rgba(224,224,218,0.45)" }}>
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                    <span className="flex items-center gap-1 text-[11px]"
                      style={{ color: "rgba(224,224,218,0.45)" }}>
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p
                    className="text-sm font-medium mb-3 leading-snug"
                    style={{ color: "rgb(224,224,218)" }}
                  >
                    {exp.tagline}
                  </p>

                  {/* Description */}
                  <p
                    className="text-xs leading-relaxed mb-4"
                    style={{ color: "rgba(224,224,218,0.55)" }}
                  >
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {exp.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2 text-xs"
                        style={{ color: "rgba(224,224,218,0.65)" }}
                      >
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: exp.dotColor }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[9px] px-2 py-0.5 rounded font-mono font-medium"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          color: "rgba(224,224,218,0.55)",
                        }}
                      >
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
    </section>
  );
}
