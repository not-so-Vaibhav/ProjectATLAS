import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Photography — Perspective" };

const collections = [
  {
    title: "Sacred Places",
    description: "Capturing the serene quiet of morning mist rising around ancient temples and mountains.",
    image: "/photography_mist.png",
    meta: "Fuji XT-5 · 35mm · ISO 160",
  },
  {
    title: "The Summit Silhouette",
    description: "Golden hour over mountain paths, observing how light defines geometry.",
    image: "/photography_mountain.png",
    meta: "Fuji XT-5 · 50mm · ISO 100",
  },
  {
    title: "Tokyo Reflection",
    description: "Tokyo streets after midnight, rain washing the neon signs into wet pavement.",
    image: "/photography_street.png",
    meta: "Fuji XT-5 · 23mm · ISO 800",
  },
];

export default function PhotographyPage() {
  const chapter = getIdentityChapter("photography");
  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>
      {/* Gallery Section */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <p className="atlas-kicker mb-2">Welcome Gallery</p>
        <h2 className="text-xl font-semibold text-atlas-white mb-6">Observations captured with intention.</h2>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <div key={c.title} className="atlas-card overflow-hidden flex flex-col justify-between group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-atlas-white">{c.title}</h3>
                  <p className="text-xs text-atlas-ink/65 mt-1.5 leading-relaxed">{c.description}</p>
                </div>
                <div className="mt-4 pt-3 border-t flex justify-between items-center text-[10px] text-atlas-muted font-mono" style={{ borderColor: "var(--color-border)" }}>
                  <span>{c.meta}</span>
                  <span className="text-atlas-gold font-semibold uppercase tracking-wider">Perspective</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Observation Notes */}
      <section className="px-6 py-10 lg:px-10" style={{ borderBottom: "1px solid var(--color-border)" }}>
        <div className="atlas-card p-6 max-w-4xl mx-auto">
          <p className="atlas-kicker mb-2">Observation Notes</p>
          <h3 className="text-lg font-semibold text-atlas-white mb-3">How visual attention shapes product thinking.</h3>
          <p className="text-xs leading-relaxed text-atlas-ink/70 mb-4">
            Photography is a school of attention. By forcing oneself to wait for the right light, to align a frame precisely, and to eliminate noise from a composition, one learns how to focus on what truly matters.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div className="p-3 bg-atlas-black/20 rounded border border-atlas-line/5">
              <p className="font-semibold text-atlas-gold mb-1">Focus</p>
              <p className="text-atlas-muted text-[11px] leading-normal">Eliminate extraneous UI/UX details just as you crop distracting background elements.</p>
            </div>
            <div className="p-3 bg-atlas-black/20 rounded border border-atlas-line/5">
              <p className="font-semibold text-atlas-gold mb-1">Light</p>
              <p className="text-atlas-muted text-[11px] leading-normal">Guide the user&apos;s eyes using contrast, typography, and clean white space spacing.</p>
            </div>
            <div className="p-3 bg-atlas-black/20 rounded border border-atlas-line/5">
              <p className="font-semibold text-atlas-gold mb-1">Patience</p>
              <p className="text-atlas-muted text-[11px] leading-normal">Wait for the complete understanding of a human problem before proposing architectural code.</p>
            </div>
          </div>
        </div>
      </section>
    </XP_RoomPage>
  );
}
