"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Sparkles } from "lucide-react";
import { CURRENT_BOOKS } from "@/data/journal-data";

export function XP_BookshelfWidget() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-atlas-white/10 pb-4">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-gold)]">
            The Study Bookshelf
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-atlas-white mt-1">
            Current Reading & Key References
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-atlas-white/45">
          <BookOpen className="w-4 h-4 text-[var(--color-gold)]" />
          <span>Curated Reading List</span>
        </div>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CURRENT_BOOKS.map((book, idx) => (
          <motion.div
            key={book.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-[var(--color-bg-card)]/90 border border-atlas-white/10 hover:border-[rgb(var(--atlas-gold) / 0.4)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              {/* Status Badge */}
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    book.status === "Currently Reading"
                      ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      : book.status === "Completed"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                      : "bg-purple-500/15 text-purple-300 border-purple-500/30"
                  }`}
                >
                  {book.status}
                </span>

                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: book.rating }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-[var(--color-gold)] text-[var(--color-gold)]" />
                  ))}
                </div>
              </div>

              {/* Title & Author */}
              <h3 className="text-sm font-bold text-atlas-white leading-snug line-clamp-2 pt-1">
                {book.title}
              </h3>
              <p className="text-xs font-mono text-[var(--color-gold)]">by {book.author}</p>
            </div>

            {/* Note */}
            <p className="text-xs text-atlas-white/60 leading-relaxed font-mono italic border-l-2 border-atlas-white/10 pl-2.5 py-0.5">
              &ldquo;{book.note}&rdquo;
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
