import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Field } from "./Field";

describe("Field accessibility", () => {
  it("associates the label with the input (useId + htmlFor)", () => {
    render(<Field label="Full name" />);
    // getByLabelText only resolves if label htmlFor targets the input id.
    expect(screen.getByLabelText("Full name")).toBeInstanceOf(
      HTMLInputElement,
    );
  });

  it("links a hint to the input via aria-describedby, without an error", () => {
    render(<Field label="Email" hint="We'll only use this for updates." />);
    const input = screen.getByLabelText("Email");

    const describedBy = input.getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      "We'll only use this for updates.",
    );
    expect(input).not.toHaveAttribute("aria-invalid");
  });

  it("sets aria-invalid and describes the error message", () => {
    render(<Field label="Email" error="Enter a valid email address." />);
    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("aria-invalid", "true");
    const describedBy = input.getAttribute("aria-describedby");
    expect(document.getElementById(describedBy!)).toHaveTextContent(
      "Enter a valid email address.",
    );
  });
});
