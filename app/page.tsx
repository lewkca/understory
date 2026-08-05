import { Button, Badge, Field, Card } from "@/src";
import { ThemeToggle } from "./ThemeToggle";

/* ---------------------------------------------------------------------------
   The playground. Every component, every variant, on one page.

   This doubles as your documentation and as the thing you screen-share in the
   first interview.
--------------------------------------------------------------------------- */

/** A labelled section wrapper, defined locally since it's only used here. */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-rule py-10">
      <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
        {title}
      </h2>
      <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-muted">
        {description}
      </p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      {/* ---------- Masthead ---------- */}
      <header className="pb-10">
        <div className="flex items-center justify-between">
          <Badge tone="accent">v0.1</Badge>
          <ThemeToggle />
        </div>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-ink">
          Design System
        </h1>
        <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-ink-muted">
          A small, typed React component library built on the design language
          from araxiemiller.com. Tokens are defined once in CSS and every
          component reads from them.
        </p>
      </header>

      {/* ---------- Tokens ---------- */}
      <Section
        title="Tokens"
        description="Defined in app/globals.css. Change a value there and it cascades through every component on this page."
      >
        <div className="flex flex-wrap gap-3">
          {[
            { name: "canvas", value: "#FBFBFB" },
            { name: "surface", value: "#FFFFFF" },
            { name: "ink", value: "#1A1A1A" },
            { name: "ink-muted", value: "#666666" },
            { name: "rule", value: "#E8E6E3" },
            { name: "accent", value: "#0F766E" },
          ].map((token) => (
            <div key={token.name} className="w-[104px]">
              <div
                className="h-14 w-full rounded-control border border-rule"
                style={{ backgroundColor: token.value }}
              />
              <div className="mt-1.5 text-[11px] font-medium text-ink">
                {token.name}
              </div>
              <div className="font-mono text-[10px] text-ink-subtle">
                {token.value}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Button ---------- */}
      <Section
        title="Button"
        description="Three variants, three sizes. Passing an href makes it render an <a> instead of a <button>, enforced by TypeScript."
      >
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button href="https://www.araxiemiller.com" variant="secondary">
            Renders as a link
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      {/* ---------- Badge ---------- */}
      <Section title="Badge" description="Three tones for status and metadata.">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>Neutral</Badge>
          <Badge tone="accent">Accent</Badge>
          <Badge tone="danger">Danger</Badge>
        </div>
      </Section>

      {/* ---------- Field ---------- */}
      <Section
        title="Field"
        description="Label, hint, and error states wired up with htmlFor and aria-describedby. Tab through these to see the focus ring."
      >
        <div className="flex max-w-sm flex-col gap-5">
          <Field label="Full name" placeholder="Araxie Miller" />
          <Field
            label="Email"
            placeholder="you@company.com"
            hint="We'll only use this for candidate updates."
          />
          <Field
            label="Work email"
            defaultValue="not-an-email"
            error="Enter a valid email address."
          />
        </div>
      </Section>

      {/* ---------- Card ---------- */}
      <Section
        title="Card"
        description="Composed from parts rather than configured with props, so new layouts don't require changing the component."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <Card.Header>
              <Card.Title>Interview loop</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-sm leading-relaxed text-ink-muted">
                Four sessions scheduled across two days, with panel availability
                already reconciled.
              </p>
              <div className="mt-3 flex gap-2">
                <Badge tone="accent">Scheduled</Badge>
                <Badge>4 interviewers</Badge>
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <Card.Title>Candidate scorecard</Card.Title>
            </Card.Header>
            <Card.Body>
              <p className="text-sm leading-relaxed text-ink-muted">
                Structured feedback collected from every interviewer before the
                debrief.
              </p>
              <div className="mt-3">
                <Button size="sm" variant="secondary">
                  View details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Section>
    </main>
  );
}
