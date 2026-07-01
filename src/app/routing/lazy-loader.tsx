import { lazy, Suspense } from "react";
import type { ComponentType } from "react";
import RouteLoading from "./RouteLoading";

/**
 * Wraps React.lazy with a Suspense + RouteLoading fallback.
 * Usage: `lazyLoad(() => import("@/features/home/pages"))`
 */
export function lazyLoad(
  importer: () => Promise<{ default: ComponentType }>,
): React.ReactNode {
  const LazyComponent = lazy(importer);
  return (
    <Suspense fallback={<RouteLoading />}>
      <LazyComponent />
    </Suspense>
  );
}
