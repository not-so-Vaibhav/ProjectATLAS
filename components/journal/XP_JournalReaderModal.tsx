"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bookmark, Clock, Calendar, ArrowLeft, ArrowRight, Sparkles, BookOpen, Volume2, VolumeX } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import type { JournalEntry } from "@/data/journal-data";

interface Props {
  entry: JournalEntry | null;
  onClose: () => void;
  onSelectEntry: (entry: JournalEntry) => void;
  allEntries: JournalEntry[];
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export function XP_JournalReaderModal({
  entry,
  onClose,
  onSelectEntry,
  allEntries,
  isBookmarked,
  onToggleBookmark,
}: Props) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!entry) return null;

  const currentIndex = allEntries.findIndex((e) => e.id === entry.id);
  const prevEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;
  const nextEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((target.scrollTop / totalHeight) * 100);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] flex items-center justify-center p-2 sm:p-4 md:p-8 bg-black/85 backdrop-blur-xl overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          className="relative w-full max-w-4xl h-[92vh] max-h-[860px] bg-[var(--color-bg-card)] border border-[rgb(var(--atlas-gold) / 0.3)] rounded-2xl shadow-[0_0_80px_rgb(var(--atlas-black) / 0.9)] flex flex-col overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Scroll progress bar */}
          <div className="w-full h-1 bg-atlas-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--color-gold)] via-[var(--color-gold)] to-[var(--color-gold)]"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Reader Header Bar */}
          <div className="px-5 py-3.5 border-b border-atlas-white/10 flex items-center justify-between bg-[var(--color-bg-card)]/90 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[rgb(var(--atlas-gold) / 0.15)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.3)]">
                {entry.category}
              </span>
              <span className="text-xs text-atlas-white/40 hidden sm:inline">•</span>
              <span className="text-xs font-mono text-atlas-white/50 hidden sm:inline flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[var(--color-gold)]" />
                {entry.readTime}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Bookmark Toggle */}
              <button
                onClick={() => onToggleBookmark(entry.id)}
                className={`p-2 rounded-lg border transition-all flex items-center gap-1.5 text-xs font-medium ${
                  isBookmarked
                    ? "bg-[rgb(var(--atlas-gold) / 0.2)] text-[var(--color-gold)] border-[rgb(var(--atlas-gold) / 0.4)]"
                    : "bg-atlas-white/5 text-atlas-white/70 border-atlas-white/10 hover:border-atlas-white/20 hover:text-atlas-white"
                }`}
                title={isBookmarked ? "Remove Bookmark" : "Bookmark Entry"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? "fill-[var(--color-gold)]" : ""}`} />
                <span className="hidden sm:inline">{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-atlas-white/5 border border-atlas-white/10 text-atlas-white/70 hover:text-atlas-white hover:border-atlas-white/20 transition-all"
                title="Close (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Reader Article Body */}
          <div
            className="flex-1 overflow-y-auto px-6 sm:px-10 py-8 space-y-8 scroll-smooth"
            onScroll={handleScroll}
          >
            {/* Entry Header */}
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 text-xs font-mono text-atlas-white/45">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                  {entry.date}
                </span>
                <span>•</span>
                <span>The Study Desk</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-atlas-white leading-tight tracking-tight">
                {entry.title}
              </h1>

              <p className="text-sm sm:text-base text-[var(--color-gold)]/90 font-medium leading-relaxed italic border-l-2 border-[var(--color-gold)]/40 pl-4 py-1">
                {entry.subtitle}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2">
                {entry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-atlas-white/5 text-atlas-white/60 border border-atlas-white/10"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Takeaway Callout Box */}
            <div className="max-w-3xl mx-auto p-5 rounded-xl bg-gradient-to-r from-[rgb(var(--atlas-gold) / 0.12)] via-[rgb(var(--atlas-gold) / 0.05)] to-transparent border border-[rgb(var(--atlas-gold) / 0.3)] shadow-[0_4px_20px_rgb(var(--atlas-black) / 0.3)]">
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-gold)]">
                <Sparkles className="w-4 h-4" />
                <span>Key Builder Takeaway</span>
              </div>
              <p className="text-xs sm:text-sm text-atlas-white/90 leading-relaxed font-mono">
                {entry.keyTakeaway}
              </p>
            </div>

            {/* Main Article Content */}
            <div className={`max-w-3xl mx-auto prose prose-gold space-y-6 text-sm sm:text-base text-atlas-white/80 leading-relaxed ${theme === "dark" ? "prose-invert" : ""}`}>
              {entry.content.split("\n\n").map((paragraph, index) => {
                if (paragraph.startsWith("# ")) {
                  return (
                    <h1 key={index} className="text-xl sm:text-2xl font-bold text-atlas-white pt-4 pb-2 border-b border-atlas-white/10">
                      {paragraph.replace("# ", "")}
                    </h1>
                  );
                }
                if (paragraph.startsWith("## ")) {
                  return (
                    <h2 key={index} className="text-lg sm:text-xl font-semibold text-[var(--color-gold)] pt-3 pb-1">
                      {paragraph.replace("## ", "")}
                    </h2>
                  );
                }
                if (paragraph.startsWith("---")) {
                  return <hr key={index} className="border-atlas-white/10 my-6" />;
                }
                if (paragraph.startsWith("```")) {
                  const codeContent = paragraph.replace(/```[a-z]*/g, "").trim();
                  return (
                    <pre key={index} className="p-4 rounded-xl bg-[var(--color-bg)] border border-atlas-white/10 font-mono text-xs text-amber-200/90 overflow-x-auto my-4">
                      <code>{codeContent}</code>
                    </pre>
                  );
                }
                return (
                  <p key={index} className="text-atlas-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Author Signoff */}
            <div className="max-w-3xl mx-auto pt-8 border-t border-atlas-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold)] flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgb(var(--atlas-gold) / 0.4)]">
                  VB
                </div>
                <div>
                  <p className="text-sm font-bold text-atlas-white">Vaibhav Bariyar</p>
                  <p className="text-xs text-atlas-white/50">Full-Stack Engineer & Product Builder</p>
                </div>
              </div>
              <span className="font-caveat text-xl text-[var(--color-gold)]">— Written in The Study</span>
            </div>

            {/* Next / Previous Article Navigation */}
            <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {prevEntry ? (
                <button
                  onClick={() => onSelectEntry(prevEntry)}
                  className="p-4 rounded-xl bg-atlas-white/5 border border-atlas-white/10 hover:border-[rgb(var(--atlas-gold) / 0.4)] hover:bg-atlas-white/10 text-left transition-all group flex flex-col gap-1"
                >
                  <span className="text-[10px] font-mono text-atlas-white/40 uppercase flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    Previous Entry
                  </span>
                  <span className="text-xs font-semibold text-atlas-white group-hover:text-[var(--color-gold)] line-clamp-1">
                    {prevEntry.title}
                  </span>
                </button>
              ) : <div />}

              {nextEntry ? (
                <button
                  onClick={() => onSelectEntry(nextEntry)}
                  className="p-4 rounded-xl bg-atlas-white/5 border border-atlas-white/10 hover:border-[rgb(var(--atlas-gold) / 0.4)] hover:bg-atlas-white/10 text-right transition-all group flex flex-col items-end gap-1"
                >
                  <span className="text-[10px] font-mono text-atlas-white/40 uppercase flex items-center gap-1">
                    Next Entry
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-xs font-semibold text-atlas-white group-hover:text-[var(--color-gold)] line-clamp-1">
                    {nextEntry.title}
                  </span>
                </button>
              ) : <div />}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
