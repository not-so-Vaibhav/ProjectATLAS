"use client";

import { useRef, useState, useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { LAB_EXPERIMENTS, type LabExperiment } from "@/data/lab-data";
import { Gamepad2, FlaskConical, AlertTriangle, Terminal, RefreshCw, Sparkles, Code2, Zap, ArrowRight } from "lucide-react";

interface Props {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export function XP_LabScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  const [activeTab, setActiveTab] = useState<"arcade" | "prototypes" | "failures">("arcade");
  const [activeGame, setActiveGame] = useState<"chess" | "snake">("chess");
  const [iframeKey, setIframeKey] = useState<number>(1);
  const [selectedExperiment, setSelectedExperiment] = useState<LabExperiment>(LAB_EXPERIMENTS[0]);

  const handleRestartGame = () => {
    setIframeKey(Date.now());
  };

  /* ── Arrival & Exit GSAP Scroll Animations ────────────────────────── */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(".lab-kicker, .lab-title, .lab-sub, .lab-tabs", { opacity: 0, y: 24 });
      gsap.set(".lab-divider", { scaleX: 0, transformOrigin: "center center" });
      gsap.set(".lab-console-frame", { opacity: 0, scale: 0.95, y: 35 });

      const tl = gsap.timeline({ paused: true });

      tl.to(".lab-kicker", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0)
        .to(".lab-title", { opacity: 1, y: 0, duration: 0.65, ease: "power4.out" }, 0.1)
        .to(".lab-divider", { scaleX: 1, opacity: 1, duration: 0.5, ease: "power3.out" }, 0.3)
        .to(".lab-sub", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.4)
        .to(".lab-tabs", { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.5)
        .to(".lab-console-frame", { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "back.out(1.3)" }, 0.6);

      tlRef.current = tl;
    }, sectionRef);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tlRef.current?.play();
        } else {
          tlRef.current?.reverse();
        }
      });
    }, { threshold: 0.12 });

    if (section) observer.observe(section);
    return () => { observer.disconnect(); ctx.revert(); };
  }, { scope: sectionRef });

  return (
    <section
      id="lab"
      data-section
      ref={sectionRef}
      className="snap-slide relative w-full h-[100dvh] overflow-hidden bg-[var(--color-bg)] text-white flex flex-col justify-between"
      aria-label="The Lab Section"
    >
      {/* Ambient Cybernetic Grid & Glow Background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle at 50% 30%, rgb(var(--atlas-gold) / 0.12) 0%, transparent 65%), linear-gradient(to bottom, rgba(6,6,9,0.5), var(--color-bg))"
      }} />

      <div className="relative z-10 flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        style={{ paddingTop: "calc(var(--topbar-height) + 1rem)", paddingBottom: "1.5rem" }}
      >
        {/* ── HEADER TERMINAL BAR ────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center space-y-3 shrink-0 mb-4">
          <div className="lab-kicker flex items-center gap-2 text-xs font-bold tracking-[0.28em] uppercase text-[var(--color-gold)]">
            <Terminal className="w-4 h-4" />
            <span>07 / THE LAB · EXPERIMENTAL WORKBENCH</span>
          </div>

          <h1 className="lab-title text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight">
            <span className="bg-gradient-to-r from-white via-[var(--color-text)] to-[var(--color-gold)] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgb(var(--atlas-gold) / 0.35)]">
              UNFINISHED IDEAS & ARCADE
            </span>
          </h1>

          <div className="lab-divider h-[2px] w-16 bg-[var(--color-gold)] rounded-full shadow-[0_0_10px_rgb(var(--atlas-gold) / 0.6)]" />

          <p className="lab-sub text-xs sm:text-sm text-white/65 max-w-xl leading-relaxed font-light">
            A hidden sandbox celebrating live games, interactive prototypes, failed hypotheses, and curiosity before certainty.
          </p>

          {/* Workbench Mode Tabs Selector */}
          <div className="lab-tabs flex items-center gap-2 p-1.5 rounded-2xl bg-[#0e0e14] border border-white/10 shadow-[0_8px_30px_rgb(var(--atlas-black) / 0.6)] mt-2">
            <button
              onClick={() => setActiveTab("arcade")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "arcade"
                  ? "bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)] text-black shadow-[0_0_15px_rgb(var(--atlas-gold) / 0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>🕹️ Atlas Arcade</span>
            </button>

            <button
              onClick={() => setActiveTab("prototypes")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "prototypes"
                  ? "bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)] text-black shadow-[0_0_15px_rgb(var(--atlas-gold) / 0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>🧪 Active Prototypes</span>
            </button>

            <button
              onClick={() => setActiveTab("failures")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === "failures"
                  ? "bg-gradient-to-r from-[var(--color-gold)] to-[var(--color-gold)] text-black shadow-[0_0_15px_rgb(var(--atlas-gold) / 0.4)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>💡 Failed & Learned</span>
            </button>
          </div>
        </div>

        {/* ── MAIN WORKBENCH CONSOLE FRAME ───────────────────────────────── */}
        <div className="lab-console-frame flex-1 relative w-full rounded-2xl bg-[var(--color-bg-card)]/95 border border-[rgb(var(--atlas-gold) / 0.3)] shadow-[0_0_60px_rgb(var(--atlas-black) / 0.85)] flex flex-col overflow-hidden backdrop-blur-xl">
          
          {/* TAB 1: ATLAS ARCADE (Playable Games Inline) */}
          {activeTab === "arcade" && (
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              {/* Game Control Top Bar */}
              <div className="px-5 py-3 border-b border-white/10 bg-[var(--color-bg-card)]/90 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[var(--color-gold)] uppercase tracking-wider">
                    Game Console
                  </span>
                  <span className="text-white/30">•</span>
                  <div className="flex items-center gap-1.5 p-1 rounded-lg bg-white/5 border border-white/10">
                    <button
                      onClick={() => setActiveGame("chess")}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        activeGame === "chess"
                          ? "bg-[rgb(var(--atlas-gold) / 0.25)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.4)]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Chess with Vaibhav
                    </button>
                    <button
                      onClick={() => setActiveGame("snake")}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${
                        activeGame === "snake"
                          ? "bg-[rgb(var(--atlas-gold) / 0.25)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.4)]"
                          : "text-white/60 hover:text-white"
                      }`}
                    >
                      Snake Arcade
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRestartGame}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/70 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  <span>Restart</span>
                </button>
              </div>

              {/* Game iFrame Display */}
              <div className="flex-1 w-full bg-[var(--color-bg)] relative overflow-hidden">
                <iframe
                  key={`${activeGame}-${iframeKey}`}
                  src={activeGame === "chess" ? "/games/chess.html" : "/games/snake.html"}
                  className="w-full h-full border-none"
                  title={activeGame === "chess" ? "Chess Game" : "Snake Game"}
                />
              </div>
            </div>
          )}

          {/* TAB 2: ACTIVE PROTOTYPES (Interactive Code Inspectors) */}
          {activeTab === "prototypes" && (
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] h-full overflow-hidden">
              {/* Left Prototype List */}
              <div className="p-4 sm:p-6 overflow-y-auto border-r border-white/10 space-y-3 bg-[var(--color-bg-card)]/90">
                <p className="text-[10px] font-mono uppercase tracking-wider text-white/40 mb-2">
                  Select Experiment
                </p>
                {LAB_EXPERIMENTS.map((exp) => {
                  const isSelected = selectedExperiment.id === exp.id;
                  return (
                    <button
                      key={exp.id}
                      onClick={() => setSelectedExperiment(exp)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col space-y-2 ${
                        isSelected
                          ? "bg-[rgb(var(--atlas-gold) / 0.15)] border-[rgb(var(--atlas-gold) / 0.45)] shadow-[0_4px_20px_rgb(var(--atlas-gold) / 0.15)]"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-[var(--color-gold)] font-bold">{exp.code}</span>
                        <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/70">
                          {exp.status}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                      <p className="text-xs text-white/60 line-clamp-2">{exp.tagline}</p>
                    </button>
                  );
                })}
              </div>

              {/* Right Prototype Details & Code Inspector */}
              <div className="p-6 overflow-y-auto space-y-6 bg-[var(--color-bg)]">
                <div className="space-y-2 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[var(--color-gold)] font-bold">{selectedExperiment.code}</span>
                    <span className="text-white/30">•</span>
                    <span className="text-xs font-mono text-white/50">{selectedExperiment.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedExperiment.title}</h3>
                  <p className="text-xs text-white/70">{selectedExperiment.description}</p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  {selectedExperiment.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                      <p className="text-[10px] font-mono text-white/40 uppercase">{m.label}</p>
                      <p className="text-sm font-extrabold text-[var(--color-gold)] mt-0.5">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Code Snippet */}
                {selectedExperiment.codeSnippet && (
                  <div className="space-y-2">
                    <p className="text-[10px] font-mono uppercase text-white/40 flex items-center gap-1.5">
                      <Code2 className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      <span>Code Schema / Engine Logic</span>
                    </p>
                    <pre className="p-4 rounded-xl bg-[var(--color-bg)] border border-white/10 font-mono text-xs text-amber-200/90 overflow-x-auto">
                      <code>{selectedExperiment.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Lesson Callout */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-[rgb(var(--atlas-gold) / 0.12)] to-transparent border border-[rgb(var(--atlas-gold) / 0.3)] space-y-1">
                  <p className="text-[10px] font-mono font-bold uppercase text-[var(--color-gold)] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Lesson Learned</span>
                  </p>
                  <p className="text-xs text-white/85 leading-relaxed font-mono">
                    {selectedExperiment.lesson}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAILED & LEARNED (Post-Mortem Logs) */}
          {activeTab === "failures" && (
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[var(--color-bg)]">
              <div className="max-w-xl mx-auto text-center space-y-2">
                <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-gold)]">
                  The Post-Mortem Wall
                </p>
                <h3 className="text-lg font-bold text-white">How Failure Directly Informs Craftsmanship</h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  Every world-class system is built on top of past failed prototypes. Here are documented lessons from engineering attempts in Atlas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {LAB_EXPERIMENTS.map((exp) => (
                  <div key={exp.id} className="p-5 rounded-2xl bg-[#0e0e14] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-[var(--color-gold)] font-bold">{exp.code}</span>
                      <span className="text-[9.5px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-red-500/15 text-red-300 border border-red-500/30">
                        {exp.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{exp.title}</h4>
                    <p className="text-xs text-white/65 leading-relaxed">{exp.tagline}</p>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-amber-200/90 font-mono italic">
                      &ldquo;{exp.lesson}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
