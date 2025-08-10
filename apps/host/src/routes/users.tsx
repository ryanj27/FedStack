// Users route - demonstrates remote UserCard component consumption

import {
  Container,
  Typography,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';
import { Suspense, lazy } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { User } from '@shared/types';

// Lazy load the remote UserCard component
const RemoteUserCard = lazy(() =>
  import('remote/UserCard').catch(() => ({
    default: () => (
      <Box p={2} textAlign="center">
        <Typography color="error">
          Remote UserCard component failed to load
        </Typography>
      </Box>
    ),
  }))
);

// Mock API call for demonstration
const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'admin',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'user',
      createdAt: '2024-01-16T14:20:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
    },
    {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      createdAt: '2024-01-17T09:45:00Z',
      updatedAt: '2024-01-17T09:45:00Z',
    },
  ];
};

export function UsersComponent() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  if (isLoading) {
    return (
      <Container maxWidth="lg">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Typography color="error" align="center">
          Failed to load users: {error.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          <PeopleIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
          Users
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Demonstrating remote UserCard components from the federated app
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {users?.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Suspense
              fallback={
                <Box p={2} textAlign="center">
                  <CircularProgress size={24} />
                </Box>
              }
            >
              <RemoteUserCard
                userId={user.id}
                showActions={true}
                variant="detailed"
                onEdit={(id: string) => console.log('Edit user:', id)}
                onDelete={(id: string) => console.log('Delete user:', id)}
              />
            </Suspense>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
