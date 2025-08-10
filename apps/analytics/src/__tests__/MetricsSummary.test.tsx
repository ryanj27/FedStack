// Test for MetricsSummary component

import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '@testing-library/jest-dom';
import MetricsSummary from '../components/MetricsSummary';

// Mock @tanstack/react-query
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn(),
  QueryClient: vi.fn(),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

const theme = createTheme();

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </QueryClientProvider>
  );
};

describe('MetricsSummary', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state', () => {
    const { useQuery } = require('@tanstack/react-query');
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    renderWithProviders(<MetricsSummary />);

    expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    expect(screen.getByText('Loading metrics...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const { useQuery } = require('@tanstack/react-query');
    useQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    renderWithProviders(<MetricsSummary />);

    expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    expect(screen.getByText('Failed to load metrics data')).toBeInTheDocument();
  });

  it('renders metrics data successfully', async () => {
    const mockMetrics = {
      totalUsers: 12450,
      revenue: 89600,
      conversionRate: 3.4,
      performanceScore: 94,
      userGrowth: 12.3,
      revenueGrowth: 8.7,
    };

    const { useQuery } = require('@tanstack/react-query');
    useQuery.mockReturnValue({
      data: mockMetrics,
      isLoading: false,
      error: null,
    });

    renderWithProviders(<MetricsSummary />);

    expect(screen.getByText('Analytics Overview')).toBeInTheDocument();
    expect(screen.getByText('12,450')).toBeInTheDocument();
    expect(screen.getByText('$89,600')).toBeInTheDocument();
    expect(screen.getByText('3.4%')).toBeInTheDocument();
    expect(screen.getByText('94')).toBeInTheDocument();
    expect(screen.getByText('+12.3%')).toBeInTheDocument();
    expect(screen.getByText('+8.7%')).toBeInTheDocument();
  });

  it('renders component structure correctly', () => {
    const { useQuery } = require('@tanstack/react-query');
    useQuery.mockReturnValue({
      data: {
        totalUsers: 100,
        revenue: 1000,
        conversionRate: 2.5,
        performanceScore: 85,
        userGrowth: 5,
        revenueGrowth: 3,
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(<MetricsSummary />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('Performance Score')).toBeInTheDocument();
  });
});
