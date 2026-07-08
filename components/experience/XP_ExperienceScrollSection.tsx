"use client";

import { useRef, RefObject, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Zap, Code2, MapPin, Calendar, Briefcase, ArrowRight } from "lucide-react";
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
    period: "2024 — Present",
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
    dotColor: "#C7A966",
    statusLabel: "Active",
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
      "Interned as Full Stack Developer and Pod Lead for the Candidate Experience team. Built internal tooling that improved the admissions workflow and designed the digital onboarding journey for prospective students.",
    highlights: [
      "Led a cross-functional team of 6 across design & engineering",
      "Shipped an applicant portal used by 1,200+ candidates",
      "Reduced manual follow-up effort by 68% via automation",
      "Delivered the project 2 weeks ahead of schedule",
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Figma"],
    Icon: Code2,
    accentRgb: "126,148,125",
    dotColor: "#7E947D",
    statusLabel: "Completed",
  },
];

const LETTERS = "EXPERIENCE".split("");

type Props = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export function XP_ExperienceScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const card1Ref   = useRef<HTMLDivElement>(null);
  const card2Ref   = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      /* ── Set initial states ─────────────────────────── */
      gsap.set(charRefs.current.filter(Boolean), { opacity: 0, y: 80, rotateX: -55, filter: "blur(8px)" });
      gsap.set([".xps-kicker", ".xps-divider", ".xps-sub", ".xps-stat"], { opacity: 0, y: 24 });
      gsap.set([card1Ref.current, card2Ref.current], { opacity: 0, x: 80, scale: 0.95 });

      const tl = gsap.timeline({ paused: true });

      /* ── Letters drop in ────────────────────────────── */
      tl.to(charRefs.current.filter(Boolean), {
        opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
        stagger: 0.065, duration: 1.05, ease: "power4.out",
      }, 0.1);

      /* ── Left elements ──────────────────────────────── */
      tl.to([".xps-kicker", ".xps-divider", ".xps-sub", ".xps-stat"], {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.75, ease: "power3.out",
      }, 0.4);

      /* ── Cards slide in ─────────────────────────────── */
      tl.to([card1Ref.current, card2Ref.current], {
        opacity: 1, x: 0, scale: 1,
        duration: 0.9, ease: "power3.out", stagger: 0.22,
      }, 0.35);

      tlRef.current = tl;
    }, section);

    /* Infinite glow pulses — outside intro timeline */
    const g1 = gsap.to(".xps-glow-gold",  { opacity: 0.9, scale: 1.15, duration: 3,   ease: "sine.inOut", repeat: -1, yoyo: true });
    const g2 = gsap.to(".xps-glow-green", { opacity: 0.7, scale: 1.1,  duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.2 });
    const ticker = gsap.to(".xps-ticker", { x: "-50%", duration: 26, ease: "none", repeat: -1 });

    return () => {
      ctx.revert();
      g1.kill();
      g2.kill();
      ticker.kill();
    };
  }, { scope: sectionRef });
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tlRef.current?.restart();
        } else {
          tlRef.current?.pause(0);
        }
      });
    }, { threshold: 0.15 });
    
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      data-section
      className="experience-scroll-section"
      aria-label="Experience"
    >
      <div className="h-[100dvh] w-full overflow-hidden bg-[#080808] flex flex-col">
        {/* ── SPLIT LAYOUT ─────────────────────────────── */}
        <div
          className="flex-1 flex flex-col lg:grid overflow-hidden lg:grid-cols-[1fr_1.15fr]"
          style={{ paddingTop: "var(--topbar-height)" }}
        >
          {/* ── LEFT PANEL ─────────────────────── */}
          <div
            ref={leftRef}
            className="relative flex flex-col justify-center px-6 py-5 md:py-8 lg:px-14 lg:py-12 overflow-hidden shrink-0"
            style={{ borderRight: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 70% 55% at 28% 48%, rgba(199,169,102,0.065) 0%, transparent 68%)" }} />

            {/* Kicker */}
            <p className="xps-kicker text-[9px] lg:text-[10px] font-bold tracking-[0.24em] uppercase mb-2 lg:mb-6"
              style={{ opacity: 0, color: "rgb(199,169,102)" }}>
              03 / Career
            </p>

            {/* Animated heading */}
            <div
              className="mb-3 lg:mb-6 overflow-hidden leading-none"
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
                      fontSize: "clamp(2.5rem, 11vw, 5.75rem)",
                      lineHeight: 0.88,
                      color: "rgb(247,247,244)",
                      willChange: "transform,opacity,filter",
                    }}
                  >{char}</span>
                ))}
              </div>
            </div>

            {/* Gold divider */}
            <div className="xps-divider mb-3 lg:mb-6 h-[2px] w-10 lg:w-14 rounded-full"
              style={{ opacity: 0, background: "rgb(199,169,102)" }} />

            {/* Subtitle */}
            <p className="xps-sub text-xs md:text-sm lg:text-lg leading-relaxed max-w-[280px] lg:max-w-[300px] mb-4 lg:mb-10"
              style={{ opacity: 0, color: "rgba(224,224,218,0.55)" }}>
              Two chapters of building something real — one as a founder,
              one as a developer leading a team.
            </p>

            {/* Stats */}
            <div className="hidden lg:grid grid-cols-2 gap-x-8 gap-y-5 max-w-[280px] mb-10">
              {[
                { value: "2+",    label: "Years building" },
                { value: "1.2K+", label: "Users served" },
                { value: "40+",   label: "Interviews led" },
                { value: "6wk",   label: "Zero → v1 Solace" },
              ].map(s => (
                <div key={s.label} className="xps-stat" style={{ opacity: 0 }}>
                  <p className="text-3xl font-black text-white leading-none mb-0.5">{s.value}</p>
                  <p className="text-[10px] tracking-wide" style={{ color: "rgba(224,224,218,0.32)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link href="/experience"
              className="xps-stat inline-flex items-center gap-2 px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl text-[10px] lg:text-xs font-semibold self-start transition-all hover:opacity-90"
              style={{ opacity: 0, background: "rgba(199,169,102,0.12)", border: "1px solid rgba(199,169,102,0.3)", color: "rgb(199,169,102)" }}>
              View Full Experience <ArrowRight className="w-2.5 h-2.5 lg:w-3 lg:h-3" />
            </Link>

            {/* Ticker tape */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="xps-ticker flex whitespace-nowrap gap-8"
                style={{ width: "200%", color: "rgba(199,169,102,0.32)" }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <span key={i} className="flex items-center gap-8 flex-shrink-0 text-[9px] font-bold tracking-[0.22em] uppercase">
                    <span>Founder</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                    <span>Engineer</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                    <span>Builder</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                    <span>Leader</span><span style={{ color: "rgba(199,169,102,0.15)" }}>·</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT PANEL ────────────────────── */}
          <div
            className="flex-1 flex flex-col gap-4 lg:justify-center lg:gap-5 px-5 py-6 lg:px-12 lg:py-12 overflow-y-auto"
            style={{ background: "rgb(10,10,9)" }}
          >
            {experiences.map((exp, idx) => {
              const cardRef   = idx === 0 ? card1Ref : card2Ref;
              const glowClass = idx === 0 ? "xps-glow-gold" : "xps-glow-green";

              return (
                <div
                  key={exp.id}
                  ref={cardRef}
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    opacity: 0,
                    background: "rgb(14,14,13)",
                    border: `1px solid rgba(${exp.accentRgb},0.12)`,
                    transition: "border-color 0.38s ease, box-shadow 0.38s ease, transform 0.3s ease",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = `rgba(${exp.accentRgb},0.48)`;
                    el.style.boxShadow   = `0 0 36px 8px rgba(${exp.accentRgb},0.2), 0 0 80px 20px rgba(${exp.accentRgb},0.08), 0 8px 32px rgba(0,0,0,0.6)`;
                    el.style.transform   = "translateY(-4px)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget;
                    el.style.borderColor = `rgba(${exp.accentRgb},0.12)`;
                    el.style.boxShadow   = "0 2px 16px rgba(0,0,0,0.5)";
                    el.style.transform   = "translateY(0)";
                  }}
                >
                  {/* Glow orb */}
                  <div
                    className={`${glowClass} absolute pointer-events-none`}
                    style={{
                      top: "-35%", right: "-10%",
                      width: "300px", height: "300px",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(${exp.accentRgb},0.18) 0%, transparent 70%)`,
                      opacity: 0.45, filter: "blur(28px)",
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
                        <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{
                            background: `rgba(${exp.accentRgb},0.09)`,
                            border: `1px solid rgba(${exp.accentRgb},0.22)`,
                            boxShadow: `0 0 18px rgba(${exp.accentRgb},0.14)`,
                          }}>
                          <exp.Icon style={{ color: exp.dotColor, width: 18, height: 18 }} />
                        </div>
                        <div>
                          <h2 className="text-[15px] font-bold text-white leading-tight">{exp.role}</h2>
                          <p className="text-xs font-semibold mt-0.5" style={{ color: exp.dotColor }}>{exp.company}</p>
                        </div>
                      </div>
                      <span className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full"
                        style={{
                          background: `rgba(${exp.accentRgb},0.09)`,
                          border: `1px solid rgba(${exp.accentRgb},0.28)`,
                          color: exp.dotColor,
                        }}>
                        {exp.status === "active" && (
                          <span className="w-1.5 h-1.5 rounded-full animate-status-blink" style={{ background: exp.dotColor }} />
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
                          style={{ color: "rgba(224,224,218,0.35)" }}>
                          <I className="w-3 h-3 flex-shrink-0" />{t}
                        </span>
                      ))}
                    </div>

                    {/* Tagline */}
                    <p className="text-sm font-semibold text-white mb-2 leading-snug">{exp.tagline}</p>

                    {/* Description */}
                    <p className="text-[12px] leading-relaxed mb-4"
                      style={{ color: "rgba(224,224,218,0.48)" }}>
                      {exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1.5 mb-5">
                      {exp.highlights.map(h => (
                        <li key={h} className="flex items-start gap-2.5 text-[12px]"
                          style={{ color: "rgba(224,224,218,0.66)" }}>
                          <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.dotColor }} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    {/* Stack chips */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.stack.map(s => (
                        <span key={s} className="text-[9px] px-2.5 py-1 rounded-md font-mono font-medium"
                          style={{
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(224,224,218,0.45)",
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
    </section>
  );
}
