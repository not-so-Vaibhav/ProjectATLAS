"use client";

import Image from "next/image";
import { useRef, useEffect, RefObject } from "react";
import { gsap } from "gsap";

interface Props {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export function XP_PhotographyScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const hasPlayed  = useRef(false);

  /* ── Play animation once section enters the snap viewport ── */
  useEffect(() => {
    const section  = sectionRef.current;
    const scroller = scrollContainerRef.current;
    if (!section || !scroller) return;

    /* Initial states — set immediately so nothing flickers */
    gsap.set(section.querySelectorAll(".phx-shutter-l"), { scaleX: 1, transformOrigin: "left center" });
    gsap.set(section.querySelectorAll(".phx-shutter-r"), { scaleX: 1, transformOrigin: "right center" });
    gsap.set(section.querySelectorAll(".phx-bg"),        { scale: 1.1, opacity: 0 });
    gsap.set(section.querySelectorAll(".phx-kicker"),    { opacity: 0, y: 18 });
    gsap.set(section.querySelectorAll(".phx-word"),      { opacity: 0, y: 56, rotateX: -12 });
    gsap.set(section.querySelectorAll(".phx-divider"),   { scaleX: 0, transformOrigin: "left center" });
    gsap.set(section.querySelectorAll(".phx-sub"),       { opacity: 0, y: 20 });
    gsap.set(section.querySelectorAll(".phx-btn"),       { opacity: 0, y: 18 });
    gsap.set(section.querySelectorAll(".phx-url"),       { opacity: 0 });
    gsap.set(section.querySelectorAll(".phx-frame"),     { opacity: 0, scale: 0.75 });
    gsap.set(section.querySelectorAll(".phx-aperture"),  { opacity: 0, rotate: -90, scale: 0.5 });
    gsap.set(section.querySelectorAll(".phx-vtxt"),      { opacity: 0, x: -10 });

    /* ── Entrance animation tied strictly to scroll progress ── */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        scroller: scroller,
        start: "top bottom", // Starts when top of section hits bottom of screen
        end: "top top",      // Finishes when top of section snaps to top of screen
        scrub: 2.5,          // Increased from 1: very smooth, lazy catch-up smoothing
      },
      defaults: { ease: "none" } // Let the scrub handle the easing
    });

    /* 1 — BG + shutter open */
    tl.to(section.querySelectorAll(".phx-bg"),       { scale: 1, opacity: 1, duration: 1.5 }, 0)
      .to(section.querySelectorAll(".phx-shutter-l"),{ scaleX: 0, duration: 1.2 }, 0)
      .to(section.querySelectorAll(".phx-shutter-r"),{ scaleX: 0, duration: 1.2 }, 0)

    /* 2 — Frames + vertical text */
      .to(section.querySelectorAll(".phx-frame"),    { opacity: 1, scale: 1, duration: 0.5 }, 0.5)
      .to(section.querySelectorAll(".phx-vtxt"),     { opacity: 1, x: 0, duration: 0.6 }, 0.5)

    /* 3 — Aperture icon spins in */
      .to(section.querySelectorAll(".phx-aperture"), { opacity: 1, rotate: 0, scale: 1, duration: 0.7 }, 0.6)

    /* 4 — Kicker */
      .to(section.querySelectorAll(".phx-kicker"),   { opacity: 1, y: 0, duration: 0.4 }, 0.8)

    /* 5 — Headline words */
      .to(section.querySelectorAll(".phx-word"),     { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.1 }, 0.9)

    /* 6 — Divider draws */
      .to(section.querySelectorAll(".phx-divider"),  { scaleX: 1, duration: 0.5 }, 1.1)

    /* 7 — Subtitle */
      .to(section.querySelectorAll(".phx-sub"),      { opacity: 1, y: 0, duration: 0.5 }, 1.2)

    /* 8 — Button + URL */
      .to(section.querySelectorAll(".phx-btn"),      { opacity: 1, y: 0, duration: 0.5 }, 1.3)
      .to(section.querySelectorAll(".phx-url"),      { opacity: 1, duration: 0.4 }, 1.4);

    /* Continuous aperture spin (independent of scroll) */
    gsap.to(section.querySelectorAll(".phx-aperture"), {
      rotate: 360,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tl.kill();
    };
  }, [scrollContainerRef]);

  const words = ["Photography", "lives", "here."];

  return (
    <section
      id="photography"
      data-section
      ref={sectionRef}
      className="snap-slide relative w-full overflow-hidden"
      aria-label="Photography Room"
      style={{ minHeight: "100vh" }}
    >
      {/* BG image */}
      <div className="phx-bg absolute inset-0 will-change-transform">
        <Image
          src="/NotSoGraphyBGLight.png"
          alt="Photography room background light"
          fill
          className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none dark:hidden block"
          sizes="100vw"
        />
        <Image
          src="/NotSoGraphyBGDark.png"
          alt="Photography room background dark"
          fill
          className="object-cover object-[70%_center] sm:object-center pointer-events-none select-none hidden dark:block"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none sm:hidden"
        style={{ background: "rgb(var(--atlas-black) / 0.78)" }} />
      <div className="hidden sm:block absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(110deg, rgb(var(--atlas-black) / 0.96) 0%, rgb(var(--atlas-black) / 0.75) 45%, rgb(var(--atlas-black) / 0.18) 100%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgb(var(--atlas-black) / 0.95) 0%, transparent 40%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgb(var(--atlas-black) / 0.75) 0%, transparent 30%)" }} />

      {/* Gold light leak */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 45% 65% at 73% 50%, rgb(var(--atlas-gold) / 0.12) 0%, transparent 65%)" }} />

      {/* Shutter panels */}
      <div className="phx-shutter-l absolute inset-y-0 left-0 w-1/2 z-[10] pointer-events-none"
        style={{ background: "var(--color-bg)" }} />
      <div className="phx-shutter-r absolute inset-y-0 right-0 w-1/2 z-[10] pointer-events-none"
        style={{ background: "var(--color-bg)" }} />

      {/* Frame corners */}
      <div className="phx-frame absolute top-16 sm:top-[88px] left-4 sm:left-8 z-[5] pointer-events-none"
        style={{ width: 36, height: 36, borderTop: "1.5px solid rgb(var(--atlas-gold) / 0.5)", borderLeft: "1.5px solid rgb(var(--atlas-gold) / 0.5)" }} />
      <div className="phx-frame absolute bottom-14 sm:bottom-16 right-4 sm:right-8 z-[5] pointer-events-none"
        style={{ width: 36, height: 36, borderBottom: "1.5px solid rgb(var(--atlas-gold) / 0.5)", borderRight: "1.5px solid rgb(var(--atlas-gold) / 0.5)" }} />

      {/* Vertical side text */}
      <div className="phx-vtxt absolute right-8 top-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ writingMode: "vertical-rl" }}>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "var(--color-gold)" }}>Not-So-Graphy</span>
        <div className="w-[1px] h-14" style={{ background: "rgb(var(--atlas-gold) / 0.3)" }} />
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "var(--color-gold)" }}>Photography</span>
      </div>

      {/* Main content */}
      <div className="relative z-[6] w-full h-full min-h-screen flex flex-col justify-center items-start px-5 sm:px-12 md:px-16 xl:px-24 pb-16 pt-24">

        {/* Aperture + kicker row */}
        <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-7">
          <svg className="phx-aperture w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0"
            viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ color: "var(--color-gold)" }}>
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line key={angle} x1="32" y1="22" x2="32" y2="6"
                stroke="currentColor" strokeWidth="1.5" opacity="0.55"
                transform={`rotate(${angle} 32 32)`} />
            ))}
          </svg>
          <p className="phx-kicker text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase"
            style={{ color: "var(--color-gold)" }}>05 / Photography</p>
        </div>

        {/* Headline */}
        <div className="mb-5 sm:mb-6" style={{ perspective: "800px" }}>
          <h2 className="font-black tracking-tight leading-[0.96] text-[var(--color-text)]"
            style={{ fontSize: "clamp(2.4rem, 8vw, 6.5rem)" }}>
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-[0.22em]">
                <span className="phx-word inline-block"
                  style={word === "here." ? { color: "var(--color-gold)" } : {}}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Gold divider */}
        <div className="phx-divider mb-5 sm:mb-7 h-[2px] rounded-full"
          style={{ width: 72, background: "linear-gradient(to right, var(--color-gold), rgb(var(--atlas-gold) / 0.2))" }} />

        {/* Subtitle */}
        <p className="phx-sub text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xs"
          style={{ color: "var(--color-text-muted)" }}>
          Every frame, story, and observation from the Builder&apos;s lens.
        </p>

        {/* CTA */}
        <div className="phx-btn w-full sm:w-auto">
          <a href="https://not-so-graphy.onrender.com/" target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] w-full sm:w-auto"
            style={{ background: "var(--color-gold)", color: "var(--color-bg)" }}>
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: "linear-gradient(90deg, transparent, rgb(var(--atlas-line) / 0.3), transparent)" }} />
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span className="relative">Visit Not-So-Graphy</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <p className="phx-url mt-3 sm:mt-4 text-[10px] tracking-widest uppercase font-semibold"
          style={{ color: "var(--color-gold)" }}>not-so-graphy.onrender.com</p>
      </div>

      {/* Film strip footer */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] h-12 pointer-events-none flex items-center"
        style={{ background: "rgb(var(--atlas-black) / 0.9)", borderTop: "1px solid var(--color-border)" }}>
        <div className="w-full flex items-center px-4 sm:px-8 md:px-16 justify-between">
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase"
            style={{ color: "var(--color-text-muted)" }}>Atlas — Photography</span>
          <div className="hidden md:flex items-center gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-6 h-4 rounded-[2px]"
                style={{ background: i % 2 === 0 ? "rgb(var(--atlas-gold) / 0.25)" : "rgb(var(--atlas-gold) / 0.12)", border: "0.5px solid rgb(var(--atlas-gold) / 0.25)" }} />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase"
            style={{ color: "var(--color-text-muted)" }}>Not-So-Graphy</span>
        </div>
      </div>
    </section>
  );
}
