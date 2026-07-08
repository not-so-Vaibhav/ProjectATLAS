"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { ReactNode } from "react";

type XP_MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
};

/**
 * Lightweight GSAP fade-up wrapper — replaces framer-motion usage.
 * Respects prefers-reduced-motion via gsap.globalTimeline.
 */
export function XP_Motion({ children, className, delay = 0, y = 18, duration = 0.42 }: XP_MotionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      gsap.set(ref.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.fromTo(
      ref.current,
      { opacity: 0, y },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power3.out",
        clearProps: "transform",
      }
    );
  }, [delay, y, duration]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
