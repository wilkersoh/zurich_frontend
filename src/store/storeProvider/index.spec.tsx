import { makeStore } from "../index";

describe("Redux Store", () => {
  it("should create store with correct reducers", () => {
    const store = makeStore();
    const state = store.getState();

    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("users");
  });

  it("should have initial state for auth reducer", () => {
    const store = makeStore();
    const state = store.getState();

    expect(state.auth).toEqual({
      user: undefined,
      expires: undefined,
    });
  });

  it("should have initial state for users reducer", () => {
    const store = makeStore();
    const state = store.getState();

    expect(state.users).toEqual({
      users: [],
      maskedEmails: {},
      status: "idle",
      page: 1,
      per_page: 0,
      total: 0,
      total_pages: 0,
    });
  });
});
