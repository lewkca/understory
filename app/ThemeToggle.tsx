"use client";

import * as React from "react";
import { Button } from "@/src";

/* ---------------------------------------------------------------------------
   ThemeToggle — flips <html data-theme> between light and dark.

   This exists to demonstrate the token architecture live: nothing about the
   components changes, only the CSS variables they read from. One attribute on
   the root re-themes the whole page.
--------------------------------------------------------------------------- */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Button
      size="sm"
      variant="secondary"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
    >
      {theme === "light" ? "Dark" : "Light"} theme
    </Button>
  );
}
