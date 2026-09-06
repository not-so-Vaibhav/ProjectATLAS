"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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
  { name: "Gen AI",       src: "https://cdn.jsdelivr.net/npm/simple-icons@v14/icons/openai.svg" },
  { name: "REST APIs",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
];

const ROWS_DESKTOP = [8, 7, 7, 6, 4];
const ROWS_MOBILE  = [6, 6, 6, 5, 5, 4];
const LETTERS = "TECH STACK".split("");

export default function SkillsPage() {
  const pageRef   = useRef<HTMLDivElement>(null);
  const charRefs  = useRef<(HTMLSpanElement | null)[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* ── Black-hole vortex canvas ──────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      const isMobile = W < 768;
      const cx = W / 2, cy = isMobile ? H * 0.58 : H * 0.65;
      const holeDepth = isMobile ? H * 0.38 : H * 0.5;

      ctx.clearRect(0, 0, W, H);

      // 1. Deep space gold glow
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * (isMobile ? 0.9 : 0.8));
      bg.addColorStop(0,    "rgba(199, 169, 102, 0.12)");
      bg.addColorStop(0.3,  "rgba(170, 135, 70, 0.05)");
      bg.addColorStop(0.7,  "rgba(100, 70, 25, 0.01)");
      bg.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // 2. ── Large textured orb (Gold planet) ──
      const PERIOD    = 450;
      const phase     = (frame % PERIOD) / PERIOD;
      const eased     = Math.pow(phase, 2.2); 
      
      const orbStartY = -H * 0.25; 
      const orbEndY   = holeDepth * 0.95; 
      const orbY      = cy + orbStartY + (orbEndY - orbStartY) * eased;
      
      const maxOrbR   = Math.min(W, H) * (isMobile ? 0.34 : 0.4);
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

      // 3. ── Funnel Grid ──
      ctx.save();
      ctx.translate(cx, cy);
      
      const numRings = isMobile ? 24 : 32;
      const maxRadius = isMobile ? W * 1.8 : W * 1.5;
      const tilt = 0.35;
      const flowPhase = (frame * 0.002) % 1;
      
      ctx.lineWidth = 1.15;
      for(let i=0; i<numRings; i++) {
         const p = (i + flowPhase) / numRings; 
         const r = maxRadius * Math.pow(p, 2.2);
         const dip = holeDepth * Math.pow(1 - p, 3);
         
         ctx.beginPath();
         const alpha = Math.min(1, p * 4) * Math.max(0, 1 - p*0.2) * 0.40;
         ctx.strokeStyle = `rgba(199, 169, 102, ${alpha})`;
         ctx.ellipse(0, dip, Math.max(0.1, r), Math.max(0.1, r * tilt), 0, 0, Math.PI * 2);
         ctx.stroke();
      }

      const numSpokes = isMobile ? 28 : 36;
      ctx.beginPath();
      ctx.strokeStyle = "rgba(199, 169, 102, 0.22)";
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

      // 4. ── Black Hole ──
      const holeR = Math.max(25, W * (isMobile ? 0.08 : 0.05));
      const holeDip = cy + holeDepth;
      const hGrad = ctx.createRadialGradient(cx, holeDip, 0, cx, holeDip, holeR * 3);
      hGrad.addColorStop(0,    "rgba(8,8,8,1)");
      hGrad.addColorStop(0.3,  "rgba(8,8,8,0.95)");
      hGrad.addColorStop(0.7,  "rgba(8,8,8,0.4)");
      hGrad.addColorStop(1,    "rgba(8,8,8,0)");
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

  /* ── GSAP entrance ─────────────────────────────────────────── */
  useGSAP(() => {
    gsap.set(charRefs.current.filter(Boolean), { opacity: 0, y: 60, rotateX: -55, filter: "blur(8px)" });
    gsap.set(".sk-kicker, .sk-divider, .sk-sub", { opacity: 0, y: 20 });
    gsap.set(".sk-card", { opacity: 0, scale: 0.8, y: 24 });

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(".sk-kicker", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0);
    tl.to(charRefs.current.filter(Boolean), {
      opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)",
      duration: 0.9, ease: "power4.out", stagger: 0.06,
    }, 0.1);
    tl.to(".sk-divider", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.4);
    tl.to(".sk-sub",     { opacity: 1, y: 0, duration: 0.5,  ease: "power3.out" }, 0.5);
    tl.to(".sk-card", {
      opacity: 1, scale: 1, y: 0,
      duration: 0.5, ease: "back.out(1.4)", stagger: 0.022,
    }, 0.6);
  }, { scope: pageRef });

  /* ── Build diamond rows for desktop & mobile ───────────────── */
  const desktopRows: (typeof SKILLS)[] = [];
  let dOffset = 0;
  for (const count of ROWS_DESKTOP) {
    desktopRows.push(SKILLS.slice(dOffset, dOffset + count));
    dOffset += count;
  }

  const mobileRows: (typeof SKILLS)[] = [];
  let mOffset = 0;
  for (const count of ROWS_MOBILE) {
    mobileRows.push(SKILLS.slice(mOffset, mOffset + count));
    mOffset += count;
  }

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen w-full overflow-x-hidden bg-[rgb(8,8,8)] text-[rgb(247,247,244)] flex flex-col items-center"
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)" }} />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-6xl mx-auto px-4"
        style={{ paddingTop: "calc(var(--topbar-height) + 1rem)", paddingBottom: "3rem" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4 sm:mb-6 text-[10px] font-mono tracking-widest"
          style={{ color: "rgba(255,255,255,0.22)" }}>
          <Link href="/" className="hover:text-[rgb(199,169,102)] transition-colors">Atlas</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Skills</span>
        </div>

        {/* Kicker */}
        <p className="sk-kicker text-[9px] sm:text-[10px] font-bold tracking-[0.28em] uppercase mb-2 sm:mb-3"
          style={{ color: "var(--color-gold)", opacity: 0 }}>
          SKILLS
        </p>

        {/* Heading */}
        <div className="mb-2 sm:mb-3 overflow-hidden leading-none" style={{ perspective: "800px" }}>
          <div className="flex flex-wrap justify-center gap-x-2 sm:gap-x-3 md:gap-x-5">
            {LETTERS.map((char, i) => (
              <span
                key={i}
                ref={el => { charRefs.current[i] = el; }}
                className="inline-block font-black tracking-tighter"
                style={{
                  opacity: 0,
                  fontSize: "clamp(2.5rem, 9vw, 6.5rem)",
                  lineHeight: 0.88,
                  color: "rgb(247,247,244)",
                  willChange: "transform,opacity,filter",
                }}
              >{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="sk-divider mx-auto mb-2 sm:mb-3.5 h-[2px] w-10 sm:w-12 rounded-full"
          style={{ background: "var(--color-gold)", opacity: 0 }} />

        {/* Subtitle */}
        <p className="sk-sub text-[11px] sm:text-xs md:text-sm leading-relaxed max-w-xs mx-auto text-center mb-5 sm:mb-7 px-4"
          style={{ color: "rgba(224,224,218,0.42)", opacity: 0 }}>
          The full stack of technologies powering every product I build.
        </p>

        {/* Desktop Diamond grid (>= md) */}
        <div className="hidden md:flex flex-col items-center gap-2.5 md:gap-3 px-4">
          {desktopRows.map((row, ri) => (
            <div key={ri} className="flex gap-2.5 md:gap-3 justify-center">
              {row.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Diamond grid (< md) */}
        <div className="flex md:hidden flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-4 w-full">
          {mobileRows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 sm:gap-2 justify-center w-full">
              {row.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>

        {/* Back nav */}
        <div className="mt-8 sm:mt-12">
          <Link href="/"
            className="sk-kicker inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-medium border transition-all hover:border-white/20 hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(224,224,218,0.4)" }}>
            <ArrowLeft className="w-3 h-3" /> Back to Atlas
          </Link>
        </div>
      </div>

      {/* Bottom vignette */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,1), transparent)" }} />
    </div>
  );
}

/* ── Skill card ──────────────────────────────────────────────── */
function SkillCard({ skill }: { skill: (typeof SKILLS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  const handleEnter = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1.15, y: -4, duration: 0.28, ease: "power2.out" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, scale: 1.3, duration: 0.35, ease: "power2.out" });
    if (imgRef.current) imgRef.current.style.filter = "brightness(1.1) saturate(1.3)";
    el.style.borderColor = "rgba(199,169,102,0.55)";
    el.style.boxShadow   = "0 0 22px 6px rgba(199,169,102,0.28), 0 0 55px 15px rgba(199,169,102,0.1)";
    el.style.background  = "rgba(199,169,102,0.1)";
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, y: 0, duration: 0.35, ease: "power2.out" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.3 });
    if (imgRef.current) imgRef.current.style.filter = "brightness(0.75) saturate(0.6)";
    el.style.borderColor = "rgba(255,255,255,0.08)";
    el.style.boxShadow   = "none";
    el.style.background  = "rgba(255,255,255,0.03)";
  };

  return (
    <div
      ref={cardRef}
      className="sk-card relative flex flex-col items-center justify-center gap-0.5 sm:gap-1.5 rounded-xl sm:rounded-2xl cursor-default transition-colors duration-200"
      style={{
        opacity: 0,
        width: "clamp(46px, 13vw, 78px)",
        height: "clamp(52px, 14.5vw, 88px)",
        maxWidth: "78px",
        maxHeight: "88px",
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        willChange: "transform",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Bloom glow */}
      <div
        ref={glowRef}
        className="absolute inset-[-6px] sm:inset-[-10px] rounded-2xl sm:rounded-3xl pointer-events-none"
        style={{
          opacity: 0,
          background: "radial-gradient(circle, rgba(199,169,102,0.35) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      {/* Logo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={skill.src}
        alt={skill.name}
        width={26}
        height={26}
        style={{
          width: "clamp(18px, 4.8vw, 30px)",
          height: "clamp(18px, 4.8vw, 30px)",
          objectFit: "contain",
          filter: "brightness(0.75) saturate(0.6)",
          transition: "filter 0.25s ease",
        }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Name */}
      <span
        className="font-semibold text-center leading-tight px-0.5 tracking-tight"
        style={{
          fontSize: "clamp(7px, 1.9vw, 9.5px)",
          color: "rgba(224,224,218,0.5)",
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
