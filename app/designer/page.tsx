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
  { name: "Gen AI",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openai/openai-original.svg" },
  { name: "REST APIs",    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
];

const ROWS = [8, 7, 7, 6, 4];
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

    type Particle = { angle: number; radius: number; speed: number; decay: number; size: number; alpha: number };
    const particles: Particle[] = Array.from({ length: 130 }, () => ({
      angle:  Math.random() * Math.PI * 2,
      radius: Math.random() * 0.45 + 0.05,
      speed:  (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1),
      decay:  Math.random() * 0.0012 + 0.0006,
      size:   Math.random() * 1.6 + 0.4,
      alpha:  Math.random() * 0.5 + 0.1,
    }));

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

      const draw = () => {
      frame++;
      const W = canvas.width, H = canvas.height;
      const cx = W / 2, cy = H * 0.65;

      ctx.clearRect(0, 0, W, H);

      // 1. Deep space gold glow
      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8);
      bg.addColorStop(0,    "rgba(199, 169, 102, 0.12)");
      bg.addColorStop(0.3,  "rgba(170, 135, 70, 0.05)");
      bg.addColorStop(0.7,  "rgba(100, 70, 25, 0.01)");
      bg.addColorStop(1,    "rgba(0,0,0,0)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const holeDepth = H * 0.5;

      // 2. ── Large textured orb (Gold planet) ──
      // Drawn BEFORE the funnel so the grid overlays it
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
      // Drawn AFTER the orb
      ctx.save();
      ctx.translate(cx, cy);
      
      const numRings = 28;
      const maxRadius = W * 1.5;
      const gridColor = "199, 169, 102"; 
      const tilt = 0.35;
      const flowPhase = (frame * 0.002) % 1;
      
      ctx.lineWidth = 1;
      for(let i=0; i<numRings; i++) {
         const p = (i + flowPhase) / numRings; 
         const r = maxRadius * Math.pow(p, 2.2);
         const dip = holeDepth * Math.pow(1 - p, 3);
         
         ctx.beginPath();
         const alpha = Math.min(1, p * 4) * Math.max(0, 1 - p*0.2) * 0.25;
         ctx.strokeStyle = `rgba(${gridColor}, ${alpha})`;
         ctx.ellipse(0, dip, Math.max(0.1, r), Math.max(0.1, r * tilt), 0, 0, Math.PI * 2);
         ctx.stroke();
      }

      const numSpokes = 36;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${gridColor}, 0.15)`;
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
      const holeR = Math.max(30, W * 0.05);
      const holeDip = cy + holeDepth;
      const hGrad = ctx.createRadialGradient(cx, holeDip, 0, cx, holeDip, holeR * 3);
      hGrad.addColorStop(0,    "rgba(8, 8, 8, 1)"); 
      hGrad.addColorStop(0.3,  "rgba(8, 8, 8, 0.95)");
      hGrad.addColorStop(0.7,  "rgba(8, 8, 8, 0.4)");
      hGrad.addColorStop(1,    "rgba(8, 8, 8, 0)");
      ctx.fillStyle = hGrad;
      ctx.beginPath();
      ctx.arc(cx, holeDip, holeR * 3, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  /* ── GSAP entrance ─────────────────────────────────────────── */
  useGSAP(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(charRefs.current.filter(Boolean),
        { opacity: 0, y: 70, rotateX: -55, filter: "blur(8px)" },
        { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 1.0, ease: "power4.out", stagger: 0.065, delay: 0.2 }
      );
      gsap.fromTo([".sk-kicker", ".sk-divider", ".sk-sub"],
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.55 }
      );
      gsap.fromTo(".sk-card",
        { opacity: 0, scale: 0.8, y: 22 },
        { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.4)", stagger: 0.022, delay: 0.7 }
      );
    }, pageRef);
    return () => ctx.revert();
  }, { scope: pageRef });

  /* Build diamond rows */
  const rows: (typeof SKILLS)[] = [];
  let offset = 0;
  for (const count of ROWS) {
    rows.push(SKILLS.slice(offset, offset + count));
    offset += count;
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#080808] text-[rgb(224,224,218)] flex flex-col items-center relative overflow-hidden"
      id="main-content"
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Top gradient */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{ background: "linear-gradient(to bottom, rgba(8,8,8,0.95), transparent)" }} />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center w-full"
        style={{ paddingTop: "calc(var(--topbar-height) + 1.5rem)", paddingBottom: "3rem" }}>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-[10px] font-mono tracking-widest"
          style={{ color: "rgba(255,255,255,0.22)" }}>
          <Link href="/" className="hover:text-[rgb(199,169,102)] transition-colors">Atlas</Link>
          <span>/</span>
          <span style={{ color: "rgba(255,255,255,0.45)" }}>Skills</span>
        </div>

        {/* Kicker */}
        <p className="sk-kicker text-[10px] font-bold tracking-[0.28em] uppercase mb-4"
          style={{ color: "rgb(199,169,102)", opacity: 0 }}>
          04 / Engineering
        </p>

        {/* Heading */}
        <div className="mb-4 overflow-hidden leading-none" style={{ perspective: "800px" }}>
          <div className="flex flex-wrap justify-center gap-x-3 md:gap-x-5">
            {LETTERS.map((char, i) => (
              <span
                key={i}
                ref={el => { charRefs.current[i] = el; }}
                className="inline-block font-black tracking-tighter"
                style={{
                  opacity: 0,
                  fontSize: "clamp(3.5rem, 12vw, 7rem)",
                  lineHeight: 0.88,
                  color: "rgb(247,247,244)",
                  willChange: "transform,opacity,filter",
                }}
              >{char === " " ? "\u00A0" : char}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="sk-divider mx-auto mb-4 h-[2px] w-12 rounded-full"
          style={{ background: "rgb(199,169,102)", opacity: 0 }} />

        {/* Subtitle */}
        <p className="sk-sub text-xs md:text-sm leading-relaxed max-w-xs mx-auto text-center mb-8"
          style={{ color: "rgba(224,224,218,0.42)", opacity: 0 }}>
          The full stack of technologies powering every product I build.
        </p>

        {/* Diamond grid */}
        <div className="flex flex-col items-center gap-3 px-4">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-3 justify-center">
              {row.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          ))}
        </div>

        {/* Back nav */}
        <div className="mt-12">
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
    gsap.to(el, { scale: 1.18, y: -8, duration: 0.3, ease: "power2.out" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, scale: 1.4, duration: 0.35, ease: "power2.out" });
    if (imgRef.current) imgRef.current.style.filter = "brightness(1.1) saturate(1.3)";
    el.style.borderColor = "rgba(199,169,102,0.55)";
    el.style.boxShadow   = "0 0 25px 8px rgba(199,169,102,0.28), 0 0 60px 18px rgba(199,169,102,0.1)";
    el.style.background  = "rgba(199,169,102,0.1)";
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    gsap.to(el, { scale: 1, y: 0, duration: 0.38, ease: "power2.out" });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, scale: 1, duration: 0.3 });
    if (imgRef.current) imgRef.current.style.filter = "brightness(0.75) saturate(0.6)";
    el.style.borderColor = "rgba(255,255,255,0.08)";
    el.style.boxShadow   = "none";
    el.style.background  = "rgba(255,255,255,0.03)";
  };

  return (
    <div
      ref={cardRef}
      className="sk-card relative flex flex-col items-center justify-center gap-1.5 rounded-2xl cursor-default"
      style={{
        opacity: 0,
        width: 80,
        height: 90,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        willChange: "transform",
        transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Bloom glow */}
      <div
        ref={glowRef}
        className="absolute inset-[-10px] rounded-3xl pointer-events-none"
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
        width={32}
        height={32}
        style={{
          width: 32, height: 32,
          objectFit: "contain",
          filter: "brightness(0.75) saturate(0.6)",
          transition: "filter 0.25s ease",
        }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />

      {/* Name */}
      <span
        className="font-semibold text-center leading-tight px-1"
        style={{
          fontSize: 9,
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
