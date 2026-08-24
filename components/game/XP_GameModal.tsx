"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2, Crown, Zap, ArrowLeft, Maximize2, RefreshCw } from "lucide-react";

interface XP_GameModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialGame?: "chess" | "snake" | null;
}

export const XP_GameModal: React.FC<XP_GameModalProps> = ({
  isOpen,
  onClose,
  initialGame = null,
}) => {
  const [selectedGame, setSelectedGame] = useState<"chess" | "snake" | null>(
    initialGame
  );
  const [iframeKey, setIframeKey] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      setSelectedGame(initialGame);
      setIframeKey(Date.now());
    } else {
      setSelectedGame(null);
    }
  }, [isOpen, initialGame]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === "GAME_QUIT") {
        setSelectedGame(null);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleRestartGame = () => {
    setIframeKey(Date.now());
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`relative w-full transition-all duration-300 bg-[#0c0c10] border border-[rgb(var(--atlas-gold) / 0.25)] rounded-2xl shadow-[0_0_50px_rgb(var(--atlas-black) / 0.8)] overflow-hidden flex flex-col ${
              selectedGame === "chess"
                ? "max-w-[1140px] h-[93vh] max-h-[820px]"
                : selectedGame === "snake"
                ? "max-w-[860px] h-[88vh] max-h-[720px]"
                : "max-w-3xl h-auto max-h-[85vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bar */}
            <div className="px-5 py-3 border-b border-atlas-white/10 flex items-center justify-between bg-[var(--color-bg-card)]/80 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-gold)] to-[var(--color-gold)] flex items-center justify-center text-black font-bold shadow-[0_0_12px_rgb(var(--atlas-gold) / 0.4)]">
                  <Gamepad2 className="w-4 h-4 text-[#09090c]" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[var(--color-gold)]">
                    Atlas Arcade
                  </h3>
                  <p className="text-[10px] text-atlas-white/50 hidden sm:block">
                    {selectedGame === "chess"
                      ? "Play Chess with Vaibhav"
                      : selectedGame === "snake"
                      ? "Classic Snake Arcade"
                      : "Interactive Games Suite"}
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-2">
                {selectedGame && (
                  <>
                    <button
                      onClick={() => setSelectedGame(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-atlas-white/70 hover:text-atlas-white bg-atlas-white/5 hover:bg-atlas-white/10 border border-atlas-white/10 transition"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                      <span className="hidden sm:inline">Other Games</span>
                    </button>

                    <button
                      onClick={handleRestartGame}
                      title="Restart Current Game"
                      className="p-1.5 rounded-lg text-atlas-white/70 hover:text-atlas-white bg-atlas-white/5 hover:bg-atlas-white/10 border border-atlas-white/10 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-[var(--color-gold)]" />
                    </button>
                  </>
                )}

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-atlas-white/60 hover:text-atlas-white hover:bg-atlas-white/10 border border-atlas-white/10 transition"
                  aria-label="Close Arcade"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="flex-1 relative overflow-hidden bg-[#09090c]">
              {!selectedGame ? (
                /* Selection Screen */
                <div className="h-full overflow-y-auto p-6 sm:p-10 flex flex-col items-center justify-center">
                  <div className="text-center max-w-xl mb-8">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-[rgb(var(--atlas-gold) / 0.12)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.3)] mb-3">
                      Choose Your Challenge
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-atlas-white mb-2">
                      Ready for a game?
                    </h2>
                    <p className="text-xs sm:text-sm text-atlas-white/60 leading-relaxed">
                      Select a game below to play chess with Vaibhav or test your reflexes in classic snake.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-2xl">
                    {/* Game 1: Chess */}
                    <motion.div
                      whileHover={{ scale: 1.025, translateY: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedGame("chess");
                        setIframeKey(Date.now());
                      }}
                      className="group relative p-6 rounded-2xl bg-gradient-to-b from-[var(--color-bg-card)] to-[var(--color-bg-card)] border border-atlas-white/10 hover:border-[var(--color-gold)] cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgb(var(--atlas-gold) / 0.2)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[rgb(var(--atlas-gold) / 0.15)] border border-[rgb(var(--atlas-gold) / 0.3)] text-[var(--color-gold)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Crown className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-lg font-bold text-atlas-white group-hover:text-[var(--color-gold)] transition-colors">
                            Chess with Vaibhav
                          </h3>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[rgb(var(--atlas-gold) / 0.15)] text-[var(--color-gold)] border border-[rgb(var(--atlas-gold) / 0.3)]">
                            Chess
                          </span>
                        </div>
                        <p className="text-xs text-atlas-white/60 leading-relaxed mb-4">
                          Face Vaibhav in a tactical battle of chess. Features Easy, Medium, and Hard difficulty levels.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-gold)] group-hover:translate-x-1 transition-transform">
                        <span>Play Chess</span>
                        <span>→</span>
                      </div>
                    </motion.div>

                    {/* Game 2: Snake */}
                    <motion.div
                      whileHover={{ scale: 1.025, translateY: -3 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedGame("snake");
                        setIframeKey(Date.now());
                      }}
                      className="group relative p-6 rounded-2xl bg-gradient-to-b from-[var(--color-bg-card)] to-[var(--color-bg-card)] border border-atlas-white/10 hover:border-[var(--color-gold)] cursor-pointer transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgb(var(--atlas-gold) / 0.2)] flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-[rgb(var(--atlas-gold) / 0.15)] border border-[rgb(var(--atlas-gold) / 0.3)] text-[var(--color-gold)] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Zap className="w-6 h-6" />
                        </div>
                        <div className="flex items-center justify-between mb-1.5">
                          <h3 className="text-lg font-bold text-atlas-white group-hover:text-[var(--color-gold)] transition-colors">
                            Snake Arcade
                          </h3>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            Arcade
                          </span>
                        </div>
                        <p className="text-xs text-atlas-white/60 leading-relaxed mb-4">
                          Classic high-speed arcade game. Use arrow keys to collect gold tokens and break your high score.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-[var(--color-gold)] group-hover:translate-x-1 transition-transform">
                        <span>Start Snake</span>
                        <span>→</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              ) : (
                /* Iframe View */
                <div className="w-full h-full p-2 sm:p-3 box-border bg-[#09090c]">
                  <iframe
                    key={iframeKey}
                    src={selectedGame === "chess" ? "/games/chess.html" : "/games/snake.html"}
                    title={selectedGame === "chess" ? "Chess Game" : "Snake Game"}
                    className="w-full h-full border-0 rounded-xl bg-[var(--color-bg-card)]"
                    allow="autoplay"
                  />
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
