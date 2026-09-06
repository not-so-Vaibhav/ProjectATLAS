"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Mouse, ArrowRight, ChevronDown } from "lucide-react";
import { identityChapters } from "@/data/identity-chapters";
import { XP_AboutSection } from "@/components/experience/XP_AboutSection";
import { XP_ExperienceScrollSection } from "@/components/experience/XP_ExperienceScrollSection";
import { XP_MyWorkScrollSection } from "@/components/experience/XP_MyWorkScrollSection";
import { XP_SkillsScrollSection } from "@/components/experience/XP_SkillsScrollSection";
import { XP_PhotographyScrollSection } from "@/components/experience/XP_PhotographyScrollSection";
import { XP_JournalScrollSection } from "@/components/experience/XP_JournalScrollSection";
import { XP_LabScrollSection } from "@/components/experience/XP_LabScrollSection";
import { XP_ContactScrollSection } from "@/components/experience/XP_ContactScrollSection";
import { XP_CinematicBackground } from "@/components/experience/XP_CinematicBackground";


/* ─────────────────────────────────────────────────────────
    status: "completed",
  },
];


/* ─────────────────────────────────────────────────────────
   Room backgrounds (non-arrival slides)
───────────────────────────────────────────────────────── */
const roomImages: Record<string, string> = {
  arrival:     "/Arrival.png",
  engineering: "/Engineering.png",
  founder:     "/Founder.png",
  designer:    "/Designer.png",
  ai:          "/AI Lab.png",
  photography: "/Photography.png",
  journal:     "/photography_mist.png",
  lab:         "/photography_street.png",
  future:      "/room_workshop.png",
  contact:     "/room_mission.png",
};

const roomMascots: Record<string, string> = {
  engineering: "/mascot.png",
  founder:     "/mascot.png",
  designer:    "/mascot.png",
  ai:          "/mascot.png",
  photography: "/mascot.png",
  journal:     "/mascot.png",
  lab:         "/mascot.png",
  future:      "/mascot.png",
  contact:     "/mascot.png",
};

/* ─────────────────────────────────────────────────────────
   Arrival scene config
───────────────────────────────────────────────────────── */

/* Motion — aligned with tokens.css */
const MOTION = {
  ease:          "power4.out" as const,
  gazeDuration:  0.62,  // --duration-room
  minDwell:      160,   // ms between gaze switches
  zoneStability: 200,   // ms cursor must dwell before zone switch
  parallaxX:     30,
  parallaxY:     18,
  parallaxLerp:  0.1,
  scrollDuration: 620,
} as const;

const GAZE_LAYER_SCALE = "scale(0.91)";

