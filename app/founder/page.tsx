import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Founder — Mission" };

const principles = [
  { title: "Start with empathy", desc: "Every product begins with a human problem, not a technology idea." },
  { title: "Validate before building", desc: "Assumptions are expensive. Real conversations are cheap." },
  { title: "Build in public", desc: "Sharing progress creates accountability and attracts the right people." },
  { title: "Solve real problems", desc: "The question is never 'can we build this' — it's 'should we'." },
];

const ventures = [
  {
    name: "Solace",
    tagline: "Empathy-driven founder platform",
    problem: "Founders struggle with isolation, self-doubt and lack of structured reflection during the building journey.",
    status: "Active Research",
    phase: "Discovery → Validation",
  },
  {
    name: "Atlas Engine",
    tagline: "Personal digital headquarters framework",
    problem: "Builders lack a living, evolving home for their journey that grows beyond a static portfolio.",
    status: "In Build",
    phase: "MVP → Public",
  },
];

export default function FounderPage() {
  const chapter = getIdentityChapter("founder");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>

      {/* Mission Wall */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Mission Wall</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Founding principles.</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <div key={p.title} className="atlas-card p-5">
              <span className="text-[9px] font-mono text-atlas-gold/60 tracking-widest">0{i + 1}</span>
              <h3 className="text-sm font-semibold text-atlas-white mt-1 mb-2">{p.title}</h3>
              <p className="text-xs text-atlas-ink/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ventures */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Solace Table</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Products in the journey.</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {ventures.map((v) => (
            <div key={v.name} className="atlas-card p-6">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-atlas-white">{v.name}</h3>
                  <p className="text-xs text-atlas-gold mt-0.5">{v.tagline}</p>
                </div>
                <span className="text-[9px] font-semibold px-2.5 py-1 rounded-full bg-atlas-gold/10 text-atlas-gold border border-atlas-gold/25 flex-shrink-0 whitespace-nowrap">
                  {v.status}
                </span>
              </div>
              <p className="text-xs text-atlas-ink/65 leading-relaxed mb-4">{v.problem}</p>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-atlas-muted">Phase:</span>
                <span className="text-[9px] font-mono text-atlas-ink">{v.phase}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vision Timeline */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Vision Timeline</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">The evolution of the builder.</h2>
        <div className="flex flex-col sm:flex-row gap-0">
          {["Engineer", "Founder", "Problem Solver", "Builder"].map((stage, i) => (
            <div key={stage} className="flex-1 relative">
              <div className="flex items-center gap-3 p-4 atlas-card">
                <span className="text-[10px] font-mono text-atlas-gold/50">0{i + 1}</span>
                <span className="text-sm font-semibold text-atlas-white">{stage}</span>
              </div>
              {i < 3 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-3 h-3 rounded-full bg-atlas-gold/40 border border-atlas-gold/60" />
              )}
            </div>
          ))}
        </div>
      </section>

    </XP_RoomPage>
  );
}
