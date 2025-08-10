// Analytics app index route for standalone mode
// Provides a welcome page with embedded AnalyticsPage component

import { Container, Typography, Paper, Grid } from '@mui/material';
import MetricsSummary from '../components/MetricsSummary';
import AnalyticsPage from '../components/AnalyticsPage';

export function IndexComponent() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Typography variant="h6" color="text.secondary" paragraph>
        This is the standalone version of the analytics application. Components
        from this app are also available to the host via Module Federation.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Metrics Summary Widget
            </Typography>
            <MetricsSummary />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Analytics Page Component
            </Typography>
            <AnalyticsPage />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
