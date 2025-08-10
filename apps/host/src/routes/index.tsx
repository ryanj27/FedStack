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
} from '@mui/material';
import { Home as HomeIcon, Apps as AppsIcon } from '@mui/icons-material';

export function IndexComponent() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <HomeIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Welcome to the Host Application
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          A production-quality microfrontend setup with Module Federation
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <AppsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Host Features
              </Typography>
              <Typography variant="body1" paragraph>
                This host application demonstrates:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>TanStack Router routing</li>
                <li>Material UI theming with dark mode</li>
                <li>TanStack Query for data fetching</li>
                <li>Module Federation setup</li>
                <li>TypeScript with strict mode</li>
              </Box>
            </CardContent>
            <CardActions>
              <Button href="/federated" variant="contained">
                View Federated Page
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Remote Components
              </Typography>
              <Typography variant="body1" paragraph>
                The remote application exposes components that are dynamically
                loaded:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <li>UserCard component</li>
                <li>FederatedPage route</li>
                <li>Shared theme inheritance</li>
                <li>Type-safe interfaces</li>
              </Box>
            </CardContent>
            <CardActions>
              <Button href="/users" variant="outlined">
                View Users
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Architecture Highlights
        </Typography>
        <Typography variant="body1">
          This setup demonstrates production-ready patterns including shared
          dependencies, theme propagation, type safety across microfrontends,
          and modern development tooling with hot reload support.
        </Typography>
      </Paper>
    </Container>
  );
}
