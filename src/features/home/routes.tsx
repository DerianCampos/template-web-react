import type { RouteConfig } from "@/app/routing/types";
import { lazyLoad } from "@/app/routing/lazy-loader";

const HomePage = lazyLoad(() => import("@/features/home/pages"));

export const homeRoutes: RouteConfig[] = [
  {
    path: "/",
    element: HomePage,
    guard: "public",
  },
];
