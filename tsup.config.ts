import { defineConfig } from "tsup";

/* ---------------------------------------------------------------------------
   Library build

   Compiles the source per-file (bundle: false) rather than rolling everything
   into one file. For a component library this is the better shape:

     • module structure is preserved (dist mirrors src), so consumers'
       bundlers tree-shake unused components cleanly;
     • per-file "use client" directives survive — only Field (which calls
       useId) is marked client, so Button/Badge/Card stay usable as React
       Server Components. Bundling into one file would force a single directive
       on everything, or drop it entirely.

   Each entry emits ESM (.mjs) + CJS (.cjs) + a .d.ts. react/react-dom are
   never touched — imports are left as-is and resolve to the consumer's copy
   (they're peerDependencies).
--------------------------------------------------------------------------- */
export default defineConfig({
  entry: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.stories.tsx",
    "!src/**/*.test.{ts,tsx}",
    // Test-only helpers. Without this they compile into dist/ and the
    // published package would carry axe-core as a real import.
    "!src/test/**",
  ],
  format: ["esm", "cjs"],
  outExtension({ format }) {
    return { js: format === "esm" ? ".mjs" : ".cjs" };
  },
  dts: true,
  sourcemap: true,
  clean: true,
  bundle: false,
  tsconfig: "tsconfig.build.json",
});
