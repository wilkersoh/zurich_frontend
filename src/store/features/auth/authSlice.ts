import { RootState } from "@/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthUser {
  name: string;
  email: string;
  image?: string;
}

export interface AuthState {
  user?: AuthUser | undefined;
  expires?: string | undefined;
}

const initialState: AuthState = {
  user: undefined,
  expires: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState | undefined>) => {
      state.user = action.payload?.user;
      state.expires = action.payload?.expires;
    },
  },
});

export const isAuthenticatedSelector = (state: RootState): boolean => {
  const expires = state.auth.expires;
  if (!expires) return false;

  const currentDate = new Date();
  const expirationDate = new Date(expires);

  return expirationDate > currentDate;
};

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
