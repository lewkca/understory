// Allow side-effect CSS imports (Storybook preview, etc.) to type-check.
// Vite / Next handle the actual bundling; this just satisfies tsc.
declare module "*.css";
