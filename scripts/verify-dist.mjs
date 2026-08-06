/* ---------------------------------------------------------------------------
   Post-build smoke test: actually import the built package.

   0.1.0 shipped completely unimportable -- every entry point threw
   ERR_MODULE_NOT_FOUND -- and the whole test suite stayed green, because the
   unit tests, Storybook, and the Next demo all import from src/. Nothing ever
   loaded dist/.

   This closes that gap: it loads dist the way a real consumer does, through
   both module systems, and asserts the things that silently broke.
--------------------------------------------------------------------------- */

import { existsSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";
import { resolve } from "node:path";

const EXPECTED_EXPORTS = ["Badge", "Button", "Card", "Field", "cn"];

const failures = [];
const check = (label, condition, detail = "") => {
  if (condition) return;
  failures.push(detail ? `${label} -- ${detail}` : label);
};

/* --- ESM: import dist/index.mjs the way `import ... from "pkg"` would ----- */
try {
  const esm = await import(pathToFileURL(resolve("dist/index.mjs")).href);
  for (const name of EXPECTED_EXPORTS) {
    check(`ESM export "${name}"`, typeof esm[name] !== "undefined", "missing from dist/index.mjs");
  }
} catch (error) {
  failures.push(`ESM import of dist/index.mjs threw: ${error.message}`);
}

/* --- CJS: require dist/index.cjs the way `require("pkg")` would ----------- */
try {
  const require = createRequire(import.meta.url);
  const cjs = require(resolve("dist/index.cjs"));
  for (const name of EXPECTED_EXPORTS) {
    check(`CJS export "${name}"`, typeof cjs[name] !== "undefined", "missing from dist/index.cjs");
  }
} catch (error) {
  failures.push(`CJS require of dist/index.cjs threw: ${error.message}`);
}

/* --- The compiled stylesheet consumers are told to import ---------------- */
check(
  "dist/styles.css exists and is non-empty",
  existsSync("dist/styles.css") && statSync("dist/styles.css").size > 0
);

/* --- "use client" boundaries -------------------------------------------------
   Field calls useId, so it must be a client component. Button/Badge/Card must
   NOT be, or they stop working as React Server Components -- which is the
   entire reason the build runs unbundled. Both directions matter.
--------------------------------------------------------------------------- */
const directiveOf = (file) => (existsSync(file) ? readFileSync(file, "utf8").trimStart().startsWith('"use client"') : null);

check("Field.mjs carries \"use client\"", directiveOf("dist/components/Field.mjs") === true);
for (const name of ["Button", "Badge", "Card"]) {
  check(`${name}.mjs is NOT marked "use client"`, directiveOf(`dist/components/${name}.mjs`) === false);
}

if (failures.length) {
  console.error("verify-dist: FAILED\n");
  for (const failure of failures) console.error(`  • ${failure}`);
  console.error("");
  process.exit(1);
}

console.log("verify-dist: dist/ imports cleanly via ESM and CJS, styles present, client boundaries intact.");
