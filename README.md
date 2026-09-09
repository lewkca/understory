# Understory

[![npm](https://img.shields.io/npm/v/%40lewkca%2Funderstory?style=flat-square&color=0F766E&label=npm)](https://www.npmjs.com/package/@lewkca/understory)
[![CI](https://img.shields.io/github/actions/workflow/status/lewkca/understory/ci.yml?style=flat-square&branch=main&label=CI)](https://github.com/lewkca/understory/actions/workflows/ci.yml)
[![Storybook](https://img.shields.io/badge/docs-Storybook-0F766E?style=flat-square)](https://lewkca.github.io/understory/)
[![License](https://img.shields.io/npm/l/%40lewkca%2Funderstory?style=flat-square&color=0F766E)](LICENSE)

*The forest layer beneath the canopy that everything else grows out of.*

A small, typed React component library built on the design language from
[araxiemiller.com](https://www.araxiemiller.com). It ships polymorphic
primitives, composition APIs, and accessibility wired into the tokens — the
kind of components you *author*, not just spec.

**Stack:** React · TypeScript · Tailwind v4 tokens compiled to a shippable
stylesheet · Storybook · Changesets.

- 📖 **Live docs (Storybook):** https://lewkca.github.io/understory/
- 📦 **npm:** `@lewkca/understory`

---

## Install

```bash
npm install @lewkca/understory
```

`react` and `react-dom` (>=18) are peer dependencies.

## Usage

Import the compiled stylesheet **once** at your app's entry — no Tailwind setup
required in the consuming app — then use the components anywhere:

```tsx
import "@lewkca/understory/styles.css";
import { Button, Card, Field, Badge } from "@lewkca/understory";

export function SignIn() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Sign in</Card.Title>
      </Card.Header>
      <Card.Body>
        <Field label="Email" placeholder="you@company.com" />
        <Button style={{ marginTop: 16 }}>Continue</Button>
      </Card.Body>
    </Card>
  );
}
```

The package is ESM + CJS with type declarations, tree-shakeable, and RSC-safe
(only `Field` is marked `"use client"`).

---

## Components

| Component | What it demonstrates |
| --- | --- |
| **Button** | A discriminated union — `href` renders `<a>`, its absence renders `<button>`, and each accepts different props, enforced by TypeScript. Three variants × three sizes. |
| **Card** | A composition API — `Card.Header` / `Card.Title` / `Card.Body`, arranged rather than configured. |
| **Field** | Accessibility in the primitive — `useId()` + `htmlFor`, `aria-describedby`, `aria-invalid`, with hint and error states. |
| **Badge** | Status pill in three tones; native `<span>` prop pass-through. |

Full props, live controls, and per-component accessibility notes are in
[Storybook](https://lewkca.github.io/understory/).

---

## Theming

Every token is a CSS variable, so you re-theme by **overriding variables** — no
rebuild of the library:

```css
/* your global stylesheet, loaded after the library's styles.css */
:root {
  --color-accent: #7c3aed;   /* swap teal for violet, everywhere */
  --radius-control: 12px;
}
```

### Dark mode

A dark theme ships built in. Set `data-theme="dark"` on any ancestor (usually
`<html>`) and the neutrals remap:

```tsx
document.documentElement.setAttribute("data-theme", "dark");
```

---

## Accessibility

Every component is checked with [axe-core](https://github.com/dequelabs/axe-core)
in the unit suite, so a regression fails CI instead of surfacing later in the
docs. The cases cover the states that change semantics rather than colour:
Button's `<button>` and `<a>` branches, Field with a hint versus in its error
state, the full Card composition.

Colour contrast is deliberately not checked there. jsdom does no layout and the
test environment runs with `css: false`, so there is no computed colour to
measure and axe reports contrast as "incomplete" indefinitely. Contrast is
checked in Storybook, where
[addon-a11y](https://storybook.js.org/addons/@storybook/addon-a11y) runs axe
against a real browser; the audited token pairs are documented in
`src/styles/theme.css`.

## Local development

```bash
npm install
npm run storybook      # component workbench at :6006
npm run dev            # Next.js demo playground at :3000
```

Quality gates:

```bash
npm run typecheck      # tsc --noEmit
npm test               # Vitest + Testing Library
npm run build          # tsup (ESM/CJS/d.ts) + compiled styles.css → dist/
```

### Project layout

```
src/
  components/   Button, Badge, Card, Field  (+ *.stories.tsx, *.test.tsx)
  lib/cn.ts     class-name join helper
  styles/       theme.css — the single source of truth for tokens
  docs/         Introduction / Tokens / Accessibility (MDX)
app/            Next.js demo that consumes the components from source
.storybook/     Storybook config (a11y addon, docs, dark toggle)
```

---

## Releasing

Versioning is managed with [Changesets](https://github.com/changesets/changesets).

```bash
npm run changeset      # describe a change; pick a semver bump
npm run version        # apply pending changesets → bump + CHANGELOG
npm run release        # build + publish to npm
```

In CI, the [`Release`](.github/workflows/release.yml) workflow opens a
"Version Packages" PR from pending changesets and publishes to npm when it's
merged. Every push also runs
[`CI`](.github/workflows/ci.yml) (typecheck · build · test + axe · Storybook) and
deploys [Storybook to GitHub Pages](.github/workflows/storybook.yml).

## License

[MIT](LICENSE) © Araxie Miller
