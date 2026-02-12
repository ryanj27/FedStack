/**
 * React hooks for remote deployment management
 */

import { useState, useEffect, useCallback } from 'react';
import { deploymentManager } from '../utils/deployment-manager';
import { getRemoteVersionInfo } from '../config/remote-versions';

export interface RemoteVersionStatus {
  remoteName: string;
  activeSlot: 'blue' | 'green';
  activeVersion: string;
  inactiveSlot: 'blue' | 'green';
  inactiveVersion: string;
  blueVersion: string;
  greenVersion: string;
}

/**
 * Hook to get and manage remote deployment status
 *
 * @param remoteName - Name of the federated remote
 * @returns Version status and control functions
 */
export function useRemoteVersion(remoteName: string) {
  const [status, setStatus] = useState<RemoteVersionStatus>(() => ({
    remoteName,
    ...getRemoteVersionInfo(remoteName),
  }));

  const [isTransitioning, setIsTransitioning] = useState(false);

  const refreshStatus = useCallback(() => {
    setStatus({
      remoteName,
      ...getRemoteVersionInfo(remoteName),
    });
  }, [remoteName]);

  useEffect(() => {
    refreshStatus();
  }, [refreshStatus]);

  /**
   * Switch to the other deployment slot
   * Note: Requires host restart to pick up new remote URL
   */
  const switchSlot = useCallback(async () => {
    setIsTransitioning(true);
    try {
      deploymentManager.switchSlot(remoteName);
      // Give a moment for the change to propagate
      await new Promise((resolve) => setTimeout(resolve, 100));
      refreshStatus();

      // Show alert that host needs restart
      alert(
        'Slot switched! Please restart the host dev server to load the new version:\n\nStop (Ctrl+C) and run: pnpm dev:versions'
      );
    } finally {
      setIsTransitioning(false);
    }
  }, [remoteName, refreshStatus]);

  /**
   * Promote inactive slot to active
   * Note: In dev mode, this only updates in-memory state and requires manual config edit + restart
   */
  const promote = useCallback(async () => {
    setIsTransitioning(true);
    try {
      deploymentManager.promoteInactiveSlot(remoteName);
      await new Promise((resolve) => setTimeout(resolve, 100));
      refreshStatus();

      // In development, show instructions for actual slot promotion
      alert(
        '⚠️ Development Mode\n\n' +
          'Slot promoted in memory only. To test the promoted version:\n\n' +
          '1. Edit apps/host/src/config/remote-versions.ts\n' +
          '2. Change activeSlot to: "' +
          status.inactiveSlot +
          '"\n' +
          '3. Restart: pnpm dev:versions\n\n' +
          'In production, this would update a feature flag service and take effect immediately.'
      );
    } finally {
      setIsTransitioning(false);
    }
  }, [remoteName, refreshStatus, status.inactiveSlot]);

  /**
   * Rollback to previous slot
   * Note: In dev mode, this only updates in-memory state and requires manual config edit + restart
   */
  const rollback = useCallback(async () => {
    setIsTransitioning(true);
    try {
      deploymentManager.rollback(remoteName);
      await new Promise((resolve) => setTimeout(resolve, 100));
      refreshStatus();

      // In development, show instructions for actual rollback
      alert(
        '⚠️ Development Mode\n\n' +
          'Rolled back in memory only. To test the rollback:\n\n' +
          '1. Edit apps/host/src/config/remote-versions.ts\n' +
          '2. Change activeSlot to: "' +
          status.inactiveSlot +
          '"\n' +
          '3. Restart: pnpm dev:versions\n\n' +
          'In production, this would update a feature flag service and take effect immediately.'
      );
    } finally {
      setIsTransitioning(false);
    }
  }, [remoteName, refreshStatus, status.inactiveSlot]);

  return {
    status,
    isTransitioning,
    switchSlot,
    promote,
    rollback,
    refresh: refreshStatus,
  };
}

/**
 * Hook to monitor all remotes
 */
export function useAllRemoteVersions() {
  const analytics = useRemoteVersion('analytics');
  // Add other remotes as needed

  return {
    analytics,
  };
}
