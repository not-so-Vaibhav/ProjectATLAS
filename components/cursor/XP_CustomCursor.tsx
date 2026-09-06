"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

type CursorType = "default" | "link" | "button" | "card" | "text" | "drag" | "loading" | "hidden";

export function XP_CustomCursor() {
  const pointerRef = useRef<HTMLDivElement>(null);
  const rippleRef  = useRef<HTMLDivElement>(null);

  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [badgeText, setBadgeText]   = useState<string>("");
  const [isVisible, setIsVisible]   = useState<boolean>(false);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const pointer = pointerRef.current;
    const ripple  = rippleRef.current;
    if (!pointer || !ripple) return;

    // Set initial offscreen positions
    gsap.set([pointer, ripple], { opacity: 0 });

    // GSAP quickTo for 120fps instant pointer tracking
    const xPointer = gsap.quickTo(pointer, "x", { duration: 0.04, ease: "power2.out" });
    const yPointer = gsap.quickTo(pointer, "y", { duration: 0.04, ease: "power2.out" });

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to(pointer, { opacity: 1, duration: 0.2 });
      }

      xPointer(e.clientX);
      yPointer(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const hideTarget = target.closest("[data-cursor-hide]");
      const customTextTarget = target.closest("[data-cursor-text]") as HTMLElement | null;
      const cardTarget = target.closest("[data-cursor='card'], .atlas-card, .phx-card");
      const dragTarget = target.closest("[data-cursor='drag'], [role='slider'], input[type='range']");
      const linkTarget = target.closest("a, [data-cursor='link']");
      const buttonTarget = target.closest("button, [role='button'], input[type='submit'], input[type='button'], .cursor-pointer");
      const textInput = target.closest(
        "input:not([type='button']):not([type='submit']):not([type='range']):not([type='checkbox']):not([type='radio']):not([type='file']):not([type='reset']), textarea, [contenteditable='true'], [role='textbox']"
      );

      if (hideTarget) {
        setCursorType("hidden");
        setBadgeText("");
      } else if (customTextTarget && customTextTarget.getAttribute("data-cursor-text")) {
        setCursorType("button");
        setBadgeText(customTextTarget.getAttribute("data-cursor-text") || "");
      } else if (textInput) {
        setCursorType("text");
        setBadgeText("");
      } else if (dragTarget) {
        setCursorType("drag");
        setBadgeText("");
      } else if (linkTarget) {
        setCursorType("link");
        setBadgeText("");
      } else if (buttonTarget) {
        setCursorType("button");
        setBadgeText("");
      } else if (cardTarget) {
        setCursorType("card");
        setBadgeText("");
      } else {
        setCursorType("default");
        setBadgeText("");
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (!ripple) return;

      // Trigger concentric click ripple
      gsap.set(ripple, {
        x: e.clientX,
        y: e.clientY,
        scale: 0.2,
        opacity: 0.85,
      });

      gsap.to(ripple, {
        scale: 2.2,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (pointer) gsap.to(pointer, { scale: 0.85, duration: 0.1, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      if (pointer) gsap.to(pointer, { scale: 1, duration: 0.2, ease: "back.out(2)" });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to(pointer, { opacity: 0, duration: 0.2, ease: "power2.in" });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      gsap.to(pointer, { opacity: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  // Pointer visibility toggle for hidden state
  useEffect(() => {
    const pointer = pointerRef.current;
    if (!pointer) return;

    if (cursorType === "hidden") {
      gsap.to(pointer, { opacity: 0, duration: 0.15 });
    } else {
      gsap.to(pointer, { opacity: 1, duration: 0.15 });
    }
  }, [cursorType]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden hidden md:block select-none" aria-hidden="true">
      
      {/* ── 1. EXPANDING CLICK RIPPLE (Concentric pulse on click) ── */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
        style={{
          width: 44,
          height: 44,
          border: "1.5px solid rgb(var(--atlas-gold))",
          boxShadow: "0 0 16px rgba(199, 169, 102, 0.5)",
        }}
      />

      {/* ── 2. ATLAS VECTOR POINTER (Zero-latency exact tracking) ── */}
      <div
        ref={pointerRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          // Tip of chevron arrow is at (0, 0)
          transform: "translate(-1px, -1px)",
        }}
      >
        {/* DEFAULT, CARD & BUTTON: Iconic Atlas Geometric Chevron Arrow with Gold Glow */}
        {(cursorType === "default" || cursorType === "card" || cursorType === "button") && (
          <div className="relative filter drop-shadow-[0_0_6px_rgba(199,169,102,0.85)] drop-shadow-[0_0_14px_rgba(199,169,102,0.35)] transition-transform duration-200">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.5 2.5L20 11.5L11.5 13.5L8.5 21L3.5 2.5Z"
                fill="rgba(199, 169, 102, 0.22)"
                stroke="rgb(var(--atlas-gold))"
                strokeWidth="1.75"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>

            {badgeText && (
              <span className="absolute left-6 top-2 text-[9px] font-bold tracking-wider uppercase text-[rgb(var(--atlas-gold))] bg-[rgba(8,8,8,0.9)] px-2 py-0.5 rounded-full border border-[rgba(199,169,102,0.4)] shadow-md whitespace-nowrap">
                {badgeText}
              </span>
            )}
          </div>
        )}

        {/* LINK STATE: Geometric Chevron Arrow + Link Action Badge */}
        {cursorType === "link" && (
          <div className="relative filter drop-shadow-[0_0_8px_rgba(199,169,102,0.9)] drop-shadow-[0_0_16px_rgba(199,169,102,0.4)]">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.5 2.5L19 11L11 13L8 20L3.5 2.5Z"
                fill="rgba(199, 169, 102, 0.25)"
                stroke="rgb(var(--atlas-gold))"
                strokeWidth="1.75"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              {/* Link Chain Icon Badge */}
              <g transform="translate(14, 13) scale(0.65)" stroke="rgb(var(--atlas-gold))" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </g>
            </svg>
          </div>
        )}

        {/* TEXT STATE: Luminous Gold I-Beam */}
        {cursorType === "text" && (
          <div className="-translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_0_6px_rgba(199,169,102,0.9)] drop-shadow-[0_0_12px_rgba(199,169,102,0.4)]">
            <svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 2.5H12M8 2.5V19.5M4 19.5H12"
                stroke="rgb(var(--atlas-gold))"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* DRAG STATE: 4-Directional Move Arrows */}
        {cursorType === "drag" && (
          <div className="-translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_0_8px_rgba(199,169,102,0.85)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2L15 5M12 2L9 5M12 2V22M12 22L15 19M12 22L9 19M2 12L5 9M2 12L5 15M2 12H22M22 12L19 9M22 12L19 15"
                stroke="rgb(var(--atlas-gold))"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* LOADING STATE: Spinning Glowing Gold Arc */}
        {cursorType === "loading" && (
          <div className="-translate-x-1/2 -translate-y-1/2 filter drop-shadow-[0_0_8px_rgba(199,169,102,0.85)]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-spin">
              <circle cx="12" cy="12" r="9" stroke="rgba(199, 169, 102, 0.2)" strokeWidth="2" />
              <path d="M12 3A9 9 0 0 1 21 12" stroke="rgb(var(--atlas-gold))" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
