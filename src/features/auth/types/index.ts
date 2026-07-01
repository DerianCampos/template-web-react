/** Auth feature type definitions — aligned with BE API contract */

import type { UserProfile } from "@/shared/types/domain";

// ── Request types ──────────────────────────────────────────

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: "admin" | "viewer";
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
}

// ── Response types ─────────────────────────────────────────

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  email: string;
  displayName: string;
  loggedInAt: string;
  role: "admin" | "viewer";
  user: UserProfile;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LogoutResponse {
  message: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

/** Register response is identical to LoginResponse (auto-login on register) */
export type RegisterResponse = LoginResponse;

// ── Combined user info from /me endpoint ───────────────────
export type { UserProfile };
