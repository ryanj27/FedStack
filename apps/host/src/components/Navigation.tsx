// Navigation component with theme toggle and routing
// Provides main navigation and dark mode toggle

import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Apps as AppsIcon,
  BugReport as DebugIcon,
} from '@mui/icons-material';
import { Link } from '@tanstack/react-router';
import { useTheme } from '../theme/ThemeContext';

export const Navigation: React.FC = () => {
  const { mode, toggleMode } = useTheme();

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Host Application
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/"
            startIcon={<HomeIcon />}
          >
            Home
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/users"
            startIcon={<PeopleIcon />}
          >
            Users
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/federated"
            startIcon={<AppsIcon />}
          >
            Federated
          </Button>

          <Button
            color="inherit"
            component={Link}
            to="/debug"
            startIcon={<DebugIcon />}
          >
            Debug
          </Button>

          <IconButton
            color="inherit"
            onClick={toggleMode}
            aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
          >
            {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
