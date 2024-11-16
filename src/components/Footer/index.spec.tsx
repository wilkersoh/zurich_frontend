import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders the copyright text", () => {
    const copyrightText = screen.getByText(
      /© 2024 Zurich. All rights reserved./i
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("renders all footer links", () => {
    const privacyLink = screen.getByText(/Privacy Policy/i);
    const termsLink = screen.getByText(/Terms of Service/i);
    const contactLink = screen.getByText(/Contact/i);

    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
  });

  it("renders links with correct attributes", () => {
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toHaveAttribute("href", "#");
      expect(link).toHaveClass("text-gray-500");
    });
  });

  it("renders footer with correct styling classes", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("mt-auto", "py-8", "bg-gray-100");
  });
});
