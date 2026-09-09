import axe, { type Result } from "axe-core";

/* ---------------------------------------------------------------------------
   axe-core in the unit suite

   Runs the same engine as the Storybook a11y addon, but here, so an
   accessibility regression fails CI instead of waiting to be spotted in the
   docs UI.

   One rule is off on purpose. jsdom does no layout and vitest.config.ts sets
   `css: false`, so nothing in this environment can resolve a computed colour --
   axe reports color-contrast as "incomplete" forever. Contrast is a real
   browser check; leaving the rule enabled would only make it look covered.
   The audited token pairs live in src/styles/theme.css.
--------------------------------------------------------------------------- */
const NEEDS_A_REAL_BROWSER = ["color-contrast"];

export async function findViolations(container: HTMLElement): Promise<Result[]> {
  const { violations } = await axe.run(container, {
    rules: Object.fromEntries(
      NEEDS_A_REAL_BROWSER.map((id) => [id, { enabled: false }]),
    ),
  });
  return violations;
}

/* Throws with the offending markup inline, so a CI log names the node and the
   rule without anyone having to reproduce it locally. */
export async function expectNoViolations(container: HTMLElement) {
  const violations = await findViolations(container);
  if (violations.length === 0) return;

  const detail = violations
    .map((v) => {
      const nodes = v.nodes.map((n) => `    ${n.html}`).join("\n");
      return `  [${v.impact ?? "unknown"}] ${v.id} -- ${v.help}\n${nodes}`;
    })
    .join("\n\n");

  throw new Error(
    `axe found ${violations.length} accessibility violation(s):\n\n${detail}\n`,
  );
}
