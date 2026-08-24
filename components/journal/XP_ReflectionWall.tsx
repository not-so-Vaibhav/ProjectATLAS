"use client";

import { motion } from "framer-motion";
import { Quote, Sparkles } from "lucide-react";
import { REFLECTION_QUOTES } from "@/data/journal-data";

export function XP_ReflectionWall() {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <p className="text-[10px] font-bold tracking-[0.28em] uppercase text-[var(--color-gold)]">
          Reflection Wall
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-atlas-white">
          Principles & Personal Mantras
        </h2>
        <p className="text-xs text-atlas-white/45">
          Guiding ideas collected from continuous reading, building, and observation.
        </p>
      </div>

      {/* Quote Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {REFLECTION_QUOTES.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-bg-card)] via-[var(--color-bg-card)] to-[var(--color-bg-card)] border border-atlas-white/10 hover:border-[rgb(var(--atlas-gold) / 0.4)] shadow-[0_8px_30px_rgb(var(--atlas-black) / 0.5)] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Quote className="w-6 h-6 text-[var(--color-gold)]/50" />
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-atlas-white/5 text-atlas-white/50 border border-atlas-white/10">
                  {item.category}
                </span>
              </div>
              <blockquote className="text-sm sm:text-base text-atlas-white/90 font-medium italic leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
            </div>

            <div className="pt-3 border-t border-atlas-white/10 flex items-center justify-between text-xs">
              <span className="font-bold text-[var(--color-gold)]">{item.author}</span>
              <span className="font-mono text-atlas-white/40">{item.context}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
