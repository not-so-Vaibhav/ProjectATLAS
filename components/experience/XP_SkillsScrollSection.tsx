"use client";

import { useRef, useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/* ─── Flat skills list with official devicons logos ───────────────────── */
const SKILLS = [
  { name: "Python",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "JavaScript",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "TypeScript",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "C",            src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
  { name: "C++",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
  { name: "HTML",         src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "React",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Next.js",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
  { name: "Tailwind",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Node.js",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
  { name: "Express",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
  { name: "Flask",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg" },
  { name: "FastAPI",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "PyTorch",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original.svg" },
  { name: "TensorFlow",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
  { name: "Scikit-learn", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "NumPy",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg" },
  { name: "Pandas",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg" },
  { name: "Firebase",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg" },
  { name: "Supabase",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" },
  { name: "PostgreSQL",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Git",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "GitHub",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
  { name: "VS Code",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
  { name: "Vercel",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
  { name: "Docker",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "Figma",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "Linux",        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg" },
  { name: "SQL",          src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg" },
  { name: "Gen AI",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg" },
  { name: "REST APIs",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
];

/* Diamond shape: rows with decreasing count (wide top → narrow bottom toward the hole) */
const ROWS = [8, 7, 7, 6, 4]; // total = 32

const LETTERS = "TECH STACK".split("");

interface Props {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export function XP_SkillsScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charRefs   = useRef<(HTMLSpanElement | null)[]>([]);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);

  /* ── Black-hole vortex canvas animation ─────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Helper: read CSS variable background color for the hole
    const getBgColor = () => {
      const style = getComputedStyle(document.documentElement);
      const raw = style.getPropertyValue("--atlas-black").trim();
      if (!raw) return "8, 8, 8";
      // tokens.css format: "R G B" (space-separated)
      return raw.split(" ").filter(Boolean).join(", ");
    };

    let animId: number;
    let frame = 0;

    // Accretion-disk particles spiraling into the hole
    const NUM_PARTICLES = 120;
    type Particle = { angle: number; radius: number; speed: number; decay: number; size: number; alpha: number };
    const particles: Particle[] = Array.from({ length: NUM_PARTICLES }, () => ({
      angle:  Math.random() * Math.PI * 2,
      radius: Math.random() * 0.45 + 0.05,   // fraction of canvas half-width
      speed:  (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      decay:  Math.random() * 0.0012 + 0.0006,
      size:   Math.random() * 1.5 + 0.4,
      alpha:  Math.random() * 0.5 + 0.1,
    }));

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

      const draw = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H * 0.65; // Hole center slightly lower

      ctx.clearRect(0, 0, W, H);

      // 1. Deep space gold/amber glow
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
      bg.addColorStop(0,    "rgba(199, 169, 102, 0.12)");
      bg.addColorStop(0.3,  "rgba(170, 135, 70, 0.05)");
      bg.addColorStop(0.7,  "rgba(100, 70, 25, 0.01)");
      bg.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const holeDepth = H * 0.5;

      // 2. ── Large textured orb (Gold planet) ──
      // Drawn BEFORE the funnel so the grid overlays it, placing it "inside"
      const PERIOD    = 450;
      const phase     = (frame % PERIOD) / PERIOD;
      const eased     = Math.pow(phase, 2.2); 
      
      const orbStartY = -H * 0.25; 
      const orbEndY   = holeDepth * 0.95; 
      const orbY      = cy + orbStartY + (orbEndY - orbStartY) * eased;
      
      const maxOrbR   = Math.min(W, H) * 0.4;
      const orbR      = Math.max(0, maxOrbR * (1 - eased * 0.95));
      const orbAlpha  = Math.max(0, 1 - Math.pow(eased, 3.5));

      if (orbAlpha > 0.01 && orbR > 0.1) {
        ctx.save();
        ctx.translate(cx, orbY);

        const orbGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, orbR * 1.6);
        orbGrad.addColorStop(0,    `rgba(255, 230, 160, ${orbAlpha * 0.5})`);
        orbGrad.addColorStop(0.3,  `rgba(215, 185, 110, ${orbAlpha * 0.25})`);
        orbGrad.addColorStop(0.6,  `rgba(170, 135,  70, ${orbAlpha * 0.08})`);
        orbGrad.addColorStop(1,    "rgba(0,0,0,0)");
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(0, 0, orbR * 1.6, 0, Math.PI * 2);
        ctx.fill();

        const planetGrad = ctx.createRadialGradient(-orbR*0.3, -orbR*0.3, 0, 0, 0, orbR);
        planetGrad.addColorStop(0, `rgba(230, 200, 130, ${orbAlpha * 0.45})`);
        planetGrad.addColorStop(0.5, `rgba(180, 140, 80, ${orbAlpha * 0.25})`);
        planetGrad.addColorStop(1, `rgba(80, 50, 20, ${orbAlpha * 0.35})`);
        ctx.fillStyle = planetGrad;
        ctx.beginPath();
        ctx.arc(0, 0, orbR, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 240, 200, ${orbAlpha * 0.25})`;
        ctx.lineWidth = Math.max(1, orbR * 0.012);
        ctx.beginPath();
        ctx.arc(0, 0, orbR, 0, Math.PI * 2);
        ctx.clip(); 

        const numBands = 9;
        for(let i=1; i<numBands; i++) {
           const yp = (i/numBands) * 2 - 1;
           const y = yp * orbR;
           const xr = Math.sqrt(1 - yp*yp) * orbR;
           ctx.beginPath();
           const twist = Math.sin(frame * 0.008 + i * 1.2) * orbR * 0.15;
           ctx.ellipse(0, y + twist, Math.max(0.1, xr), Math.max(0.1, xr * 0.35), frame * 0.002, 0, Math.PI * 2);
           ctx.stroke();
        }
        ctx.restore();
      }

      // 3. ── Funnel Grid (The animating hole) ──
      // Drawn AFTER the orb to trap it inside the funnel
      ctx.save();
      ctx.translate(cx, cy);
      
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      
      // Dynamic grid color and contrast per theme
      // Light mode: Rich dark golden / antique bronze (150, 115, 45) for high-clarity golden matrix lines
      // Dark mode: Radiant gold (199, 169, 102) with balanced opacity
      const gridColor     = isLight ? "150, 115, 45" : "199, 169, 102";
      const ringAlphaMult = isLight ? 0.65 : 0.40;
      const spokeAlpha    = isLight ? 0.38 : 0.22;
      const gridLineWidth = isLight ? 1.3 : 1.15;
      
      const numRings = 32;
      const maxRadius = W * 1.5;
      const tilt = 0.35;
      const flowPhase = (frame * 0.002) % 1;
      
      ctx.lineWidth = gridLineWidth;
      for(let i=0; i<numRings; i++) {
         const p = (i + flowPhase) / numRings; 
         const r = maxRadius * Math.pow(p, 2.2);
         const dip = holeDepth * Math.pow(1 - p, 3);
         
         ctx.beginPath();
         const alpha = Math.min(1, p * 4) * Math.max(0, 1 - p*0.2) * ringAlphaMult;
         ctx.strokeStyle = `rgba(${gridColor}, ${alpha})`;
         ctx.ellipse(0, dip, Math.max(0.1, r), Math.max(0.1, r * tilt), 0, 0, Math.PI * 2);
         ctx.stroke();
      }

      const numSpokes = 36;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${gridColor}, ${spokeAlpha})`;
      for(let i=0; i<numSpokes; i++) {
         const angle = (i / numSpokes) * Math.PI * 2 + (frame * 0.0008);
         for(let step=0; step<=25; step++) {
            const p = step/25;
            const r = maxRadius * Math.pow(p, 2.2);
            const dip = holeDepth * Math.pow(1 - p, 3);
            const twist = (1 - p) * Math.PI * 0.35; 
            const finalAngle = angle + twist;
            const x = Math.cos(finalAngle) * r;
            const y = dip + Math.sin(finalAngle) * r * tilt;
            
            if (step === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
         }
      }
      ctx.stroke();
      ctx.restore();

      // 4. ── Event Horizon (Dark Hole) ──
      // Uses the actual page background color so it blends seamlessly in both themes
      const bgColor = getBgColor();
      const holeR = Math.max(30, W * 0.05);
      const holeDip = cy + holeDepth;
      const hGrad = ctx.createRadialGradient(cx, holeDip, 0, cx, holeDip, holeR * 3);
      hGrad.addColorStop(0,    `rgba(${bgColor}, 1)`);
      hGrad.addColorStop(0.3,  `rgba(${bgColor}, 0.95)`);
      hGrad.addColorStop(0.7,  `rgba(${bgColor}, 0.4)`);
      hGrad.addColorStop(1,    `rgba(${bgColor}, 0)`);
      ctx.fillStyle = hGrad;
      ctx.beginPath();
      ctx.arc(cx, holeDip, holeR * 3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── GSAP entrance animations ────────────────────────────────── */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.set(charRefs.current.filter(Boolean), { opacity: 0, y: 60, rotateX: -55, filter: "blur(8px)" });
      gsap.set(".sk-kicker, .sk-divider, .sk-sub", { opacity: 0, y: 20 });
      gsap.set(".sk-card", { opacity: 0, scale: 0.8, y: 24 });

      const tl = gsap.timeline({ paused: true });

      tl.to(".sk-kicker", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0);
      tl.to(charRefs.current.filter(Boolean), {
        opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
        duration: 0.9, ease: "power4.out", stagger: 0.06,
      }, 0.1);
      tl.to(".sk-divider", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.38);
      tl.to(".sk-sub",     { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, 0.48);
      tl.to(".sk-card", {
        opacity: 1, scale: 1, y: 0,
        duration: 0.5, ease: "back.out(1.4)", stagger: 0.022,
      }, 0.55);

      tlRef.current = tl;
    }, sectionRef);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) tlRef.current?.restart();
        else                      tlRef.current?.pause(0);
      });
    }, { threshold: 0.12 });

    if (section) observer.observe(section);
    return () => { observer.disconnect(); ctx.revert(); };
  }, { scope: sectionRef });

  /* ── Build diamond rows ──────────────────────────────────────── */
  const rows: (typeof SKILLS)[] = [];
  let offset = 0;
  for (const count of ROWS) {
    rows.push(SKILLS.slice(offset, offset + count));
    offset += count;
  }

  return (
    <section
      id="designer"
      data-section
      ref={sectionRef}
      className="snap-slide relative w-full overflow-hidden flex flex-col items-center"
      aria-label="Skills Room"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Canvas — black hole vortex */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 50% at 50% 10%, rgba(199,169,102,0.07) 0%, transparent 65%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 45% at 15% 60%, rgba(126,148,125,0.06) 0%, transparent 60%)"
      }} />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 55% 45% at 85% 60%, rgba(199,169,102,0.05) 0%, transparent 60%)"
      }} />

      {/* ── Content ────────────────────────────────────────────── */}
      <div
        className="relative z-20 flex flex-col items-center w-full"
        style={{ paddingTop: "calc(var(--topbar-height) + 1.2rem)", paddingBottom: "1rem" }}
      >
        {/* Kicker */}
        <p className="sk-kicker text-[10px] font-bold tracking-[0.28em] uppercase mb-3"
          style={{ color: "rgb(199,169,102)", opacity: 0 }}>
          04 / Engineering
        </p>

        {/* Big heading */}
        <div className="mb-3 overflow-hidden leading-none" style={{ perspective: "700px" }}>
          <div className="flex flex-wrap justify-center gap-x-2 md:gap-x-4">
            {LETTERS.map((char, i) => (
              <span
                key={i}
                ref={el => { charRefs.current[i] = el; }}
                className="inline-block font-black tracking-tighter"
                style={{
                  opacity: 0,
                  fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
                  lineHeight: 0.9,
                  color: "var(--color-text)",
                  willChange: "transform,opacity,filter",
                }}
              >{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>
        </div>

        {/* Gold divider */}
        <div className="sk-divider mx-auto mb-3 h-[2px] w-10 rounded-full"
          style={{ background: "var(--color-gold)", opacity: 0 }} />

        {/* Subtitle */}
        <p className="sk-sub text-[11px] md:text-xs text-center max-w-xs mx-auto leading-relaxed mb-4 md:mb-5"
          style={{ color: "var(--color-text-muted)", opacity: 0 }}>
          The full stack powering every product I build.
        </p>

        {/* ── Diamond icon grid ──────────────────────────────── */}
        <div className="flex flex-col items-center gap-2 md:gap-2.5 px-4">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-2 md:gap-2.5 justify-center">
              {row.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual skill card with premium hover ──────────────────── */
function SkillCard({ skill }: { skill: (typeof SKILLS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, {
      scale: 1.18,
      y: -6,
      duration: 0.32,
      ease: "power2.out",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 1, scale: 1.3, duration: 0.35, ease: "power2.out" });
    }
    el.style.borderColor = "rgba(199,169,102,0.55)";
    el.style.boxShadow   = "0 0 22px 6px rgba(199,169,102,0.28), 0 0 55px 15px rgba(199,169,102,0.1)";
    el.style.background  = "rgba(199,169,102,0.1)";
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, y: 0, duration: 0.38, ease: "power2.out" });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    }
    el.style.borderColor = "rgb(var(--atlas-glass) / 0.1)";
    el.style.boxShadow   = "none";
    el.style.background  = "rgb(var(--atlas-glass) / 0.05)";
  };

  return (
    <div
      ref={cardRef}
      className="sk-card relative flex flex-col items-center justify-center gap-1 rounded-xl cursor-default"
      style={{
        opacity: 0,
        width: "clamp(58px, 9vw, 78px)",
        height: "clamp(68px, 10.5vw, 88px)",
        background: "rgb(var(--atlas-glass) / 0.05)",
        border: "1px solid rgb(var(--atlas-glass) / 0.1)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        willChange: "transform",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Glow bloom */}
      <div
        ref={glowRef}
        className="absolute inset-[-8px] rounded-2xl pointer-events-none"
        style={{
          opacity: 0,
          background: "radial-gradient(circle at 50% 50%, rgba(199,169,102,0.3) 0%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={skill.src}
        alt={skill.name}
        width={28}
        height={28}
        className="object-contain"
        style={{
          width: "clamp(22px, 3.5vw, 30px)",
          height: "clamp(22px, 3.5vw, 30px)",
          filter: "var(--sk-icon-filter, brightness(0.78) saturate(0.65))",
          transition: "filter 0.25s ease",
        }}
        onError={(e) => {
          // Fallback: hide broken img gracefully
          (e.target as HTMLImageElement).style.display = "none";
        }}
        onMouseEnter={(e) => {
          (e.target as HTMLImageElement).style.filter = "brightness(1) saturate(1.2)";
        }}
        onMouseLeave={(e) => {
          (e.target as HTMLImageElement).style.filter = "var(--sk-icon-filter, brightness(0.78) saturate(0.65))";
        }}
      />

      {/* Label */}
      <span
        className="font-semibold text-center leading-tight px-1"
        style={{
          fontSize: "clamp(7px, 1.1vw, 10px)",
          color: "var(--color-text-muted)",
          maxWidth: "100%",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}
