// Test setup file for Host application

import '@testing-library/jest-dom';
import React from 'react';

// Mock Module Federation imports
vi.mock('remote/UserCard', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'mock-user-card' },
      'Mock UserCard'
    ),
}));

vi.mock('remote/FederatedPage', () => ({
  default: () =>
    React.createElement(
      'div',
      { 'data-testid': 'mock-federated-page' },
      'Mock FederatedPage'
    ),
}));
