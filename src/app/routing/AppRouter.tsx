import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PublicLayout } from "@/app/layouts/public-layout";
import { PrivateLayout } from "@/app/layouts/private-layout";
import { AdminLayout } from "@/app/layouts/admin-layout";
import { lazyLoad } from "./lazy-loader";
import GuardResolver from "./GuardResolver";
import RouteErrorBoundary from "./RouteErrorBoundary";
import { routeConfigs } from "./routes";
import type { RouteConfig } from "./types";

const NotFoundPage = lazyLoad(() => import("@/shared/pages/not-found"));

/**
 * Determines the layout element based on the route guard.
 */
function getLayoutForGuard(guard: RouteConfig["guard"]) {
  switch (guard) {
    case "public":
    case "guest":
      return <PublicLayout />;
    case "private":
      return <PrivateLayout />;
    case "admin":
      return <AdminLayout />;
    default:
      return <PublicLayout />;
  }
}

/**
 * Groups routes by layout to avoid re-mounting the layout on every navigation.
 * Routes with the same guard/layout are nested under the same layout element.
 */
function groupRoutesByLayout(routes: RouteConfig[]) {
  const map = new Map<string, RouteConfig[]>();
  for (const route of routes) {
    const key = route.guard;
    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(route);
  }
  return map;
}

const AppRouter: React.FC = () => {
  const grouped = groupRoutesByLayout(routeConfigs);

  return (
    <BrowserRouter>
      <Routes>
        {Array.from(grouped.entries()).map(([guard, routes]) => {
          const layout = getLayoutForGuard(guard as RouteConfig["guard"]);
          return (
            <Route key={guard} element={layout}>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <RouteErrorBoundary>
                      <GuardResolver guard={route.guard}>
                        {route.element}
                      </GuardResolver>
                    </RouteErrorBoundary>
                  }
                />
              ))}
            </Route>
          );
        })}

        {/* Catch-all 404 — wraps NotFoundPage in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="*" element={NotFoundPage} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
