import type { RouteConfig } from "./types";
import { authRoutes } from "@/features/auth/routes";
import { homeRoutes } from "@/features/home/routes";
import { dashboardRoutes } from "@/features/dashboard/routes";
import { lazyLoad } from "./lazy-loader";

const UnauthorizedPage = lazyLoad(
  () => import("@/shared/pages/unauthorized"),
);

/**
 * Centralized route configuration.
 * Feature route arrays are imported and spread here.
 * Order matters: more specific paths first, catch-all last.
 */
export const routeConfigs: RouteConfig[] = [
  ...homeRoutes,
  ...authRoutes,
  ...dashboardRoutes,
  {
    path: "/unauthorized",
    element: UnauthorizedPage,
    guard: "public",
  },
];
