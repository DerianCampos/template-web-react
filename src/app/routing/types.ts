import type { ReactNode } from "react";

/** Guard types for route access control */
export type GuardType = "public" | "guest" | "private" | "admin";

/** Route configuration used by AppRouter */
export interface RouteConfig {
  /** URL path pattern */
  path: string;
  /** The page/component to render */
  element: ReactNode;
  /** Access control guard */
  guard: GuardType;
}
