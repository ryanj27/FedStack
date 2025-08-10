// Root route for TanStack Router application
// Provides the main layout and structure

import { Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Box } from '@mui/material';
import { Navigation } from '../components/Navigation';

export function RootComponent() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: 'background.default',
        }}
      >
        <Outlet />
      </Box>
      <TanStackRouterDevtools />
    </Box>
  );
}
