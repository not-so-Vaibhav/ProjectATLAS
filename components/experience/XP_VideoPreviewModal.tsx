"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Sparkles } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export interface VideoProjectData {
  id: string;
  role: string;
  company: string;
  description: string;
  videoSrc?: string;
  stack: string[];
  accentRgb: string;
  dotColor: string;
  githubUrl?: string;
  liveUrl?: string;
  Icon?: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
}

interface XP_VideoPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: VideoProjectData | null;
}

export const XP_VideoPreviewModal: React.FC<XP_VideoPreviewModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { theme } = useTheme();
  const isLight = theme === "light";

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Autoplay video with sound when modal opens
  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback for browsers that block unmuted autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play();
        }
      });
    } else if (!isOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isOpen]);

  if (!mounted || !isOpen || !project || !project.videoSrc) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 backdrop-blur-xl"
          style={{
            background: isLight ? "rgba(0, 0, 0, 0.45)" : "rgba(0, 0, 0, 0.85)",
          }}
          onClick={onClose}
        >
          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[var(--color-bg-card)] border rounded-2xl overflow-hidden flex flex-col transition-colors duration-300"
            style={{
              borderColor: isLight
                ? `rgba(${project.accentRgb}, 0.35)`
                : `rgba(${project.accentRgb}, 0.35)`,
              boxShadow: isLight
                ? `0 0 35px rgba(${project.accentRgb}, 0.18), 0 20px 50px -10px rgba(0,0,0,0.22)`
                : `0 0 50px rgba(${project.accentRgb}, 0.15), 0 25px 50px -12px rgba(0,0,0,0.85)`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient background glow */}
            <div
              className="absolute -top-32 -left-32 w-80 h-80 rounded-full pointer-events-none filter blur-3xl opacity-20"
              style={{ background: `rgb(${project.accentRgb})` }}
            />

            {/* ── Header Bar ────────────────────────────────────────── */}
            <div
              className="px-5 py-3.5 border-b flex items-center justify-between relative z-10 backdrop-blur-md transition-colors duration-300"
              style={{
                background: isLight ? "rgba(252, 251, 247, 0.92)" : "rgba(18, 18, 24, 0.88)",
                borderColor: isLight ? "rgba(0, 0, 0, 0.08)" : `rgba(${project.accentRgb}, 0.18)`,
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center relative shadow-sm"
                  style={{
                    background: `rgba(${project.accentRgb}, ${isLight ? "0.18" : "0.15"})`,
                    border: `1px solid rgba(${project.accentRgb}, ${isLight ? "0.4" : "0.35"})`,
                  }}
                >
                  {project.Icon ? (
                    <project.Icon style={{ width: 18, height: 18, color: project.dotColor }} />
                  ) : (
                    <Sparkles className="w-4 h-4" style={{ color: project.dotColor }} />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[var(--color-text)] leading-none">
                      {project.role}
                    </h3>
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full"
                      style={{
                        background: `rgba(${project.accentRgb}, ${isLight ? "0.15" : "0.12"})`,
                        border: `0.5px solid rgba(${project.accentRgb}, ${isLight ? "0.4" : "0.3"})`,
                        color: project.dotColor,
                      }}
                    >
                      Live Demo
                    </span>
                  </div>
                  <p className="text-[11px] font-medium mt-1 text-[var(--color-text-muted)]">
                    {project.company}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[var(--color-text)] hover:opacity-80 transition shadow-sm"
                    style={{
                      background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                      border: isLight ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-black transition hover:opacity-90 shadow-sm"
                    style={{ background: project.dotColor }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Visit Live</span>
                  </a>
                )}
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition cursor-pointer shadow-sm"
                  style={{
                    background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                    border: isLight ? "1px solid rgba(0,0,0,0.12)" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Video Player Body ─────────────────────────────────── */}
            <div className="relative w-full aspect-video bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                controls
                playsInline
                loop
                preload="auto"
                className="w-full h-full object-contain bg-black"
              >
                <source src={project.videoSrc} type="video/mp4" />
                <source src={project.videoSrc.replace(".mp4", ".webm")} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* ── Footer Info ───────────────────────────────────────── */}
            <div
              className="px-5 py-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10 transition-colors duration-300"
              style={{
                background: isLight ? "rgba(252, 251, 247, 0.95)" : "rgba(18, 18, 24, 0.92)",
                borderColor: isLight ? "rgba(0, 0, 0, 0.08)" : `rgba(${project.accentRgb}, 0.15)`,
              }}
            >
              {/* Stack tags */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[9px] font-bold tracking-widest uppercase mr-1" style={{ color: project.dotColor }}>
                  Stack:
                </span>
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-0.5 rounded-md font-mono"
                    style={{
                      background: isLight ? "rgba(0, 0, 0, 0.04)" : "rgba(255, 255, 255, 0.04)",
                      border: isLight ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
                      color: "var(--color-text)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Mobile Quick Links */}
              <div className="flex sm:hidden items-center gap-2 w-full justify-end pt-1">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold text-[var(--color-text)]"
                    style={{
                      background: isLight ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.06)",
                      border: isLight ? "1px solid rgba(0,0,0,0.1)" : "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <Github className="w-3 h-3" /> GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold text-black shadow-sm"
                    style={{ background: project.dotColor }}
                  >
                    <ExternalLink className="w-3 h-3" /> Live
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
