/**
 * Deployment Management Route
 *
 * Admin page for managing blue/green deployments of federated remotes.
 */

import {
  Container,
  Typography,
  Box,
  Grid,
  Alert,
  AlertTitle,
  CircularProgress,
} from '@mui/material';
import { Code as CodeIcon } from '@mui/icons-material';
import { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';

// Error boundary to catch any issues
class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('DeploymentControlPanel error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert severity="error">
          <AlertTitle>Error Loading Deployment Controls</AlertTitle>
          <Typography variant="body2">
            {this.state.error?.message ||
              'An error occurred while loading the deployment panel.'}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
            Check the browser console for details.
          </Typography>
        </Alert>
      );
    }

    return this.props.children;
  }
}

// Lazy load the panel to isolate any errors
const DeploymentControlPanel = lazy(() =>
  import('../components/DeploymentControlPanel')
    .then((module) => {
      console.log('DeploymentControlPanel module loaded:', module);
      return { default: module.DeploymentControlPanel };
    })
    .catch((err) => {
      console.error('Failed to load DeploymentControlPanel:', err);
      return {
        default: () => (
          <Alert severity="error">
            <AlertTitle>Module Load Error</AlertTitle>
            <Typography variant="body2">
              Failed to load deployment control panel: {err.message}
            </Typography>
          </Alert>
        ),
      };
    })
);

export function DeploymentComponent() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <CodeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Deployment Management
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Control blue/green deployments of federated remotes
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        <AlertTitle>Blue/Green Deployment Strategy</AlertTitle>
        <Typography variant="body2">
          This panel allows you to switch between two deployment environments
          (blue and green) for the analytics remote. Deploy new versions to the
          inactive slot, test thoroughly, then switch traffic instantly with
          zero downtime. Rollback is immediate if issues arise.
        </Typography>
      </Alert>

      <ErrorBoundary>
        <Suspense
          fallback={
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          }
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <DeploymentControlPanel
                remoteName="analytics"
                title="Analytics Remote"
                description="Manage analytics microfrontend deployment"
              />
            </Grid>

            {/* Placeholder for additional remotes */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p: 3,
                  border: 1,
                  borderColor: 'grey.300',
                  borderRadius: 1,
                  bgcolor: 'grey.50',
                  minHeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography color="text.secondary" align="center">
                  Additional remote deployment controls can be added here
                  <br />
                  <Typography variant="caption">
                    (e.g., remote, users, products)
                  </Typography>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Suspense>
      </ErrorBoundary>

      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">
          <AlertTitle>Local Development Setup (Versioned Builds)</AlertTitle>
          <Typography variant="body2" component="div">
            To test blue/green switching with versioned builds (simulating
            Azure):
            <ol style={{ marginTop: 8, marginBottom: 0 }}>
              <li>
                Build versions: <code>pnpm build:versions</code> (creates v1.0.0
                and v1.1.0)
              </li>
              <li>
                Start version server: <code>pnpm serve:versions</code> (serves
                on port 3100)
              </li>
              <li>
                Start host app: <code>pnpm dev:host</code> (or use{' '}
                <code>pnpm dev:versions</code> to start both)
              </li>
              <li>
                Use the controls above to switch between blue (v1.0.0) and green
                (v1.1.0)
              </li>
            </ol>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              💡 This simulates Azure Blob Storage with version folders. Blue
              points to v1.0.0, Green points to v1.1.0.
            </Typography>
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
}
