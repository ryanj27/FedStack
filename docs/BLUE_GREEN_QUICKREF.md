# Blue/Green Deployment - Quick Reference

## 🎯 Concept

Simulate Azure Blob Storage with versioned folders locally:

```
Azure (Production)              Local (Development)
==================              ===================
Container: federated-apps       Directory: dist-versions/
├── analytics/                  ├── analytics/
│   ├── v1.0.0/ ← Blue         │   ├── v1.0.0/ ← Blue
│   └── v1.1.0/ ← Green        │   └── v1.1.0/ ← Green

Config: Azure App Config        Config: remote-versions.ts
- blue-version = "1.0.0"        - blueVersion: "1.0.0"
- green-version = "1.1.0"       - greenVersion: "1.1.0"
```

## 🚀 Quick Start (First Time)

```bash
# 1. Setup (builds v1.0.0 and v1.1.0)
./scripts/setup-versioned-deployment.sh

# 2. Start everything
pnpm dev:versions
```

## 📋 Common Commands

```bash
# Build both versions (blue=1.0.0, green=1.1.0)
pnpm build:versions

# Build a specific version
pnpm build:version analytics 1.2.0

# Start version server (serves dist-versions/ on port 3100)
pnpm serve:versions

# Start host + version server together
pnpm dev:versions

# Check what's available
open http://localhost:3100/
```

## 🔄 Deployment Workflow

```bash
# 1. Make changes to analytics
cd apps/analytics
# ... edit code ...

# 2. Build new version (green slot)
cd ../..
pnpm build:version analytics 1.1.0

# 3. Test in browser
open http://localhost:3000/deployment
# Observe green slot has v1.1.0

# 4. Switch to green (zero downtime)
# Click "Switch to green" in UI

# 5. If issues: Rollback instantly
# Click "Rollback" in UI
```

## 🌐 URLs

| Resource            | URL                                                   |
| ------------------- | ----------------------------------------------------- |
| Host App            | http://localhost:3000                                 |
| Deployment Panel    | http://localhost:3000/deployment                      |
| Version Server Root | http://localhost:3100/                                |
| Blue Remote Entry   | http://localhost:3100/analytics/v1.0.0/remoteEntry.js |
| Green Remote Entry  | http://localhost:3100/analytics/v1.1.0/remoteEntry.js |
| Blue Metadata       | http://localhost:3100/analytics/v1.0.0/version.json   |
| Green Metadata      | http://localhost:3100/analytics/v1.1.0/version.json   |

## 📂 File Structure

```
fedstack-ui/
├── dist-versions/              # Simulated Azure Blob Storage
│   └── analytics/
│       ├── v1.0.0/            # Blue (Production)
│       │   ├── index.html
│       │   ├── remoteEntry.js
│       │   ├── version.json
│       │   └── assets/
│       └── v1.1.0/            # Green (Staging)
│           └── ... (same structure)
│
├── scripts/
│   ├── build-versioned.sh     # Creates versioned build
│   ├── serve-versions.js      # Static file server
│   └── setup-versioned-deployment.sh
│
└── apps/
    ├── analytics/             # Source code
    └── host/
        └── src/config/
            └── remote-versions.ts  # Blue/Green config
```

## 🎛️ Configuration

**Local Config**: `apps/host/src/config/remote-versions.ts`

```typescript
export const defaultRemoteRegistry: RemoteRegistry = {
  analytics: {
    activeSlot: 'blue', // Currently active
    blueVersion: '1.0.0', // ← Change to update blue
    greenVersion: '1.1.0', // ← Change to update green
    blueUrl: 'http://localhost:3100/analytics/v1.0.0/remoteEntry.js',
    greenUrl: 'http://localhost:3100/analytics/v1.1.0/remoteEntry.js',
  },
};
```

**Production Config**: Azure App Configuration

```bash
analytics-blue-version = "1.0.0"
analytics-green-version = "1.1.0"
analytics-active-slot = "blue"
```

## 🧪 Testing Scenarios

### Scenario 1: Basic Switch

