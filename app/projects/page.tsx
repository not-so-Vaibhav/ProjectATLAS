"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { BrainCircuit, LineChart, Activity, ShieldAlert, Camera, ArrowLeft, ArrowRight, Layout, Calendar, Code2 } from "lucide-react";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ─── Projects data ─────────────────────────────────────────────── */
const projectsData = [
  {
    id: "folio-space",
    role: "Folio Space",
    company: "AI-Powered Portfolio Intelligence",
    type: "Web Platform",
    location: "Full Stack",
    period: "2026 — Present",
    status: "active",
    tagline: "Evaluating portfolios with intelligent insights.",
    description:
      "Built an AI-powered portfolio evaluation platform that analyzes portfolio quality, skills, documentation, and project depth to generate personalized insights.",
    highlights: [
      "Developed intelligent portfolio scoring and recruiter matching",
      "Built authentication and responsive dashboards",
      "Architected with reusable components and modern full-stack patterns",
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    Icon: BrainCircuit,
    accentRgb: "126,148,125",
    dotColor: "var(--color-green)",
    statusLabel: "Active",
  },
  {
    id: "fintech-edu",
    role: "Personal Finance Simulation",
    company: "Fintech Education Platform",
    type: "Web Platform",
    location: "Frontend & Firebase",
    period: "2025 — Present",
    status: "active",
    tagline: "Interactive learning for complex financial concepts.",
    description:
      "Built a student-focused fintech education platform featuring budgeting, SIP, credit, and emergency financial simulations with interactive learning modules.",
    highlights: [
      "Integrated Firebase authentication with protected routes",
      "Designed modular user flows to simplify complex financial concepts",
      "Managed user profiles and state across simulations",
    ],
    stack: ["Next.js", "Firebase", "Tailwind CSS"],
    Icon: LineChart,
    accentRgb: "199,169,102",
    dotColor: "var(--color-gold)",
    statusLabel: "Active",
  },
  {
    id: "stress2health",
    role: "Stress2Health",
    company: "Academic Research Platform",
    type: "Data Visualization",
    location: "Full Stack",
    period: "2026",
    status: "completed",
    tagline: "Mapping stress indicators to lifestyle diseases.",
    description:
      "Built a data visualization and analytics platform mapping relationships between stress indicators and lifestyle disease outcomes for academic research.",
    highlights: [
      "Implemented a Flask backend for robust data processing",
      "Designed a structured data pipeline to analyze health datasets",
      "Served interactive data visualizations efficiently",
    ],
    stack: ["Flask", "Python", "HTML", "CSS", "JavaScript"],
    Icon: Activity,
    accentRgb: "102,153,199",
    dotColor: "var(--color-text)",
    statusLabel: "Completed",
  },
  {
    id: "emergency-response",
    role: "Emergency Response System",
    company: "Incident Management",
    type: "Web Application",
    location: "Frontend",
    period: "2024",
    status: "completed",
    tagline: "Coordinating operations and centralizing information.",
    description:
      "Built a web-based platform to coordinate emergency response operations and centralize incident information management.",
    highlights: [
      "Designed a structured data architecture for emergency workflows",
      "Built real-time status updates and reporting features",
      "Created an intuitive dashboard for rapid response",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    Icon: ShieldAlert,
    accentRgb: "199,102,102",
    dotColor: "var(--color-text)",
    statusLabel: "Completed",
  },
  {
    id: "notsography",
    role: "NotSoGraphy",
    company: "Photography Portfolio",
    type: "Portfolio Website",
    location: "Frontend",
    period: "2024",
    status: "completed",
    tagline: "Showcasing visual work with optimized layouts.",
    description:
      "Developed a fully responsive photography portfolio showcasing visual work with optimized layouts, accessibility, and fast page performance.",
    highlights: [
      "Enhanced user experience through intuitive navigation",
      "Ensured seamless cross-device compatibility",
      "Optimized assets for fast page load times",
    ],
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    Icon: Camera,
    accentRgb: "150,102,199",
    dotColor: "var(--color-text)",
    statusLabel: "Completed",
  }
];

const LETTERS = "PROJECTS".split("");

export default function ProjectsPage() {
  const pageRef    = useRef<HTMLDivElement>(null);
  const leftRef    = useRef<HTMLDivElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {

      /* ── PROJECTS letters drop in ────────────────── */
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
        cardRefs.current.filter(Boolean),
        { opacity: 0, x: 80, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1,
          duration: 0.9, ease: "power3.out", stagger: 0.22, delay: 0.45,
        }
      );

      /* ── Continuous ambient glow pulses ─────────────── */
      gsap.to(".glow-blue", { opacity: 0.8, scale: 1.15, duration: 3.5, ease: "sine.inOut", repeat: -1, yoyo: true });
      gsap.to(".glow-gold", { opacity: 0.9, scale: 1.15, duration: 3, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.5 });
      gsap.to(".glow-green", { opacity: 0.7, scale: 1.1, duration: 3.8, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.2 });
      gsap.to(".glow-red", { opacity: 0.8, scale: 1.15, duration: 3.2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 0.8 });
      gsap.to(".glow-purple", { opacity: 0.85, scale: 1.1, duration: 4, ease: "sine.inOut", repeat: -1, yoyo: true, delay: 1.5 });

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
        style={{ color: "rgb(var(--atlas-line) / 0.25)", paddingTop: "calc(var(--topbar-height) + 1.25rem)" }}>
        <Link href="/" className="hover:text-[var(--color-gold)] transition-colors duration-200">Atlas</Link>
        <span>/</span>
        <span style={{ color: "rgb(var(--atlas-line) / 0.5)" }}>Projects</span>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN — split layout
      ══════════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_1.15fr] overflow-hidden" style={{ minHeight: "calc(100vh - var(--topbar-height) - 3rem)" }}>

        {/* ── LEFT PANEL ─────────────────────────────── */}
        <div
          ref={leftRef}
          className="relative flex flex-col justify-center px-6 py-8 md:px-8 md:py-12 lg:px-14 lg:py-16 overflow-hidden shrink-0"
          style={{ borderRight: "1px solid rgb(var(--atlas-line) / 0.07)", borderBottom: "1px solid rgb(var(--atlas-line) / 0.07)" }}
        >
          {/* Ambient radial glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 70% 55% at 28% 48%, rgb(var(--atlas-green) / 0.065) 0%, transparent 68%)" }} />

          {/* Kicker */}
          <p className="lp-kicker text-[10px] font-bold tracking-[0.24em] uppercase mb-4 lg:mb-6"
            style={{ opacity: 0, color: "var(--color-green)" }}>
            04 / Engineering
          </p>

          {/* Animated heading */}
          <div
            className="mb-4 lg:mb-6 overflow-hidden leading-none"
            aria-label="Projects"
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
                    fontSize: "clamp(3rem, 10vw, 5.75rem)",
                    lineHeight: 0.88,
                    color: "var(--color-text)",
                    willChange: "transform,opacity,filter",
                  }}
                >{char}</span>
              ))}
            </div>
          </div>

          {/* Green divider */}
          <div className="lp-divider mb-4 lg:mb-6 h-[2px] w-14 rounded-full"
            style={{ opacity: 0, background: "var(--color-green)" }} />

          {/* Subtitle */}
          <p className="lp-sub text-sm md:text-base lg:text-lg leading-relaxed max-w-[300px]"
            style={{ opacity: 0, color: "rgb(var(--atlas-ink) / 0.55)" }}>
            A collection of robust platforms, AI systems, and interactive experiences I have engineered.
          </p>

          {/* Stats */}
          <div className="mt-8 lg:mt-10 hidden md:grid grid-cols-2 gap-x-8 gap-y-5 max-w-[280px]">
            {[
              { value: "5",     label: "Major Platforms" },
              { value: "3+",    label: "Full Stack Apps" },
              { value: "100%",  label: "Shipped" },
              { value: "2026",  label: "Focus on AI" },
            ].map(s => (
              <div key={s.label} className="lp-stat" style={{ opacity: 0 }}>
                <p className="text-2xl lg:text-3xl font-black text-white leading-none mb-0.5">{s.value}</p>
                <p className="text-[10px] tracking-wide" style={{ color: "rgb(var(--atlas-ink) / 0.32)" }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Nav links */}
          <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-3">
            <Link href="/"
              className="lp-stat inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border transition-all hover:border-white/25 hover:text-white"
              style={{ opacity: 0, borderColor: "rgb(var(--atlas-line) / 0.1)", color: "rgb(var(--atlas-ink) / 0.45)" }}>
              <ArrowLeft className="w-3 h-3" /> Back to Atlas
            </Link>
            <Link href="/founder"
              className="lp-stat inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
              style={{ opacity: 0, background: "rgb(var(--atlas-green) / 0.12)", border: "1px solid rgb(var(--atlas-green) / 0.25)", color: "var(--color-green)" }}>
              Founder Room <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Ticker tape */}
          <div className="hidden lg:block absolute bottom-0 left-0 right-0 overflow-hidden py-2.5"
            style={{ borderTop: "1px solid rgb(var(--atlas-line) / 0.06)" }}>
            <div className="ticker-track flex whitespace-nowrap gap-8"
              style={{ width: "200%", color: "rgb(var(--atlas-green) / 0.32)" }}>
              {Array.from({ length: 10 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8 flex-shrink-0 text-[9px] font-bold tracking-[0.22em] uppercase">
                  <span>Frontend</span>
                  <span style={{ color: "rgb(var(--atlas-green) / 0.15)" }}>·</span>
                  <span>Backend</span>
                  <span style={{ color: "rgb(var(--atlas-green) / 0.15)" }}>·</span>
                  <span>Architecture</span>
                  <span style={{ color: "rgb(var(--atlas-green) / 0.15)" }}>·</span>
                  <span>Systems</span>
                  <span style={{ color: "rgb(var(--atlas-green) / 0.15)" }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────── */}
        <div
          ref={rightRef}
          className="flex-1 flex flex-col justify-start lg:justify-center gap-5 px-5 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16 overflow-y-auto"
          style={{ background: "var(--color-bg-raised)" }}
        >
          {projectsData.map((project, idx) => {
            const glowClass = idx === 0 ? "glow-green" : idx === 1 ? "glow-gold" : idx === 2 ? "glow-blue" : idx === 3 ? "glow-red" : "glow-purple";
            return (
              <div
                key={project.id}
                ref={el => { cardRefs.current[idx] = el; }}
                className="relative rounded-2xl overflow-hidden shrink-0"
                style={{
                  opacity: 0,
                  background: "var(--color-bg-card)",
                  border: `1px solid rgba(${project.accentRgb},0.12)`,
                  transition: "border-color 0.38s ease, box-shadow 0.38s ease, transform 0.3s ease",
                  boxShadow: "0 2px 16px rgb(var(--atlas-black) / 0.5)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${project.accentRgb},0.48)`;
                  el.style.boxShadow   = `0 0 36px 8px rgba(${project.accentRgb},0.2), 0 0 80px 20px rgba(${project.accentRgb},0.08), 0 8px 32px rgb(var(--atlas-black) / 0.6)`;
                  el.style.transform   = "translateY(-4px)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget;
                  el.style.borderColor = `rgba(${project.accentRgb},0.12)`;
                  el.style.boxShadow   = "0 2px 16px rgb(var(--atlas-black) / 0.5)";
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
                    background: `radial-gradient(circle, rgba(${project.accentRgb},0.18) 0%, transparent 70%)`,
                    opacity: 0.45,
                    filter: "blur(28px)",
                    willChange: "opacity,transform",
                  }}
                />

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl"
                  style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.75), transparent 55%)` }} />

                <div className="relative z-10 p-6 md:p-7">

                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div className="flex items-center gap-3.5">
                      {/* Icon badge */}
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          background: `rgba(${project.accentRgb},0.09)`,
                          border: `1px solid rgba(${project.accentRgb},0.22)`,
                          boxShadow: `0 0 18px rgba(${project.accentRgb},0.14)`,
                        }}>
                        <project.Icon style={{ color: project.dotColor, width: 18, height: 18 }} />
                      </div>
                      <div>
                        <h2 className="text-[15px] font-bold text-white leading-tight">{project.role}</h2>
                        <p className="text-xs font-semibold mt-0.5" style={{ color: project.dotColor }}>{project.company}</p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1.5 rounded-full"
                      style={{
                        background: `rgba(${project.accentRgb},0.09)`,
                        border: `1px solid rgba(${project.accentRgb},0.28)`,
                        color: project.dotColor,
                      }}>
                      {project.status === "active" && (
                        <span className="w-1.5 h-1.5 rounded-full animate-status-blink"
                          style={{ background: project.dotColor }} />
                      )}
                      {project.statusLabel}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                    {[
                      { I: Code2,     t: project.type },
                      { I: Layout,    t: project.location },
                      { I: Calendar,  t: project.period },
                    ].map(({ I, t }) => (
                      <span key={t} className="flex items-center gap-1.5 text-[11px]"
                        style={{ color: "rgb(var(--atlas-ink) / 0.35)" }}>
                        <I className="w-3 h-3 flex-shrink-0" />{t}
                      </span>
                    ))}
                  </div>

                  {/* Tagline */}
                  <p className="text-sm font-semibold text-white mb-2 leading-snug">{project.tagline}</p>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed mb-4"
                    style={{ color: "rgb(var(--atlas-ink) / 0.48)" }}>
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-5">
                    {project.highlights.map(h => (
                      <li key={h} className="flex items-start gap-2.5 text-[12px]"
                        style={{ color: "rgb(var(--atlas-ink) / 0.66)" }}>
                        <span className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: project.dotColor }} />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Stack chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map(s => (
                      <span key={s}
                        className="text-[9px] px-2.5 py-1 rounded-md font-mono font-medium"
                        style={{
                          background: "rgb(var(--atlas-line) / 0.04)",
                          border: "1px solid rgb(var(--atlas-line) / 0.08)",
                          color: "rgb(var(--atlas-ink) / 0.45)",
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
