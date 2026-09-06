"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { BuilderIdentity } from "@/types/atlas";

gsap.registerPlugin(ScrollTrigger);

type AboutPanel = {
  id: BuilderIdentity;
  darkImage: string;
  lightImage: string;
  imageClass: string;
  corner: "tl" | "tr" | "bl" | "br";
  revealAt: number;
};

const ABOUT_PANELS: AboutPanel[] = [
  {
    id: "engineering",
    darkImage: "/About/EngineerDark.png",
    lightImage: "/About/EngineerLight.png",
    imageClass: "about-img-engineering",
    corner: "tl",
    revealAt: 0.2,
  },
  {
    id: "founder",
    darkImage: "/About/FounderDark.png",
    lightImage: "/About/FounderLight.png",
    imageClass: "about-img-founder",
    corner: "tr",
    revealAt: 0.35,
  },
  {
    id: "designer",
    darkImage: "/About/DesignerDark.png",
    lightImage: "/About/DesignerLight.png",
    imageClass: "about-img-designer",
    corner: "bl",
    revealAt: 0.5,
  },
  {
    id: "photography",
    darkImage: "/About/PhotographerDark.png",
    lightImage: "/About/PhotographerLight.png",
    imageClass: "about-img-photography",
    corner: "br",
    revealAt: 0.65,
  },
];

const CORNER_FROM: Record<AboutPanel["corner"], { x: string; y: string }> = {
  tl: { x: "-115%", y: "-115%" },
  tr: { x: "115%", y: "-115%" },
  bl: { x: "-115%", y: "115%" },
  br: { x: "115%", y: "115%" },
};

type XP_AboutSectionProps = {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

export function XP_AboutSection({ scrollContainerRef }: XP_AboutSectionProps) {
  const sectionRef    = useRef<HTMLElement>(null);
  const aboutTitleRef = useRef<HTMLDivElement>(null);
  const panelRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section   = sectionRef.current;
    const container = scrollContainerRef.current;
    if (!section || !container) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      gsap.set(aboutTitleRef.current, { opacity: 0 });
      panelRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, x: 0, y: 0 }));
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(aboutTitleRef.current, { opacity: 0, scale: 0.9 });
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const from = CORNER_FROM[ABOUT_PANELS[i].corner];
        gsap.set(el, { x: from.x, y: from.y, opacity: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          scroller: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
        },
      });

      tl.to(aboutTitleRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.14,
        ease: "power4.out",
      }, 0);

      tl.to(aboutTitleRef.current, {
        opacity: 0.35,
        scale: 0.88,
        duration: 0.1,
        ease: "power2.inOut",
      }, 0.16);

      ABOUT_PANELS.forEach((panel, i) => {
        const el = panelRefs.current[i];
        if (!el) return;
        tl.to(el, {
          x: "0%",
          y: "0%",
          opacity: 1,
          duration: 0.15,
          ease: "power4.out",
        }, panel.revealAt);
      });

      tl.to(aboutTitleRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.1,
        ease: "power2.in",
      }, 0.78);
    }, section);

    return () => ctx.revert();
  }, [scrollContainerRef]);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    window.addEventListener("resize", refresh);
    return () => window.removeEventListener("resize", refresh);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      data-section
      className="about-scroll-section"
      aria-label="About"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-[var(--color-bg)] flex flex-col">
        {/* Spacer for topbar so content area below is perfectly symmetrical */}
        <div style={{ height: "var(--topbar-height)" }} className="w-full flex-shrink-0" />

        {/* Content Area: Contains the 2×2 grid, central title, and crosshairs with responsive safe bounds */}
        <div className="relative flex-1 w-full min-h-0 px-2.5 pt-2 pb-14 sm:px-4 sm:pt-3 sm:pb-6 md:p-5 lg:p-6 flex items-center justify-center">
          {/* Center title — perfectly centered at the intersection of the 4 cards */}
          <div
            ref={aboutTitleRef}
            className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-[var(--color-text)] tracking-tight text-center px-4 select-none">
              About<span style={{ color: "var(--color-gold)" }}>.</span>
            </h2>
          </div>

          {/* 2×2 identity grid */}
          <div className="relative z-10 w-full h-full grid grid-cols-2 grid-rows-2 gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {ABOUT_PANELS.map((panel, i) => {
              const chapter = getIdentityChapter(panel.id);
              if (!chapter) return null;

              return (
                <div
                  key={panel.id}
                  ref={(el) => { panelRefs.current[i] = el; }}
                  className="about-panel relative overflow-hidden rounded-lg md:rounded-xl border border-[rgb(var(--atlas-line)_/_0.12)] will-change-transform group shadow-quiet"
                >
                  {/* Light Mode Image */}
                  <Image
                    src={panel.lightImage}
                    alt={`${chapter.label} room`}
                    fill
                    unoptimized
                    priority
                    loading="eager"
                    className={`object-cover ${panel.imageClass} dark:hidden block transition-transform duration-500 group-hover:scale-105`}
                    sizes="(max-width: 768px) 50vw, 45vw"
                  />
                  {/* Dark Mode Image */}
                  <Image
                    src={panel.darkImage}
                    alt={`${chapter.label} room`}
                    fill
                    unoptimized
                    priority
                    loading="eager"
                    className={`object-cover ${panel.imageClass} hidden dark:block transition-transform duration-500 group-hover:scale-105`}
                    sizes="(max-width: 768px) 50vw, 45vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/10 sm:from-black/90 sm:via-black/45 sm:to-transparent pointer-events-none" />

                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3.5 md:p-5 lg:p-6 z-10">
                    <p
                      className="text-[8px] sm:text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase mb-0.5 sm:mb-1 md:mb-1.5"
                      style={{ color: "var(--color-gold)" }}
                    >
                      {chapter.label}
                    </p>
                    <h3 className="text-[11px] leading-tight sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white mb-1 sm:mb-1.5 line-clamp-2">
                      {chapter.headline}
                    </h3>
                    <p className="hidden md:block text-xs md:text-sm text-white/75 leading-relaxed line-clamp-2 mb-2 md:mb-3">
                      {chapter.summary}
                    </p>
                    <Link
                      href={chapter.path}
                      className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] md:text-xs font-semibold text-atlas-gold hover:text-white transition-colors"
                    >
                      Enter Room <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtle crosshair exactly at the center of the 4 cards */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-20">
            <div className="absolute top-1/2 left-[5%] right-[5%] h-px bg-[rgb(var(--atlas-line)_/_0.3)] -translate-y-1/2" />
            <div className="absolute left-1/2 top-[5%] bottom-[5%] w-px bg-[rgb(var(--atlas-line)_/_0.3)] -translate-x-1/2" />
          </div>
        </div>
      </div>
    </section>
  );
}
