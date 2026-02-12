# Versioned Blue/Green Deployment

## Overview

This setup simulates **Azure Blob Storage** with version-numbered folders for blue/green deployments. This mirrors the production workflow where:

1. **Azure Container Storage** holds versioned builds: `/analytics/v1.0.0/`, `/analytics/v1.1.0/`, etc.
2. **Azure App Configuration** stores which version is active for blue/green slots
3. **Host app** fetches config and loads the appropriate version

## Local Structure

```
fedstack-ui/
├── dist-versions/              # Simulates Azure Blob Storage
│   └── analytics/
│       ├── v1.0.0/            # Blue version (production)
│       │   ├── remoteEntry.js
│       │   ├── assets/
│       │   └── version.json
│       └── v1.1.0/            # Green version (staging)
│           ├── remoteEntry.js
│           ├── assets/
│           └── version.json
├── scripts/
│   ├── build-versioned.sh     # Creates versioned builds
│   └── serve-versions.js      # Static file server (port 3100)
└── apps/
    ├── analytics/             # Source code
    └── host/                  # Loads remote based on config
```

## Quick Start

### 1. Build Versioned Analytics

```bash
# Build both versions (blue and green)
pnpm build:versions

# Or build individual versions
pnpm build:version analytics 1.0.0
pnpm build:version analytics 1.1.0
pnpm build:version analytics 1.2.0
```

This creates:

- `dist-versions/analytics/v1.0.0/` - Blue slot
- `dist-versions/analytics/v1.1.0/` - Green slot

### 2. Start the Version Server

```bash
# Serves versioned builds on port 3100
pnpm serve:versions
```

URLs available:

- Blue: `http://localhost:3100/analytics/v1.0.0/remoteEntry.js`
- Green: `http://localhost:3100/analytics/v1.1.0/remoteEntry.js`

### 3. Start the Host App

```bash
# In another terminal
pnpm dev:host
```

Or start both together:

```bash
pnpm dev:versions
```

### 4. Test Blue/Green Switching

1. Navigate to `http://localhost:3000/deployment`
2. Use the deployment control panel to switch between blue (v1.0.0) and green (v1.1.0)
3. Observe zero-downtime switching between versions

## Configuration

### Remote Version Registry

The host app's `apps/host/src/config/remote-versions.ts` defines which version is loaded:

```typescript
export const defaultRemoteRegistry: RemoteRegistry = {
  analytics: {
    activeSlot: 'blue', // Currently active
    blueVersion: '1.0.0', // Blue points to v1.0.0
    greenVersion: '1.1.0', // Green points to v1.1.0
    blueUrl: 'http://localhost:3100/analytics/v1.0.0/remoteEntry.js',
    greenUrl: 'http://localhost:3100/analytics/v1.1.0/remoteEntry.js',
  },
};
```

### Environment Variables (Optional)

Create `.env` in `apps/host/`:

```bash
# Override default URLs
VITE_ANALYTICS_BLUE_URL=http://localhost:3100/analytics/v1.0.0/remoteEntry.js
VITE_ANALYTICS_GREEN_URL=http://localhost:3100/analytics/v1.1.0/remoteEntry.js
```

## Deployment Workflow (Local Simulation)

### Scenario: Deploying v1.1.0 to Green Slot

```bash
# 1. Make changes to analytics app
cd apps/analytics
# ... make your code changes ...

# 2. Build new version
pnpm build:version analytics 1.1.0

# 3. Version server automatically serves new build
# http://localhost:3100/analytics/v1.1.0/remoteEntry.js

# 4. Update config (manual for local, automated in production)
# Edit apps/host/src/config/remote-versions.ts:
#   greenVersion: '1.1.0'

# 5. Test green slot without affecting blue (production)
# Navigate to /deployment and observe green version

# 6. When ready, switch traffic to green
# Click "Switch to green" in deployment panel

# 7. If issues arise, instant rollback
# Click "Rollback" to return to blue (v1.0.0)
```

## Production Mapping

### Azure Setup (Future)

```
Azure Blob Storage Container: "federated-apps"
├── analytics/
│   ├── v1.0.0/
│   ├── v1.1.0/
│   └── v1.2.0/

Azure App Configuration:
├── analytics-blue-version: "1.0.0"
└── analytics-green-version: "1.1.0"

Azure CDN:
├── Endpoint: https://cdn.example.com/analytics/v{version}/
```

### GitHub Actions Workflow (Example)

```yaml
name: Deploy Analytics

on:
  push:
    branches: [main]
    paths: ['apps/analytics/**']

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Get version from package.json
        id: version
        run: echo "VERSION=$(node -p "require('./apps/analytics/package.json').version")" >> $GITHUB_OUTPUT

      - name: Build analytics
        run: |
          cd apps/analytics
          pnpm install
          pnpm build

      - name: Upload to Azure Blob Storage
        uses: azure/CLI@v1
        with:
          inlineScript: |
            az storage blob upload-batch \
              --account-name ${{ secrets.AZURE_STORAGE_ACCOUNT }} \
              --destination federated-apps/analytics/v${{ steps.version.outputs.VERSION }} \
              --source apps/analytics/dist \
              --overwrite false

      - name: Update App Configuration (Green Slot)
        run: |
          az appconfig kv set \
            --name ${{ secrets.AZURE_APPCONFIG_NAME }} \
            --key analytics-green-version \
            --value ${{ steps.version.outputs.VERSION }}
```

