import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "@/config/env";
import type { RootState } from "@/app/store/store";
import { setCredentials, logout } from "@/features/auth/state/admin-auth-slice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

/**
 * Wraps the base query with 401 auto-refresh logic.
 * On 401, attempts to refresh the token pair.
 * If refresh succeeds, retries the original request.
 * If refresh fails, dispatches logout.
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.auth.refreshToken;

    // Skip refresh if no refresh token (not logged in) or already a refresh request
    if (!refreshToken) {
      api.dispatch(logout());
      return result;
    }

    const isRefreshEndpoint =
      typeof args === "object" &&
      "url" in args &&
      typeof args.url === "string" &&
      args.url.includes("/refresh");

    if (isRefreshEndpoint) {
      api.dispatch(logout());
      return result;
    }

    // Attempt token refresh
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      const data = refreshResult.data as {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
      };
      api.dispatch(
        setCredentials({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          expiresIn: data.expiresIn,
          user: state.auth.user,
        }),
      );
      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

/**
 * Base RTK Query API slice.
 * All feature API endpoints inject into this.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
