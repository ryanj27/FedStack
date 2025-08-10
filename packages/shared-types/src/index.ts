// Shared type definitions for the microfrontend application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AppConfig {
  apiBaseUrl: string;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: {
    darkMode: boolean;
    analytics: boolean;
    debugging: boolean;
  };
}

export interface NavigationItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: NavigationItem[];
  requiresAuth?: boolean;
}

// Environment variables contract
export interface EnvVars {
  VITE_API_URL: string;
  VITE_APP_NAME: string;
  VITE_REMOTE_URL?: string;
}
