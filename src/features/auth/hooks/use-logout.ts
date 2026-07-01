import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/app/store/hooks";
import { logout } from "@/features/auth/state/admin-auth-slice";
import { useLogoutMutation } from "@/features/auth/api/admin-auth-api";
import { baseApi } from "@/app/api/base-api";

/**
 * Hook that clears auth state, optionally calls the logout endpoint, and redirects.
 */
export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // Best-effort: notify the server to revoke the access token
      await logoutApi().unwrap();
    } catch {
      // Ignore errors — token may already be expired
    }
    dispatch(logout());
    // Clear RTK Query cache so next login gets fresh data
    dispatch(baseApi.util.resetApiState());
    navigate("/login", { replace: true });
  };

  return handleLogout;
}
