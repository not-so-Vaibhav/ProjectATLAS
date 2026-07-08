import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-atlas-white text-atlas-black hover:bg-atlas-ink focus-visible:outline-atlas-gold",
  secondary:
    "border border-atlas-line/15 bg-atlas-glass/10 text-atlas-ink hover:bg-atlas-glass/16",
  ghost: "text-atlas-ink/80 hover:bg-atlas-glass/10 hover:text-atlas-white"
};

type CommonProps = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type LinkButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

export function UI_Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, className, variant = "primary", ...rest } = props;
  const classes = cx(
    "inline-flex min-h-11 items-center justify-center rounded-[var(--radius-small)] px-5 py-2.5 text-sm font-semibold transition duration-[var(--duration-micro)] ease-[var(--ease-atlas)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4",
    variantClasses[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} href={props.href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
