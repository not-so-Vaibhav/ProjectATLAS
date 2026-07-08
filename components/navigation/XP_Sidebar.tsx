"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Compass, Home, Code2, BriefcaseBusiness, PenTool,
  Brain, Camera, NotebookPen, FlaskConical, Telescope, Mail, X, Menu
} from "lucide-react";
import { cx } from "@/lib/utils";

const navItems = [
  { id: "arrival", label: "Arrival", path: "/", icon: Home, hidden: false },
  { id: "experience", label: "Experience", path: "/experience", icon: Code2, hidden: false },
  { id: "about", label: "About", path: "/about", icon: BriefcaseBusiness, hidden: false },
  { id: "projects", label: "Projects", path: "/projects", icon: PenTool, hidden: false },
  { id: "ai", label: "AI", path: "/ai", icon: Brain, hidden: false },
  { id: "photography", label: "Photography", path: "/photography", icon: Camera, hidden: false },
  { id: "journal", label: "Builder's Journal", path: "/journal", icon: NotebookPen, hidden: false },
  { id: "lab", label: "The Lab", path: "/lab", icon: FlaskConical, hidden: true },
  { id: "future", label: "Future", path: "/future", icon: Telescope, hidden: false },
  { id: "contact", label: "Contact", path: "/contact", icon: Mail, hidden: false },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-5 pb-4 border-b border-atlas-line/8">
        <Link href="/" className="flex items-center gap-2.5" onClick={onClose} aria-label="Atlas — return to arrival">
          <div className="w-7 h-7 rounded-lg bg-atlas-gold/10 border border-atlas-gold/25 flex items-center justify-center flex-shrink-0">
            <Compass className="w-3.5 h-3.5 text-atlas-gold" />
          </div>
          <div className="leading-tight">
            <div className="text-[11px] font-bold tracking-[0.18em] uppercase text-atlas-white">ATLAS</div>
            <div className="text-[8px] tracking-[0.1em] uppercase text-atlas-muted leading-tight">
              Digital Headquarters<br />of Vaibhav Bariyar
            </div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 atlas-scroll overflow-y-auto" aria-label="Identity rooms">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path || (item.path !== "/" && pathname.startsWith(item.path));
          return (
            <Link
              key={item.id}
              href={item.path}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={cx("sidebar-link group relative", isActive && "active")}
            >
              {isActive && (
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-atlas-gold" />
              )}
              <Icon className="w-3.5 h-3.5 flex-shrink-0 ml-2" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
              {item.hidden && (
                <span className="ml-auto text-[8px] font-semibold tracking-wider uppercase text-atlas-muted bg-atlas-surface/80 border border-atlas-line/10 px-1.5 py-0.5 rounded-full flex-shrink-0">
                  Hidden
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-3 border-t border-atlas-line/8">
        <p className="text-[9px] text-atlas-muted tracking-wider">© 2025 Atlas by Vaibhav Bariyar</p>
      </div>
    </div>
  );
}

export function XP_Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const openDrawer = () => {
    setMobileOpen(true);
    requestAnimationFrame(() => {
      if (!drawerRef.current || !backdropRef.current) return;
      gsap.fromTo(drawerRef.current, { x: "-100%" }, { x: "0%", duration: 0.42, ease: "power3.out" });
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    });
  };

  const closeDrawer = () => {
    if (!drawerRef.current || !backdropRef.current) return;
    gsap.to(drawerRef.current, { x: "-100%", duration: 0.35, ease: "power3.in" });
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.3, onComplete: () => setMobileOpen(false) });
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-atlas-white focus:px-4 focus:py-2 focus:text-atlas-black focus:text-sm focus:font-medium">
        Skip to main content
      </a>

      {/* Desktop sidebar */}
      <aside
        className="fixed left-0 top-0 bottom-0 z-40 hidden lg:flex flex-col"
        style={{ width: "var(--sidebar-width)" }}
        aria-label="Sidebar navigation"
      >
        <div className="h-full border-r" style={{ background: "var(--color-bg)", borderColor: "var(--color-border)" }}>
          <SidebarContent pathname={pathname} />
        </div>
      </aside>

      {/* Mobile hamburger */}
      <button
        className="fixed top-3 left-3 z-50 lg:hidden p-2 rounded-lg border border-atlas-line/12 bg-atlas-black/80 backdrop-blur-xl text-atlas-ink"
        onClick={openDrawer}
        aria-label="Open navigation"
        aria-expanded={mobileOpen}
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          <div
            ref={backdropRef}
            className="mobile-nav-overlay lg:hidden"
            style={{ opacity: 0 }}
            onClick={closeDrawer}
          />
          <div
            ref={drawerRef}
            className="fixed left-0 top-0 bottom-0 z-50 w-64 lg:hidden border-r"
            style={{
              background: "var(--color-bg)",
              borderColor: "var(--color-border)",
              transform: "translateX(-100%)",
            }}
          >
            <button
              className="absolute top-4 right-4 p-1.5 rounded-md text-atlas-muted hover:text-atlas-ink transition"
              onClick={closeDrawer}
              aria-label="Close navigation"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent pathname={pathname} onClose={closeDrawer} />
          </div>
        </>
      )}
    </>
  );
}
