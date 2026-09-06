import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";
import { Layers, Palette, Eye, Sparkles, Compass, Sliders, Box, Type, MousePointer2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Designer — Craft & Systems | Project Atlas",
  description: "Design is the discipline of making care visible. Explore the design systems, interaction thinking, and craftsmanship behind Project Atlas.",
};

const principles = [
  {
    icon: Eye,
    title: "Care Made Visible",
    desc: "Every margin, transition curve, and micro-interaction communicates intentionality and respect for the user's attention.",
  },
  {
    icon: Layers,
    title: "Systems Over Chaos",
    desc: "Design begins with rigid tokens and scalable foundations so creativity can compound without entropy.",
  },
  {
    icon: Compass,
    title: "Humane Interfaces",
    desc: "Software should reduce cognitive friction, honor human pace, and bring emotional clarity to complex workflows.",
  },
  {
    icon: Sparkles,
    title: "Tactile Digital Craft",
    desc: "Bringing physical weight, acoustic intuition, and delightful physics to modern spatial interfaces.",
  },
];

const designSystemTokens = [
  {
    category: "Typography",
    icon: Type,
    items: [
      { name: "Display Interface", value: "Inter / Sans-serif — Precision legibility" },
      { name: "Code Monospace", value: "JetBrains Mono — Technical rigor" },
      { name: "Editorial Script", value: "Caveat — Handcrafted builder notes" },
    ],
  },
  {
    category: "Color Palette",
    icon: Palette,
    items: [
      { name: "Atlas Gold", value: "rgb(199, 169, 102) — Focal warmth" },
      { name: "Atlas Deep Ink", value: "rgb(8, 8, 8) / rgb(14, 14, 14) — Cosmic void" },
      { name: "Organic Sage", value: "rgb(126, 148, 125) — Grounded calm" },
    ],
  },
  {
    category: "Interaction & Physics",
    icon: MousePointer2,
    items: [
      { name: "Spring Curves", value: "cubic-bezier(0.22, 1, 0.36, 1) — Natural deceleration" },
      { name: "Micro Timing", value: "160ms micro, 280ms component, 620ms room" },
      { name: "Gaze Spring", value: "Stiffness 0.12, Damping 0.70 — Responsive tracking" },
    ],
  },
];

const caseStudies = [
  {
    title: "Solace Empathy Architecture",
    tag: "Product Design & UX",
    desc: "Designed an AI reflection workspace helping startup founders navigate ambiguity, process setbacks, and build mental resilience.",
    deliverables: ["User Journey Maps", "Interactive Micro-Journaling", "Figma Design System"],
  },
  {
    title: "Atlas Living Headquarters",
    tag: "Design System & Motion",
    desc: "Architected a room-based digital headquarters replacing static resume pages with immersive 3D, physics, and scroll-driven spatial storytelling.",
    deliverables: ["Spatial Grid", "Custom Motion Engine", "Dual Theme Palette"],
  },
  {
    title: "NotSoGraphy Visual Language",
    tag: "Visual & Editorial Design",
    desc: "Crafted an evocative editorial showcase framing photography as an observational discipline connected to engineering craft.",
    deliverables: ["Visual Identity", "Aperture Animation System", "Curated Photo Essays"],
  },
];

export default function DesignerPage() {
  const chapter = getIdentityChapter("designer");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>

      {/* ── Design Philosophy ─────────────────────────────────── */}
      <section className="px-6 py-12 lg:px-12" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="atlas-kicker mb-2">Design Philosophy</p>
          <h2 className="text-2xl md:text-3xl font-bold text-atlas-white tracking-tight mb-8">
            Principles that guide every interface.
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="atlas-card p-6 flex flex-col justify-between group hover:border-atlas-gold/40 transition-colors">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-9 h-9 rounded-lg bg-atlas-gold/10 border border-atlas-gold/25 flex items-center justify-center text-atlas-gold">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-[10px] font-mono text-atlas-gold/60 tracking-widest">0{i + 1}</span>
                    </div>
                    <h3 className="text-base font-bold text-atlas-white mb-2 group-hover:text-atlas-gold transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-atlas-ink/70 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Design System Foundations ─────────────────────────── */}
      <section className="px-6 py-12 lg:px-12" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="atlas-kicker mb-2">Design System</p>
          <h2 className="text-2xl md:text-3xl font-bold text-atlas-white tracking-tight mb-8">
            Foundations, tokens & ergonomics.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {designSystemTokens.map((sys) => {
              const Icon = sys.icon;
              return (
                <div key={sys.category} className="atlas-card p-6">
                  <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[var(--color-border)]">
                    <Icon className="w-4 h-4 text-atlas-gold" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-atlas-white">
                      {sys.category}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {sys.items.map((it) => (
                      <li key={it.name} className="text-xs">
                        <span className="font-semibold text-atlas-white block mb-0.5">{it.name}</span>
                        <span className="text-atlas-ink/65 font-mono text-[11px] leading-relaxed">{it.value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Design Case Studies ──────────────────────────────── */}
      <section className="px-6 py-12 lg:px-12" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="max-w-6xl mx-auto">
          <p className="atlas-kicker mb-2">Selected Case Studies</p>
          <h2 className="text-2xl md:text-3xl font-bold text-atlas-white tracking-tight mb-8">
            Craft applied to real-world problems.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((cs) => (
              <div key={cs.title} className="atlas-card p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-atlas-gold mb-2 block">
                    {cs.tag}
                  </span>
                  <h3 className="text-lg font-bold text-atlas-white mb-3">
                    {cs.title}
                  </h3>
                  <p className="text-xs text-atlas-ink/70 leading-relaxed mb-6">
                    {cs.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--color-border)]">
                  <p className="text-[10px] font-mono text-atlas-muted mb-2 uppercase tracking-wider">Deliverables:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.deliverables.map((del) => (
                      <span key={del} className="text-[10px] px-2 py-0.5 rounded bg-atlas-surface border border-[var(--color-border)] text-atlas-ink/80 font-mono">
                        {del}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </XP_RoomPage>
  );
}
