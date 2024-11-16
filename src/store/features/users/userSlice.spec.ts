import userReducer, {
  fetchUsers,
  toggleMaskEmail,
  getStatus,
  getAllUsers,
  getMaskedEmails,
  UserState,
} from "./userSlice";
import { User } from "./types";
import { RootState } from "@/store";

describe("userSlice", () => {
  const initialState: UserState = {
    users: [],
    maskedEmails: {},
    status: "idle",
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  };

  it("should handle initial state", () => {
    expect(userReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  describe("toggleMaskEmail", () => {
    it("should toggle email mask status for a user", () => {
      const actual = userReducer(initialState, toggleMaskEmail(1));
      expect(actual.maskedEmails[1]).toBe(true);

      const toggled = userReducer(actual, toggleMaskEmail(1));
      expect(toggled.maskedEmails[1]).toBe(false);
    });
  });

  describe("fetchUsers", () => {
    const mockUsers: User[] = [
      {
        id: 1,
        email: "george@test.com",
        first_name: "George",
        last_name: "Smith",
        avatar: "avatar1.jpg",
      },
      {
        id: 2,
        email: "janet@test.com",
        first_name: "Janet",
        last_name: "Wilson",
        avatar: "avatar2.jpg",
      },
      {
        id: 3,
        email: "emma@test.com",
        first_name: "Emma",
        last_name: "Brown",
        avatar: "avatar3.jpg",
      },
    ];

    const mockApiResponse = {
      data: mockUsers,
      page: 1,
      per_page: 3,
      total: 3,
      total_pages: 1,
    };

    beforeEach(() => {
      global.fetch = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should set status to loading when fetchUsers is pending", () => {
      const action = { type: fetchUsers.pending.type };
      const state = userReducer(initialState, action);
      expect(state.status).toEqual("loading");
    });

    it("should handle fetchUsers fulfilled", () => {
      const action = {
        type: fetchUsers.fulfilled.type,
        payload: mockApiResponse,
      };
      const state = userReducer(initialState, action);

      expect(state.status).toEqual("success");
      expect(state.users).toEqual([mockUsers[0], mockUsers[1]]); // Only users with G* first_name or W* last_name
      expect(state.maskedEmails[1]).toBe(true);
      expect(state.maskedEmails[2]).toBe(true);
      expect(state.page).toEqual(1);
      expect(state.per_page).toEqual(3);
      expect(state.total).toEqual(3);
      expect(state.total_pages).toEqual(1);
    });
  });

  describe("selectors", () => {
    const mockState = {
      users: {
        users: [{ id: 1, name: "Test" }],
        maskedEmails: { 1: true },
        status: "success" as const,
        page: 1,
        per_page: 1,
        total: 1,
        total_pages: 1,
      },
    };

    it("should select status", () => {
      expect(getStatus(mockState as unknown as RootState)).toEqual("success");
    });

    it("should select all users", () => {
      expect(getAllUsers(mockState as unknown as RootState)).toEqual([
        { id: 1, name: "Test" },
      ]);
    });

    it("should select masked emails", () => {
      expect(getMaskedEmails(mockState as unknown as RootState)).toEqual({
        1: true,
      });
    });
  });
});
