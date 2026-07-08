import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Builder's Journal — The Study" };

const journalEntries = [
  {
    date: "June 29, 2026",
    category: "Design",
    title: "Cinematic Arrival Architecture",
    excerpt: "Why digital headquarters should welcome visitors through environmental storytelling rather than traditional list grids.",
    content: "When a visitor enters a website, they are stepping into a creator's digital home. If the first thing they see is a grid of static cards, we have failed to establish atmosphere. The desk objects in the Entrance Hall are interactive clues to Vaibhav's mindset: the camera represents perspective, the plant represents slow incremental learning, the mechanical pencil represents design precision."
  },
  {
    date: "May 14, 2026",
    category: "Engineering",
    title: "The Architecture of Empathy",
    excerpt: "Designing database schemas that recognize emotional journey flows. Reflections on building Solace.",
    content: "Most software architectures treat users as rows in a DB. But what if we model user progress as a continuous path of reflections? When developing Solace, we prioritized audit logging that captures user context, mood shifts and pivot milestones. Empathy isn't just an interface feature; it needs to be structural."
  },
  {
    date: "April 02, 2026",
    category: "AI",
    title: "Useful AI over Spectacle",
    excerpt: "Avoiding the temptation of generic LLM wrappers. Focus on building tools that reduce cognitive load.",
    content: "We don't need another chatbot that summarizes text. We need smart tools that fit cleanly inside human workflows. Designing AI with high craftsmanship means designing contextual agency, where models only execute when they have verified intent, keeping the user in full control."
  }
];

export default function JournalPage() {
  const chapter = getIdentityChapter("journal");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>
      {/* Journal Entries List */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Writing Desk</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Honest reflections on building and learning.</h2>

        <div className="space-y-6 max-w-4xl">
          {journalEntries.map((e) => (
            <article key={e.title} className="atlas-card p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="w-full md:w-36 flex-shrink-0 font-mono text-xs text-atlas-muted space-y-1">
                <p className="font-semibold text-atlas-gold">{e.date}</p>
                <p className="uppercase tracking-wider text-[10px]">{e.category}</p>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-atlas-white leading-snug">{e.title}</h3>
                <p className="text-xs text-atlas-ink/80 mt-2 font-mono italic">{e.excerpt}</p>
                <p className="text-xs text-atlas-ink/60 mt-4 leading-relaxed">{e.content}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Philosophy Callout */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="atlas-card p-6 text-center max-w-2xl mx-auto bg-gradient-to-r from-atlas-gold/5 via-transparent to-atlas-gold/5">
          <p className="font-caveat text-2xl text-atlas-gold mb-2">The Builder Motto</p>
          <blockquote className="text-sm italic text-atlas-ink/75 leading-relaxed">
            &ldquo;Build experiences people remember. Build products that matter.&rdquo;
          </blockquote>
        </div>
      </section>
    </XP_RoomPage>
  );
}
