"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

// Maps nav label → { path for routing, sectionId for homepage scroll }
const navItems = [
  { label: "Home",              path: "/",            sectionId: "arrival"     },
  { label: "About",             path: "/founder",     sectionId: "about"       },
  { label: "Experience",        path: "/experience",  sectionId: "experience"  },
  { label: "My Work",           path: "/projects",    sectionId: "my-work"     },
  { label: "Skills",            path: "/skills",      sectionId: "skills"      },
  { label: "Photography",       path: "/photography", sectionId: "photography" },
  { label: "Builder's Journal", path: "/journal",     sectionId: "journal"     },
  { label: "Let's Contact",     path: "/contact",     sectionId: "contact"     },
];

export function XP_TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("arrival");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  // Active section tracking from custom event dispatched by XP_ArrivalScene
  useEffect(() => {
    if (pathname !== "/") return;

    const handleActiveChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setActiveSection(detail);
    };

    window.addEventListener("active-section-change", handleActiveChange);
    return () => {
      window.removeEventListener("active-section-change", handleActiveChange);
    };
  }, [pathname]);

  const isActive = (path: string, sectionId: string) => {
    if (pathname === "/") {
      return sectionId ? activeSection === sectionId : false;
    }
    return path !== "/" && pathname.startsWith(path);
  };

  const getHref = (path: string, sectionId: string) => {
    if (sectionId === "arrival") return "/";
    if (!sectionId) return path;
    return `/#${sectionId}`;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, sectionId: string) => {
    if (pathname === "/" && sectionId) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("scroll-to-section", { detail: sectionId }));
      setActiveSection(sectionId);
      const newHash = sectionId === "arrival" ? "" : `#${sectionId}`;
      window.history.pushState(null, "", window.location.pathname + newHash);
      if (mobileOpen) {
        closeDrawer();
      }
    }
  };

  /* Header entrance on mount */
  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, { scope: headerRef });

  /* Animate mobile drawer open */
  const openDrawer = () => {
    setMobileOpen(true);
    requestAnimationFrame(() => {
      if (!drawerRef.current || !backdropRef.current) return;
      
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" });
      gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.6, ease: "expo.out" });
      
      const items = drawerRef.current.querySelectorAll('.mobile-nav-item');
      if (items.length) {
        gsap.fromTo(items, 
          { opacity: 0, x: -20 }, 
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power3.out", delay: 0.15 }
        );
      }
      
      const headerElements = drawerRef.current.querySelectorAll('.mobile-header-element');
      if (headerElements.length) {
        gsap.fromTo(headerElements,
          { opacity: 0 },
          { opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.2 }
        );
      }
    });
  };

  /* Animate mobile drawer close */
  const closeDrawer = () => {
    if (!drawerRef.current || !backdropRef.current) return;
    
    const contents = drawerRef.current.querySelectorAll('.mobile-nav-item, .mobile-header-element');
    if (contents.length) {
      gsap.to(contents, { opacity: 0, x: -10, duration: 0.2, ease: "power2.in" });
    }

    gsap.to(drawerRef.current, { x: "-100%", duration: 0.4, ease: "power3.inOut", delay: 0.1 });
    gsap.to(backdropRef.current, {
      opacity: 0, duration: 0.4, ease: "power2.in", delay: 0.1,
      onComplete: () => setMobileOpen(false),
    });
  };

  return (
    <>
      {/* Desktop top nav */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 hidden lg:flex items-center justify-between px-8"
        style={{
          height: "var(--topbar-height)",
          background: "rgb(var(--atlas-black) / 0.45)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "none",
          opacity: 0,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => handleNavClick(e, "/", "arrival")}
          className="flex-shrink-0 text-[11px] font-bold tracking-[0.22em] uppercase text-atlas-gold"
        >
          ATLAS
        </Link>

        {/* Navigation links with floating hover pill */}
        <nav
          className="flex items-center gap-1 p-1 rounded-xl"
          aria-label="Main navigation"
          onMouseLeave={() => setHoveredItem(null)}
        >
          {navItems.map((item) => {
            const active = isActive(item.path, item.sectionId);
            const isHovered = hoveredItem === item.path;

            return (
              <Link
                key={item.path}
                href={getHref(item.path, item.sectionId)}
                onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                onMouseEnter={() => setHoveredItem(item.path)}
                className="relative px-3.5 py-1.5 text-[13px] font-medium transition-all duration-200 whitespace-nowrap rounded-lg group select-none"
                style={{
                  color: active
                    ? "var(--color-text)"
                    : isHovered
                    ? "var(--color-text)"
                    : "rgb(var(--atlas-ink) / 0.55)",
                }}
              >
                {/* Floating hover capsule pill */}
                {isHovered && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      background: "rgb(var(--atlas-glass) / 0.08)",
                      border: "1px solid rgb(var(--atlas-gold) / 0.2)",
                      boxShadow: "0 2px 12px -2px rgb(var(--atlas-gold) / 0.12)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                    }}
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Text with slight hover lift */}
                <span className="relative z-10 transition-transform duration-200 inline-block group-hover:-translate-y-[0.5px]">
                  {item.label}
                </span>

                {/* Active gold dot with glow */}
                {active && (
                  <motion.span
                    layoutId="nav-active-dot"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-atlas-gold pointer-events-none"
                    style={{
                      width: 5,
                      height: 5,
                      boxShadow: "0 0 8px 1.5px rgb(var(--atlas-gold) / 0.8)",
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  />
                )}

                {/* Subtle hover micro-glow line for non-active links */}
                {!active && (
                  <span
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] w-0 group-hover:w-3/5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgb(var(--atlas-gold) / 0.7), transparent)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex-shrink-0 p-2 rounded-xl text-atlas-muted hover:text-atlas-gold hover:bg-atlas-gold/10 transition-all duration-300 hover:scale-110 active:scale-95"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 transition-transform duration-500 group-hover:rotate-90" />
          ) : (
            <Moon className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-12" />
          )}
        </button>
      </header>

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95"
        style={{
          background: "rgb(var(--atlas-black) / 0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgb(var(--atlas-line) / 0.1)",
        }}
        onClick={openDrawer}
        aria-label="Open navigation"
      >
        <Menu className="w-5 h-5 text-atlas-ink" />
      </button>

      {/* Mobile drawer — always rendered, GSAP controls visibility */}
      {mobileOpen && (
        <>
          <div
            ref={backdropRef}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            style={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <div
            ref={drawerRef}
            className="fixed top-0 left-0 bottom-0 z-[60] w-72 lg:hidden flex flex-col"
            style={{
              background: "var(--color-bg-raised)",
              borderRight: "1px solid rgb(var(--atlas-line) / 0.08)",
              transform: "translateX(-100%)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-atlas-line/10">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-atlas-gold mobile-header-element">ATLAS</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleTheme}
                  className="p-1.5 rounded-lg text-atlas-muted hover:text-atlas-ink hover:bg-atlas-ink/5 transition-colors mobile-header-element"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
                <button
                  onClick={closeDrawer}
                  className="p-1.5 rounded-lg text-atlas-muted hover:text-atlas-ink hover:bg-atlas-ink/5 transition-colors mobile-header-element"
                  aria-label="Close navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <nav className="flex-grow overflow-y-auto px-6 py-6" aria-label="Mobile navigation">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.path, item.sectionId);
                  return (
                    <Link
                      key={item.path}
                      href={getHref(item.path, item.sectionId)}
                      onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                      className="group flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold border transition-all duration-300 mobile-nav-item hover:translate-x-1.5"
                      style={{
                        color: active ? "var(--color-text)" : "rgb(var(--atlas-ink) / 0.55)",
                        background: active ? "rgb(var(--atlas-gold) / 0.08)" : "transparent",
                        borderColor: active ? "rgb(var(--atlas-gold) / 0.22)" : "transparent",
                      }}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="w-2 h-2 rounded-full bg-atlas-gold shadow-[0_0_8px_rgb(var(--atlas-gold))]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}
