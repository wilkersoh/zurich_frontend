import { render, screen } from "@testing-library/react";
import { Content } from "./Content";

describe("Content", () => {
  it("render children correctly", () => {
    const testText = "Test Content";
    render(
      <Content>
        <div>{testText}</div>
      </Content>
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("has the correct margin-top class", () => {
    const { container } = render(
      <Content>
        <div>Test Content</div>
      </Content>
    );

    const section = container.querySelector("section");
    expect(section).toHaveClass("mt-[66px]");
  });

  it("render as a section element", () => {
    const { container } = render(
      <Content>
        <div>Test Content</div>
      </Content>
    );

    const section = container.querySelector("section");
    expect(section).toBeInTheDocument();
  });
});
