// UserCard component - Remote federated component
// Displays user information with Material UI styling

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Button,
  Chip,
  Box,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import type { UserCardProps } from '@ui/contracts';
import type { User } from '@shared/types';

// Mock function to fetch user data
const fetchUser = async (userId: string): Promise<User> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Mock user data - in real app this would come from an API
  const mockUsers: Record<string, User> = {
    '1': {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'admin',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
    },
    '2': {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
      role: 'user',
      createdAt: '2024-01-16T14:20:00Z',
      updatedAt: '2024-01-16T14:20:00Z',
    },
    '3': {
      id: '3',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'user',
      createdAt: '2024-01-17T09:45:00Z',
      updatedAt: '2024-01-17T09:45:00Z',
    },
  };

  const user = mockUsers[userId];
  if (!user) {
    throw new Error(`User with id ${userId} not found`);
  }

  return user;
};

const UserCard: React.FC<UserCardProps> = ({
  userId,
  showActions = false,
  variant = 'compact',
  onEdit,
  onDelete,
}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent>
          <Typography>Loading user...</Typography>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">
            Failed to load user: {error.message}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card>
        <CardContent>
          <Typography color="error">User not found</Typography>
        </CardContent>
      </Card>
    );
  }

  const roleColor = user.role === 'admin' ? 'primary' : 'default';

  return (
    <Card elevation={2}>
      <CardContent>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <Avatar src={user.avatar} alt={user.name}>
            {user.name.charAt(0)}
          </Avatar>
          <Box flexGrow={1}>
            <Typography variant="h6" component="h3">
              {user.name}
            </Typography>
            <Chip
              label={user.role}
              size="small"
              color={roleColor}
              variant="outlined"
            />
          </Box>
        </Box>

        {variant === 'detailed' && (
          <Box>
            <Box display="flex" alignItems="center" gap={1} mb={1}>
              <EmailIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">
              Created: {new Date(user.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        )}
      </CardContent>

      {showActions && (
        <CardActions>
          <IconButton
            size="small"
            onClick={() => onEdit?.(user.id)}
            aria-label={`Edit ${user.name}`}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete?.(user.id)}
            aria-label={`Delete ${user.name}`}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
};

export default UserCard;
