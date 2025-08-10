// Vite configuration for Host application with Module Federation

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host',
      remotes: {
        remote: {
          type: 'module',
          name: 'remote',
          entry: 'http://localhost:3001/remoteEntry.js',
          entryGlobalName: 'remote',
          shareScope: 'default',
        },
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
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
