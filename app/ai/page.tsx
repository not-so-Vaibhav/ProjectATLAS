import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "AI — Intelligence" };

const areas = [
  { title: "Large Language Models",    desc: "Building agentic systems that reason, plan and execute complex tasks autonomously.", tag: "LLMs" },
  { title: "Natural Language Processing", desc: "Understanding human communication to create meaningful human-computer interactions.", tag: "NLP" },
  { title: "AI Products",             desc: "Translating AI research into products that solve real human problems at scale.", tag: "Products" },
  { title: "Automation & Agents",     desc: "Designing autonomous systems that reduce friction in meaningful workflows.", tag: "Agents" },
];

const research = [
  { q: "How can AI make healthcare more empathetic?",   domain: "Healthcare" },
  { q: "Can LLMs personalize education at scale?",      domain: "Education" },
  { q: "What does human-AI collaboration look like?",   domain: "Productivity" },
  { q: "How do we make AI explainable and trustworthy?", domain: "Trust" },
];

export default function AIPage() {
  const chapter = getIdentityChapter("ai");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>

      {/* Focus Areas */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Research Desk</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">AI as investigation, not spectacle.</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {areas.map((a) => (
            <div key={a.title} className="atlas-card p-5 border-l-2" style={{ borderLeftColor: "var(--color-green)" }}>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-sm font-semibold text-atlas-white">{a.title}</h3>
                <span className="text-[8px] font-mono px-2 py-0.5 rounded border text-atlas-green border-atlas-green/30 bg-atlas-green/5 flex-shrink-0">
                  {a.tag}
                </span>
              </div>
              <p className="text-xs text-atlas-ink/60 leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Questions */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Open Questions</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Useful technology connects AI back to humans.</h2>
        <div className="space-y-3">
          {research.map((r, i) => (
            <div key={r.q} className="atlas-card p-4 flex items-start gap-4">
              <span className="text-[9px] font-mono text-atlas-green/60 mt-0.5 flex-shrink-0">Q{String(i+1).padStart(2,"0")}</span>
              <div className="flex-1">
                <p className="text-sm text-atlas-ink/80">{r.q}</p>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded border text-atlas-muted flex-shrink-0"
                style={{ borderColor: "var(--color-border)" }}>
                {r.domain}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Automation Board */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Automation Board</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Technologies in the toolkit.</h2>
        <div className="flex flex-wrap gap-2">
          {["OpenAI", "LangChain", "Pinecone", "Supabase", "FastAPI", "Hugging Face", "Agents", "RAG", "Fine-tuning", "Embeddings", "Vector DBs", "NLP"].map((tech) => (
            <span key={tech} className="text-xs px-3 py-1.5 rounded-full border font-mono font-medium text-atlas-green"
              style={{ borderColor: "rgb(var(--atlas-green) / 0.3)", background: "rgb(var(--atlas-green) / 0.06)" }}>
              {tech}
            </span>
          ))}
        </div>
      </section>

    </XP_RoomPage>
  );
}
