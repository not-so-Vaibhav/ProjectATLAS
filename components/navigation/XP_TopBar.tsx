"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Volume2, VolumeX, Info } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cx } from "@/lib/utils";

const topNavItems = [
  { label: "Arrival",          path: "/" },
  { label: "Experience",       path: "/experience" },
  { label: "About",            path: "/founder" },
  { label: "Designer",         path: "/designer" },
  { label: "AI",               path: "/ai" },
  { label: "Photography",      path: "/photography" },
  { label: "Builder's Journal",path: "/journal" },
  { label: "The Lab",          path: "/lab" },
  { label: "Future",           path: "/future" },
  { label: "Contact",          path: "/contact" },
];

export function XP_TopBar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [soundOn, setSoundOn] = useState(false);

  return (
    <header
      className="fixed top-0 right-0 z-30 hidden lg:flex items-center justify-between"
      style={{
        left: "var(--sidebar-width)",
        height: "var(--topbar-height)",
        background: "transparent",
        paddingInline: "1.25rem",
      }}
    >
      {/* Horizontal nav links */}
      <nav className="flex items-center gap-0.5 overflow-x-auto" aria-label="Quick navigation">
        {topNavItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.path}
              href={item.path}
              aria-current={isActive ? "page" : undefined}
              className={cx(
                "relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                isActive
                  ? "text-atlas-white"
                  : "text-atlas-muted hover:text-atlas-ink"
              )}
            >
              {item.label}
              {/* Active dot below */}
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-atlas-gold" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-2 flex-shrink-0 ml-4">
        {/* Sound toggle */}
        <button
          onClick={() => setSoundOn((s) => !s)}
          className="flex items-center gap-1.5 text-xs text-atlas-muted hover:text-atlas-ink transition px-2 py-1.5 rounded-md"
          aria-label={soundOn ? "Mute ambient sound" : "Play ambient sound"}
        >
          {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span className="text-[10px] tracking-wide">Sound {soundOn ? "On" : "Off"}</span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md text-atlas-muted hover:text-atlas-ink transition"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark"
            ? <Sun className="w-3.5 h-3.5" />
            : <Moon className="w-3.5 h-3.5" />
          }
        </button>

        {/* Info */}
        <button
          className="p-1.5 rounded-md text-atlas-muted hover:text-atlas-ink transition"
          aria-label="About Project Atlas"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
