"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

// Maps nav label → { path for routing, sectionId for homepage scroll }
const navItems = [
  { label: "Home",              path: "/",          sectionId: "arrival"  },
  { label: "About",             path: "/founder",   sectionId: "about"   },
  { label: "Experience",        path: "/experience",sectionId: "experience" },
  { label: "My Work",           path: "/projects",  sectionId: "my-work"  },
  { label: "Skills",            path: "/designer",  sectionId: "designer" },
  { label: "Builder's Journal", path: "/journal",   sectionId: "journal"  },
  { label: "The Lab",           path: "/lab",       sectionId: "lab"      },
  { label: "Let's Contact",     path: "/contact",   sectionId: "contact"  },
];

export function XP_TopNav() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("arrival");
  
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
      gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.42, ease: "power3.out" });
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "none" });
    });
  };

  /* Animate mobile drawer close */
  const closeDrawer = () => {
    if (!drawerRef.current || !backdropRef.current) return;
    gsap.to(drawerRef.current, { x: "-100%", duration: 0.35, ease: "power3.in" });
    gsap.to(backdropRef.current, {
      opacity: 0, duration: 0.3, ease: "none",
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
          background: "rgba(8,8,8,0.72)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
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

        {/* Navigation links */}
        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={getHref(item.path, item.sectionId)}
              onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
              className="relative px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 whitespace-nowrap"
              style={{
                color: isActive(item.path, item.sectionId) ? "rgb(247,247,244)" : "rgba(224,224,218,0.55)",
              }}
            >
              {item.label}
              {isActive(item.path, item.sectionId) && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-atlas-gold"
                  style={{ width: 5, height: 5 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="flex-shrink-0 p-2 rounded-lg text-atlas-muted hover:text-atlas-ink transition-colors"
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </header>

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg"
        style={{
          background: "rgba(8,8,8,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
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
              background: "rgb(10,10,9)",
              borderRight: "1px solid rgba(255,255,255,0.08)",
              transform: "translateX(-100%)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-atlas-gold">ATLAS</span>
              <button
                onClick={closeDrawer}
                className="p-1.5 text-atlas-muted hover:text-atlas-ink transition-colors"
                aria-label="Close navigation"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={getHref(item.path, item.sectionId)}
                  onClick={(e) => handleNavClick(e, item.path, item.sectionId)}
                  className="flex items-center gap-3 px-6 py-3.5 text-sm transition-colors"
                  style={{
                    color: isActive(item.path, item.sectionId) ? "rgb(247,247,244)" : "rgba(224,224,218,0.55)",
                    background: isActive(item.path, item.sectionId) ? "rgba(199,169,102,0.06)" : "transparent",
                    borderLeft: isActive(item.path, item.sectionId) ? "2px solid rgb(199,169,102)" : "2px solid transparent",
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="px-6 py-4 border-t border-white/5">
              <p className="text-[10px] text-atlas-muted">© 2025 Atlas by Vaibhav Bariyar</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}
