import type { StorybookConfig } from "@storybook/react-vite";

/* ---------------------------------------------------------------------------
   Storybook config

   • react-docgen-typescript reads the component TS types and turns them into
     the "Controls"/props tables — the typed props document themselves.
   • propFilter hides inherited DOM attributes (from node_modules) so each
     table shows only the component's own API, not 200 HTML props.
   • viteFinal wires @tailwindcss/vite so the utility classes in the components
     resolve against the same tokens the published package ships with.
--------------------------------------------------------------------------- */
const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config) {
    const { default: tailwindcss } = await import("@tailwindcss/vite");
    config.plugins = config.plugins ?? [];
    config.plugins.push(tailwindcss());
    return config;
  },
};

export default config;
