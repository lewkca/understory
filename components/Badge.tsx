import * as React from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Badge -- the simplest component here. Read this one first.
--------------------------------------------------------------------------- */

type BadgeTone = "neutral" | "accent" | "danger";

/* Extending React.HTMLAttributes<HTMLSpanElement> means Badge accepts every
   normal span prop (id, onClick, aria-label) on top of our own. */
export type BadgeProps = {
  tone?: BadgeTone;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

const toneStyles: Record<BadgeTone, string> = {
  neutral: "bg-rule/60 text-ink-muted",
  accent: "bg-accent/10 text-accent",
  danger: "bg-danger/10 text-danger",
};

export function Badge({ tone = "neutral", className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5",
        "text-[11px] font-medium tracking-wide",
        toneStyles[tone],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
