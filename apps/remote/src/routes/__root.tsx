// Root route for Remote application (standalone mode)

import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

export const RootComponent = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Remote Application (Standalone)</Typography>
      </Toolbar>
    </AppBar>
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

export const Route = createRootRoute({
  component: RootComponent,
});
