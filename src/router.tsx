import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Compat } from "./pages/Compat";
export type ViewMode = "both" | "android" | "ios" | "none";

export interface CompatSearch {
  view?: ViewMode;
  search?: string;
  hidden?: string;
}

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const compatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/compat",
  component: Compat,
  validateSearch: (search: Record<string, unknown>): CompatSearch => ({
    view:
      search.view === "android" ||
      search.view === "ios" ||
      search.view === "both" ||
      search.view === "none"
        ? search.view
        : undefined,
    search: typeof search.search === "string" ? search.search : undefined,
    hidden:
      typeof search.hidden === "string" && search.hidden
        ? search.hidden
        : undefined,
  }),
});

const routeTree = rootRoute.addChildren([indexRoute, compatRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
