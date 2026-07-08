"use client";

import { useRef, useEffect, RefObject } from "react";
import { BrainCircuit, LineChart, Activity, ShieldAlert, Camera } from "lucide-react";
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
  },
  {
    id: "fintech-edu",
    number: "02",
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
  },
  {
    id: "stress2health",
    number: "03",
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
  },
  {
    id: "emergency-response",
    number: "04",
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
  },
  {
    id: "notsography",
    number: "05",
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
  },
];

type Props = {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
};

export function XP_MyWorkScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Defer until after parent XP_ArrivalScene has set containerRef
    const init = () => {
      const scroller = scrollContainerRef.current || document.querySelector<HTMLElement>(".snap-y-container");
      if (!scroller) return;

      const ctx = gsap.context(() => {
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
                  dot.style.backgroundColor = isActive ? "rgb(199,169,102)" : "rgba(255,255,255,0.25)";
                });
              }
            },
          },
        });

        tl.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
        });
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
      className="relative w-full"
      style={{
        height: "650vh",
        background: "#060607",
        scrollSnapAlign: "start",
        scrollSnapStop: "always",
      }}
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        {/* Ambient background grid/glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(14,14,15,1) 0%, rgba(5,5,5,1) 100%)" }} />

        {/* ── Top bar ─────────────────────────────────── */}
        <div
          className="absolute top-0 left-0 right-0 z-20 flex items-end justify-between px-10 lg:px-16"
          style={{ paddingTop: "calc(var(--topbar-height) + 1.8rem)", paddingBottom: "0" }}
        >
          {/* Title */}
          <div>
            <p
              className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2"
              style={{ color: "rgba(199,169,102,0.55)" }}
            >
              04 / Engineering
            </p>
            <h2
              className="font-black leading-none"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                background: "linear-gradient(135deg, #C7A966 0%, rgba(247,247,244,0.9) 55%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              My Work
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
                  background: i === 0 ? "rgb(199,169,102)" : "rgba(255,255,255,0.25)",
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
          {/* Spacer to push first project card slightly right */}
          <div className="flex-shrink-0 w-8 lg:w-16" />

          {projectsData.map((project, idx) => {
            const isLast = idx === projectsData.length - 1;
            return (
              <div
                key={project.id}
                className="relative flex-shrink-0 h-full flex flex-col"
                style={{
                  width: "clamp(360px, 38vw, 480px)",
                  padding: "2rem 2.5rem 5rem",
                  borderRight: isLast ? "none" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Ambient accent glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 30% 20%, rgba(${project.accentRgb},0.055) 0%, transparent 65%)`,
                  }}
                />

                {/* Row 1: Number + Project name */}
                <div className="relative flex items-start justify-between mb-6">
                  <span
                    className="font-black leading-none select-none"
                    style={{
                      fontSize: "clamp(3.5rem, 8vw, 6rem)",
                      color: "rgba(255,255,255,0.12)",
                      lineHeight: 1,
                    }}
                  >
                    {project.number}
                  </span>
                  <div className="text-right mt-1">
                    <p className="text-base lg:text-lg font-bold text-white leading-snug">
                      {project.role}
                    </p>
                    <p
                      className="text-[11px] font-medium mt-0.5"
                      style={{ color: `rgb(${project.accentRgb})` }}
                    >
                      {project.company}
                    </p>
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>
                      {project.period}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div
                  className="mb-5 h-px"
                  style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.5), transparent)` }}
                />

                {/* Tech Stack label + list */}
                <div className="mb-4">
                  <p
                    className="text-[9px] font-bold tracking-[0.22em] uppercase mb-2"
                    style={{ color: "rgba(199,169,102,0.5)" }}
                  >
                    Tech Stack
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(224,224,218,0.4)" }}>
                    {project.stack.join(", ")}
                  </p>
                </div>

                {/* Description */}
                <p
                  className="text-[12px] leading-relaxed mb-6 flex-grow-0"
                  style={{ color: "rgba(224,224,218,0.55)" }}
                >
                  {project.description}
                </p>

                {/* Visual card — grows to fill remaining space */}
                <div
                  className="flex-1 min-h-[160px] rounded-2xl overflow-hidden relative"
                  style={{
                    background: "#0a0a0b",
                    border: `1px solid rgba(${project.accentRgb}, 0.14)`,
                    boxShadow: `inset 0 0 60px rgba(${project.accentRgb}, 0.05)`,
                  }}
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, rgba(${project.accentRgb}, 0.22) 0%, transparent 60%)`,
                      filter: "blur(20px)",
                    }}
                  />
                  {/* Top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px]"
                    style={{ background: `linear-gradient(90deg, rgba(${project.accentRgb},0.6), transparent 60%)` }}
                  />
                  {/* Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center"
                      style={{
                        background: `rgba(${project.accentRgb}, 0.1)`,
                        border: `1px solid rgba(${project.accentRgb}, 0.25)`,
                        boxShadow: `0 0 40px rgba(${project.accentRgb}, 0.2)`,
                      }}
                    >
                      <project.Icon style={{ width: 28, height: 28, color: project.dotColor }} />
                    </div>
                  </div>
                  {/* Status badge */}
                  {project.status === "active" && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: project.dotColor, boxShadow: `0 0 6px ${project.dotColor}` }}
                      />
                      <span
                        className="text-[9px] font-bold tracking-widest uppercase"
                        style={{ color: project.dotColor }}
                      >
                        Active
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}


          {/* ── End card: "Want to see more?" ─────────── */}
          <div
            className="relative flex-shrink-0 h-full flex flex-col items-center justify-center"
            style={{
              width: "clamp(320px, 35vw, 440px)",
              padding: "2rem 3rem",
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(199,169,102,0.07) 0%, transparent 70%)",
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center flex flex-col items-center gap-6">
              {/* Decorative ring */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
                style={{
                  border: "1px solid rgba(199,169,102,0.3)",
                  background: "rgba(199,169,102,0.06)",
                  boxShadow: "0 0 40px rgba(199,169,102,0.12)",
                }}
              >
                <div
                  className="w-8 h-8 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(199,169,102,0.6) 0%, rgba(199,169,102,0.15) 70%)",
                    boxShadow: "0 0 20px rgba(199,169,102,0.4)",
                  }}
                />
              </div>

              <div>
                <h3
                  className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight"
                >
                  Want to see more?
                </h3>
                <p
                  className="text-sm leading-relaxed max-w-[240px] mx-auto"
                  style={{ color: "rgba(224,224,218,0.5)" }}
                >
                  Explore all my projects and creations
                </p>
              </div>

              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(199,169,102,0.2) 0%, rgba(199,169,102,0.08) 100%)",
                  border: "1px solid rgba(199,169,102,0.4)",
                  color: "#C7A966",
                  boxShadow: "0 0 20px rgba(199,169,102,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(199,169,102,1)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#000";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(199,169,102,0.4)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "linear-gradient(135deg, rgba(199,169,102,0.2) 0%, rgba(199,169,102,0.08) 100%)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#C7A966";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(199,169,102,0.1)";
                }}
              >
                See All Works
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>

          {/* Trailing spacer */}
          <div className="flex-shrink-0 w-8 lg:w-16" />
        </div>

        {/* ── Scroll hint ─────────────────────────────── */}
        <div
          className="absolute bottom-5 left-0 right-0 flex items-center justify-center gap-2 pointer-events-none"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 animate-pulse">
            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] font-semibold tracking-widest uppercase">
            Scroll to explore
          </span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="opacity-60 animate-pulse">
            <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
