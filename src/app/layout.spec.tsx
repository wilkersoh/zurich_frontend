import { render } from "@testing-library/react";
import RootLayout from "./layout";

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-session-provider">{children}</div>
  ),
}));

jest.mock("@/components/Header", () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}));

jest.mock("@/components/Footer", () => ({
  Footer: () => <div data-testid="mock-footer">Footer</div>,
}));

jest.mock("@/components/Content", () => ({
  Content: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-content">{children}</div>
  ),
}));

describe("RootLayout", () => {
  it("wrap the content with SessionProvider", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const sessionProvider = getByTestId("mock-session-provider");
    expect(sessionProvider).toBeInTheDocument();
    expect(getByTestId("mock-content")).toBeInTheDocument();
  });

  it("render the layout with all components", () => {
    const { getByTestId } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByTestId("mock-header")).toBeInTheDocument();
    expect(getByTestId("mock-content")).toBeInTheDocument();
    expect(getByTestId("mock-footer")).toBeInTheDocument();
  });
});
