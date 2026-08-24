"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, BriefcaseBusiness, Camera, Code2, Compass, FlaskConical, Home, Mail, NotebookPen, PenTool, Telescope } from "lucide-react";
import { identityChapters } from "@/data/identity-chapters";
import { cx } from "@/lib/utils";
import type { BuilderIdentity } from "@/types/atlas";

const icons: Record<BuilderIdentity, typeof Home> = {
  arrival: Home,
  engineering: Code2,
  founder: BriefcaseBusiness,
  designer: PenTool,
  ai: Brain,
  photography: Camera,
  journal: NotebookPen,
  lab: FlaskConical,
  future: Telescope,
  contact: Mail,
  "my-work": Compass
};

export function XP_Navigation() {
  const pathname = usePathname();
  const visibleChapters = identityChapters.filter((chapter) => chapter.visibleInPrimaryNavigation);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--radius-small)] focus:bg-atlas-white focus:px-4 focus:py-2 focus:text-atlas-black"
      >
        Skip to main content
      </a>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-atlas-line/8 bg-atlas-black/72 backdrop-blur-xl">
        <nav className="atlas-container flex min-h-20 items-center justify-between gap-4" aria-label="Identity journey">
          <Link href="/" className="flex items-center gap-3 font-semibold text-atlas-white">
            <Compass className="h-5 w-5 text-atlas-gold" aria-hidden="true" />
            <span>Atlas</span>
          </Link>
          <div className="hidden items-center gap-1 lg:flex">
            {visibleChapters.map((chapter) => {
              const Icon = icons[chapter.id];
              const isActive = pathname === chapter.path;

              return (
                <Link
                  key={chapter.id}
                  href={chapter.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cx(
                    "inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-small)] px-3 text-sm text-atlas-ink/68 transition duration-[var(--duration-micro)] ease-[var(--ease-atlas)] hover:bg-atlas-glass/9 hover:text-atlas-white",
                    isActive && "bg-atlas-glass/12 text-atlas-white"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {chapter.label}
                </Link>
              );
            })}
          </div>
          <details className="relative lg:hidden">
            <summary className="list-none rounded-[var(--radius-small)] border border-atlas-line/10 px-4 py-2 text-sm font-medium text-atlas-ink">
              Identities
            </summary>
            <div className="absolute right-0 top-12 grid w-64 gap-1 rounded-[var(--radius-medium)] border border-atlas-line/10 bg-atlas-black/95 p-2 shadow-glass">
              {visibleChapters.map((chapter) => {
                const Icon = icons[chapter.id];
                const isActive = pathname === chapter.path;

                return (
                  <Link
                    key={chapter.id}
                    href={chapter.path}
                    aria-current={isActive ? "page" : undefined}
                    className={cx(
                      "flex min-h-11 items-center gap-3 rounded-[var(--radius-small)] px-3 text-sm text-atlas-ink/72",
                      isActive && "bg-atlas-glass/12 text-atlas-white"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {chapter.label}
                  </Link>
                );
              })}
            </div>
          </details>
        </nav>
      </header>
    </>
  );
}
