// Vite configuration for Host application with Module Federation
// Supports blue/green deployment strategy for remotes

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { federation } from '@module-federation/vite';
import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * Read active slot from remote-versions.ts at build time
 */
function getActiveSlotFromConfig(): 'blue' | 'green' {
  try {
    const configPath = join(__dirname, 'src/config/remote-versions.ts');
    const configContent = readFileSync(configPath, 'utf-8');

    // Find the analytics section and extract activeSlot
    // Look for the actual value, not the type definition
    const analyticsMatch = configContent.match(
      /analytics:\s*\{[^}]*activeSlot:\s*['"](\w+)['"]/s
    );
    if (analyticsMatch) {
      console.log('🔍 Detected active slot from config:', analyticsMatch[1]);
      return analyticsMatch[1] as 'blue' | 'green';
    }
  } catch (error) {
    console.warn('Could not read activeSlot from config, defaulting to blue');
  }
  return 'blue';
}

/**
 * Determine active analytics remote URL based on deployment slot
 *
 * Two modes:
 * 1. Regular dev (pnpm dev): Uses analytics dev server on port 3002
 * 2. Versioned dev (pnpm dev:versions): Uses versioned builds on port 3100
 *
 * Set VITE_USE_VERSIONED=true to use versioned builds, otherwise uses dev server
 */
function getAnalyticsRemoteUrl(): string {
  const useVersioned = process.env.VITE_USE_VERSIONED === 'true';

  // If using versioned builds, apply blue/green logic
  if (useVersioned) {
    const activeSlot = getActiveSlotFromConfig();

    if (activeSlot === 'green') {
      return (
        process.env.VITE_ANALYTICS_GREEN_URL ||
        'http://localhost:3100/analytics/v1.1.0/remoteEntry.js'
      );
    }

    // Default to blue (production) slot
    return (
      process.env.VITE_ANALYTICS_BLUE_URL ||
      'http://localhost:3100/analytics/v1.0.0/remoteEntry.js'
    );
  }

  // Default: use analytics dev server (for pnpm dev)
  return (
    process.env.VITE_ANALYTICS_DEV_URL || 'http://localhost:3002/remoteEntry.js'
  );
}
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
        // Analytics remote with blue/green deployment support
        // Switch between blue (production) and green (staging) via VITE_ANALYTICS_ACTIVE_SLOT
        analytics: {
          type: 'module',
          name: 'analytics',
          entry: getAnalyticsRemoteUrl(),
          entryGlobalName: 'analytics',
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
