// TanStack Router Route Tree for Analytics App
// Manually configured route tree

import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootComponent } from './routes/__root';
import { IndexComponent } from './routes/index';

// Create the root route
const rootRoute = createRootRoute({
  component: RootComponent,
});

// Create child routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: IndexComponent,
});

// Create the route tree
export const routeTree = rootRoute.addChildren([indexRoute]);
