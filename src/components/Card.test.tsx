import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card composition", () => {
  it("renders the Header, Title, and Body parts it is assembled from", () => {
    render(
      <Card>
        <Card.Header>
          <Card.Title>Interview loop</Card.Title>
        </Card.Header>
        <Card.Body>Four sessions across two days.</Card.Body>
      </Card>,
    );

    // Card.Title renders a real <h3>, not just styled text.
    expect(
      screen.getByRole("heading", { name: "Interview loop", level: 3 }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Four sessions across two days."),
    ).toBeInTheDocument();
  });
});
