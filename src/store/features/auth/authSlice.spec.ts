import { RootState } from "@/store";
import authReducer, {
  AuthState,
  setAuth,
  isAuthenticatedSelector,
} from "./authSlice";

describe("authSlice", () => {
  const initialState: AuthState = {
    user: undefined,
    expires: undefined,
  };

  const mockUser = {
    name: "Test User",
    email: "test@example.com",
    image: "test.jpg",
  };

  describe("reducer", () => {
    it("should handle initial state", () => {
      expect(authReducer(undefined, { type: "unknown" })).toEqual(initialState);
    });

    it("should handle setAuth with valid payload", () => {
      const mockPayload: AuthState = {
        user: mockUser,
        expires: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
      };

      const actual = authReducer(initialState, setAuth(mockPayload));
      expect(actual.user).toEqual(mockUser);
      expect(actual.expires).toEqual(mockPayload.expires);
    });

    it("should handle setAuth with undefined payload", () => {
      const actual = authReducer(
        {
          user: mockUser,
          expires: "2024-04-01T00:00:00.000Z",
        },
        setAuth(undefined)
      );
      expect(actual.user).toBeUndefined();
      expect(actual.expires).toBeUndefined();
    });
  });

  describe("isAuthenticatedSelector", () => {
    it("should return false when expires is undefined", () => {
      const state = {
        auth: {
          user: mockUser,
          expires: undefined,
        },
      } as RootState;
      expect(isAuthenticatedSelector(state)).toBeFalsy();
    });

    it("should return true when expiration is in the future", () => {
      const futureDate = new Date();
      futureDate.setHours(futureDate.getHours() + 1);

      const state = {
        auth: {
          user: mockUser,
          expires: futureDate.toISOString(),
        },
      } as RootState;
      expect(isAuthenticatedSelector(state)).toBeTruthy();
    });

    it("should return false when expiration is in the past", () => {
      const pastDate = new Date();
      pastDate.setHours(pastDate.getHours() - 1);

      const state = {
        auth: {
          user: mockUser,
          expires: pastDate.toISOString(),
        },
      } as RootState;
      expect(isAuthenticatedSelector(state)).toBeFalsy();
    });
  });
});
