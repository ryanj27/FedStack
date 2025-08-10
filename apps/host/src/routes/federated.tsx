// Federated route - demonstrates remote page component consumption

import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { Apps as AppsIcon } from '@mui/icons-material';
import { Suspense, lazy } from 'react';

// Lazy load the remote FederatedPage component
const RemoteFederatedPage = lazy(() =>
  import('remote/FederatedPage').catch(() => ({
    default: () => (
      <Box p={2} textAlign="center">
        <Typography color="error">
          Remote FederatedPage component failed to load
        </Typography>
      </Box>
    ),
  }))
);

export function FederatedComponent() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <AppsIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Federated Page
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          This page is loaded from the remote microfrontend
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
            <Typography sx={{ ml: 2 }}>Loading remote component...</Typography>
          </Box>
        }
      >
        <RemoteFederatedPage
          title="Welcome to the Remote Application"
          showBackButton={true}
          onBack={() => window.history.back()}
        />
      </Suspense>
    </Container>
  );
}