function atlasEase(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function smoothScrollContainer(container: HTMLElement, targetTop: number, duration = MOTION.scrollDuration) {
  const start = container.scrollTop;
  const distance = targetTop - start;
  if (Math.abs(distance) < 2) return;

  let startTime: number | null = null;
  const step = (timestamp: number) => {
    if (startTime === null) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    container.scrollTop = start + distance * atlasEase(progress);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

/* ─────────────────────────────────────────────────────────
   Component
───────────────────────────────────────────────────────── */
export function XP_ArrivalScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLElement>(null);
  
  const reducedMotion   = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* ── Entrance animations (content + hotspots) ── */
  useGSAP(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {

      if (reducedMotion.current) {
        gsap.set([".hero-kicker", ".hero-title", ".hero-body p", ".hero-scroll"], {
          opacity: 1, y: 0, scale: 1,
        });
        return;
      }

      gsap.set(".hero-kicker",     { opacity: 0, y: 20 });
      gsap.set(".hero-title",      { opacity: 0, y: 40 });
      gsap.set(".hero-body p",     { opacity: 0, y: 20 });
      gsap.set(".hero-scroll",     { opacity: 0, y: 16 });

      gsap.timeline({ defaults: { ease: MOTION.ease } })
        .to(".hero-kicker",     { opacity: 1, y: 0, duration: 0.7, delay: 0.4 })
        .to(".hero-title",      { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(".hero-body p",     { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.5")
        .to(".hero-scroll",     { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

      gsap.to(".hero-mouse-icon", { y: 5, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });
    }, heroRef);
    return () => ctx.revert();
  }, { scope: heroRef });



  /* ── Active section tracking (supports tall About section) ── */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateActiveSection = () => {
      const marker = container.scrollTop + container.clientHeight * 0.38;
      const sections = container.querySelectorAll<HTMLElement>("[data-section]");
      let activeId = "arrival";

      sections.forEach((section) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (marker >= top && marker < bottom) activeId = section.id;
      });

      const hash = activeId === "arrival" ? "" : `#${activeId}`;
      if (hash !== window.location.hash)
        window.history.replaceState(null, "", window.location.pathname + hash);
      window.dispatchEvent(new CustomEvent("active-section-change", { detail: activeId }));
    };

    container.addEventListener("scroll", updateActiveSection, { passive: true });
    updateActiveSection();
    return () => container.removeEventListener("scroll", updateActiveSection);
  }, []);

  const scrollToSection = (id: string) => {
    const container = containerRef.current;
    const section = document.getElementById(id);
    if (!container || !section) return;
    smoothScrollContainer(container, section.offsetTop);
  };

  /* ── Hash-scroll on mount ──────────────────────────── */
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el && containerRef.current) {
        setTimeout(() => {
          containerRef.current!.scrollTop = el.offsetTop;
        }, 150);
      }
    }
    const onScrollTo = (e: Event) => scrollToSection((e as CustomEvent).detail);
    window.addEventListener("scroll-to-section", onScrollTo);
    return () => window.removeEventListener("scroll-to-section", onScrollTo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToNext = (id: string) => scrollToSection(id);

  /* ── Visible chapters ──────────────────────────────── */
  const NAV_IDS = ["arrival", "founder", "engineering", "my-work", "skills", "photography", "journal", "contact"];
  /* Map chapter id → DOM section id (allows renaming hash without touching data layer) */
  const CHAPTER_TO_SECTION: Record<string, string> = { founder: "about", skills: "skills", designer: "skills" };
  const visibleChapters = NAV_IDS
    .map((id) => identityChapters.find((c) => c.id === id))
    .filter(Boolean) as typeof identityChapters;

  /* ─────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────── */
  return (
    <div ref={containerRef} className="snap-y-container bg-[var(--color-bg)]">
      {visibleChapters.map((chapter, index) => {
        const isArrival    = chapter.id === "arrival";
        const isAbout      = chapter.id === "founder";
        const isExperience = chapter.id === "engineering";
        const isMyWork     = chapter.id === "my-work";
        const isSkills     = chapter.id === "skills" || chapter.id === "designer";
        const isPhotography   = chapter.id === "photography";
        const isJournal       = chapter.id === "journal";
        const isContact       = chapter.id === "contact";

        if (isAbout) {
          return <XP_AboutSection key="about" scrollContainerRef={containerRef} />;
        }

        if (isExperience) {
          return <XP_ExperienceScrollSection key="experience" scrollContainerRef={containerRef} />;
        }

        if (isMyWork) {
          return <XP_MyWorkScrollSection key="my-work" scrollContainerRef={containerRef} />;
        }

        if (isSkills) {
          return <XP_SkillsScrollSection key="skills" scrollContainerRef={containerRef} />;
        }

        if (isPhotography) {
          return <XP_PhotographyScrollSection key="photography" scrollContainerRef={containerRef} />;
        }

        if (isJournal) {
          return <XP_JournalScrollSection key="journal" scrollContainerRef={containerRef} />;
        }

        if (isContact) {
          return <XP_ContactScrollSection key="contact" scrollContainerRef={containerRef} />;
        }

        const bgImage     = roomImages[chapter.id] || "/room_workshop.png";
        const mascotImage = roomMascots[chapter.id];
        const nextId      = visibleChapters[index + 1]?.id;

        return (
          <section
            key={chapter.id}
            id={chapter.id}
            data-section
            ref={isArrival ? heroRef : undefined}
            className="snap-slide relative w-full flex items-center justify-center overflow-hidden"
            aria-label={`${chapter.label} Room`}
          >
            {/* ── Arrival: Cinematic Background ── */}
            {isArrival ? (
              <XP_CinematicBackground />
            ) : (
              <Image
                src={bgImage}
                alt={`${chapter.label} room background`}
                fill
                priority={index < 2}
                className="object-cover object-center pointer-events-none select-none"
                sizes="100vw"
              />
            )}

            {/* ── Vignette ─────────────────────────────────── */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-black/20 z-[1] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/50 z-[1] pointer-events-none" />



            {/* ── Main content ─────────────────────────────── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 pt-16 lg:pt-0">
              <div className="max-w-xl text-left">
                <p
                  className={`${isArrival ? "hero-kicker" : ""} text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase mb-4`}
                  style={{ color: "var(--color-gold)" }}
                >
                  {isArrival ? "Arrival" : `${String(index).padStart(2, "0")} / ${chapter.label}`}
                </p>

                <h2 className={`${isArrival ? "hero-title" : ""} text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 md:mb-6`}>
                  {isArrival ? (
                    <>I&apos;m Vaibhav.<br />I build. I capture. I explore<span style={{ color: "var(--color-gold)" }}>.</span></>
                  ) : chapter.headline}
                </h2>

                <div className={`${isArrival ? "hero-body" : ""} mb-6 md:mb-8`}>
                  {isArrival ? (
                    <div className="space-y-3">
                      <p className="text-base md:text-lg text-white/80">Computer science student, photographer, designer, and builder — documenting the things I create and the things I discover along the way.</p>
                    </div>
                  ) : (
                    <p className="text-base md:text-lg text-white/80 leading-relaxed">{chapter.summary}</p>
                  )}
                </div>

                {!isArrival && (
                  <div className="hidden md:flex flex-col gap-1.5 mb-6 border-l border-white/10 pl-4 py-1 text-xs text-white/50">
                    <p><strong className="text-atlas-gold font-mono uppercase tracking-wider text-[9px] mr-2">Question:</strong>{chapter.question}</p>
                    <p><strong className="text-atlas-gold font-mono uppercase tracking-wider text-[9px] mr-2">Atmosphere:</strong>{chapter.atmosphere}</p>
                    <p><strong className="text-atlas-gold font-mono uppercase tracking-wider text-[9px] mr-2">Mascot:</strong>{chapter.builderBehavior}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3">
                  {isArrival ? (
                    <button
                      onClick={() => nextId && scrollToNext(nextId)}
                      className="hero-scroll inline-flex items-center gap-3 px-5 py-3 rounded-lg text-sm font-semibold transition hover:opacity-90 text-black"
                      style={{ background: "var(--color-gold)" }}
                    >
                      <Mouse className="hero-mouse-icon w-4 h-4" />
                      <span>Scroll to begin</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href={chapter.path}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold hover:scale-[1.02] hover:opacity-95 transition text-black"
                        style={{ background: "var(--color-gold)" }}
                      >
                        Enter Room <ArrowRight className="w-4 h-4" />
                      </Link>
                      {nextId && (
                        <button
                          onClick={() => scrollToNext(nextId)}
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg text-sm font-medium border border-white/20 text-white/70 hover:border-white/40 hover:text-white transition"
                        >
                          Next Room <ChevronDown className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>

              {mascotImage && (
                <div className="hidden lg:block relative w-[280px] h-[280px] xl:w-[320px] xl:h-[320px] flex-shrink-0 animate-float-gentle select-none pointer-events-none">
                  <Image src={mascotImage} alt={`${chapter.label} mascot`} fill
                    className="object-contain object-bottom" sizes="(max-width: 1200px) 280px, 320px" />
                </div>
              )}
            </div>

            {/* Footer — last slide */}
            {index === visibleChapters.length - 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-20 bg-black/30 border-t border-white/5 py-4 px-6 md:px-12 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.18em] uppercase text-atlas-gold font-bold">ATLAS</span>
                <p className="text-[11px] text-white/40">© 2025 Vaibhav Bariyar</p>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
