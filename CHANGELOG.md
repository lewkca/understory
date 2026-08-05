# @lewkca/design-system

## 0.1.0

### Minor Changes

- Initial release.

  - **Button** — polymorphic action (discriminated union): `href` renders an `<a>`, otherwise a `<button>`, with three variants and three sizes.
  - **Badge** — status pill in three tones (neutral, accent, danger).
  - **Card** — composition API (`Card.Header` / `Card.Title` / `Card.Body`).
  - **Field** — labelled input with hint/error states and full a11y wiring (`useId`, `aria-describedby`, `aria-invalid`).
  - **Tokens** — CSS-variable design tokens compiled to a self-contained `styles.css`, with a `data-theme="dark"` theme and a `:focus-visible` ring + reduced-motion baked into the base layer.
