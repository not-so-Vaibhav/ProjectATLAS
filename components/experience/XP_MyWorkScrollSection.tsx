"use client";

import { useRef, useEffect, RefObject } from "react";
import { BrainCircuit, LineChart, Activity, ShieldAlert, Camera, Github, ExternalLink } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: "folio-space",
    number: "01",
    role: "Folio Space",
    company: "AI-Powered Portfolio Intelligence",
    period: "2026 — Present",
    description:
      "Built an AI-powered portfolio evaluation platform that analyzes portfolio quality, skills, documentation, and project depth to generate personalized insights. Developed intelligent portfolio scoring, recruiter matching, authentication, and responsive dashboards.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase"],
    Icon: BrainCircuit,
    accentRgb: "199,169,102",
    dotColor: "#C7A966",
    status: "active",
    githubUrl: "https://github.com/asg492607/Folio-AI-Powered-recruitment",
    liveUrl: "https://folio-aipoweredrecruitment.onrender.com/",
  },
  {
    id: "stress2health",
    number: "02",
    role: "Stress2Health",
    company: "Academic Research Platform",
    period: "2026",
    description:
      "Built a data visualization and analytics platform mapping relationships between stress indicators and lifestyle disease outcomes for academic research. Implemented a Flask backend with a structured data pipeline to process and serve health datasets.",
    stack: ["Flask", "Python", "HTML", "CSS", "JavaScript"],
    Icon: Activity,
    accentRgb: "102,153,199",
    dotColor: "#6699C7",
    status: "completed",
    githubUrl: "https://github.com/not-so-Vaibhav/Stress2Health",
    liveUrl: "https://stress2health.onrender.com/",
  },
  {
    id: "notsography",
    number: "03",
    role: "NotSoGraphy",
    company: "Photography Portfolio",
    period: "2024",
    description:
      "Developed a fully responsive photography portfolio showcasing visual work with optimized layouts, accessibility, and fast page performance. Enhanced user experience through intuitive navigation and cross-device compatibility.",
    stack: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    Icon: Camera,
    accentRgb: "150,102,199",
    dotColor: "#9666C7",
    status: "completed",
    githubUrl: "https://github.com/not-so-Vaibhav/photographer-portfolio",
    liveUrl: "https://not-so-graphy.onrender.com/",
  },
  {
    id: "fintech-edu",
    number: "04",
    role: "Personal Finance Simulation",
    company: "Fintech Education Platform",
    period: "2025 — Present",
    description:
      "Built a student-focused fintech education platform featuring budgeting, SIP, credit, and emergency financial simulations. Integrated Firebase authentication with protected routes and designed modular user flows to simplify complex financial concepts.",
    stack: ["Next.js", "Firebase", "Tailwind CSS"],
    Icon: LineChart,
    accentRgb: "126,148,125",
    dotColor: "#7E947D",
    status: "active",
    githubUrl: "https://github.com/not-so-Vaibhav/indian-finance-game",
    liveUrl: "https://finance-for-everyone.netlify.app/",
  },
  {
    id: "emergency-response",
    number: "05",
    role: "Emergency Response System",
    company: "Incident Management",
    period: "2024",
    description:
      "Built a web-based platform to coordinate emergency response operations and centralize incident information management. Designed a structured data architecture supporting emergency workflows, reporting, and real-time status updates.",
    stack: ["HTML", "CSS", "JavaScript"],
    Icon: ShieldAlert,
    accentRgb: "199,102,102",
    dotColor: "#C76666",
    status: "completed",
    githubUrl: "https://github.com/not-so-Vaibhav/Emergency-Response-Management-System",
    liveUrl: "https://not-so-vaibhav.github.io/DSA-Project/",
  },
];

