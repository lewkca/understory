import * as React from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Card -- demonstrates COMPOSITION.

   Rather than one component with a dozen props (title, subtitle, footer,
   showDivider...), Card exposes small parts you arrange yourself:

       <Card>
         <Card.Header>...</Card.Header>
         <Card.Body>...</Card.Body>
       </Card>

   This is what the job listing means by "flexible, composable components."
   It scales better than prop explosion, because new layouts don't require
   changing the component.
--------------------------------------------------------------------------- */

type DivProps = React.HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, children, ...rest }: DivProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-card border border-rule bg-surface",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

function CardHeader({ className, children, ...rest }: DivProps) {
  return (
    <div className={cn("border-b border-rule px-5 py-3.5", className)} {...rest}>
      {children}
    </div>
  );
}

function CardBody({ className, children, ...rest }: DivProps) {
  return (
    <div className={cn("px-5 py-4", className)} {...rest}>
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...rest }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-base font-semibold tracking-tight text-ink", className)}
      {...rest}
    >
      {children}
    </h3>
  );
}

/* Attaching the parts to the root gives the Card.Header dot syntax. */
export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
  Title: CardTitle,
});
