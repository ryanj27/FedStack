// FederatedPage component - Remote federated page component
// Demonstrates a complete page component that can be consumed by the host

import React from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
  Settings as SettingsIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import type { FederatedPageProps } from '@ui/contracts';

const FederatedPage: React.FC<FederatedPageProps> = ({
  title = 'Remote Federated Page',
  showBackButton = false,
  onBack,
}) => {
  return (
    <Container maxWidth="lg">
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          {showBackButton && (
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={onBack}
              variant="outlined"
              size="small"
            >
              Back
            </Button>
          )}
          <Typography variant="h3" component="h1" flexGrow={1}>
            {title}
          </Typography>
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          This page is dynamically loaded from the remote microfrontend and
          inherits the theme from the host application.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <SettingsIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Features Demonstrated
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Module Federation"
                    secondary="Dynamic component loading between microfrontends"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Theme Inheritance"
                    secondary="Remote components respect host application theme"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Type Safety"
                    secondary="Shared TypeScript interfaces ensure compatibility"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Independent Development"
                    secondary="Remote app can run standalone for development"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                <SpeedIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
                Performance Benefits
              </Typography>

              <Typography variant="body1" paragraph>
                This microfrontend architecture provides several performance
                advantages:
              </Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Code Splitting"
                    secondary="Components are loaded only when needed"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Shared Dependencies"
                    secondary="Common libraries are shared between applications"
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <SecurityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Parallel Development"
                    secondary="Teams can work independently on different parts"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper
        sx={{
          mt: 4,
          p: 3,
          backgroundColor: 'secondary.main',
          color: 'secondary.contrastText',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Theme Integration
        </Typography>
        <Typography variant="body1">
          Notice how this component automatically adapts to the host
          application's theme, including dark mode changes. The styling and
          colors are inherited from the host's Material UI ThemeProvider.
        </Typography>
      </Paper>
    </Container>
  );
};

export default FederatedPage;
