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
import { XP_ContactScrollSection } from "@/components/experience/XP_ContactScrollSection";

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
   Gaze layers — ordered array, index 0 = default (front)
───────────────────────────────────────────────────────── */
type GazeId = "front" | "laptop" | "camera" | "lamp" | "mug" | "notebook";

const GAZE_LAYERS: { id: GazeId; src: string; alt: string }[] = [
  { id: "front",    src: "/vaibhav_front.png",    alt: "Vaibhav looking at you"       }, // 0 — default
  { id: "laptop",   src: "/vaibhav_laptop.png",   alt: "Vaibhav looking at laptop"    }, // 1
  { id: "camera",   src: "/vaibhav_camera.png",   alt: "Vaibhav looking at camera"    }, // 2
  { id: "lamp",     src: "/vaibhav_lamp.png",     alt: "Vaibhav looking up at lamp"   }, // 3
  { id: "mug",      src: "/vaibhav_mug.png",      alt: "Vaibhav looking at mug"       }, // 4
  { id: "notebook", src: "/vaibhav_notebook.png", alt: "Vaibhav looking at notebook"  }, // 5
];

/*
 * Zone → layer index map.
 * Screen split: 3 columns (left/centre/right) × 2 rows (top/bottom)
 *
 *  ┌──────────┬──────────┬──────────┐
 *  │ lamp (3) │front (0) │camera(2) │  y < 42 %
 *  ├──────────┼──────────┼──────────┤
 *  │laptop(1) │notebook  │ mug (4)  │  y ≥ 42 %
 *  └──────────┴──────────┴──────────┘
 *   x < 32 %  32–68 %    x > 68 %
 */
const ZONE_GRID: number[][] = [
  [3, 0, 2], // top row
  [1, 5, 4], // bottom row
];

function zoneIndex(xPct: number, yPct: number): number {
  const col = xPct < 0.32 ? 0 : xPct < 0.68 ? 1 : 2;
  const row = yPct < 0.42 ? 0 : 1;
  return ZONE_GRID[row][col];
}

