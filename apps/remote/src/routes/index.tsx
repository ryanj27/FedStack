// Index route for Remote application (standalone mode)

import { createFileRoute } from '@tanstack/react-router';
import { Container, Typography, Box, Paper } from '@mui/material';
import UserCard from '../components/UserCard';
import FederatedPage from '../components/FederatedPage';

export function IndexComponent() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1" gutterBottom>
        Remote Application
      </Typography>

      <Typography variant="h6" color="text.secondary" paragraph>
        This is the standalone version of the remote application. Components
        from this app are also available to the host via Module Federation.
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          UserCard Component Demo
        </Typography>
        <Box sx={{ maxWidth: 400 }}>
          <UserCard userId="1" showActions={true} variant="detailed" />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          FederatedPage Component Demo
        </Typography>
        <FederatedPage title="Demo Federated Page" showBackButton={false} />
      </Paper>
    </Container>
  );
}

export const Route = createFileRoute('/')({
  component: IndexComponent,
});
