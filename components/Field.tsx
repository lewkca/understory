"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

/* ---------------------------------------------------------------------------
   Field -- a labelled text input.

   This one exists to show ACCESSIBILITY wiring, which is the part of a design
   system most people skip and interviewers always ask about:

     - useId() generates a unique id so <label htmlFor> points at the input
     - aria-describedby links the input to its hint or error text
     - aria-invalid announces the error state to screen readers

   "use client" at the top: Next.js renders on the server by default. Any
   component using hooks (useId, useState) or browser events needs this line.
--------------------------------------------------------------------------- */

export type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Field({ label, hint, error, className, id, ...rest }: FieldProps) {
  // useId gives a stable unique string that matches between server and client.
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;
  const message = error ?? hint;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-[13px] font-medium text-ink">
        {label}
      </label>

      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={message ? messageId : undefined}
        className={cn(
          "h-10 w-full rounded-control bg-surface px-3 text-sm text-ink",
          "border transition-colors duration-150",
          "placeholder:text-ink-subtle",
          error ? "border-danger" : "border-rule hover:border-ink-subtle",
          className
        )}
        {...rest}
      />

      {message && (
        <p
          id={messageId}
          className={cn("text-xs", error ? "text-danger" : "text-ink-muted")}
        >
          {message}
        </p>
      )}
    </div>
  );
}
