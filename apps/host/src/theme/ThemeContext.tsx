// Theme context provider for Material UI with dark mode support
// Provides theme to both host and remote components

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { ThemeMode, ThemeContextValue } from '@ui/contracts';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-mode');
    return (saved as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'light' ? '#1976d2' : '#90caf9',
        light: mode === 'light' ? '#42a5f5' : '#e3f2fd',
        dark: mode === 'light' ? '#1565c0' : '#42a5f5',
      },
      secondary: {
        main: mode === 'light' ? '#dc004e' : '#f48fb1',
        light: mode === 'light' ? '#f50057' : '#fce4ec',
        dark: mode === 'light' ? '#c51162' : '#f50057',
      },
      background: {
        default: mode === 'light' ? '#fafafa' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000de' : '#ffffffde',
        secondary: mode === 'light' ? '#00000099' : '#ffffff99',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === 'light'
                ? '0px 2px 4px rgba(0,0,0,0.1)'
                : '0px 2px 4px rgba(0,0,0,0.3)',
          },
        },
      },
    },
  });

  const contextValue: ThemeContextValue = {
    theme,
    mode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
