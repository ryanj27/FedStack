// Test for UserCard component
// Demonstrates testing federated components

import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import UserCard from '../components/UserCard';

// Mock theme for testing
const testTheme = createTheme();

// Test wrapper with required providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('UserCard Component', () => {
  it('renders loading state initially', () => {
    render(
      <TestWrapper>
        <UserCard userId="1" />
      </TestWrapper>
    );

    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });

  it('renders with correct props', () => {
    render(
      <TestWrapper>
        <UserCard userId="1" showActions={true} variant="detailed" />
      </TestWrapper>
    );

    // Component should render (even if loading)
    expect(screen.getByText('Loading user...')).toBeInTheDocument();
  });
});
