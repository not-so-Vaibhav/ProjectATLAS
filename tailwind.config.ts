import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        atlas: {
          black:   "rgb(var(--atlas-black) / <alpha-value>)",
          white:   "rgb(var(--atlas-white) / <alpha-value>)",
          ink:     "rgb(var(--atlas-ink) / <alpha-value>)",
          muted:   "rgb(var(--atlas-muted) / <alpha-value>)",
          line:    "rgb(var(--atlas-line) / <alpha-value>)",
          glass:   "rgb(var(--atlas-glass) / <alpha-value>)",
          wood:    "rgb(var(--atlas-wood) / <alpha-value>)",
          green:   "rgb(var(--atlas-green) / <alpha-value>)",
          gold:    "rgb(var(--atlas-gold) / <alpha-value>)",
          surface: "rgb(var(--atlas-surface) / <alpha-value>)",
        }
      },
      fontFamily: {
        sans:    ["var(--font-interface)", "Inter", "system-ui", "sans-serif"],
        mono:    ["JetBrains Mono", "Fira Code", "monospace"],
        display: ["Inter", "system-ui", "sans-serif"],
        caveat:  ["Caveat", "cursive"],
      },
      borderRadius: {
        atlas:   "var(--radius-medium)",
        "atlas-sm":  "var(--radius-small)",
        "atlas-lg":  "var(--radius-large)",
        "atlas-xl":  "var(--radius-xl)",
      },
      boxShadow: {
        glass:   "var(--shadow-glass)",
        quiet:   "var(--shadow-quiet)",
        card:    "var(--shadow-card)",
      },
      transitionTimingFunction: {
        atlas: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        micro:     "160ms",
        component: "280ms",
        section:   "420ms",
        room:      "620ms",
      },
      animation: {
        "bounce-slow":   "bounce-slow 2.4s ease-in-out infinite",
        "float-gentle":  "float-gentle 4s ease-in-out infinite",
        "spin-slow":     "spin-slow 20s linear infinite",
        "status-blink":  "status-blink 2s ease-in-out infinite",
        "fade-in-up":    "fade-in-up 0.5s cubic-bezier(0.22,1,0.36,1) forwards",
        "glow-pulse":    "glow-pulse 4s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%,100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-4px)" },
        },
        "float-gentle": {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-6px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to:   { transform: "rotate(360deg)" },
        },
        "status-blink": {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0.4" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%,100%": { opacity: "0.6" },
          "50%":     { opacity: "1" },
        },
      },
      backgroundImage: {
        "radial-glow": "radial-gradient(ellipse at 50% 80%, rgba(165,243,252,0.12), transparent 60%)",
        "gold-gradient": "linear-gradient(135deg, rgb(199 169 102), rgb(230 200 140), rgb(199 169 102))",
      },
    }
  },
  plugins: []
};

export default config;