### Host App Fetches Config

```typescript
// In production, host app would fetch from Azure App Configuration
async function loadDeploymentConfig() {
  const response = await fetch(
    'https://appconfig.azure.net/kv/analytics-blue-version'
  );
  const blueVersion = await response.json();

  const greenResponse = await fetch(
    'https://appconfig.azure.net/kv/analytics-green-version'
  );
  const greenVersion = await greenResponse.json();

  updateRemoteRegistry('analytics', {
    blueVersion: blueVersion.value,
    greenVersion: greenVersion.value,
    blueUrl: `https://cdn.example.com/analytics/v${blueVersion.value}/remoteEntry.js`,
    greenUrl: `https://cdn.example.com/analytics/v${greenVersion.value}/remoteEntry.js`,
  });
}
```

## Version Metadata

Each build includes a `version.json` file with metadata:

```json
{
  "app": "analytics",
  "version": "1.1.0",
  "buildDate": "2025-10-20T10:30:00Z",
  "commit": "a1b2c3d",
  "branch": "main"
}
```

Access via: `http://localhost:3100/analytics/v1.1.0/version.json`

## Scripts Reference

| Script                               | Description                                 |
| ------------------------------------ | ------------------------------------------- |
| `pnpm build:versions`                | Build both v1.0.0 (blue) and v1.1.0 (green) |
| `pnpm build:version <app> <version>` | Build specific version                      |
| `pnpm serve:versions`                | Start static file server on port 3100       |
| `pnpm dev:versions`                  | Start version server + host app together    |

## Directory Browsing

The version server provides directory listings at:

- `http://localhost:3100/` - Root listing
- `http://localhost:3100/analytics/` - All analytics versions
- `http://localhost:3100/analytics/v1.0.0/` - Specific version files

## Benefits of This Approach

✅ **Mirrors Azure Exactly** - Same folder structure as production  
✅ **Version Immutability** - Each build is isolated  
✅ **No Rebuilds** - Switch instantly between pre-built versions  
✅ **Easy Testing** - Compare versions side-by-side  
✅ **Realistic Simulation** - Same URLs and paths as production  
✅ **Simple Rollback** - Just change config, no rebuild needed  
✅ **Multiple Versions** - Keep historical versions available

## Troubleshooting

### Version server returns 404

```bash
# Ensure you've built the versions
pnpm build:versions

# Check dist-versions directory exists
ls -la dist-versions/analytics/
```

### Host app can't load remote

```bash
# Verify version server is running
curl http://localhost:3100/analytics/v1.0.0/remoteEntry.js

# Check CORS headers
curl -I http://localhost:3100/analytics/v1.0.0/remoteEntry.js
```

### Version mismatch

```typescript
// Check what versions are actually available
fetch('http://localhost:3100/analytics/v1.0.0/version.json')
  .then((r) => r.json())
  .then(console.log);
```

## Next Steps

1. **Add more versions**: Build v1.2.0, v1.3.0, etc.
2. **Test deployment scenarios**: Practice the full workflow
3. **Add health checks**: Verify version health before switching
4. **Integrate with CI/CD**: Set up GitHub Actions for Azure deployment
5. **Add monitoring**: Track which versions are active in production
6. **Implement canary releases**: Gradual traffic shifting (5% → 25% → 50% → 100%)

## Comparison with Old Approach

| Aspect            | Old (Port-based)       | New (Versioned)          |
| ----------------- | ---------------------- | ------------------------ |
| Blue/Green        | Port 3002 vs 3003      | v1.0.0 vs v1.1.0 folders |
| Switching         | Change port number     | Change version string    |
| Rebuilding        | Required for each slot | Build once, reuse        |
| Production Match  | Different approach     | Exact match with Azure   |
| Multiple Versions | Only 2 (blue/green)    | Unlimited                |
| Rollback          | Switch port            | Switch version config    |
| CI/CD Ready       | Manual process         | Automated workflow ready |

## Production Considerations

When deploying to Azure:

1. **Use Azure CDN** - Cache versioned assets at edge locations
2. **Configure CORS** - Ensure blob storage allows cross-origin requests
3. **Set Cache Headers** - Aggressive caching for versioned assets
4. **Use SAS Tokens** - If storage needs access control
5. **Enable Compression** - Gzip/Brotli for smaller transfers
6. **Monitor Costs** - Track storage and egress costs
7. **Implement Cleanup** - Remove old versions after retention period
8. **Add Integrity Checks** - SRI hashes for security
9. **Use App Configuration** - Dynamic config updates without redeployment
10. **Set up Alerts** - Monitor deployment health and errors

---

**Questions or issues?** Check the troubleshooting section or review the implementation files.
