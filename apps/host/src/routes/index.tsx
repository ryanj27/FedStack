// Index route - Home page of the host application

import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from '@mui/material';
import {
  Home as HomeIcon,
  Apps as AppsIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
// ADDED: Lazy load analytics widget for multi-remote demonstration
import { lazy, Suspense } from 'react';

const RemoteMetricsSummary = lazy(() =>
  import('analytics/MetricsSummary').catch(() => ({
    default: () => (
      <Box p={2} textAlign="center">
        <Typography color="error" variant="body2">
          Analytics widget unavailable
        </Typography>
      </Box>
    ),
  }))
);

export function IndexComponent() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <HomeIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Microfrontend Host
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          A Module Federation demonstration with multiple remote applications
        </Typography>
      </Box>

      {/* Analytics Widget Section */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h3">
                Real-time Analytics
              </Typography>
            </Box>
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress size={40} />
                </Box>
              }
            >
              <RemoteMetricsSummary />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AppsIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h5" component="h2">
                  Remote Applications
                </Typography>
              </Box>
              <Typography variant="body1" paragraph>
                This host application dynamically loads components from multiple
                remote microfrontends, demonstrating the power of Module
                Federation.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Navigate to explore federated components and pages.
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                href="/federated"
                sx={{ textTransform: 'none' }}
              >
                View Federated Components
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Architecture Overview
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Host App:</strong> Main application shell (Port 3000)
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Remote App:</strong> User management components (Port
              3001)
            </Typography>
            <Typography variant="body2" paragraph>
              • <strong>Analytics Remote:</strong> Business metrics and
              dashboards (Port 3002)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              All remotes share common dependencies and theming for consistency.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AnalyticsIcon sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6" component="h3">
                Live Analytics Dashboard
              </Typography>
            </Box>
            <Suspense
              fallback={
                <Box display="flex" justifyContent="center" p={3}>
                  <CircularProgress />
                </Box>
              }
            >
              <RemoteMetricsSummary />
            </Suspense>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
