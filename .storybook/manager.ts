import { addons } from "storybook/manager-api";
import { create } from "storybook/theming/create";

/* ---------------------------------------------------------------------------
   Manager (Storybook chrome) theme

   The sidebar and toolbar are the first thing anyone sees, so they use the
   same tokens the library ships — the values here are read off
   src/styles/theme.css rather than picked to look close. Keeping them in sync
   by hand is deliberate: the manager UI renders outside the preview iframe, so
   it cannot consume the CSS variables the stories use.
--------------------------------------------------------------------------- */
addons.setConfig({
  theme: create({
    base: "light",

    brandTitle: "Understory",
    brandUrl: "https://www.araxiemiller.com",
    brandTarget: "_blank",

    // Color — canvas / surface / ink / accent, straight from @theme.
    appBg: "#FBFBFB",
    appContentBg: "#FBFBFB",
    appPreviewBg: "#FBFBFB",
    appBorderColor: "#E8E6E3",
    appBorderRadius: 8,

    colorPrimary: "#0F766E",
    colorSecondary: "#0F766E",

    textColor: "#1A1A1A",
    textMutedColor: "#666666",

    barBg: "#FBFBFB",
    barTextColor: "#666666",
    barSelectedColor: "#0F766E",
    barHoverColor: "#0B5D56",

    inputBg: "#FFFFFF",
    inputBorder: "#E8E6E3",
    inputTextColor: "#1A1A1A",
    inputBorderRadius: 8,

    // Type — the display/body pair the components use.
    fontBase: 'Inter, ui-sans-serif, system-ui, sans-serif',
    fontCode: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  }),
});
