import type { IdentityChapter } from "@/types/atlas";
import { UI_Badge } from "@/components/foundation/UI_Badge";

const accentClasses: Record<IdentityChapter["accent"], string> = {
  wood: "from-atlas-wood/28",
  green: "from-atlas-green/26",
  gold: "from-atlas-gold/28",
  glass: "from-atlas-glass/18",
  blue: "from-blue-500/28"
};

export function XP_Builder({ chapter }: { chapter: IdentityChapter }) {
  return (
    <aside
      className="atlas-glass relative overflow-hidden rounded-[var(--radius-large)] p-6"
      aria-labelledby="builder-presence"
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-gradient-to-br ${accentClasses[chapter.accent]} to-transparent`}
      />
      <div className="relative z-10 grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
        <div className="relative min-h-72 rounded-[var(--radius-medium)] border border-atlas-line/10 bg-atlas-black/45 p-5">
          <div className="absolute left-1/2 top-8 h-16 w-16 -translate-x-1/2 rounded-full border border-atlas-line/20 bg-atlas-ink/88" />
          <div className="absolute left-1/2 top-24 h-28 w-20 -translate-x-1/2 rounded-t-[2rem] border border-atlas-line/15 bg-atlas-black" />
          <div className="absolute left-[calc(50%-3.25rem)] top-32 h-20 w-4 rotate-6 rounded-full bg-atlas-ink/72" />
          <div className="absolute right-[calc(50%-3.25rem)] top-32 h-20 w-4 -rotate-6 rounded-full bg-atlas-ink/72" />
          <div className="absolute left-[calc(50%-1.75rem)] top-52 h-20 w-4 rounded-full bg-atlas-muted/70" />
          <div className="absolute right-[calc(50%-1.75rem)] top-52 h-20 w-4 rounded-full bg-atlas-muted/70" />
          <div className="absolute bottom-5 left-5 right-5 rounded-[var(--radius-small)] border border-atlas-line/10 bg-atlas-glass/8 px-4 py-3 text-center text-xs text-atlas-ink/70">
            The Builder stays quiet and keeps working.
          </div>
        </div>
        <div>
          <p className="atlas-kicker" id="builder-presence">
            Builder Presence
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-atlas-white">{chapter.builderOutfit}</h2>
          <p className="mt-4 text-sm leading-7 text-atlas-ink/72">{chapter.builderBehavior}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {chapter.builderEquipment.map((item) => (
              <UI_Badge key={item}>{item}</UI_Badge>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
