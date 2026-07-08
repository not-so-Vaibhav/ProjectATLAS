import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "The Lab — Experiments" };

const experiments = [
  {
    code: "EXP-01",
    title: "Particle Grid Interaction",
    status: "Failed",
    lesson: "Attempted to use high-density SVG lines for a particle grid background. It caused frame rate drops to 30 FPS on mobile. Optimized it by switching to light CSS variables and low-count motion paths.",
  },
  {
    code: "EXP-02",
    title: "Empathy Context Mapping",
    status: "Prototype",
    lesson: "Built a quick NLP classifier to read founder logs and map them to startup milestones. Successfully grouped typical developer anxiety phases, now integrated as the core concept for Solace.",
  },
  {
    code: "EXP-03",
    title: "Dynamic Weather Ambience",
    status: "Unreleased",
    lesson: "Integrating a weather API to subtly shift the Entrance Hall lighting between rainy, sunny, and evening twilight based on the visitor's local timezone. Kept on standby to avoid unnecessary client requests.",
  }
];

export default function LabPage() {
  const chapter = getIdentityChapter("lab");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>
      {/* Experiment List */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Prototype Workbench</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6 font-mono tracking-tight text-neon-gold">experiment · fail · learn · repeat</h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp) => (
            <div key={exp.code} className="atlas-card p-5 relative overflow-hidden">
              {/* status indicator */}
              <div className="absolute top-4 right-4">
                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded ${
                  exp.status === "Failed"
                    ? "bg-red-500/10 text-red-400 border border-red-500/20"
                    : exp.status === "Prototype"
                    ? "bg-atlas-green/15 text-atlas-green border border-atlas-green/30"
                    : "bg-atlas-gold/10 text-atlas-gold border border-atlas-gold/25"
                }`}>
                  {exp.status}
                </span>
              </div>

              <span className="text-[10px] font-mono text-atlas-muted">{exp.code}</span>
              <h3 className="text-sm font-bold text-atlas-white mt-1.5 mb-3">{exp.title}</h3>
              
              <div className="p-3 bg-atlas-black/30 rounded border border-atlas-line/5 text-xs">
                <p className="text-[10px] font-mono text-atlas-gold uppercase mb-1">Lesson learned</p>
                <p className="text-atlas-ink/65 leading-relaxed font-mono text-[11px]">{exp.lesson}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lab Warning / Context */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="atlas-card p-6 border-dashed max-w-3xl mx-auto border-atlas-line/20 bg-atlas-gold/5 text-center">
          <p className="text-sm font-semibold text-atlas-white uppercase tracking-wider mb-2">Notice to Explorers</p>
          <p className="text-xs text-atlas-ink/70 leading-relaxed max-w-xl mx-auto">
            The items in The Lab are sandbox prototypes. They exist to showcase how failure directly informs craftsmanship. If you find a broken interface or experiment here, it is left intentionally to show the process.
          </p>
        </div>
      </section>
    </XP_RoomPage>
  );
}
