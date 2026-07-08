import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type UI_CardProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  as?: "article" | "section" | "div";
};

export function UI_Card({ as: Component = "article", children, className, ...props }: UI_CardProps) {
  return (
    <Component
      className={cx(
        "rounded-[var(--radius-medium)] border border-atlas-line/10 bg-atlas-glass/7 p-5 shadow-quiet backdrop-blur-md",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
