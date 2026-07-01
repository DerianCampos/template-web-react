import { useAppSelector } from "@/app/store/hooks";
import {
  selectIsAdmin,
  selectUser,
} from "@/features/auth/state/admin-auth-slice";

/**
 * Role-checking hook.
 * Returns boolean flags and the raw role string.
 */
export function useRole() {
  const user = useAppSelector(selectUser);
  const isAdmin = useAppSelector(selectIsAdmin);

  return {
    isAdmin,
    isViewer: !isAdmin && !!user,
    role: user?.role ?? null,
  };
}
