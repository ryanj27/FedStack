// TanStack Router Route Tree
// Manually configured route tree for Module Federation compatibility

import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootComponent } from './routes/__root';
import { IndexComponent } from './routes/index';
import { UsersComponent } from './routes/users';
import { FederatedComponent } from './routes/federated';
// ADDED: Analytics route component for multi-remote federation
import { AnalyticsComponent } from './routes/analytics';
import Debug from './debug';

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

const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/users',
  component: UsersComponent,
});

const federatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/federated',
  component: FederatedComponent,
});

const debugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/debug',
  component: Debug,
});

// ADDED: Analytics route for multi-remote federation
const analyticsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/analytics',
  component: AnalyticsComponent,
});

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  federatedRoute,
  debugRoute,
  analyticsRoute,
]);
