// Analytics route - demonstrates remote analytics page component consumption

import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { Analytics as AnalyticsIcon } from '@mui/icons-material';
import { Suspense, lazy } from 'react';

// Lazy load the remote AnalyticsPage component
const RemoteAnalyticsPage = lazy(() =>
  import('analytics/AnalyticsPage').catch(() => ({
    default: () => (
      <Box p={2} textAlign="center">
        <Typography color="error">
          Remote Analytics component failed to load
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          The analytics service may be unavailable. Please try again later.
        </Typography>
      </Box>
    ),
  }))
);

export function AnalyticsComponent() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <AnalyticsIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Analytics Dashboard
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Business insights and metrics from the analytics microfrontend
        </Typography>
      </Box>

      <Suspense
        fallback={
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="50vh"
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>
              Loading analytics dashboard...
            </Typography>
          </Box>
        }
      >
        <RemoteAnalyticsPage />
      </Suspense>
    </Container>
  );
}
