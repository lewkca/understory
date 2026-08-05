import * as React from "react";
import { cn } from "../lib/cn";

/* ---------------------------------------------------------------------------
   Button

   This file is the one worth reading closely. It demonstrates a DISCRIMINATED
   UNION -- the TypeScript pattern that component library interviews probe for.

   The idea: a button that receives `href` should render an <a>, and one
   without `href` should render a <button>. Those two cases accept different
   props (<a> has no `disabled`, <button> has no `target`). A discriminated
   union lets TypeScript enforce that for you at compile time.
--------------------------------------------------------------------------- */

/** Props shared by both shapes. */
type ButtonBaseProps = {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  className?: string;
};

/* `href?: never` is the discriminant. It tells TypeScript "in this shape, href
   must not be present." So the moment you pass href, TS knows you meant the
   link shape and switches which other props are legal. */
type ButtonAsButton = ButtonBaseProps & {
  href?: never;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = ButtonBaseProps & {
  href: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/* Variant styles live in a lookup object rather than a chain of if-statements.
   `Record<K, string>` means "an object whose keys are exactly K." If you add a
   variant to the type above and forget to add it here, the build fails --
   which is the whole point of typing your design system. */
const variantStyles: Record<NonNullable<ButtonBaseProps["variant"]>, string> = {
  primary:
    "bg-accent text-white border border-transparent hover:bg-accent-ink",
  secondary:
    "bg-surface text-ink border border-rule hover:border-ink-subtle",
  ghost:
    "bg-transparent text-ink-muted border border-transparent hover:bg-rule/50 hover:text-ink",
};

const sizeStyles: Record<NonNullable<ButtonBaseProps["size"]>, string> = {
  sm: "h-8  px-3   text-[13px] gap-1.5",
  md: "h-10 px-4   text-sm     gap-2",
  lg: "h-12 px-5.5 text-base   gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest // every remaining prop (onClick, type, target, aria-*) passes through
}: ButtonProps) {
  const classes = cn(
    // shared across every button
    "inline-flex items-center justify-center rounded-control font-medium",
    "transition-colors duration-150 ease-out-soft",
    "disabled:opacity-45 disabled:pointer-events-none",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  /* Narrowing: checking for `href` tells TypeScript which half of the union
     we're in, so it lets us spread the anchor-specific props safely. */
  if ("href" in rest && rest.href) {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
