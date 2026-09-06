"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function PhotographyPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pageRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      /* Initial states */
      gsap.set(".pg-glow",    { opacity: 0, scale: 0.6 });
      gsap.set(".pg-kicker",  { opacity: 0, y: 20, letterSpacing: "0.5em" });
      gsap.set(".pg-line1",   { opacity: 0, y: 48, skewY: 3 });
      gsap.set(".pg-line2",   { opacity: 0, y: 48, skewY: 3 });
      gsap.set(".pg-divider", { scaleX: 0, transformOrigin: "center center" });
      gsap.set(".pg-sub",     { opacity: 0, y: 24 });
      gsap.set(".pg-btn",     { opacity: 0, y: 24, scale: 0.95 });
      gsap.set(".pg-url",     { opacity: 0 });
      gsap.set(".pg-ring1",   { opacity: 0, scale: 0.3, rotate: -120 });
      gsap.set(".pg-ring2",   { opacity: 0, scale: 0.3, rotate: -60 });
      gsap.set(".pg-ring3",   { opacity: 0, scale: 0.3, rotate: -30 });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl
        /* Rings expand from center */
        .to(".pg-ring1",   { opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "power2.out" }, 0)
        .to(".pg-ring2",   { opacity: 1, scale: 1, rotate: 0, duration: 1.6, ease: "power2.out" }, 0.1)
        .to(".pg-ring3",   { opacity: 1, scale: 1, rotate: 0, duration: 1.8, ease: "power2.out" }, 0.2)

        /* Gold glow blooms */
        .to(".pg-glow",    { opacity: 1, scale: 1, duration: 1.6, ease: "power2.out" }, 0.1)

        /* Kicker */
        .to(".pg-kicker",  { opacity: 1, y: 0, letterSpacing: "0.28em", duration: 0.8 }, 0.55)

        /* Headline lines */
        .to(".pg-line1",   { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: "power4.out" }, 0.75)
        .to(".pg-line2",   { opacity: 1, y: 0, skewY: 0, duration: 0.85, ease: "power4.out" }, 0.88)

        /* Divider draws in */
        .to(".pg-divider", { scaleX: 1, duration: 0.7, ease: "power3.out" }, 1.05)

        /* Subtitle */
        .to(".pg-sub",     { opacity: 1, y: 0, duration: 0.65 }, 1.18)

        /* Button bounces in */
        .to(".pg-btn",     { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "back.out(1.5)" }, 1.32)

        /* URL */
        .to(".pg-url",     { opacity: 1, duration: 0.5 }, 1.52);

      /* Slow continuous ring rotation */
      gsap.to(".pg-ring2", { rotate: 360, duration: 40, ease: "none", repeat: -1, delay: 1.2 });
      gsap.to(".pg-ring3", { rotate: -360, duration: 55, ease: "none", repeat: -1, delay: 1.5 });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden"
      style={{ background: "var(--color-bg)" }}
      id="main-content"
    >

      {/* ── Decorative concentric rings ───────────────────── */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {/* Outer ring */}
        <div
          className="pg-ring1 absolute rounded-full"
          style={{
            width: "min(680px, 90vw)",
            height: "min(680px, 90vw)",
            border: "1px solid rgb(var(--atlas-gold) / 0.07)",
          }}
        />
        {/* Mid ring */}
        <div
          className="pg-ring2 absolute rounded-full"
          style={{
            width: "min(460px, 70vw)",
            height: "min(460px, 70vw)",
            border: "1px solid rgb(var(--atlas-gold) / 0.11)",
          }}
        />
        {/* Inner ring */}
        <div
          className="pg-ring3 absolute rounded-full"
          style={{
            width: "min(280px, 50vw)",
            height: "min(280px, 50vw)",
            border: "1px solid rgb(var(--atlas-gold) / 0.16)",
          }}
        />
      </div>

      {/* ── Radial gold glow ──────────────────────────────── */}
      <div
        className="pg-glow pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 50%, rgb(var(--atlas-gold) / 0.09) 0%, rgb(var(--atlas-gold) / 0.03) 45%, transparent 72%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Kicker */}
        <p
          className="pg-kicker mb-7 text-[10px] font-bold uppercase"
          style={{ color: "var(--color-gold)", letterSpacing: "0.28em" }}
        >
          Not-So-Graphy
        </p>

        {/* Headline — two lines */}
        <div className="overflow-hidden mb-1" style={{ perspective: "600px" }}>
          <h1
            className="pg-line1 font-black tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--color-text)" }}
          >
            Photography
          </h1>
        </div>
        <div className="overflow-hidden mb-7" style={{ perspective: "600px" }}>
          <h1
            className="pg-line2 font-black tracking-tight leading-[0.95]"
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              color: "var(--color-gold)",
            }}
          >
            lives here.
          </h1>
        </div>

        {/* Gold divider */}
        <div
          className="pg-divider mb-7 h-[2px] rounded-full"
          style={{
            width: 56,
            background: "linear-gradient(to right, rgb(var(--atlas-gold) / 0.3), var(--color-gold), rgb(var(--atlas-gold) / 0.3))",
          }}
        />

        {/* Subtitle */}
        <p
          className="pg-sub text-sm md:text-base leading-relaxed max-w-xs mb-10"
          style={{ color: "var(--color-text-muted)" }}
        >
          Every frame, story, and observation from the Builder&apos;s lens.
          Explore the full photography world at Not-So-Graphy.
        </p>

        {/* CTA Button */}
        <div className="pg-btn">
          <a
            href="https://not-so-graphy.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-8 py-4 text-sm font-bold tracking-wide transition-all duration-300 hover:scale-[1.04] active:scale-[0.98]"
            style={{
              border: "1.5px solid rgb(var(--atlas-gold) / 0.55)",
              color: "var(--color-gold)",
              background: "rgb(var(--atlas-gold) / 0.06)",
              boxShadow: "0 0 40px rgb(var(--atlas-gold) / 0.08)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "var(--color-gold)";
              el.style.color = "var(--color-bg)";
              el.style.boxShadow = "0 0 56px rgb(var(--atlas-gold) / 0.28)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgb(var(--atlas-gold) / 0.06)";
              el.style.color = "var(--color-gold)";
              el.style.boxShadow = "0 0 40px rgb(var(--atlas-gold) / 0.08)";
            }}
          >
            {/* Shimmer sweep */}
            <span
              className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              style={{ background: "linear-gradient(90deg, transparent, rgb(var(--atlas-line) / 0.22), transparent)" }}
            />
            {/* Camera icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
              <circle cx="12" cy="13" r="3" />
            </svg>
            <span className="relative">Visit Not-So-Graphy</span>
            {/* Arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="relative w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* URL hint */}
        <p
          className="pg-url mt-5 text-[10px] tracking-widest uppercase font-mono font-medium"
          style={{ color: "var(--color-gold)" }}
        >
          not-so-graphy.onrender.com
        </p>
      </div>
    </div>
  );
}
