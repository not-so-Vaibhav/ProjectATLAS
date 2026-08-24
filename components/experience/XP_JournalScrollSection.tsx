"use client";

import { useRef, useState, useEffect, useMemo, RefObject } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { JOURNAL_ENTRIES, type JournalEntry } from "@/data/journal-data";
import { XP_JournalFilterSearch } from "@/components/journal/XP_JournalFilterSearch";
import { XP_JournalCard } from "@/components/journal/XP_JournalCard";
import { XP_JournalReaderModal } from "@/components/journal/XP_JournalReaderModal";
import { XP_BookshelfWidget } from "@/components/journal/XP_BookshelfWidget";
import { XP_ReflectionWall } from "@/components/journal/XP_ReflectionWall";
import { Feather, FileText, Sparkles, BookOpen } from "lucide-react";

const CATEGORIES = [
  "All",
  "Engineering & AI",
  "Design & UI",
  "Founder Notes",
  "Photography",
];

interface Props {
  scrollContainerRef: RefObject<HTMLDivElement | null>;
}

export function XP_JournalScrollSection({ scrollContainerRef }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const tlRef      = useRef<gsap.core.Timeline | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  // Load bookmarks from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("atlas_journal_bookmarks");
      if (saved) setBookmarkedIds(JSON.parse(saved));
    } catch (e) {
      console.error("Failed to load journal bookmarks", e);
    }
  }, []);

  // Save bookmarks to LocalStorage
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id];
      try {
        localStorage.setItem("atlas_journal_bookmarks", JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save journal bookmarks", e);
      }
      return next;
    });
  };

  // Filtered entries memo
  const filteredEntries = useMemo(() => {
    return JOURNAL_ENTRIES.filter((entry) => {
      if (selectedCategory !== "All" && entry.category !== selectedCategory) {
        return false;
      }
      if (showOnlyBookmarked && !bookmarkedIds.includes(entry.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = entry.title.toLowerCase().includes(q);
        const matchesSubtitle = entry.subtitle.toLowerCase().includes(q);
        const matchesExcerpt = entry.excerpt.toLowerCase().includes(q);
        const matchesCategory = entry.category.toLowerCase().includes(q);
        const matchesTags = entry.tags.some((t) => t.toLowerCase().includes(q));
        return matchesTitle || matchesSubtitle || matchesExcerpt || matchesCategory || matchesTags;
      }
      return true;
    });
  }, [searchQuery, selectedCategory, showOnlyBookmarked, bookmarkedIds]);

  /* ── Arrival & Exit Scroll Animation ───────────────────────────── */
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Set initial states for entrance
      gsap.set(".jnl-left-panel", { opacity: 0, x: -60 });
      gsap.set(".jnl-right-panel", { opacity: 0, x: 60 });
      gsap.set(".jnl-title-word", { opacity: 0, y: 35, rotateX: -30, filter: "blur(6px)" });
      gsap.set(".jnl-kicker, .jnl-sub, .jnl-stats", { opacity: 0, y: 24 });
      gsap.set(".jnl-divider", { scaleX: 0, transformOrigin: "center center" });
      gsap.set(".jnl-img-card", { opacity: 0, scale: 0.92, y: 30 });

      const tl = gsap.timeline({ paused: true });

      tl.to([".jnl-left-panel", ".jnl-right-panel"], {
        opacity: 1, x: 0, duration: 0.75, ease: "power3.out", stagger: 0.12
      }, 0)
      .to(".jnl-kicker", { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.2)
      .to(".jnl-title-word", { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)", duration: 0.75, ease: "power4.out" }, 0.3)
      .to(".jnl-divider", { scaleX: 1, duration: 0.5, ease: "power3.out" }, 0.45)
      .to([".jnl-sub", ".jnl-stats"], { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", stagger: 0.1 }, 0.55)
      .to(".jnl-img-card", { opacity: 1, scale: 1, y: 0, duration: 0.75, ease: "back.out(1.4)" }, 0.65);

      tlRef.current = tl;
    }, sectionRef);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tlRef.current?.play();
        } else {
          tlRef.current?.reverse();
        }
      });
    }, { threshold: 0.12 });

    if (section) observer.observe(section);
    return () => { observer.disconnect(); ctx.revert(); };
  }, { scope: sectionRef });

  return (
    <section
      id="journal"
      data-section
      ref={sectionRef}
      className="snap-slide relative w-full h-[100dvh] overflow-hidden bg-[var(--color-bg)] flex flex-col"
      aria-label="Builder's Journal Section"
    >
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[rgb(var(--atlas-gold) / 0.1)] via-[rgb(var(--atlas-gold) / 0.03)] to-transparent blur-3xl pointer-events-none" />

      {/* ── 50-50 SPLIT LAYOUT ───────────────────────────────────────── */}
      <div
        className="flex-1 flex flex-col lg:grid lg:grid-cols-2 overflow-y-auto lg:overflow-hidden w-full"
        style={{ paddingTop: "var(--topbar-height)" }}
      >
        {/* ── HERO STUDY HEADER (Top 50% on Mobile, Right 50% on Desktop) ────── */}
        <div className="jnl-right-panel order-1 lg:order-2 relative flex flex-col items-center justify-center p-5 sm:p-8 lg:p-10 overflow-y-auto bg-gradient-to-br from-[var(--color-bg-card)] via-[var(--color-bg-card)] to-[var(--color-bg)] space-y-4 sm:space-y-6 border-b lg:border-b-0 lg:border-l border-atlas-white/10 shrink-0">
          {/* Ambient Gold Radial Glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(circle at 60% 35%, rgb(var(--atlas-gold) / 0.15) 0%, transparent 65%)"
          }} />

          {/* Header Content Box */}
          <div className="relative z-10 w-full flex flex-col items-center text-center space-y-3 sm:space-y-4 pt-1 sm:pt-2">
            {/* Kicker */}
            <p className="jnl-kicker text-[10px] sm:text-xs font-bold tracking-[0.28em] uppercase flex items-center gap-2 text-[var(--color-gold)]">
              <Feather className="w-3.5 h-3.5" />
              <span>06 / Builder&apos;s Journal</span>
            </p>

            {/* Prominent High-Craft Heading: THE STUDY */}
            <h1 className="jnl-title-word text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight uppercase leading-none">
              <span className="bg-gradient-to-r from-atlas-white via-[var(--color-text)] to-[var(--color-gold)] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgb(var(--atlas-gold) / 0.35)]">
                THE STUDY
              </span>
            </h1>

            {/* Gold Accent Divider */}
            <div className="jnl-divider mx-auto h-[2.5px] w-14 rounded-full bg-[var(--color-gold)] shadow-[0_0_12px_rgb(var(--atlas-gold) / 0.6)]" />

            {/* Subtitle */}
            <p className="jnl-sub text-xs sm:text-sm text-center max-w-md leading-relaxed text-atlas-white/70 font-light">
              The written history of becoming: a quiet notebook of verified lessons, system architecture reflections, product philosophy, and visual notes.
            </p>

            {/* Stat Chips Widget */}
            <div className="jnl-stats flex items-center gap-3 sm:gap-6 p-2.5 sm:p-3.5 px-4 sm:px-6 rounded-2xl bg-[var(--color-bg-card)]/90 border border-atlas-white/10 backdrop-blur-md shadow-[0_10px_35px_rgb(var(--atlas-black) / 0.6)]">
              <div className="text-center">
                <p className="text-xs sm:text-base font-extrabold text-[var(--color-gold)]">{JOURNAL_ENTRIES.length}</p>
                <p className="text-[9px] sm:text-[9.5px] font-mono uppercase text-atlas-white/45">Entries</p>
              </div>
              <div className="w-[1px] h-4 sm:h-6 bg-atlas-white/10" />
              <div className="text-center">
                <p className="text-xs sm:text-base font-extrabold text-atlas-white">45k+</p>
                <p className="text-[9px] sm:text-[9.5px] font-mono uppercase text-atlas-white/45">Words</p>
              </div>
              <div className="w-[1px] h-4 sm:h-6 bg-atlas-white/10" />
              <div className="text-center">
                <p className="text-xs sm:text-base font-extrabold text-[var(--color-gold)]">{CATEGORIES.length - 1}</p>
                <p className="text-[9px] sm:text-[9.5px] font-mono uppercase text-atlas-white/45">Topics</p>
              </div>
            </div>
          </div>

          {/* Mascot Study Image Card */}
          <div className="jnl-img-card relative z-10 w-full max-w-xs sm:max-w-md rounded-2xl overflow-hidden border border-[rgb(var(--atlas-gold) / 0.35)] shadow-[0_16px_50px_rgb(var(--atlas-black) / 0.85)] group bg-[var(--color-bg-card)]">
            <div className="relative aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/vaibhav_notebook.png"
                alt="Vaibhav Bariyar in The Study"
                fill
                priority
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-card)] via-transparent to-transparent" />
            </div>

            <div className="p-2.5 sm:p-4 bg-[var(--color-bg-card)] border-t border-atlas-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                <span className="text-xs font-bold text-atlas-white">Vaibhav Bariyar</span>
              </div>
              <span className="text-[10px] font-mono text-[var(--color-gold)]">The Writing Desk</span>
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE CONTENT COLUMN (Bottom 50% on Mobile, Left 50% on Desktop) ───── */}
        <div className="jnl-left-panel order-2 lg:order-1 relative flex flex-col h-full overflow-y-auto px-4 sm:px-6 py-6 space-y-6 scrollbar-thin bg-[var(--color-bg-card)]/90">
          {/* Top Search & Filter Bar */}
          <div className="sticky top-0 z-20 pt-2 pb-4 bg-[var(--color-bg-card)]/95 backdrop-blur-xl border-b border-atlas-white/10">
            <XP_JournalFilterSearch
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              showOnlyBookmarked={showOnlyBookmarked}
              onToggleShowBookmarked={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              categories={CATEGORIES}
              totalResultsCount={filteredEntries.length}
            />
          </div>

          {/* Articles Cards Grid */}
          <div className="flex-1 space-y-4">
            {filteredEntries.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredEntries.map((entry) => (
                  <XP_JournalCard
                    key={entry.id}
                    entry={entry}
                    onOpen={(e) => setActiveEntry(e)}
                    isBookmarked={bookmarkedIds.includes(entry.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-4 max-w-sm mx-auto">
                <div className="w-12 h-12 rounded-2xl bg-atlas-white/5 border border-atlas-white/10 flex items-center justify-center text-atlas-white/40">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-atlas-white">No entries match your search</h3>
                <p className="text-xs text-atlas-white/50 leading-relaxed">
                  No entries found for &ldquo;{searchQuery}&rdquo;. Try clearing your filters.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setShowOnlyBookmarked(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-[rgb(var(--atlas-gold) / 0.15)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.3)] hover:bg-[rgb(var(--atlas-gold) / 0.25)] transition-all"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

          {/* Reflection Wall Quotes */}
          <div className="pt-6 border-t border-atlas-white/10 pb-8">
            <XP_ReflectionWall />
          </div>
        </div>
      </div>

      {/* ── Reader Desk Fullscreen Modal ───────────────────────────────── */}
      <XP_JournalReaderModal
        entry={activeEntry}
        onClose={() => setActiveEntry(null)}
        onSelectEntry={(e) => setActiveEntry(e)}
        allEntries={JOURNAL_ENTRIES}
        isBookmarked={activeEntry ? bookmarkedIds.includes(activeEntry.id) : false}
        onToggleBookmark={toggleBookmark}
      />
    </section>
  );
}
