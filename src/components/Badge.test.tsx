import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "./Badge";

describe("Badge", () => {
  it("renders its label", () => {
    render(<Badge>Scheduled</Badge>);
    expect(screen.getByText("Scheduled")).toBeInTheDocument();
  });

  it("applies the tone's classes", () => {
    render(<Badge tone="danger">Down</Badge>);
    expect(screen.getByText("Down")).toHaveClass("text-danger");
  });

  it("passes native <span> props through", () => {
    render(
      <Badge data-testid="badge" aria-label="status">
        x
      </Badge>,
    );
    expect(screen.getByTestId("badge")).toHaveAttribute("aria-label", "status");
  });
});
