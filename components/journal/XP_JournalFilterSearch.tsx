"use client";

import { motion } from "framer-motion";
import { Search, X, Filter, Bookmark } from "lucide-react";

interface Props {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  showOnlyBookmarked: boolean;
  onToggleShowBookmarked: () => void;
  categories: string[];
  totalResultsCount: number;
}

export function XP_JournalFilterSearch({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  showOnlyBookmarked,
  onToggleShowBookmarked,
  categories,
  totalResultsCount,
}: Props) {
  return (
    <div className="w-full space-y-3 max-w-6xl mx-auto px-0">
      {/* Row 1: Search Bar + Bookmark Filter + Entry Count */}
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-atlas-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search thoughts, architecture, rules..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-[var(--color-bg-card)] border border-atlas-white/10 text-xs text-atlas-white placeholder:text-atlas-white/35 focus:outline-none focus:border-[rgb(var(--atlas-gold) / 0.5)] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-atlas-white/40 hover:text-atlas-white transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Bookmarked Filter Toggle Button */}
        <button
          onClick={onToggleShowBookmarked}
          className={`px-3 py-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
            showOnlyBookmarked
              ? "bg-[rgb(var(--atlas-gold) / 0.2)] text-[var(--color-gold)] border-[rgb(var(--atlas-gold) / 0.45)]"
              : "bg-[var(--color-bg-card)] text-atlas-white/70 border-atlas-white/10 hover:border-atlas-white/20 hover:text-atlas-white"
          }`}
          title="Filter Bookmarked Entries"
        >
          <Bookmark className={`w-3.5 h-3.5 ${showOnlyBookmarked ? "fill-[var(--color-gold)]" : ""}`} />
          <span className="hidden sm:inline">Bookmarked</span>
        </button>

        {/* Entry Count Indicator */}
        <span className="text-[11px] font-mono text-atlas-white/40 shrink-0 hidden sm:inline">
          <strong className="text-[var(--color-gold)]">{totalResultsCount}</strong> {totalResultsCount === 1 ? "entry" : "entries"}
        </span>
      </div>

      {/* Row 2: Category Pill Tabs with smooth horizontal touch scroll & no scrollbar line */}
      <div className="relative w-full overflow-hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-1.5 min-w-max py-0.5">
            <Filter className="w-3 h-3 text-[var(--color-gold)] mr-1 shrink-0" />
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`relative px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold transition-colors shrink-0 ${
                    isActive ? "text-[var(--color-gold)]" : "text-atlas-white/55 hover:text-atlas-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryTab"
                      className="absolute inset-0 rounded-lg bg-[rgb(var(--atlas-gold) / 0.18)] border border-[rgb(var(--atlas-gold) / 0.4)]"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Soft Right Edge Gradient Mask for Horizontal Scroll Hint */}
        <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[var(--color-bg-card)] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
