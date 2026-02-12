/**
 * Deployment Management Route
 *
 * Admin page for managing blue/green deployments of federated remotes.
 * Showcases the DeploymentControlPanel component.
 */

import {
  Container,
  Typography,
  Box,
  Grid,
  Alert,
  AlertTitle,
} from '@mui/material';
import { DeploymentControlPanel } from '@/components/DeploymentControlPanel';
import { Code as CodeIcon } from '@mui/icons-material';

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

      <Box sx={{ mt: 4 }}>
        <Alert severity="warning">
          <AlertTitle>Local Development Setup</AlertTitle>
          <Typography variant="body2" component="div">
            To test blue/green switching locally:
            <ol style={{ marginTop: 8, marginBottom: 0 }}>
              <li>
                Run analytics on port 3002 (blue slot):{' '}
                <code>cd apps/analytics && pnpm dev</code>
              </li>
              <li>
                Run analytics on port 3003 (green slot):{' '}
                <code>VITE_PORT=3003 pnpm dev</code>
              </li>
              <li>Use the controls above to switch between them</li>
            </ol>
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
}
