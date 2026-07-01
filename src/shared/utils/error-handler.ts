import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { ApiError } from "@/shared/types/api";

/**
 * Extract a human-readable error message from RTK Query error types.
 * Prefers backend error detail, falls back to HTTP status or generic message.
 */
export function getErrorMessage(
  error: FetchBaseQueryError | SerializedError | undefined,
): string {
  if (!error) return "An unknown error occurred";

  if ("status" in error) {
    const fetchError = error as FetchBaseQueryError;
    const data = fetchError.data as ApiError | undefined;
    if (data?.detail) return data.detail;

    if (typeof fetchError.status === "number") {
      switch (fetchError.status) {
        case 400:
          return "Invalid request. Please check your input.";
        case 401:
          return "Authentication required. Please log in.";
        case 403:
          return "You do not have permission to perform this action.";
        case 404:
          return "The requested resource was not found.";
        case 409:
          return "A conflict occurred. The resource may already exist.";
        case 429:
          return "Too many requests. Please wait and try again.";
        case 500:
          return "Server error. Please try again later.";
        default:
          return `Request failed with status ${fetchError.status}`;
      }
    }
    return "Request failed";
  }

  if ("message" in error && error.message) {
    return error.message;
  }

  return "An unknown error occurred";
}

/**
 * Check if an RTK Query error is a specific HTTP status.
 */
export function isHttpStatus(
  error: FetchBaseQueryError | SerializedError | undefined,
  status: number,
): boolean {
  return (
    !!error &&
    "status" in error &&
    (error as FetchBaseQueryError).status === status
  );
}
