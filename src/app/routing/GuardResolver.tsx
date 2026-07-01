import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/app/store/hooks";
import {
  selectIsAuthenticated,
  selectIsAdmin,
} from "@/features/auth/state/admin-auth-slice";
import type { GuardType } from "./types";

interface GuardResolverProps {
  guard: GuardType;
  children: React.ReactNode;
}

/**
 * Route guard component.
 * - public: always renders
 * - guest: redirects to /dashboard if already authenticated
 * - private: redirects to /login if not authenticated
 * - admin: redirects to /unauthorized if not admin
 */
const GuardResolver: React.FC<GuardResolverProps> = ({ guard, children }) => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isAdmin = useAppSelector(selectIsAdmin);

  switch (guard) {
    case "public":
      return <>{children}</>;

    case "guest":
      if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
      }
      return <>{children}</>;

    case "private":
      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      return <>{children}</>;

    case "admin":
      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      if (!isAdmin) {
        return <Navigate to="/unauthorized" replace />;
      }
      return <>{children}</>;

    default:
      return <>{children}</>;
  }
};

export default GuardResolver;
