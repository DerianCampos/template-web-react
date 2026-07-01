import type { RouteConfig } from "@/app/routing/types";
import { lazyLoad } from "@/app/routing/lazy-loader";

const LoginPage = lazyLoad(() => import("@/features/auth/pages/login"));
const ForgotPasswordPage = lazyLoad(
  () => import("@/features/auth/pages/forgot-password"),
);
const ResetPasswordPage = lazyLoad(
  () => import("@/features/auth/pages/reset-password"),
);
const RegisterPage = lazyLoad(
  () => import("@/features/auth/pages/register"),
);

export const authRoutes: RouteConfig[] = [
  {
    path: "/register",
    element: RegisterPage,
    guard: "guest",
  },
  {
    path: "/login",
    element: LoginPage,
    guard: "guest",
  },
  {
    path: "/forgot-password",
    element: ForgotPasswordPage,
    guard: "guest",
  },
  {
    path: "/reset-password",
    element: ResetPasswordPage,
    guard: "guest",
  },
];
