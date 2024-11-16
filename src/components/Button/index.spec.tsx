import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";

describe("Button", () => {
  it("render children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("apply default classes", () => {
    const { container } = render(<Button>Click me</Button>);
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass(
      "px-4",
      "py-2",
      "bg-blue-600",
      "text-white",
      "rounded-md",
      "hover:bg-blue-700",
      "focus:outline-none",
      "focus:ring-2",
      "focus:ring-blue-500",
      "focus:ring-offset-2",
      "transition-colors"
    );
  });

  it("merge custom className with default classes", () => {
    const { container } = render(
      <Button className="custom-class">Click me</Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("custom-class");
    expect(button).toHaveClass("bg-blue-600"); // Should still have default classes
  });

  it("handle click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("forwards other HTML button attributes", () => {
    render(
      <Button type="submit" disabled data-testid="test-button">
        Submit
      </Button>
    );

    const button = screen.getByTestId("test-button");
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("renders as a button element", () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild?.nodeName).toBe("BUTTON");
  });
});
