/**
 * Remote version configuration for blue/green deployments
 *
 * This module manages version-based routing for federated remotes,
 * enabling zero-downtime deployments with instant rollback capability.
 */

export interface RemoteDeploymentConfig {
  /** Current active deployment slot (blue or green) */
  activeSlot: 'blue' | 'green';

  /** Version deployed to blue slot */
  blueVersion: string;

  /** Version deployed to green slot */
  greenVersion: string;

  /** Base URL pattern for blue deployment */
  blueUrl: string;

  /** Base URL pattern for green deployment */
  greenUrl: string;

  /** Fallback URL if both slots fail */
  fallbackUrl?: string;
}

export interface RemoteRegistry {
  [remoteName: string]: RemoteDeploymentConfig;
}

/**
 * Default remote deployment configuration
 *
 * In production, this would be fetched from:
 * - Environment variables
 * - Feature flag service (LaunchDarkly, Split.io)
 * - Remote config endpoint
 * - Redis/DynamoDB for real-time switching
 */
export const defaultRemoteRegistry: RemoteRegistry = {
  analytics: {
    // Active slot determines which URL is used
    activeSlot: 'blue',

    // Version currently deployed to blue (production)
    blueVersion: '1.0.0',

    // Version currently deployed to green (staging/canary)
    greenVersion: '1.1.0',

    // Blue environment URL (production)
    // Points to versioned build in dist-versions/analytics/v1.0.0/
    blueUrl:
      import.meta.env.VITE_ANALYTICS_BLUE_URL ||
      'http://localhost:3100/analytics/v1.0.0/remoteEntry.js',

    // Green environment URL (staging/pre-production)
    // Points to versioned build in dist-versions/analytics/v1.1.0/
    greenUrl:
      import.meta.env.VITE_ANALYTICS_GREEN_URL ||
      'http://localhost:3100/analytics/v1.1.0/remoteEntry.js',

    // Fallback if both fail (optional)
    ...(import.meta.env.VITE_ANALYTICS_FALLBACK_URL && {
      fallbackUrl: import.meta.env.VITE_ANALYTICS_FALLBACK_URL,
    }),
  },

  // Add other remotes here as needed
  // remote: { ... },
};

/**
 * Get the active remote entry URL based on deployment configuration
 *
 * @param remoteName - Name of the federated remote
 * @param registry - Optional custom registry (defaults to defaultRemoteRegistry)
 * @returns Active remote entry URL
 */
export function getActiveRemoteUrl(
  remoteName: string,
  registry: RemoteRegistry = defaultRemoteRegistry
): string {
  const config = registry[remoteName];

  if (!config) {
    throw new Error(`Remote "${remoteName}" not found in registry`);
  }

  // Return URL based on active slot
  const activeUrl =
    config.activeSlot === 'blue' ? config.blueUrl : config.greenUrl;

  console.info(
    `[Remote Registry] Loading "${remoteName}" from ${config.activeSlot} slot (v${
      config.activeSlot === 'blue' ? config.blueVersion : config.greenVersion
    }): ${activeUrl}`
  );

  return activeUrl;
}

/**
 * Get version information for a remote
 *
 * @param remoteName - Name of the federated remote
 * @param registry - Optional custom registry
 * @returns Version info for active and inactive slots
 */
export function getRemoteVersionInfo(
  remoteName: string,
  registry: RemoteRegistry = defaultRemoteRegistry
) {
  const config = registry[remoteName];

  if (!config) {
    throw new Error(`Remote "${remoteName}" not found in registry`);
  }

  return {
    activeSlot: config.activeSlot,
    activeVersion:
      config.activeSlot === 'blue' ? config.blueVersion : config.greenVersion,
    inactiveSlot: (config.activeSlot === 'blue' ? 'green' : 'blue') as
      | 'blue'
      | 'green',
    inactiveVersion:
      config.activeSlot === 'blue' ? config.greenVersion : config.blueVersion,
    blueVersion: config.blueVersion,
    greenVersion: config.greenVersion,
  };
}

/**
 * Switch active deployment slot (blue ↔ green)
 *
 * In production, this would trigger:
 * - Feature flag update
 * - Config service API call
 * - CloudFront origin switch
 * - Service mesh routing update
 *
 * @param remoteName - Name of the remote to switch
 * @param registry - Registry to update (mutates in place)
 * @returns New active slot
 */
export function switchDeploymentSlot(
  remoteName: string,
  registry: RemoteRegistry = defaultRemoteRegistry
): 'blue' | 'green' {
  const config = registry[remoteName];

  if (!config) {
    throw new Error(`Remote "${remoteName}" not found in registry`);
  }

  const oldSlot = config.activeSlot;
  const newSlot = oldSlot === 'blue' ? 'green' : 'blue';

  config.activeSlot = newSlot;

  console.warn(
    `[Remote Registry] Switched "${remoteName}" from ${oldSlot} (v${
      oldSlot === 'blue' ? config.blueVersion : config.greenVersion
    }) to ${newSlot} (v${
      newSlot === 'blue' ? config.blueVersion : config.greenVersion
    })`
  );

  return newSlot;
}

/**
 * Update version for a specific deployment slot
 *
 * Typically called after successful deployment to update registry
 *
 * @param remoteName - Name of the remote
 * @param slot - Which slot to update
 * @param version - New version string
 * @param registry - Registry to update
 */
export function updateSlotVersion(
  remoteName: string,
  slot: 'blue' | 'green',
  version: string,
  registry: RemoteRegistry = defaultRemoteRegistry
): void {
  const config = registry[remoteName];

  if (!config) {
    throw new Error(`Remote "${remoteName}" not found in registry`);
  }

  if (slot === 'blue') {
    config.blueVersion = version;
  } else {
    config.greenVersion = version;
  }

  console.info(
    `[Remote Registry] Updated "${remoteName}" ${slot} slot to version ${version}`
  );
}