/* ─────────────────────────────────────────────────────────
   Arrival hotspots
───────────────────────────────────────────────────────── */
const ARRIVAL_HOTSPOTS = [
  { id: "laptop",   label: "Experience",       sublabel: "Build · Ship · Iterate", href: "/experience", gazeIdx: 1, x: "20%", y: "73%" },
  { id: "notebook", label: "Builder's Journal",sublabel: "Thoughts & Lessons",    href: "/journal",      gazeIdx: 5, x: "44%", y: "72%" },
  { id: "camera",   label: "Photography",      sublabel: "See the world",          href: "/photography",  gazeIdx: 2, x: "79%", y: "73%" },
] as const;

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
  const arrivalBgRef = useRef<HTMLDivElement>(null);

  // DOM refs for each gaze layer — direct style writes, zero React re-renders
  const gazeEls = useRef<(HTMLDivElement | null)[]>(GAZE_LAYERS.map(() => null));

  // Animation state — all in refs, never triggers re-renders
  const activeIdx       = useRef(0);               // currently fully-visible layer
  const isTransitioning = useRef(false);           // guard: one crossfade at a time
  const lastSwitchAt    = useRef(0);               // timestamp of last completed switch
  const pendingIdx      = useRef(-1);              // zone candidate waiting on stability timer
  const stabilityTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinnedIdx       = useRef<number | null>(null); // hotspot override
  const parallax        = useRef({ tx: 0, ty: 0, cx: 0, cy: 0 });
  const reducedMotion   = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  /* ── Cross-fade: show `toIdx`, hide current ─────────── */
  const crossFadeTo = (toIdx: number) => {
    if (reducedMotion.current) return;
    if (toIdx === activeIdx.current) return;
    if (isTransitioning.current) return;

    if (Date.now() - lastSwitchAt.current < MOTION.minDwell) return;

    const fromEl = gazeEls.current[activeIdx.current];
    const toEl   = gazeEls.current[toIdx];
    if (!fromEl || !toEl) return;

    isTransitioning.current = true;

    gsap.to(toEl, {
      opacity: 1,
      duration: MOTION.gazeDuration,
      ease: MOTION.ease,
      overwrite: "auto",
    });
    gsap.to(fromEl, {
      opacity: 0,
      duration: MOTION.gazeDuration,
      ease: MOTION.ease,
      overwrite: "auto",
      onComplete: () => {
        activeIdx.current       = toIdx;
        isTransitioning.current = false;
        lastSwitchAt.current    = Date.now();
      },
    });
  };

  /* ── Preload gaze layers ─────────────────────────────── */
  useEffect(() => {
    GAZE_LAYERS.forEach(({ src }) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  /* ── Master rAF loop — parallax + gaze zones ─────────── */
  useEffect(() => {
    const wrapper = arrivalBgRef.current;
    if (!wrapper) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      const xPct = e.clientX / window.innerWidth;
      const yPct = e.clientY / window.innerHeight;

      if (!reducedMotion.current) {
        parallax.current.tx = (xPct - 0.5) * MOTION.parallaxX;
        parallax.current.ty = (yPct - 0.5) * MOTION.parallaxY;
      }

      if (reducedMotion.current || pinnedIdx.current !== null) return;

      const newZone = zoneIndex(xPct, yPct);
      if (newZone !== pendingIdx.current && newZone !== activeIdx.current) {
        pendingIdx.current = newZone;
        if (stabilityTimer.current) clearTimeout(stabilityTimer.current);
        stabilityTimer.current = setTimeout(() => {
          crossFadeTo(newZone);
          pendingIdx.current = -1;
        }, MOTION.zoneStability);
      }
    };

    const tick = () => {
      if (!reducedMotion.current) {
        const p = parallax.current;
        p.cx += (p.tx - p.cx) * MOTION.parallaxLerp;
        p.cy += (p.ty - p.cy) * MOTION.parallaxLerp;
        wrapper.style.transform = `scale(1.09) translate3d(${p.cx}px, ${p.cy}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      if (stabilityTimer.current) clearTimeout(stabilityTimer.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Entrance animations (content + hotspots, NOT gaze layers) ── */
  useGSAP(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gazeEls.current.forEach((el, i) => {
        if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
      });

      if (reducedMotion.current) {
        gsap.set([".hero-kicker", ".hero-title", ".hero-body p", ".hero-scroll", ".arrival-hotspot"], {
          opacity: 1, y: 0, scale: 1,
        });
        return;
      }

      gsap.set(".hero-kicker",     { opacity: 0, y: 20 });
      gsap.set(".hero-title",      { opacity: 0, y: 40 });
      gsap.set(".hero-body p",     { opacity: 0, y: 20 });
      gsap.set(".hero-scroll",     { opacity: 0, y: 16 });
      gsap.set(".arrival-hotspot", { opacity: 0, scale: 0.85 });
      gsap.set(".hotspot-ring",    { scale: 1, opacity: 0.7 });

      gsap.timeline({ defaults: { ease: MOTION.ease } })
        .to(".hero-kicker",     { opacity: 1, y: 0, duration: 0.7, delay: 0.4 })
        .to(".hero-title",      { opacity: 1, y: 0, duration: 0.9 }, "-=0.4")
        .to(".hero-body p",     { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, "-=0.5")
        .to(".hero-scroll",     { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(".arrival-hotspot", {
          opacity: 1, scale: 1, duration: 0.4, stagger: 0.14,
        }, "-=0.1");

      gsap.to(".hero-mouse-icon", { y: 5, duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true });

      gsap.to(".hotspot-ring", {
        scale: 2, opacity: 0, duration: 2.2, ease: MOTION.ease,
        repeat: -1, stagger: { each: 0.65, from: "start", repeat: -1 },
      });
    }, heroRef);
    return () => ctx.revert();
  }, { scope: heroRef });

  /* ── Hotspot hover — pin + force crossfade ─────────── */
  const onHotspotEnter = (spot: typeof ARRIVAL_HOTSPOTS[number]) => {
    if (stabilityTimer.current) clearTimeout(stabilityTimer.current);
    pinnedIdx.current = spot.gazeIdx;
    crossFadeTo(spot.gazeIdx);

    gsap.to(`#hs-${spot.id}`,     { scale: 1.12, duration: 0.16, ease: MOTION.ease });
    gsap.to(`#hs-tip-${spot.id}`, { opacity: 1, y: 0, duration: 0.16, ease: MOTION.ease });
    gsap.to(`#hs-dot-${spot.id}`, { scale: 1.25, boxShadow: "0 0 24px 8px rgba(199,169,102,0.85)", duration: 0.16 });
  };

  const onHotspotLeave = (spot: typeof ARRIVAL_HOTSPOTS[number]) => {
    pinnedIdx.current = null;
    pendingIdx.current = -1;

    gsap.to(`#hs-${spot.id}`,     { scale: 1, duration: 0.28, ease: MOTION.ease });
    gsap.to(`#hs-tip-${spot.id}`, { opacity: 0, y: 6, duration: 0.16, ease: "power2.in" });
    gsap.to(`#hs-dot-${spot.id}`, { scale: 1, boxShadow: "0 0 12px 2px rgba(199,169,102,0.5)", duration: 0.28 });
  };

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
  const NAV_IDS = ["arrival", "founder", "engineering", "my-work", "designer", "photography", "journal", "lab", "contact"];
  /* Map chapter id → DOM section id (allows renaming hash without touching data layer) */
  const CHAPTER_TO_SECTION: Record<string, string> = { founder: "about" };
  const visibleChapters = NAV_IDS
    .map((id) => identityChapters.find((c) => c.id === id))
    .filter(Boolean) as typeof identityChapters;

  /* ─────────────────────────────────────────────────────
     Render
  ───────────────────────────────────────────────────── */
  return (
    <div ref={containerRef} className="snap-y-container bg-[#080808]">
      {visibleChapters.map((chapter, index) => {
        const isArrival    = chapter.id === "arrival";
        const isAbout      = chapter.id === "founder";
        const isExperience = chapter.id === "engineering";
        const isMyWork     = chapter.id === "my-work";
        const isDesigner     = chapter.id === "designer";
        const isPhotography   = chapter.id === "photography";
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

        if (isDesigner) {
          return <XP_SkillsScrollSection key="designer" scrollContainerRef={containerRef} />;
        }

        if (isPhotography) {
          return <XP_PhotographyScrollSection key="photography" scrollContainerRef={containerRef} />;
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
            {/* ── Arrival: single-active gaze layer system ── */}
            {isArrival ? (
              <div
                ref={arrivalBgRef}
                className="absolute inset-0 pointer-events-none select-none"
                style={{ willChange: "transform", transform: "scale(1.09)" }}
              >
                {/*
                 * Only ONE layer is at opacity 1 at a time.
                 * crossFadeTo() fades old → 0 and new → 1 simultaneously.
                 * All others stay at 0 and are invisible.
                 */}
                {GAZE_LAYERS.map(({ id, src, alt }, i) => (
                  <div
                    key={id}
                    ref={(el) => { gazeEls.current[i] = el; }}
                    className="absolute inset-0"
                    style={{
                      opacity:    i === 0 ? 1 : 0,
                      willChange: "opacity",
                      transform:  GAZE_LAYER_SCALE,
                    }}
                  >
                    <Image
                      src={src}
                      alt={alt}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 z-[1] pointer-events-none" />

            {/* ── Hotspots ─────────────────────────────────── */}
            {isArrival && (
              <div className="absolute inset-0 z-[5] pointer-events-none">
                {ARRIVAL_HOTSPOTS.map((spot) => (
                  <Link
                    key={spot.id}
                    id={`hs-${spot.id}`}
                    href={spot.href}
                    aria-label={`Open ${spot.label}`}
                    className="arrival-hotspot absolute pointer-events-auto flex flex-col items-center cursor-pointer"
                    style={{ left: spot.x, top: spot.y, transform: "translate(-50%, -50%)" }}
                    onMouseEnter={() => onHotspotEnter(spot)}
                    onMouseLeave={() => onHotspotLeave(spot)}
                  >
                    <span className="hotspot-ring absolute w-9 h-9 rounded-full border border-atlas-gold/70"
                          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                    <span className="hotspot-ring absolute w-9 h-9 rounded-full border border-atlas-gold/40"
                          style={{ top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                    <span
                      id={`hs-dot-${spot.id}`}
                      className="relative z-10 w-4 h-4 rounded-full bg-atlas-gold border-2 border-white/70"
                      style={{ boxShadow: "0 0 12px 2px rgba(199,169,102,0.5)" }}
                    />
                    <span
                      id={`hs-tip-${spot.id}`}
                      className="absolute top-full mt-3 flex flex-col items-center pointer-events-none"
                      style={{ opacity: 0, transform: "translateY(6px)" }}
                    >
                      <span className="text-[11px] font-semibold tracking-wide text-white bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 whitespace-nowrap">
                        {spot.label}
                      </span>
                      <span className="mt-0.5 text-[9px] text-white/45 whitespace-nowrap">
                        {spot.sublabel}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {/* ── Main content ─────────────────────────────── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 xl:px-20 flex flex-col lg:flex-row items-center justify-between gap-10 pt-16 lg:pt-0">
              <div className="max-w-xl text-left">
                <p
                  className={`${isArrival ? "hero-kicker" : ""} text-[10px] md:text-[11px] font-bold tracking-[0.22em] uppercase mb-4`}
                  style={{ color: "rgb(199,169,102)" }}
                >
                  {isArrival ? "Arrival" : `${String(index).padStart(2, "0")} / ${chapter.label}`}
                </p>

                <h2 className={`${isArrival ? "hero-title" : ""} text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.08] tracking-tight mb-5 md:mb-6`}>
                  {isArrival ? (
                    <>Welcome to<br />Atlas<span style={{ color: "rgb(199,169,102)" }}>.</span></>
                  ) : chapter.headline}
                </h2>

                <div className={`${isArrival ? "hero-body" : ""} mb-6 md:mb-8`}>
                  {isArrival ? (
                    <div className="space-y-1">
                      <p className="text-base md:text-lg text-white/80">This is where the journey begins.</p>
                      <p className="text-base md:text-lg text-white/80">Take a seat. Look around.</p>
                      <p className="text-base md:text-lg text-white/80">Explore different parts of who I am.</p>
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
                      style={{ background: "rgb(199,169,102)" }}
                    >
                      <Mouse className="hero-mouse-icon w-4 h-4" />
                      <span>Scroll to begin</span>
                    </button>
                  ) : (
                    <>
                      <Link
                        href={chapter.path}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold hover:scale-[1.02] hover:opacity-95 transition text-black"
                        style={{ background: "rgb(199,169,102)" }}
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
