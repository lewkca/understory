/* ---------------------------------------------------------------------------
   Post-build: add file extensions to relative import specifiers in dist/

   Why this exists:

   The library is built with `bundle: false` so that module structure is
   preserved and per-file "use client" directives survive (see tsup.config.ts).
   But with bundling off, esbuild does not resolve or rewrite import
   specifiers -- it copies them through from source verbatim. Meanwhile
   `outExtension` renames the emitted files to .mjs / .cjs.

   The result is output that references files that do not exist:

     dist/index.mjs   import { Button } from "./components/Button";
     on disk          dist/components/Button.mjs

   Node's ESM resolver requires an explicit extension, and CJS `require`
   looks for Button.js / .json / .node -- never .cjs. So every entry point
   throws ERR_MODULE_NOT_FOUND / MODULE_NOT_FOUND on import. This shipped in
   0.1.0 and made the package completely unimportable.

   It was invisible locally because the tests, Storybook, and the Next demo
   app all import from src/ -- nothing exercised dist/ at runtime.

   This script walks dist/ and appends the extension matching each file's own
   format: .mjs files get .mjs specifiers, .cjs files get .cjs. The generated
   .d.ts / .d.cts files already carry correct extensions (tsup's dts step
   handles those), so they are left alone.
--------------------------------------------------------------------------- */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";

const DIST = "dist";

/* Specifiers that already end in one of these are left untouched. */
const HAS_EXTENSION = /\.(mjs|cjs|js|jsx|json|node|css)$/;

/* Matches the specifier in `from "x"`, `require("x")`, and `import("x")`.
   Captures the leading keyword so it can be reassembled unchanged. */
const SPECIFIER = /(\bfrom\s*|\brequire\(\s*|\bimport\(\s*)(["'])(\.[^"']*)\2/g;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

/* Given a relative specifier, work out what it should become. Returns null if
   it already has an extension or if nothing on disk matches -- callers leave
   those alone rather than inventing a path. */
function rewrite(specifier, fromDir, ext) {
  if (HAS_EXTENSION.test(specifier)) return null;

  const target = resolve(fromDir, specifier);

  if (existsSync(`${target}.${ext}`)) return `${specifier}.${ext}`;

  /* Directory import -- ./lib resolving to ./lib/index.mjs */
  if (existsSync(target) && statSync(target).isDirectory()) {
    if (existsSync(join(target, `index.${ext}`))) return `${specifier}/index.${ext}`;
  }

  return null;
}

if (!existsSync(DIST)) {
  console.error(`fix-dist-extensions: ${DIST}/ not found -- run the build first.`);
  process.exit(1);
}

let filesChanged = 0;
let specifiersRewritten = 0;
const unresolved = [];

for (const file of walk(DIST)) {
  const ext = file.endsWith(".mjs") ? "mjs" : file.endsWith(".cjs") ? "cjs" : null;
  if (!ext) continue;

  const source = readFileSync(file, "utf8");
  const fromDir = dirname(file);

  const output = source.replace(SPECIFIER, (match, keyword, quote, specifier) => {
    const fixed = rewrite(specifier, fromDir, ext);
    if (!fixed) {
      if (!HAS_EXTENSION.test(specifier)) unresolved.push(`${file}: ${specifier}`);
      return match;
    }
    specifiersRewritten++;
    return `${keyword}${quote}${fixed}${quote}`;
  });

  if (output !== source) {
    writeFileSync(file, output);
    filesChanged++;
  }
}

if (unresolved.length) {
  console.error("fix-dist-extensions: could not resolve these specifiers:");
  for (const item of unresolved) console.error(`  ${item}`);
  process.exit(1);
}

console.log(
  `fix-dist-extensions: rewrote ${specifiersRewritten} specifier(s) across ${filesChanged} file(s).`
);
