import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store/types";

interface Token {
  accessToken: string;
  refreshToken: string;
}

export interface Auth {
  isAuthenticated: boolean;
  user: string | null;
  stripeUserId: string | null;
  token: Token | null;
  userFavorites: string[];
}

export const initialAuthState: Auth = {
  isAuthenticated: false,
  user: null,
  stripeUserId: null,
  token: null,
  userFavorites: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken(state, action: PayloadAction<Token | null>) {
      state.token = action.payload;
      state.isAuthenticated = action.payload !== null;
    },
    setUser(state, action: PayloadAction<string | null>) {
      state.user = action.payload;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.stripeUserId = null;
    },
    setStripeUserID(state, action: PayloadAction<string>) {
      state.stripeUserId = action.payload;
    },
    setUserFavorites(state, action: PayloadAction<string[]>) {
      state.userFavorites = action.payload;
    },
  },
});

export const { setToken, setUser, logout, setStripeUserID, setUserFavorites } =
  authSlice.actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectStripeUserId = (state: RootState) => state.auth.stripeUserId;

export default authSlice.reducer;
