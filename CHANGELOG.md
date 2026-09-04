# @lewkca/understory

Released as `@lewkca/design-system` up to and including 0.1.1.

## 0.2.0

### Minor Changes

- 7c3b1cc: Rename the package to `@lewkca/understory`.

  The library is now named Understory — the forest layer beneath the canopy that
  everything else grows out of. `@lewkca/design-system` was a filename, not a
  name. The old package is deprecated on npm and points here; the API, tokens and
  exports are unchanged, so migrating is a rename of the import specifier.

## 0.1.1

### Patch Changes

- Fix package being completely unimportable. Relative import specifiers in the built output had no file extensions (`./components/Button`) while the emitted files were `.mjs`/`.cjs`, so every entry point threw `ERR_MODULE_NOT_FOUND` under ESM and `MODULE_NOT_FOUND` under CJS. A post-build step now rewrites specifiers to match each format, and a `verify:dist` smoke test imports the built package through both module systems so this cannot regress unnoticed.

## 0.1.0

### Minor Changes

- Initial release.

  - **Button** — polymorphic action (discriminated union): `href` renders an `<a>`, otherwise a `<button>`, with three variants and three sizes.
  - **Badge** — status pill in three tones (neutral, accent, danger).
  - **Card** — composition API (`Card.Header` / `Card.Title` / `Card.Body`).
  - **Field** — labelled input with hint/error states and full a11y wiring (`useId`, `aria-describedby`, `aria-invalid`).
  - **Tokens** — CSS-variable design tokens compiled to a self-contained `styles.css`, with a `data-theme="dark"` theme and a `:focus-visible` ring + reduced-motion baked into the base layer.
