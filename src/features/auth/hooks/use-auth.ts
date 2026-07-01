import { useAppSelector } from "@/app/store/hooks";
import {
  selectUser,
  selectIsAuthenticated,
} from "@/features/auth/state/admin-auth-slice";
import { useGetMeQuery } from "@/features/auth/api/admin-auth-api";

/**
 * Convenience hook for auth state.
 * Triggers /users/me fetch if authenticated but user profile is missing.
 */
export function useAuth() {
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const {
    isLoading: isFetchingProfile,
    error: profileError,
  } = useGetMeQuery(undefined, {
    // Only fetch /me if authenticated but no user object in store yet
    skip: !isAuthenticated || !!user,
  });

  return {
    user,
    isAuthenticated,
    isLoading: isAuthenticated && !user && isFetchingProfile,
    error: profileError,
  };
}
