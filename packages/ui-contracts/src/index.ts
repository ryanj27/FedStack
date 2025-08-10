// UI contracts and theme definitions for cross-app consistency

import type { ReactNode } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface AppThemeOptions {
  palette: {
    mode: ThemeMode;
    primary: {
      main: string;
      light?: string;
      dark?: string;
    };
    secondary: {
      main: string;
      light?: string;
      dark?: string;
    };
    background?: {
      default: string;
      paper: string;
    };
    text?: {
      primary: string;
      secondary: string;
    };
  };
}

export interface ThemeContextValue {
  theme: unknown; // Will be MUI Theme
  mode: ThemeMode;
  toggleMode: () => void;
}

// Component prop contracts for federated components
export interface UserCardProps {
  userId: string;
  showActions?: boolean;
  variant?: 'compact' | 'detailed';
  onEdit?: (userId: string) => void;
  onDelete?: (userId: string) => void;
}

export interface FederatedPageProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

// Common component interfaces
export interface BaseComponentProps {
  className?: string;
  'data-testid'?: string;
}

// Layout contracts
export interface LayoutProps extends BaseComponentProps {
  children: ReactNode;
  showSidebar?: boolean;
  sidebarWidth?: number;
}
