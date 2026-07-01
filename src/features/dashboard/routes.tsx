import type { RouteConfig } from "@/app/routing/types";
import { lazyLoad } from "@/app/routing/lazy-loader";

const DashboardPage = lazyLoad(
  () => import("@/features/dashboard/pages/dashboard"),
);

export const dashboardRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: DashboardPage,
    guard: "private",
  },
  {
    path: "/admin",
    element: DashboardPage,
    guard: "admin",
  },
];
