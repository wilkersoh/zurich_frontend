import { render, screen } from "@testing-library/react";
import UnauthorizedPage from "./page";

describe("Unauthorized", () => {
  it("render correctly", () => {
    render(<UnauthorizedPage />);
    expect(screen.getByText("You are unauthorized")).toBeInTheDocument();
  });
});
