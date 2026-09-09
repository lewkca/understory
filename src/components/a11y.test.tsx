import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import { expectNoViolations } from "../test/axe";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { Card } from "./Card";
import { Field } from "./Field";

/* Each component in the states that change its semantics rather than just its
   colour. A tone swap can't break axe; an error state that forgets
   aria-invalid can. */
describe("axe", () => {
  it("Button as a <button>, every variant and disabled", async () => {
    const { container } = render(
      <>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button disabled>Disabled</Button>
      </>,
    );
    await expectNoViolations(container);
  });

  it("Button as an <a> -- the polymorphic branch", async () => {
    const { container } = render(
      <Button href="https://example.com">Read the docs</Button>,
    );
    await expectNoViolations(container);
  });

  it("Badge, every tone", async () => {
    const { container } = render(
      <>
        <Badge>Neutral</Badge>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="danger">Danger</Badge>
      </>,
    );
    await expectNoViolations(container);
  });

  it("Card with the full composition", async () => {
    const { container } = render(
      <Card>
        <Card.Header>
          <Card.Title>Spore print</Card.Title>
        </Card.Header>
        <Card.Body>A rusty brown deposit under the cap.</Card.Body>
      </Card>,
    );
    await expectNoViolations(container);
  });

  it("Field: label only, with a hint, and in the error state", async () => {
    const { container } = render(
      <>
        <Field label="Full name" />
        <Field label="Email" hint="We'll only use this for updates." />
        <Field label="Password" error="Must be at least 12 characters." />
      </>,
    );
    await expectNoViolations(container);
  });
});
