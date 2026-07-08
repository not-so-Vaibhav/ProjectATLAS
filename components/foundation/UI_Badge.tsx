import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function UI_Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex rounded-full border border-atlas-line/10 bg-atlas-glass/8 px-3 py-1 text-xs font-medium text-atlas-ink/80",
        className
      )}
    >
      {children}
    </span>
  );
}
