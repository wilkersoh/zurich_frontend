import { render } from "@testing-library/react";
import Home from "../app/page";

// Mock the Dashboard component
jest.mock("@/components/Dashboard", () => ({
  Dashboard: () => <div data-testid="mock-dashboard">Dashboard</div>,
}));

describe("Home", () => {
  it("render the Dashboard component", () => {
    const { getByTestId } = render(<Home />);
    expect(getByTestId("mock-dashboard")).toBeInTheDocument();
  });
});
