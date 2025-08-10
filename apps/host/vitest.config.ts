// Vitest configuration for Host application

/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
  resolve: {
    alias: {
      '@': '/src',
      '@shared/types': '../../packages/shared-types/src',
      '@ui/contracts': '../../packages/ui-contracts/src',
    },
  },
});
