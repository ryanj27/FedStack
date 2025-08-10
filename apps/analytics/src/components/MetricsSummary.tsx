// MetricsSummary component - Analytics federated widget
// Displays key metrics in a compact card format

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as RevenueIcon,
  Speed as PerformanceIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';

// Mock metrics data
interface MetricsData {
  totalUsers: number;
  revenue: number;
  conversionRate: number;
  performanceScore: number;
  userGrowth: number;
  revenueGrowth: number;
}

// Mock function to fetch metrics data
const fetchMetrics = async (): Promise<MetricsData> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    totalUsers: 12450,
    revenue: 89600,
    conversionRate: 3.4,
    performanceScore: 94,
    userGrowth: 12.3,
    revenueGrowth: 8.7,
  };
};

const MetricsSummary: React.FC = () => {
  const {
    data: metrics,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['metrics'],
    queryFn: fetchMetrics,
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Analytics Overview
          </Typography>
          <Box sx={{ mt: 2 }}>
            <LinearProgress />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Loading metrics...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Analytics Overview
          </Typography>
          <Typography color="error">Failed to load metrics data</Typography>
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Analytics Overview
          </Typography>
          <Typography>No metrics data available</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card elevation={2}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">Analytics Overview</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <PeopleIcon color="primary" />
              <Typography variant="h4" component="div">
                {metrics.totalUsers.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Users
              </Typography>
              <Chip
                label={`+${metrics.userGrowth}%`}
                color="success"
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <RevenueIcon color="primary" />
              <Typography variant="h4" component="div">
                ${metrics.revenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Revenue
              </Typography>
              <Chip
                label={`+${metrics.revenueGrowth}%`}
                color="success"
                size="small"
                sx={{ mt: 0.5 }}
              />
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="div">
                {metrics.conversionRate}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Conversion Rate
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box sx={{ textAlign: 'center' }}>
              <PerformanceIcon color="primary" />
              <Typography variant="h4" component="div">
                {metrics.performanceScore}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Performance Score
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MetricsSummary;
