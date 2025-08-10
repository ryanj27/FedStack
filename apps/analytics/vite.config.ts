// Vite configuration for Analytics application with Module Federation

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'analytics',
      filename: 'remoteEntry.js',
      exposes: {
        './MetricsSummary': './src/components/MetricsSummary.tsx',
        './AnalyticsPage': './src/components/AnalyticsPage.tsx',
        './AnalyticsApp': './src/App.tsx',
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
    port: 3003,
    host: true,
  },
  preview: {
    port: 3003,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
