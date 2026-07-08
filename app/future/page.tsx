import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Future — Horizon" };

const roadmaps = [
  {
    horizon: "Horizon 1",
    focus: "Solace Validation",
    description: "Publish public research papers on developer/founder emotional patterns. Release the interactive Solace reflection dashboard.",
    time: "Late 2026",
  },
  {
    horizon: "Horizon 2",
    focus: "Atlas Core Engine Integration",
    description: "Launch Next.js App Router templates built on the design constitutuion guidelines for fellow builders to customize.",
    time: "Early 2027",
  },
  {
    horizon: "Horizon 3",
    focus: "Intelligent Systems",
    description: "Develop agentic AI tools that proactively collaborate on product layouts, system architectures and design token alignments.",
    time: "Future Horizon",
  }
];

export default function FuturePage() {
  const chapter = getIdentityChapter("future");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>
      {/* Learning Roadmap */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Learning Roadmap</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Continuous learning areas for the builder.</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="atlas-card p-5">
            <p className="text-xs font-bold text-atlas-gold mb-2 uppercase font-mono">Agentic AI Architecture</p>
            <p className="text-xs text-atlas-ink/65 leading-relaxed">
              Studying multi-agent coordination frameworks, persistent memories, and task execution logic to build software that operates autonomously with human checkpoints.
            </p>
          </div>
          <div className="atlas-card p-5">
            <p className="text-xs font-bold text-atlas-gold mb-2 uppercase font-mono">Interaction Motion Systems</p>
            <p className="text-xs text-atlas-ink/65 leading-relaxed">
              Diving deeper into Framer Motion, layout ID shared transitions, and custom web animations to make complex digital spaces feel calm and spatial.
            </p>
          </div>
          <div className="atlas-card p-5">
            <p className="text-xs font-bold text-atlas-gold mb-2 uppercase font-mono">Founding & Capital Strategy</p>
            <p className="text-xs text-atlas-ink/65 leading-relaxed">
              Understanding company creation frameworks, early-stage product validation strategies, and founder resilience architectures to build viable businesses.
            </p>
          </div>
        </div>
      </section>

      {/* Vision Wall */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Vision Wall</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">The Horizon Timeline.</h2>
        
        <div className="space-y-4 max-w-4xl">
          {roadmaps.map((r, i) => (
            <div key={r.horizon} className="atlas-card p-5 md:p-6 flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-36 flex-shrink-0 font-mono text-xs text-atlas-muted">
                <p className="font-semibold text-atlas-gold">{r.horizon}</p>
                <p className="text-[10px] mt-0.5">{r.time}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-atlas-white leading-snug">{r.focus}</h3>
                <p className="text-xs text-atlas-ink/65 mt-2 leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </XP_RoomPage>
  );
}
