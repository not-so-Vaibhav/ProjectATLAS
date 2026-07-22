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

    return () => tl.kill();
  }, [scrollContainerRef]);

  const words = ["Photography", "lives", "here."];

  return (
    <section
      id="photography"
      data-section
      ref={sectionRef}
      className="snap-slide relative w-full overflow-hidden"
      aria-label="Photography Room"
      style={{ minHeight: "100vh", background: "#080808" }}
    >
      {/* BG image */}
      <div className="phx-bg absolute inset-0 will-change-transform">
        <Image
          src="/Photography.png"
          alt="Photography room background"
          fill
          className="object-cover object-center pointer-events-none select-none"
          sizes="100vw"
        />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(110deg, rgba(8,8,8,0.96) 0%, rgba(8,8,8,0.75) 45%, rgba(8,8,8,0.18) 100%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 40%)" }} />
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.75) 0%, transparent 30%)" }} />

      {/* Gold light leak */}
      <div className="absolute inset-0 z-[2] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 38% 65% at 73% 50%, rgba(199,169,102,0.1) 0%, transparent 65%)" }} />

      {/* Shutter panels */}
      <div className="phx-shutter-l absolute inset-y-0 left-0 w-1/2 z-[10] pointer-events-none"
        style={{ background: "#080808" }} />
      <div className="phx-shutter-r absolute inset-y-0 right-0 w-1/2 z-[10] pointer-events-none"
        style={{ background: "#080808" }} />

      {/* Frame corners */}
      <div className="phx-frame absolute top-[88px] left-8 z-[5] pointer-events-none"
        style={{ width: 48, height: 48, borderTop: "1.5px solid rgba(199,169,102,0.5)", borderLeft: "1.5px solid rgba(199,169,102,0.5)" }} />
      <div className="phx-frame absolute bottom-16 right-8 z-[5] pointer-events-none"
        style={{ width: 48, height: 48, borderBottom: "1.5px solid rgba(199,169,102,0.5)", borderRight: "1.5px solid rgba(199,169,102,0.5)" }} />

      {/* Vertical side text */}
      <div className="phx-vtxt absolute right-8 top-1/2 -translate-y-1/2 z-[5] pointer-events-none hidden lg:flex flex-col items-center gap-3"
        style={{ writingMode: "vertical-rl" }}>
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "rgba(199,169,102,0.38)" }}>Not-So-Graphy</span>
        <div className="w-[1px] h-14" style={{ background: "rgba(199,169,102,0.18)" }} />
        <span className="text-[9px] font-bold tracking-[0.3em] uppercase"
          style={{ color: "rgba(199,169,102,0.22)" }}>Photography</span>
      </div>

      {/* Main content */}
      <div className="relative z-[6] w-full h-full min-h-screen flex flex-col justify-center px-8 md:px-16 xl:px-24 pb-16 pt-28">

        {/* Aperture + kicker row */}
        <div className="flex items-center gap-4 mb-7">
          <svg className="phx-aperture w-7 h-7 flex-shrink-0"
            viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ color: "rgb(199,169,102)" }}>
            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
            <circle cx="32" cy="32" r="10" stroke="currentColor" strokeWidth="1.5" opacity="0.9" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <line key={angle} x1="32" y1="22" x2="32" y2="6"
                stroke="currentColor" strokeWidth="1.5" opacity="0.55"
                transform={`rotate(${angle} 32 32)`} />
            ))}
          </svg>
          <p className="phx-kicker text-[10px] font-bold tracking-[0.28em] uppercase"
            style={{ color: "rgb(199,169,102)" }}>06 / Photography</p>
        </div>

        {/* Headline */}
        <div className="mb-6" style={{ perspective: "800px" }}>
          <h2 className="font-black tracking-tight leading-[0.96] text-white"
            style={{ fontSize: "clamp(3rem, 7.5vw, 6.5rem)" }}>
            {words.map((word, i) => (
              <span key={i} className="inline-block mr-[0.22em]">
                <span className="phx-word inline-block"
                  style={word === "here." ? { color: "rgb(199,169,102)" } : {}}>
                  {word}
                </span>
              </span>
            ))}
          </h2>
        </div>

        {/* Gold divider */}
        <div className="phx-divider mb-7 h-[2px] rounded-full"
          style={{ width: 72, background: "linear-gradient(to right, rgb(199,169,102), rgba(199,169,102,0.2))" }} />

        {/* Subtitle */}
        <p className="phx-sub text-base md:text-lg leading-relaxed mb-8 max-w-xs"
          style={{ color: "rgba(224,224,218,0.58)" }}>
          Every frame, story, and observation from the Builder&apos;s lens.
        </p>

{/* CTA */}
        <div className="phx-btn">
          <a href="https://not-so-graphy.onrender.com/" target="_blank" rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{ background: "rgb(199,169,102)", color: "#080808" }}>
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
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

        <p className="phx-url mt-4 text-[10px] tracking-widest uppercase"
          style={{ color: "rgba(199,169,102,0.3)" }}>not-so-graphy.onrender.com</p>
      </div>

      {/* Film strip footer */}
      <div className="absolute bottom-0 left-0 right-0 z-[5] h-12 pointer-events-none flex items-center"
        style={{ background: "rgba(8,8,8,0.9)", borderTop: "1px solid rgba(199,169,102,0.08)" }}>
        <div className="w-full flex items-center px-8 md:px-16 justify-between">
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase"
            style={{ color: "rgba(199,169,102,0.35)" }}>Atlas — Photography</span>
          <div className="hidden md:flex items-center gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="w-6 h-4 rounded-[2px]"
                style={{ background: i % 2 === 0 ? "rgba(199,169,102,0.12)" : "rgba(199,169,102,0.06)", border: "0.5px solid rgba(199,169,102,0.12)" }} />
            ))}
          </div>
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase"
            style={{ color: "rgba(199,169,102,0.2)" }}>Not-So-Graphy</span>
        </div>
      </div>
    </section>
  );
}
