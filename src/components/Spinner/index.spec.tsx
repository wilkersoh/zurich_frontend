import { render } from "@testing-library/react";
import { Spinner } from "./Spinner";

describe("Spinner", () => {
  it("render correctly", () => {
    const { container } = render(<Spinner />);
    const spinner = container.firstChild as HTMLElement;

    expect(spinner).toHaveClass(
      "animate-spin",
      "h-5",
      "w-5",
      "border-2",
      "border-gray-500",
      "rounded-full",
      "border-t-transparent"
    );
  });
});
