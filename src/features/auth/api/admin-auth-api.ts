import { baseApi } from "@/app/api/base-api";
import type {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/features/auth/types";
import type { UserProfile } from "@/features/auth/types";
import { setCredentials } from "@/features/auth/state/admin-auth-slice";

export const adminAuthApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** POST /login — authenticate and receive tokens */
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
              user: data.user,
            }),
          );
        } catch {
          // login failed — handled by the component
        }
      },
    }),

    /** POST /refresh — rotate token pair */
    refresh: builder.mutation<RefreshResponse, RefreshRequest>({
      query: (body) => ({
        url: "/refresh",
        method: "POST",
        body,
      }),
    }),

    /** POST /logout — revoke access token */
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    /** GET /users/me — fetch current user profile */
    getMe: builder.query<UserProfile, void>({
      query: () => "/users/me",
    }),

    /** POST /register — create account and auto-login */
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              expiresIn: data.expiresIn,
              user: data.user,
            }),
          );
        } catch {
          // registration failed — handled by the component
        }
      },
    }),

    /** POST /auth/forgot-password — initiate password reset */
    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      ForgotPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    /** POST /auth/reset-password — complete password reset */
    resetPassword: builder.mutation<
      ResetPasswordResponse,
      ResetPasswordRequest
    >({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetMeQuery,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = adminAuthApi;
