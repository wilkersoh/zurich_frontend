import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserPage, User, MaskedEmails, Status } from "./types";
import { RootState } from "@/store";

const USER_URL = "https://reqres.in/api/users";

export interface UserState extends UserPage {
  users: User[];
  maskedEmails: MaskedEmails;
  status: Status;
}

const initialState: UserState = {
  users: [],
  maskedEmails: {},
  status: "idle",
  page: 1,
  per_page: 0,
  total: 0,
  total_pages: 0,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch(USER_URL);
  return res?.json();
});

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    toggleMaskEmail: (state, action: PayloadAction<number>) => {
      const userId = action.payload;
      state.maskedEmails[userId] = !state.maskedEmails[userId];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = "error";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "success";

      const { data, page, per_page, total, total_pages } = action.payload;
      const filteredUsers = data.filter(
        (user: User) =>
          user.first_name.startsWith("G") || user.last_name.startsWith("W")
      );

      filteredUsers.forEach((user: User) => {
        state.maskedEmails[user.id] = true;
      });
      state.users = filteredUsers;
      state.page = page;
      state.per_page = per_page;
      state.total = total;
      state.total_pages = total_pages;
    });
  },
});

export const getStatus = (state: RootState) => state.users.status;
export const getAllUsers = (state: RootState) => state.users.users;
export const getMaskedEmails = (state: RootState) => state.users.maskedEmails;

export const { toggleMaskEmail } = userSlice.actions;
export default userSlice.reducer;
