# Design System

A small, typed React component library built on the design language from
[araxiemiller.com](https://www.araxiemiller.com). Tokens are defined once in
CSS; every component reads from them.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run typecheck  # tsc --noEmit, catches type errors without building
npm run build      # production build
```

---

## How it's organized

```
app/
  globals.css     Design tokens (@theme) + base styles
  layout.tsx      Root HTML shell, font loading, metadata
  page.tsx        The playground — every component and variant
components/
  Button.tsx      Variants, sizes, polymorphic button/link
  Badge.tsx       Status pill, three tones
  Field.tsx       Labelled input with hint + error, a11y wiring
  Card.tsx        Composable card built from parts
lib/
  cn.ts           Class name joining helper
```

---

## Design decisions

**Tokens live in CSS, not a JS config.** Tailwind v4 reads `@theme` in
`globals.css` and generates utilities from it, so `--color-accent` becomes
`bg-accent` / `text-accent` automatically. One source of truth, and a designer
can change the system without touching a component file.

**Variants are lookup objects, not conditionals.** Each component maps its
variant prop to classes through a `Record<Variant, string>`. Adding a variant to
the type without adding its styles is a build error rather than a silent
fallback.

**Button is polymorphic and type-enforced.** Passing `href` renders an `<a>`;
omitting it renders a `<button>`. This is expressed as a discriminated union, so
TypeScript rejects `<Button href="..." disabled>` — `disabled` isn't a valid
anchor attribute.

**Card composes instead of configuring.** `Card.Header` / `Card.Body` /
`Card.Title` are separate parts rather than props on one component. New layouts
don't require changing Card.

**Accessibility is in the primitives.** A single `:focus-visible` ring is
defined in the base layer so it can't be forgotten per-component. `Field` wires
`htmlFor`, `aria-describedby`, and `aria-invalid`. A `prefers-reduced-motion`
block disables animation for users who ask for it.

---

## Reading order

If you're getting reacquainted with React, read the files in this order:

1. `lib/cn.ts` — smallest possible typed function
2. `components/Badge.tsx` — props, variants, spreading rest props
3. `components/Card.tsx` — composition pattern
4. `components/Field.tsx` — hooks, `"use client"`, accessibility
5. `components/Button.tsx` — discriminated unions (the hard one)

---

## Next steps

- [ ] Add Select, Tooltip, and Dialog
- [ ] Dark mode via a `[data-theme]` token override
- [ ] Extract to a published package with Storybook
- [ ] Add Playwright visual regression tests
