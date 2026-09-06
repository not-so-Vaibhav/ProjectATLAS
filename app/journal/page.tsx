"use client";

import { useState, useEffect, useMemo } from "react";
import { XP_RoomPage } from "@/components/experience/XP_RoomPage";
import { getIdentityChapter } from "@/data/identity-chapters";
import { JOURNAL_ENTRIES, type JournalEntry } from "@/data/journal-data";
import { XP_JournalFilterSearch } from "@/components/journal/XP_JournalFilterSearch";
import { XP_JournalCard } from "@/components/journal/XP_JournalCard";
import { XP_JournalReaderModal } from "@/components/journal/XP_JournalReaderModal";
import { XP_BookshelfWidget } from "@/components/journal/XP_BookshelfWidget";
import { XP_ReflectionWall } from "@/components/journal/XP_ReflectionWall";
import { BookOpen, Sparkles, Feather, FileText, Layers, Compass } from "lucide-react";

const CATEGORIES = [
  "All",
  "Engineering & AI",
  "Design & UI",
  "Founder Notes",
  "Photography",
];

export default function JournalPage() {
  const chapter = getIdentityChapter("journal");
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
      // Category filter
      if (selectedCategory !== "All" && entry.category !== selectedCategory) {
        return false;
      }
      // Bookmark filter
      if (showOnlyBookmarked && !bookmarkedIds.includes(entry.id)) {
        return false;
      }
      // Search query filter
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

  if (!chapter) return null;

  return (
    <XP_RoomPage chapter={chapter}>
      {/* ── Section 1: Study Ambient Header ────────────────────────────────────── */}
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-10 border-b border-[var(--color-border)] overflow-hidden bg-gradient-to-b from-[#101015] to-[var(--color-bg-card)]">
        {/* Subtle ambient lighting bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[rgb(var(--atlas-gold) / 0.12)] to-transparent blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-bold tracking-[0.28em] uppercase text-[var(--color-gold)]">
                <Feather className="w-4 h-4" />
                <span>06 / Builder&apos;s Journal</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--color-text)] tracking-tight">
                The Written History of Becoming
              </h1>
              <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed font-light pt-1">
                The Study: a quiet notebook of verified lessons, system architecture reflections, failures, product principles, and visual notes.
              </p>
            </div>

            {/* Stat Counters Widget */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-[var(--color-bg-card)]/90 border border-[var(--color-border)] backdrop-blur-md self-start md:self-end min-w-[280px]">
              <div className="text-center space-y-0.5">
                <p className="text-lg font-extrabold text-[var(--color-gold)]">{JOURNAL_ENTRIES.length}</p>
                <p className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Entries</p>
              </div>
              <div className="text-center space-y-0.5 border-x border-[var(--color-border)]">
                <p className="text-lg font-extrabold text-[var(--color-text)]">45k+</p>
                <p className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Words</p>
              </div>
              <div className="text-center space-y-0.5">
                <p className="text-lg font-extrabold text-[var(--color-gold)]">{CATEGORIES.length - 1}</p>
                <p className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">Topics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Search & Filter Bar ──────────────────────────────────────── */}
      <section className="py-8 bg-[var(--color-bg-card)]/95 sticky top-[calc(var(--topbar-height))] z-30 backdrop-blur-xl border-b border-[var(--color-border)]">
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
      </section>

      {/* ── Section 3: Journal Entries Grid ─────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-6 lg:px-10 max-w-6xl mx-auto min-h-[400px]">
        {filteredEntries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-bg-card)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)]">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[var(--color-text)]">No journal entries found</h3>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              No thoughts matched your query &ldquo;{searchQuery}&rdquo;. Try clearing your search query or switching categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setShowOnlyBookmarked(false);
              }}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-[rgb(var(--atlas-gold) / 0.15)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.3)] hover:bg-[rgb(var(--atlas-gold) / 0.25)] transition-all"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </section>

      {/* ── Section 5: Reflection Wall Principles ─────────────────────────────────── */}
      <section className="border-t border-white/10 bg-gradient-to-b from-[var(--color-bg-card)] to-[var(--color-bg)]">
        <XP_ReflectionWall />
      </section>

      {/* ── Interactive Reader Modal ────────────────────────────────────────────── */}
      <XP_JournalReaderModal
        entry={activeEntry}
        onClose={() => setActiveEntry(null)}
        onSelectEntry={(entry) => setActiveEntry(entry)}
        allEntries={JOURNAL_ENTRIES}
        isBookmarked={activeEntry ? bookmarkedIds.includes(activeEntry.id) : false}
        onToggleBookmark={toggleBookmark}
      />
    </XP_RoomPage>
  );
}
