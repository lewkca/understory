import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("renders a <button> when no href is given", () => {
    render(<Button>Click</Button>);
    const el = screen.getByRole("button", { name: "Click" });
    expect(el.tagName).toBe("BUTTON");
  });

  it("renders an <a> when given href — the polymorphic switch", () => {
    render(<Button href="https://example.com">Link</Button>);
    const el = screen.getByRole("link", { name: "Link" });
    expect(el.tagName).toBe("A");
    expect(el).toHaveAttribute("href", "https://example.com");
  });

  it("forwards native props (onClick) through", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    screen.getByRole("button", { name: "Go" }).click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the variant's classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole("button", { name: "Ghost" })).toHaveClass(
      "bg-transparent",
    );
  });
});
