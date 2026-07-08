import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { identityChapters } from "@/data/identity-chapters";
import { UI_Badge } from "@/components/foundation/UI_Badge";
import { UI_Button } from "@/components/foundation/UI_Button";
import { UI_Card } from "@/components/foundation/UI_Card";
import { UI_SectionHeading } from "@/components/foundation/UI_SectionHeading";
import { XP_Builder } from "@/components/builder/XP_Builder";
import { XP_Motion } from "@/components/experience/XP_Motion";
import type { IdentityChapter } from "@/types/atlas";

export function XP_IdentityChapter({ chapter }: { chapter: IdentityChapter }) {
  const nextChapter = identityChapters.find((item) => item.id === chapter.nextId);

  return (
    <main id="main-content">
      <section className="atlas-container grid min-h-[calc(100vh-5rem)] gap-10 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <XP_Motion>
          <p className="atlas-kicker">{chapter.label}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-atlas-white md:text-7xl">
            {chapter.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-atlas-ink/76">{chapter.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {nextChapter ? (
              <UI_Button href={nextChapter.path}>
                Continue to {nextChapter.label}
                <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </UI_Button>
            ) : null}
            <UI_Button href="/experience" variant="secondary">
              Builder&apos;s Collection
            </UI_Button>
          </div>
        </XP_Motion>
        <XP_Motion delay={0.08}>
          <XP_Builder chapter={chapter} />
        </XP_Motion>
      </section>

      <section className="border-y border-atlas-line/8 bg-atlas-black/24 py-20">
        <div className="atlas-container">
          <UI_SectionHeading
            kicker="Identity Environment"
            title={chapter.question}
            summary={chapter.environment}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            <UI_Badge>{chapter.atmosphere}</UI_Badge>
            <UI_Badge>Continuous journey</UI_Badge>
            <UI_Badge>Builder-led</UI_Badge>
          </div>
        </div>
      </section>

      <section className="atlas-container py-20">
        <UI_SectionHeading
          kicker="Story Zones"
          title={`${chapter.label} is an identity, not a generic page.`}
          summary="Each zone preserves the documented rhythm: purpose, story, work, lessons and the next question."
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chapter.zones.map((zone) => (
            <UI_Card key={zone.title}>
              <h3 className="text-xl font-semibold text-atlas-white">{zone.title}</h3>
              <p className="mt-3 text-sm leading-7 text-atlas-ink/70">{zone.purpose}</p>
              <ul className="mt-5 space-y-2 text-sm text-atlas-ink/68">
                {zone.details.map((detail) => (
                  <li key={detail} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-atlas-gold/75" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </UI_Card>
          ))}
        </div>
      </section>

      <section className="atlas-container pb-24">
        <div className="rounded-[var(--radius-large)] border border-atlas-line/10 bg-atlas-glass/6 p-8 md:p-10">
          <p className="atlas-kicker">Connected Journey</p>
          <h2 className="mt-3 text-3xl font-semibold text-atlas-white">
            Atlas remains one headquarters across every identity.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-atlas-ink/72">
            The Builder changes outfit, workspace and behavior according to the identity being explored,
            but the product language, motion standards, accessibility commitments and storytelling
            philosophy remain consistent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {identityChapters
              .filter((item) => item.visibleInPrimaryNavigation)
              .map((item) => (
                <Link
                  key={item.id}
                  href={item.path}
                  className="rounded-full border border-atlas-line/10 px-4 py-2 text-sm text-atlas-ink/72 transition hover:bg-atlas-glass/10 hover:text-atlas-white"
                >
                  {item.label}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
