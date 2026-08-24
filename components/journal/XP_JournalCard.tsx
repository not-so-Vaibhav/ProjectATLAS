"use client";

import { motion } from "framer-motion";
import { Clock, Calendar, Bookmark, ArrowUpRight, Sparkles } from "lucide-react";
import type { JournalEntry } from "@/data/journal-data";

interface Props {
  entry: JournalEntry;
  onOpen: (entry: JournalEntry) => void;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function XP_JournalCard({ entry, onOpen, isBookmarked, onToggleBookmark }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      onClick={() => onOpen(entry)}
      className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[var(--color-bg-card)]/80 border border-atlas-white/10 hover:border-[rgb(var(--atlas-gold) / 0.45)] hover:shadow-[0_12px_40px_rgb(var(--atlas-gold) / 0.15)] transition-all cursor-pointer overflow-hidden backdrop-blur-md"
    >
      {/* Subtle top corner gradient highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[rgb(var(--atlas-gold) / 0.12)] via-transparent to-transparent pointer-events-none rounded-tr-2xl group-hover:from-[rgb(var(--atlas-gold) / 0.25)] transition-colors" />

      {/* Top Meta */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-atlas-white/5 text-[var(--color-gold)] border border-atlas-white/10">
              {entry.category}
            </span>

            {entry.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9.5px] font-bold uppercase tracking-wider bg-[rgb(var(--atlas-gold) / 0.18)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.4)] shadow-[0_0_10px_rgb(var(--atlas-gold) / 0.2)]">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(entry.id);
            }}
            className={`p-1.5 rounded-lg border transition-all shrink-0 ${
              isBookmarked
                ? "bg-[rgb(var(--atlas-gold) / 0.2)] text-[var(--color-gold)] border-[rgb(var(--atlas-gold) / 0.4)]"
                : "bg-atlas-white/5 text-atlas-white/40 border-atlas-white/10 hover:text-atlas-white hover:border-atlas-white/20"
            }`}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark Entry"}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-[var(--color-gold)]" : ""}`} />
          </button>
        </div>

        {/* Date & Read Time */}
        <div className="flex items-center gap-3 text-[11px] font-mono text-atlas-white/45">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[var(--color-gold)]" />
            {entry.date}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[var(--color-gold)]" />
            {entry.readTime}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg sm:text-xl font-bold text-atlas-white group-hover:text-[var(--color-gold)] transition-colors leading-snug">
          {entry.title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-atlas-white/65 leading-relaxed line-clamp-3">
          {entry.excerpt}
        </p>
      </div>

      {/* Bottom Footer */}
      <div className="pt-6 mt-6 border-t border-atlas-white/10 flex items-center justify-between">
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-atlas-white/5 text-atlas-white/50">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 text-xs font-semibold text-[var(--color-gold)] group-hover:translate-x-0.5 transition-transform">
          <span>Read Entry</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.article>
  );
}