```bash
# 1. Open deployment panel
open http://localhost:3000/deployment

# 2. Click "Switch to green"
# → Observe instant switch to v1.1.0

# 3. Click "Rollback"
# → Back to v1.0.0 instantly
```

### Scenario 2: Deploy New Version

```bash
# 1. Build v1.2.0
pnpm build:version analytics 1.2.0

# 2. Update config (apps/host/src/config/remote-versions.ts)
greenVersion: '1.2.0',
greenUrl: 'http://localhost:3100/analytics/v1.2.0/remoteEntry.js',

# 3. Restart host app
# 4. Switch to green
# → Now using v1.2.0
```

### Scenario 3: Multiple Versions

```bash
# Keep multiple versions available
pnpm build:version analytics 1.0.0
pnpm build:version analytics 1.1.0
pnpm build:version analytics 1.2.0
pnpm build:version analytics 2.0.0-beta

# Point slots to any version
blueVersion: '1.1.0'   # Stable
greenVersion: '2.0.0-beta'  # Testing
```

## 🐛 Troubleshooting

### Version server not found

```bash
# Ensure it's running
pnpm serve:versions

# Check if listening
curl http://localhost:3100/
```

### Remote entry 404

```bash
# Verify version exists
ls -la dist-versions/analytics/

# Should see: v1.0.0/ and v1.1.0/

# If missing, rebuild
pnpm build:versions
```

### CORS errors

```bash
# Version server auto-adds CORS headers
# Verify:
curl -I http://localhost:3100/analytics/v1.0.0/remoteEntry.js | grep Access-Control
```

### Wrong version loading

```typescript
// Check active config
import { deploymentManager } from '@/utils/deployment-manager';
console.log(deploymentManager.getStatus('analytics'));
```

## 📊 Version Metadata

Each build includes metadata at `/version.json`:

```json
{
  "app": "analytics",
  "version": "1.1.0",
  "buildDate": "2025-10-20T10:30:00Z",
  "commit": "a1b2c3d",
  "branch": "main"
}
```

Access via:

```bash
curl http://localhost:3100/analytics/v1.0.0/version.json
```

## 🎓 Key Concepts

| Term               | Meaning                                   |
| ------------------ | ----------------------------------------- |
| **Blue Slot**      | Current production version (stable)       |
| **Green Slot**     | Staging/canary version (testing)          |
| **Active Slot**    | Which slot is currently serving traffic   |
| **Version Folder** | Immutable build artifacts (e.g., v1.0.0/) |
| **Slot Switch**    | Change active slot (blue ↔ green)        |
| **Rollback**       | Switch back to previous slot              |
| **Zero Downtime**  | Switch without stopping service           |

## 🔗 Related Documentation

- [VERSIONED_DEPLOYMENT.md](./VERSIONED_DEPLOYMENT.md) - Complete guide
- [BLUE_GREEN_DEPLOYMENT.md](./BLUE_GREEN_DEPLOYMENT.md) - Original approach
- [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md) - Basic quickstart

## 💡 Pro Tips

1. **Keep old versions** - Don't delete immediately after deployment
2. **Use semantic versioning** - 1.0.0, 1.1.0, 2.0.0
3. **Test green thoroughly** - Before switching production
4. **Monitor after switch** - Watch for errors
5. **Have rollback ready** - One click away
6. **Automate in CI/CD** - GitHub Actions → Azure upload

## 🚢 Production Deployment

When ready for Azure:

```yaml
# .github/workflows/deploy-analytics.yml
- name: Upload to Azure
  run: |
    az storage blob upload-batch \
      --account-name $STORAGE_ACCOUNT \
      --destination federated-apps/analytics/v$VERSION \
      --source apps/analytics/dist

- name: Update App Config
  run: |
    az appconfig kv set \
      --name $APPCONFIG_NAME \
      --key analytics-green-version \
      --value $VERSION
```

---

**Need help?** Check [VERSIONED_DEPLOYMENT.md](./VERSIONED_DEPLOYMENT.md) for full details.