type Props = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export function XP_MyWorkScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  // Desktop track (>= lg)
  const trackRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLDivElement>(null);
  // Mobile track (< lg)
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Defer until after parent XP_ArrivalScene has set containerRef
    const init = () => {
      const scroller = scrollContainerRef.current || document.querySelector<HTMLElement>(".snap-y-container");
      if (!scroller) return;

      const isMobile = window.innerWidth < 1024;

      const ctx = gsap.context(() => {
        if (!isMobile && trackRef.current) {
          // Desktop GSAP x-translation
          const track = trackRef.current;
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              scroller: scroller,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.65,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const progress = self.progress;
                const activeIndex = Math.round(progress * (projectsData.length - 1));
                const dots = activeDotRef.current?.querySelectorAll<HTMLElement>("[data-dot]");
                if (dots) {
                  dots.forEach((dot, i) => {
                    const isActive = i === activeIndex;
                    dot.style.opacity = isActive ? "1" : "0.3";
                    dot.style.transform = isActive ? "scale(1.35)" : "scale(1)";
                    dot.style.backgroundColor = isActive ? "var(--color-gold)" : "rgb(var(--atlas-line) / 0.25)";
                  });
                }
              },
            },
          });

          tl.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none",
          });
        }
      }, section);

      return ctx;
    };

    // Give the parent one frame to mount and assign its ref
    let ctx: ReturnType<typeof gsap.context> | undefined;
    const raf = requestAnimationFrame(() => {
      ctx = init();
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [scrollContainerRef]);

  // Refresh ScrollTrigger when layout shifts
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="my-work"
      data-section
      className="relative w-full h-[100dvh] lg:h-[650vh]"
      style={{
        background: "var(--color-bg)",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Ambient background grid/glow */}

        {/* ════════════════════════════════════════════
            MOBILE LAYOUT (< lg) — Balanced 38/62 split:
            Top 38% = Hero Header & Stats
            Bottom 62% = Spacious Horizontal Card Strip
        ════════════════════════════════════════════ */}
        <div className="lg:hidden flex flex-col h-full" style={{ paddingTop: "var(--topbar-height)" }}>

          {/* ── TOP SECTION: Hero text & Stats (38% height) ─── */}
          <div className="h-[38%] min-h-[200px] flex flex-col justify-between px-6 py-4 relative overflow-hidden" style={{ borderBottom: "1px solid rgb(var(--atlas-line) / 0.06)" }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 90% 70% at 20% 30%, rgba(199,169,102,0.12) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              {/* Kicker */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-gold)", boxShadow: "0 0 8px var(--color-gold)" }} />
                <p className="text-[10px] font-bold tracking-[0.28em] uppercase" style={{ color: "var(--color-gold)" }}>
                  04 / Engineering
                </p>
              </div>

              {/* Heading */}
              <h2
                className="font-black leading-[0.95] mb-2.5 text-[var(--color-text)]"
                style={{ fontSize: "clamp(2.4rem, 11vw, 3.6rem)" }}
              >
                <span style={{ color: "var(--color-gold)" }}>My </span>
                <span>Work</span>
              </h2>

              {/* Subtitle */}
              <p className="text-xs leading-relaxed max-w-[320px]" style={{ color: "var(--color-text-muted)" }}>
                Production-grade applications built from zero — AI intelligence, fintech simulators, and data platforms.
              </p>
            </div>

            {/* Stats row with glass chips */}
            <div className="grid grid-cols-3 gap-2 relative z-10 pt-2">
              {[
                { value: "5+", label: "Projects" },
                { value: "2+", label: "Years Exp." },
                { value: "1.2K+", label: "Active Users" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="px-3 py-2 rounded-xl flex flex-col justify-center"
                  style={{
                    background: "var(--glass-bg)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <p className="text-base font-black text-[var(--color-text)] leading-none">{s.value}</p>
                  <p className="text-[8.5px] font-medium tracking-wide mt-1 text-ellipsis overflow-hidden whitespace-nowrap" style={{ color: "var(--color-gold)" }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── BOTTOM SECTION: Spacious Card Strip (62% height) ─── */}
          <div className="flex-1 relative overflow-hidden flex flex-col">
            {/* Header controls bar */}
            <div className="flex items-center justify-between px-5 pt-3 pb-1 relative z-20 shrink-0">
              {/* Progress dots */}
              <div ref={mobileDotRef} className="flex items-center gap-1.5">
                {projectsData.map((_, i) => (
                  <button
                    key={i}
                    data-dot
                    aria-label={`Project ${i + 1}`}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: i === 0 ? "var(--color-gold)" : "rgb(var(--atlas-line) / 0.25)",
                      opacity: i === 0 ? 1 : 0.3,
                      transform: i === 0 ? "scale(1.35)" : "scale(1)",
                    }}
                    onClick={() => {
                      if (mobileTrackRef.current) {
                        const maxScroll = mobileTrackRef.current.scrollWidth - mobileTrackRef.current.clientWidth;
                        const targetLeft = (i / (projectsData.length - 1)) * maxScroll;
                        mobileTrackRef.current.scrollTo({ left: targetLeft, behavior: "smooth" });
                      }
                    }}
                  />
                ))}
              </div>

              {/* Swipe hint */}
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full" style={{ background: "rgba(199,169,102,0.08)", border: "1px solid rgba(199,169,102,0.2)" }}>
                <span className="text-[8px] font-semibold tracking-widest uppercase" style={{ color: "#C7A966" }}>Swipe</span>
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="#C7A966" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Track wrapper */}
            <div className="flex-1 relative overflow-hidden">
              <div
                ref={mobileTrackRef}
                className="w-full h-full flex items-stretch py-2 overflow-x-auto snap-x snap-mandatory touch-pan-x"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
                onScroll={(e) => {
                  const el = e.currentTarget;
                  const maxScroll = el.scrollWidth - el.clientWidth;
                  if (maxScroll > 0) {
                    const progress = el.scrollLeft / maxScroll;
                    const activeIndex = Math.round(progress * (projectsData.length - 1));
                    const dots = mobileDotRef.current?.querySelectorAll<HTMLElement>("[data-dot]");
                    if (dots) {
                      dots.forEach((dot, i) => {
                        const isActive = i === activeIndex;
                        dot.style.opacity = isActive ? "1" : "0.3";
                        dot.style.transform = isActive ? "scale(1.35)" : "scale(1)";
                        dot.style.backgroundColor = isActive ? "var(--color-gold)" : "rgb(var(--atlas-line) / 0.25)";
                      });
                    }
                  }
                }}
              >
                <div className="flex-shrink-0 w-3" />
                {projectsData.map((project, idx) => {
                  return (
                    <div
                      key={project.id}
                      className="relative flex-shrink-0 flex flex-col h-full rounded-2xl mx-1.5 snap-center"
                      style={{
                        width: "82vw",
                        maxWidth: 340,
                        padding: "1rem 1.15rem",
                        background: "var(--glass-bg)",
                        border: "1px solid var(--glass-border)",
                        boxShadow: "var(--shadow-card)",
                      }}
                    >
                      {/* Ambient accent glow */}
                      <div className="absolute inset-0 pointer-events-none rounded-2xl overflow-hidden" style={{ background: `radial-gradient(ellipse 80% 50% at 50% 0%, rgba(${project.accentRgb},0.08) 0%, transparent 70%)` }} />

                      {/* Header: Number + Role + Company */}
                      <div className="flex items-start gap-3 mb-2.5 relative z-10">
                        <span className="font-black leading-none select-none shrink-0" style={{ fontSize: "2.2rem", color: `rgb(var(--atlas-line) / 0.12)`, lineHeight: 1 }}>
                          {project.number}
                        </span>
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-sm font-bold text-[var(--color-text)] leading-tight truncate">{project.role}</p>
                          <p className="text-[10px] font-medium mt-0.5 truncate" style={{ color: `rgb(${project.accentRgb})` }}>{project.company}</p>
                          <p className="text-[9px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>{project.period}</p>
                        </div>
                      </div>

                      {/* Accent divider line */}
                      <div className="mb-2.5 h-px relative" style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.4), transparent)` }} />

                      {/* Description */}
                      <p className="text-[10.5px] leading-relaxed mb-3 line-clamp-2 relative z-10" style={{ color: "var(--color-text-muted)" }}>
                        {project.description}
                      </p>

                      {/* Tech stack tags */}
                      <div className="mb-3 relative z-10">
                        <p className="text-[8px] font-bold tracking-[0.2em] uppercase mb-1" style={{ color: "var(--color-gold)" }}>Stack</p>
                        <div className="flex flex-wrap gap-1">
                          {project.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[9px] px-2 py-0.5 rounded-md"
                              style={{
                                background: "var(--glass-bg)",
                                border: "1px solid var(--glass-border)",
                                color: "var(--color-text)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons (Mobile) */}
                      <div className="flex items-center gap-2 mb-3 relative z-10">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
                        >
                          <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                          <Github className="w-3 h-3 relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300" />
                          <span className="text-[9px] font-bold tracking-wider uppercase relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300">GitHub</span>
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
                          style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
                        >
                          <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                          <ExternalLink className="w-3 h-3 relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300" />
                          <span className="text-[9px] font-bold tracking-wider uppercase relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300">Live</span>
                        </a>
                      </div>

                      {/* Visual card box */}
                      <div
                        className="flex-1 min-h-[90px] rounded-xl overflow-hidden relative flex items-center justify-center"
                        style={{
                          background: "var(--color-bg-card)",
                          border: `1px solid rgba(${project.accentRgb}, 0.22)`,
                          boxShadow: `inset 0 0 30px rgba(${project.accentRgb}, 0.06)`,
                        }}
                      >
                        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, rgba(${project.accentRgb}, 0.2) 0%, transparent 70%)`, filter: "blur(14px)" }} />
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center relative z-10" style={{ background: `rgba(${project.accentRgb}, 0.12)`, border: `1px solid rgba(${project.accentRgb}, 0.3)`, boxShadow: `0 0 25px rgba(${project.accentRgb}, 0.25)` }}>
                          <project.Icon style={{ width: 22, height: 22, color: project.dotColor }} />
                        </div>
                        {project.status === "active" && (
                          <div className="absolute bottom-2 right-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded-md" style={{ background: "rgba(0,0,0,0.6)", border: `0.5px solid rgba(${project.accentRgb}, 0.3)` }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.dotColor, boxShadow: `0 0 6px ${project.dotColor}` }} />
                            <span className="text-[8px] font-bold tracking-wider uppercase" style={{ color: project.dotColor }}>Active</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                {/* Mobile End Card */}
                <div
                  className="relative flex-shrink-0 flex flex-col items-center justify-center h-full rounded-2xl mx-1.5 snap-center text-center p-5"
                  style={{
                    width: "82vw",
                    maxWidth: 340,
                    background: "rgba(199,169,102,0.04)",
                    border: "1px dashed rgba(199,169,102,0.3)",
                  }}
                >
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(199,169,102,0.1)", border: "1px solid rgba(199,169,102,0.3)" }}>
                    <div className="w-6 h-6 rounded-full" style={{ background: "#C7A966", boxShadow: "0 0 15px #C7A966" }} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Want to see more?</h3>
                  <p className="text-xs mb-4 max-w-[200px]" style={{ color: "var(--color-text-muted)" }}>Explore all projects, source code, and live demos.</p>
                  <a
                    href="/projects"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold"
                    style={{ background: "#C7A966", color: "#000" }}
                  >
                    See All Works →
                  </a>
                </div>

                <div className="flex-shrink-0 w-3" />
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            DESKTOP LAYOUT (>= lg) — Full horizontal scroll
            100% untouched from original
        ════════════════════════════════════════════ */}
        <div className="hidden lg:block absolute inset-0">
          {/* ── Top bar ─────────────────────────────────── */}
          <div
            className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between px-16"
            style={{ paddingTop: "calc(var(--topbar-height) + 1.8rem)", paddingBottom: "0" }}
          >
            {/* Title */}
            <div>
              <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2" style={{ color: "var(--color-gold)" }}>
                04 / Engineering
              </p>
              <h2
                className="font-black leading-none text-[var(--color-text)]"
                style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)" }}
              >
                <span style={{ color: "var(--color-gold)" }}>My </span>
                <span>Work</span>
              </h2>
            </div>

            {/* Progress dots */}
            <div ref={activeDotRef} className="flex items-center gap-2 pb-1">
              {projectsData.map((_, i) => (
                <button
                  key={i}
                  data-dot
                  aria-label={`Project ${i + 1}`}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    background: i === 0 ? "var(--color-gold)" : "rgb(var(--atlas-line) / 0.25)",
                    opacity: i === 0 ? 1 : 0.3,
                    transform: i === 0 ? "scale(1.35)" : "scale(1)",
                  }}
                  onClick={() => {
                    const container = scrollContainerRef.current;
                    const sectionEl = sectionRef.current;
                    if (!container || !sectionEl) return;
                    const sectionStart = sectionEl.offsetTop;
                    const scrollRange = sectionEl.offsetHeight - window.innerHeight;
                    const targetScrollPos = sectionStart + (i / (projectsData.length - 1)) * scrollRange;
                    container.scrollTo({ top: targetScrollPos, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </div>

          {/* ── Horizontal card track ───────────────────── */}
          <div
            ref={trackRef}
            className="absolute inset-0 flex items-stretch"
            style={{
              paddingTop: "calc(var(--topbar-height) + 8rem)",
              overflowX: "visible",
              willChange: "transform",
            }}
          >
            {/* Spacer */}
            <div className="flex-shrink-0 w-16" />

            {projectsData.map((project, idx) => {
              const isLast = idx === projectsData.length - 1;
              return (
                <div
                  key={project.id}
                  className="relative flex-shrink-0 h-full flex flex-col"
                  style={{
                    width: "clamp(360px, 38vw, 480px)",
                    padding: "2rem 2.5rem 5rem",
                    borderRight: isLast ? "none" : "1px solid rgb(var(--atlas-line) / 0.1)",
                  }}
                >
                  {/* Ambient accent glow */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse 80% 60% at 30% 20%, rgba(${project.accentRgb},0.055) 0%, transparent 65%)` }}
                  />

                  {/* Row 1: Number + Project name */}
                  <div className="relative flex items-start justify-between mb-6">
                    <span className="font-black leading-none select-none" style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)", color: "rgb(var(--atlas-line) / 0.12)", lineHeight: 1 }}>
                      {project.number}
                    </span>
                    <div className="text-right mt-1">
                      <p className="text-base lg:text-lg font-bold text-[var(--color-text)] leading-snug">{project.role}</p>
                      <p className="text-[11px] font-medium mt-0.5" style={{ color: `rgb(${project.accentRgb})` }}>{project.company}</p>
                      <p className="text-[10px] mt-0.5" style={{ color: "var(--color-text-muted)" }}>{project.period}</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="mb-5 h-px" style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.5), transparent)` }} />

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <p className="text-[9px] font-bold tracking-[0.22em] uppercase mb-2" style={{ color: "var(--color-gold)" }}>Tech Stack</p>
                    <p className="text-[12px] leading-relaxed" style={{ color: "var(--color-text-muted)" }}>{project.stack.join(", ")}</p>
                  </div>

                  {/* Description */}
                  <p className="text-[12px] leading-relaxed mb-6 flex-grow-0" style={{ color: "var(--color-text-muted)" }}>{project.description}</p>

                  {/* Action Buttons (Desktop) */}
                  <div className="flex items-center gap-3 mb-6">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
                    >
                      <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[var(--ease-atlas)]" />
                      <Github className="w-4 h-4 relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300" />
                      <span className="text-[10px] font-bold tracking-wider uppercase relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300">GitHub</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center gap-2 px-4 py-2 rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      style={{ background: "var(--glass-bg)", border: "1px solid var(--glass-border)" }}
                    >
                      <div className="absolute inset-0 bg-[var(--color-gold)] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-[var(--ease-atlas)]" />
                      <ExternalLink className="w-4 h-4 relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300" />
                      <span className="text-[10px] font-bold tracking-wider uppercase relative z-10 text-[var(--color-text)] group-hover:text-black transition-colors duration-300">Live</span>
                    </a>
                  </div>

                  {/* Visual card */}
                  <div
                    className="flex-1 min-h-[160px] rounded-2xl overflow-hidden relative"
                    style={{ background: "var(--color-bg-card)", border: `1px solid rgba(${project.accentRgb}, 0.22)`, boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 40%, rgba(${project.accentRgb}, 0.22) 0%, transparent 60%)`, filter: "blur(20px)" }} />
                    <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.6), transparent 60%)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ background: `rgba(${project.accentRgb}, 0.1)`, border: `1px solid rgba(${project.accentRgb}, 0.25)`, boxShadow: `0 0 40px rgba(${project.accentRgb}, 0.2)` }}>
                        <project.Icon style={{ width: 28, height: 28, color: project.dotColor }} />
                      </div>
                    </div>
                    {project.status === "active" && (
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.dotColor, boxShadow: `0 0 6px ${project.dotColor}` }} />
                        <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: project.dotColor }}>Active</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* ── End card: "Want to see more?" ─────────── */}
            <div
              className="relative flex-shrink-0 h-full flex flex-col items-center justify-center"
              style={{ width: "clamp(320px, 35vw, 440px)", padding: "2rem 3rem", borderLeft: "1px solid rgb(var(--atlas-line) / 0.1)" }}
            >
              <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(199,169,102,0.07) 0%, transparent 70%)" }} />
              <div className="relative z-10 text-center flex flex-col items-center gap-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2" style={{ border: "1px solid rgba(199,169,102,0.3)", background: "rgba(199,169,102,0.06)", boxShadow: "0 0 40px rgba(199,169,102,0.12)" }}>
                  <div className="w-8 h-8 rounded-full" style={{ background: "radial-gradient(circle, rgba(199,169,102,0.6) 0%, rgba(199,169,102,0.15) 70%)", boxShadow: "0 0 20px rgba(199,169,102,0.4)" }} />
                </div>
                <div>
                  <h3 className="text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-3 leading-tight">Want to see more?</h3>
                  <p className="text-sm leading-relaxed max-w-[240px] mx-auto" style={{ color: "var(--color-text-muted)" }}>Explore all my projects and creations</p>
                </div>
                <a
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
                  style={{ background: "linear-gradient(135deg, rgba(199,169,102,0.2) 0%, rgba(199,169,102,0.08) 100%)", border: "1px solid rgba(199,169,102,0.4)", color: "#C7A966", boxShadow: "0 0 20px rgba(199,169,102,0.1)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(199,169,102,1)"; (e.currentTarget as HTMLAnchorElement).style.color = "#000"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(199,169,102,0.2) 0%, rgba(199,169,102,0.08) 100%)"; (e.currentTarget as HTMLAnchorElement).style.color = "#C7A966"; }}
                >
                  See All Works
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </a>
              </div>
            </div>

            {/* Trailing spacer */}
            <div className="flex-shrink-0 w-16" />
          </div>
        </div>

        {/* ── Scroll hint (desktop only) ─────────────────────────────── */}
        <div
          className="hidden lg:flex absolute bottom-5 left-0 right-0 items-center justify-center gap-2 pointer-events-none"
          style={{ color: "var(--color-text-muted)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 animate-pulse">
            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] font-semibold tracking-widest uppercase">Scroll to explore</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 animate-pulse">
            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}

