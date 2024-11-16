import { render, screen, fireEvent } from "@testing-library/react";
import { Header } from "./Header";
import { signIn, signOut, useSession } from "next-auth/react";

const mockDispatch = jest.fn();

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: jest.fn(),
}));

jest.mock("@/store/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock("../Spinner", () => ({
  Spinner: () => <div data-testid="mock-spinner">Spinner</div>,
}));

jest.mock("next/link", () => {
  const LinkComponent = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  LinkComponent.displayName = "MockLink";
  return LinkComponent;
});

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "authenticated",
    });
  });

  it("render the header title with correct link", () => {
    render(<Header />);
    const titleLink = screen.getByText("Zurich");
    expect(titleLink).toBeInTheDocument();
    expect(titleLink.closest("a")).toHaveAttribute("href", "/");
  });

  it("render the users link", () => {
    render(<Header />);
    const usersLink = screen.getByText("Users");
    expect(usersLink).toBeInTheDocument();
    expect(usersLink.closest("a")).toHaveAttribute("href", "/users");
  });

  it("render the loading button when status is loading", () => {
    (useSession as jest.Mock).mockReturnValue({ status: "loading" });
    render(<Header />);
    const loadingButton = screen.getByRole("button");
    const spinner = screen.getByTestId("mock-spinner");
    expect(loadingButton).toBeInTheDocument();
    expect(spinner).toBeInTheDocument();
  });

  it("render the sign in button", () => {
    render(<Header />);
    const signInButton = screen.getByText("Sign in with Google");
    expect(signInButton).toBeInTheDocument();
  });

  it("render the sign out button if user is logged in", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "tester",
          email: "tester@gmail.com",
          image: "tester.jpg",
        },
      },
    });
    render(<Header />);
    const signOutButton = screen.getByText("Sign out");
    expect(signOutButton).toBeInTheDocument();
  });

  it("call signIn when clicking the sign in button", async () => {
    render(<Header />);
    const signInButton = screen.getByText("Sign in with Google");

    await fireEvent.click(signInButton);

    expect(signIn).toHaveBeenCalledWith("google", { redirectTo: "/users" });
  });

  it("call signOut when clicking the sign out button", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          name: "tester",
          email: "tester@gmail.com",
          image: "tester.jpg",
        },
      },
    });
    render(<Header />);
    const signInButton = screen.getByText("Sign out");

    await fireEvent.click(signInButton);

    expect(signOut).toHaveBeenCalled();
  });

  it("has correct styling classes for header container", () => {
    render(<Header />);
    const header = screen.getByRole("banner");
    expect(header).toHaveClass(
      "fixed",
      "top-0",
      "left-0",
      "right-0",
      "z-50",
      "bg-white",
      "border-b",
      "border-gray-200"
    );
  });
});
