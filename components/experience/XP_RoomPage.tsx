"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { IdentityChapter } from "@/types/atlas";
import { identityChapters } from "@/data/identity-chapters";

gsap.registerPlugin(ScrollTrigger);

const roomImages: Record<string, string> = {
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
  engineering: "/mascot_engineer.png",
  founder:     "/mascot_founder.png",
  designer:    "/mascot_designer.png",
  ai:          "/mascot_ai.png",
  photography: "/mascot_photographer.png",
  journal:     "/mascot_founder.png",
  lab:         "/mascot_engineer.png",
  future:      "/mascot.png",
  contact:     "/mascot.png",
};

interface RoomPageProps {
  chapter: IdentityChapter;
  children?: React.ReactNode;
}

export function XP_RoomPage({ chapter, children }: RoomPageProps) {
  const nextChapter = identityChapters.find((c) => c.id === chapter.nextId);
  const heroRef = useRef<HTMLElement>(null);
  const zonesRef = useRef<HTMLElement>(null);
  const roomImage = roomImages[chapter.id];
  const mascotImage = roomMascots[chapter.id];

  /* Hero entrance — GSAP timeline */
  useGSAP(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([".rp-kicker", ".rp-title", ".rp-summary", ".rp-actions", ".rp-mascot"], {
        opacity: 0, y: 24,
      });
      gsap.set(".rp-mascot", { opacity: 0, scale: 0.93, y: 16 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".rp-kicker",   { opacity: 1, y: 0, duration: 0.6, delay: 0.2 })
        .to(".rp-title",    { opacity: 1, y: 0, duration: 0.75 }, "-=0.35")
        .to(".rp-summary",  { opacity: 1, y: 0, duration: 0.6  }, "-=0.45")
        .to(".rp-actions",  { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(".rp-mascot",   { opacity: 1, y: 0, scale: 1, duration: 0.7 }, "-=0.55");
    }, heroRef);

    return () => ctx.revert();
  }, { scope: heroRef });

  /* Zones ScrollTrigger */
  useGSAP(() => {
    if (!zonesRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".zone-card",
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          stagger: { amount: 0.4 },
          scrollTrigger: {
            trigger: ".zone-card",
            start: "top 88%",
          },
        }
      );
    }, zonesRef);

    return () => ctx.revert();
  }, { scope: zonesRef });

  return (
    <main id="main-content">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-end overflow-hidden"
        aria-label={`${chapter.label} hero`}
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        {roomImage && (
          <Image
            src={roomImage}
            alt={`${chapter.label} room environment`}
            fill
            className="object-cover object-center pointer-events-none select-none"
            priority
            sizes="100vw"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/75 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 to-transparent z-0" />

        <div className="relative z-10 w-full px-6 py-10 lg:px-12 lg:py-12 grid lg:grid-cols-[1fr_260px] gap-8 items-end">

          <div className="max-w-2xl">
            <p className="rp-kicker atlas-kicker mb-3">{chapter.label}</p>
            <h1 className="rp-title text-3xl md:text-4xl lg:text-5xl font-bold text-atlas-white leading-[1.08] tracking-tight">
              {chapter.headline}
            </h1>
            <p className="rp-summary mt-4 text-sm md:text-base text-atlas-ink/75 leading-relaxed max-w-xl">
              {chapter.summary}
            </p>
            <div className="rp-actions mt-6 flex flex-wrap gap-3">
              {nextChapter && (
                <Link
                  href={nextChapter.path}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                  style={{ background: "var(--color-gold)", color: "#080808" }}
                >
                  {nextChapter.label} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition hover:border-atlas-gold/40 hover:text-atlas-white"
                style={{ borderColor: "var(--color-border)", color: "var(--color-text-muted)" }}
              >
                Return to Arrival
              </Link>
            </div>
          </div>

          {mascotImage && (
            <div className="rp-mascot hidden lg:block relative w-full h-64 flex-shrink-0">
              <Image
                src={mascotImage}
                alt={`${chapter.label} mascot`}
                fill
                className="object-contain object-bottom pointer-events-none select-none"
                sizes="260px"
              />
            </div>
          )}
        </div>

        <div className="absolute top-4 left-6 z-10 flex items-center gap-1.5 text-[10px] text-atlas-muted font-mono tracking-wider">
          <Link href="/" className="hover:text-atlas-gold transition">Atlas</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-atlas-ink">{chapter.label}</span>
        </div>
      </section>

      {/* ── ENVIRONMENT INFO ─────────────────────────────── */}
      <section
        style={{ background: "var(--color-bg-raised)", borderBottom: "1px solid var(--color-border)" }}
        className="px-6 py-6 lg:px-10"
      >
        <div className="max-w-4xl">
          <p className="atlas-kicker mb-2">Environment</p>
          <p className="text-sm text-atlas-ink/65 leading-relaxed">{chapter.environment}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-[10px] px-2.5 py-1 rounded-full border font-medium text-atlas-gold border-atlas-gold/30 bg-atlas-gold/5">
              {chapter.atmosphere}
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full border font-medium text-atlas-muted" style={{ borderColor: "var(--color-border)" }}>
              {chapter.question}
            </span>
            <span className="text-[10px] px-2.5 py-1 rounded-full border font-medium text-atlas-muted" style={{ borderColor: "var(--color-border)" }}>
              Builder-led
            </span>
          </div>
        </div>
      </section>

      {/* ── CUSTOM CONTENT ───────────────────────────────── */}
      <div>{children}</div>

      {/* ── ZONES GRID ───────────────────────────────────── */}
      <section
        ref={zonesRef}
        className="px-6 py-10 lg:px-10"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        <p className="atlas-kicker mb-2">Story Zones</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">
          {chapter.label} is an identity, not a page.
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapter.zones.map((zone) => (
            <div key={zone.title} className="zone-card atlas-card p-5 opacity-0">
              <h3 className="text-sm font-semibold text-atlas-white">{zone.title}</h3>
              <p className="mt-2 text-xs text-atlas-ink/60 leading-relaxed">{zone.purpose}</p>
              <ul className="mt-3 space-y-1.5">
                {zone.details.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-atlas-muted">
                    <span className="w-1 h-1 rounded-full bg-atlas-gold/60 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEXT ROOM CTA ────────────────────────────────── */}
      <section
        className="px-6 py-8 lg:px-10"
        style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-bg-raised)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="atlas-kicker mb-1">Continue the journey</p>
            <p className="text-sm text-atlas-ink/65">Atlas remains one headquarters across every identity.</p>
          </div>
          {nextChapter && (
            <Link
              href={nextChapter.path}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition hover:opacity-90 flex-shrink-0"
              style={{ background: "var(--color-gold)", color: "#080808" }}
            >
              Enter {nextChapter.label} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-5">
          {identityChapters.filter(c => c.visibleInPrimaryNavigation).map((c) => (
            <Link
              key={c.id}
              href={c.path}
              className={`text-[10px] px-2.5 py-1 rounded-full border transition font-medium ${
                c.id === chapter.id
                  ? "border-atlas-gold/40 text-atlas-gold bg-atlas-gold/5"
                  : "text-atlas-muted hover:text-atlas-ink hover:border-atlas-line/25"
              }`}
              style={{ borderColor: c.id === chapter.id ? undefined : "var(--color-border)" }}
            >
              {c.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
