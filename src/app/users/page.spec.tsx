import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, Reducer } from "@reduxjs/toolkit";
import { userSlice, UserState } from "@/store/features/users/userSlice";
import UsersPage from "./page";
import { StringHelper } from "@/utils/string-helper";

jest.mock("@/store/features/users/userSlice", () => ({
  ...jest.requireActual("@/store/features/users/userSlice"),
  fetchUsers: () => ({ type: "users/fetchUsers" }),
  toggleMaskEmail: (id: number) => ({
    type: "users/toggleMaskEmail",
    payload: id,
  }),
}));

jest.mock("@/components/Spinner", () => ({
  Spinner: () => <div data-testid="mock-spinner">Spinner</div>,
}));

describe("UsersPage", () => {
  const mockUsers = [
    { id: 1, email: "test@example.com", first_name: "John", last_name: "Doe" },
    {
      id: 2,
      email: "jane@example.com",
      first_name: "Jane",
      last_name: "Smith",
    },
  ];

  const setupStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        users: userSlice.reducer as Reducer<UserState>,
      },
      preloadedState: {
        users: {
          users: mockUsers,
          maskedEmails: {},
          ...initialState,
        } as UserState,
      },
    });
  };

  const renderWithProvider = (store = setupStore()) => {
    return render(
      <Provider store={store}>
        <UsersPage />
      </Provider>
    );
  };

  it("render the table headers correctly", () => {
    renderWithProvider();

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("First Name")).toBeInTheDocument();
    expect(screen.getByText("Last Name")).toBeInTheDocument();
  });

  it("display loading spinner when status is loading", () => {
    const storeWithLoadingStatus = setupStore({ status: "loading" });
    renderWithProvider(storeWithLoadingStatus);

    expect(screen.getByTestId("mock-spinner")).toBeInTheDocument();
  });

  it("render user list correctly", () => {
    renderWithProvider();

    mockUsers.forEach((user) => {
      expect(screen.getByText(user.email)).toBeInTheDocument();
      expect(screen.getByText(user.first_name)).toBeInTheDocument();
      expect(screen.getByText(user.last_name)).toBeInTheDocument();
    });
  });

  it("toggle email masking when eye button is clicked", () => {
    const store = setupStore();
    renderWithProvider(store);

    const toggleButtons = screen.getAllByRole("button");
    fireEvent.click(toggleButtons[0]);

    const actions = store.getState().users.maskedEmails;
    expect(actions[mockUsers[0].id]).toBeTruthy();
  });

  it("display masked email when toggle is active", () => {
    const store = setupStore({
      maskedEmails: { 1: true },
    });
    renderWithProvider(store);

    const maskedEmail = StringHelper.maskEmail(mockUsers[0].email);
    expect(screen.getByText(maskedEmail)).toBeInTheDocument();
  });
});
