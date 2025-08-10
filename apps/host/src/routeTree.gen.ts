// TanStack Router Route Tree
// Manually configured route tree for Module Federation compatibility

import { createRootRoute, createRoute } from '@tanstack/react-router';
import { RootComponent } from './routes/__root';
import { IndexComponent } from './routes/index';
import { UsersComponent } from './routes/users';
import { FederatedComponent } from './routes/federated';
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

// Create the route tree
export const routeTree = rootRoute.addChildren([
  indexRoute,
  usersRoute,
  federatedRoute,
  debugRoute,
]);
