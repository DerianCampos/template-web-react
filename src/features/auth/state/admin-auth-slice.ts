import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/store";
import type { UserProfile } from "@/features/auth/types";
import {
  saveSession,
  loadSession,
  clearSession,
} from "@/features/auth/model/session-storage";

// ── State ──────────────────────────────────────────────────

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: number | null;
  user: UserProfile | null;
  isAuthenticated: boolean;
}

/** Hydrate initial state from localStorage */
function getInitialState(): AuthState {
  const saved = loadSession();
  if (saved) {
    return {
      accessToken: saved.accessToken,
      refreshToken: saved.refreshToken,
      expiresIn: saved.expiresIn,
      user: saved.user,
      isAuthenticated: true,
    };
  }
  return {
    accessToken: null,
    refreshToken: null,
    expiresIn: null,
    user: null,
    isAuthenticated: false,
  };
}

// ── Slice ──────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    /** Set credentials after login or token refresh */
    setCredentials(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        user: UserProfile | null;
      }>,
    ) {
      const { accessToken, refreshToken, expiresIn, user } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresIn = expiresIn;
      state.user = user;
      state.isAuthenticated = true;
      saveSession({ accessToken, refreshToken, expiresIn, user });
    },

    /** Clear all auth state (logout) */
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.expiresIn = null;
      state.user = null;
      state.isAuthenticated = false;
      clearSession();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

// ── Selectors ──────────────────────────────────────────────

export const selectAuth = (state: RootState): AuthState => state.auth;
export const selectUser = (state: RootState): UserProfile | null =>
  state.auth.user;
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;
export const selectIsAdmin = (state: RootState): boolean =>
  state.auth.user?.role === "admin";
export const selectAccessToken = (state: RootState): string | null =>
  state.auth.accessToken;
export const selectRefreshToken = (state: RootState): string | null =>
  state.auth.refreshToken;

export default authSlice.reducer;
