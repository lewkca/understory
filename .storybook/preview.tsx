import * as React from "react";
import type { Preview, Decorator } from "@storybook/react-vite";
import "../src/styles/theme.css";

/* ---------------------------------------------------------------------------
   A theme wrapper that flips <html data-theme> — the exact mechanism the
   published package documents. Switching the toolbar control re-themes every
   story by overriding CSS variables, nothing more.
--------------------------------------------------------------------------- */
function ThemeWrapper({
  theme,
  children,
}: {
  theme: "light" | "dark";
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div
      data-theme={theme}
      style={{
        backgroundColor: "var(--color-canvas)",
        color: "var(--color-ink)",
        padding: "2.5rem",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
}

const withTheme: Decorator = (Story, context) => (
  <ThemeWrapper theme={(context.globals.theme as "light" | "dark") ?? "light"}>
    <Story />
  </ThemeWrapper>
);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // The a11y panel runs axe on every story. 'todo' surfaces violations
    // without failing the build; flip to 'error' once wired into CI.
    a11y: { test: "todo" },
    // Backgrounds are driven by the theme token, so disable the default addon bg.
    backgrounds: { disable: true },
    layout: "centered",
  },
  globalTypes: {
    theme: {
      description: "Design system theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  decorators: [withTheme],
  tags: ["autodocs"],
};

export default preview;
