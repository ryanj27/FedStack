// Vite configuration for Remote application with Module Federation

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './UserCard': './src/components/UserCard.tsx',
        './FederatedPage': './src/components/FederatedPage.tsx',
        './RemoteApp': './src/App.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.0',
        },
        '@tanstack/react-query': {
          singleton: true,
        },
        '@mui/material': {
          singleton: true,
        },
        '@emotion/react': {
          singleton: true,
        },
        '@emotion/styled': {
          singleton: true,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@shared/types': '../../packages/shared-types/src',
      '@ui/contracts': '../../packages/ui-contracts/src',
    },
  },
  server: {
    port: 3001,
    host: true,
  },
  preview: {
    port: 3001,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
