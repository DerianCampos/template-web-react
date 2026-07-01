import { useAppSelector } from "@/app/store/hooks";
import { selectUser } from "@/features/auth/state/admin-auth-slice";
import { useGetMeQuery } from "@/features/auth/api/admin-auth-api";

/**
 * Dashboard data hook.
 * Prefers Redux store user (set at login) over cached RTK Query data.
 * Fetches /me on mount but won't override login data with stale cache.
 */
export function useDashboard() {
  const storedUser = useAppSelector(selectUser);

  const {
    data: fetchedUser,
    isLoading,
    error,
  } = useGetMeQuery(undefined, {
    // Fetch profile in background; storedUser from login takes priority
  });

  return {
    user: storedUser ?? fetchedUser,
    isLoading: !storedUser && isLoading,
    error,
  };
}
