# Version Promotion Guide

Complete guide for managing versions and promotions using the automated workflow.

## Overview

This guide covers the **smart promotion strategy** that uses:

- ✅ Automatic version incrementing (semver)
- ✅ Automatic configuration updates
- ✅ Single source of truth (`package.json`)
- ✅ Immutable version storage
- ✅ Complete rollback history

## Core Concepts

### Version Slots

- **Blue Slot**: Production (always stable, live to users)
- **Green Slot**: Staging/Testing (next version being tested)

### Version Lifecycle

```
package.json → Build → Green Slot → Test → Promote → Blue Slot (Production)
```

### Key Principles

1. **Single Source of Truth**: `apps/{app}/package.json` version is authoritative
2. **Immutability**: Built versions never change (e.g., v1.1.0 is always v1.1.0)
3. **Preserve History**: All versions kept in `dist-versions/` for rollback
4. **Semantic Versioning**: Use semver (patch, minor, major) for clear intent

---

## Quick Reference

| Command                         | Purpose                       | Example                             |
| ------------------------------- | ----------------------------- | ----------------------------------- |
| `pnpm prepare:next <app> patch` | Bug fix (1.0.0→1.0.1)         | `pnpm prepare:next analytics patch` |
| `pnpm prepare:next <app> minor` | New feature (1.0.0→1.1.0)     | `pnpm prepare:next analytics minor` |
| `pnpm prepare:next <app> major` | Breaking change (1.0.0→2.0.0) | `pnpm prepare:next analytics major` |
| `pnpm promote:auto <app>`       | Promote to production         | `pnpm promote:auto analytics`       |
| `pnpm serve:versions`           | Start version server          | Port 3100                           |
| `pnpm dev:host`                 | Start host app                | Port 3000                           |

---

## Complete Workflow

### Step 1: Prepare Next Version

Create a new version for testing in the green slot.

```bash
# For bug fixes (1.0.0 → 1.0.1)
pnpm prepare:next analytics patch

# For new features (1.0.0 → 1.1.0)
pnpm prepare:next analytics minor

# For breaking changes (1.0.0 → 2.0.0)
pnpm prepare:next analytics major
```

**What happens automatically:**

1. ✅ Increments version in `apps/analytics/package.json`
2. ✅ Builds the new version to `dist-versions/analytics/v{version}/`
3. ✅ Updates `remote-versions.ts` green slot to point to new version
4. ✅ Creates timestamped backup of config
5. ✅ Ready for testing!

**Output:**

```
🚀 Preparing Next Version for analytics
📦 Current version: v1.0.0
🔢 Incrementing version (minor)...
✅ New version: v1.1.0
🔨 Building v1.1.0...
[build output...]
📝 Updating green slot configuration...
✅ Green slot updated to v1.1.0
🎉 Version v1.1.0 Ready for Testing!
```

### Step 2: Start Services

Ensure the version server and host app are running.

```bash
# Terminal 1: Version server (serves built versions)
pnpm serve:versions

# Terminal 2: Host application
pnpm dev:host
```

### Step 3: Test New Version

Navigate to the deployment panel and test the green slot.

```bash
# Open deployment panel
open http://localhost:3000/deployment
```

**Testing checklist:**

- [ ] Switch to green slot via UI
- [ ] Verify new features work correctly
- [ ] Check for console errors
- [ ] Test edge cases
- [ ] Verify performance
- [ ] Check analytics/metrics display
- [ ] Test on different browsers (if needed)

**Switch back to blue:**

- Click "Rollback" or "Switch to blue" to return to production version

### Step 4: Promote to Production

When testing is complete and approved, promote to production.

```bash
pnpm promote:auto analytics
```

**What happens automatically:**

1. ✅ Reads version from `apps/analytics/package.json` (e.g., v1.1.0)
2. ✅ Verifies build exists in `dist-versions/analytics/v1.1.0/`
3. ✅ Shows current vs. new configuration
4. ✅ Asks for confirmation
5. ✅ Updates `remote-versions.ts` blue slot to point to new version
6. ✅ Creates timestamped backup
7. ✅ New version is now production!

**Output:**

```
🤖 Smart Version Promotion for analytics
📦 Detected version: v1.1.0 (from package.json)
✅ Build found: v1.1.0

📊 Current Configuration:
   Blue (Production):  v1.0.0
   Green (Staging):    v1.1.0

🔄 Promoting to:
   Blue (Production):  v1.1.0 ⬅ NEW
   Green (Staging):    (ready for next version)

Continue with promotion? (y/n) y

📝 Updating configuration...
✅ Configuration updated successfully

🎉 Promotion Complete!
```

### Step 5: Restart Host Application

Restart the host app to pick up the new configuration.

```bash
# In Terminal 2 (host app)
# Stop with Ctrl+C, then:
pnpm dev:host
```

### Step 6: Verify Production

Confirm production is serving the new version.

```bash
# Visit analytics page
open http://localhost:3000/analytics

# Check deployment panel
open http://localhost:3000/deployment
```

**Verification:**

- Blue slot should show v1.1.0
- Analytics page should show new version
- No console errors
- All features working

---

## Example: Complete Release Cycle

### Scenario: Bug Fix Release

**Current state:**

- Blue (Production): v1.0.0
- Green (Staging): empty

**Steps:**

```bash
# 1. Create bug fix version
pnpm prepare:next analytics patch
# Result: v1.0.0 → v1.0.1 built and in green slot

# 2. Test thoroughly
# Navigate to deployment panel, switch to green, test

# 3. Promote to production
pnpm promote:auto analytics
# Result: Blue now serves v1.0.1

# 4. Restart host
pnpm dev:host
```

**Final state:**

- Blue (Production): v1.0.1 ✅
- Green (Staging): ready for next
- Preserved: v1.0.0, v1.0.1

---

### Scenario: New Feature Release

**Current state:**

- Blue (Production): v1.0.1
- Green (Staging): empty

**Steps:**

```bash
# 1. Create feature version
pnpm prepare:next analytics minor
# Result: v1.0.1 → v1.1.0 built and in green slot

# 2. Test new features extensively
# Switch to green, run through test cases

# 3. Promote when approved
pnpm promote:auto analytics
# Result: Blue now serves v1.1.0

# 4. Restart host
pnpm dev:host
```

**Final state:**

- Blue (Production): v1.1.0 ✅
- Green (Staging): ready for next
- Preserved: v1.0.0, v1.0.1, v1.1.0

---

### Scenario: Multiple Versions in Development

**Workflow:**

```bash
# Week 1: Release v1.1.0
pnpm prepare:next analytics minor  # → v1.1.0
# Test, approve, promote
pnpm promote:auto analytics

# Week 2: Release v1.2.0
pnpm prepare:next analytics minor  # → v1.2.0
# Test, approve, promote
pnpm promote:auto analytics

# Week 3: Critical bug in v1.2.0 found
# Rollback via deployment panel to v1.1.0
# Fix bug and release v1.2.1
pnpm prepare:next analytics patch  # → v1.2.1
# Test, approve, promote
pnpm promote:auto analytics
```

**Version history:**

```
dist-versions/analytics/
├── v1.0.0/  (original)
├── v1.1.0/  (week 1)
├── v1.2.0/  (week 2, had bug)
└── v1.2.1/  (week 3, bug fixed)
```

All versions available for instant rollback!

---

## Rollback Procedures

### Quick Rollback (via UI)

**For immediate issues:**

1. Navigate to http://localhost:3000/deployment
2. Click **"Rollback"** button
3. Returns to previous version instantly
4. No rebuild required

### Manual Rollback (via Config)

**For specific version rollback:**

1. Edit `apps/host/src/config/remote-versions.ts`
2. Change `blueVersion` to desired version
3. Update `blueUrl` to match version
4. Restart host app

**Example:**

```typescript
blueVersion: '1.0.0',  // ← Change to any available version
blueUrl: 'http://localhost:3100/analytics/v1.0.0/remoteEntry.js',
```

### Rollback Using Backup

**If config was accidentally corrupted:**

```bash
# List backups
ls -lt apps/host/src/config/remote-versions.ts.backup.*

# Restore most recent backup
cp apps/host/src/config/remote-versions.ts.backup.20251022_123456 \
   apps/host/src/config/remote-versions.ts

# Restart host
pnpm dev:host
```

---

## Troubleshooting

### "Version not found" Error

**Problem:** `promote:auto` says version doesn't exist

**Solution:**

```bash
# Check what's built
ls -la dist-versions/analytics/

# Check package.json version
cat apps/analytics/package.json | grep version

# Build if missing
pnpm build:version analytics 1.1.0
```

### Config Not Updating

**Problem:** Changes not taking effect

**Solution:**

```bash
# Restart host app (required after config changes)
# Ctrl+C in terminal, then:
pnpm dev:host
```

### Version Server Not Running

**Problem:** Remote entry 404 errors

**Solution:**

```bash
# Check if running
curl http://localhost:3100/

# If not running:
pnpm serve:versions
```

### Wrong Version in Production

**Problem:** Blue shows wrong version

**Solution:**

```bash
# Check config file
cat apps/host/src/config/remote-versions.ts | grep -A 10 "analytics:"

# Verify version exists
ls dist-versions/analytics/

# Restore from backup if needed
ls apps/host/src/config/remote-versions.ts.backup.*
```

---

## Best Practices

### 1. Always Test Before Promoting

✅ **DO:**

- Test thoroughly in green slot
- Check all features
- Verify edge cases
- Review console for errors

❌ **DON'T:**

- Promote without testing
- Skip edge case testing
- Ignore console warnings

### 2. Use Semantic Versioning Correctly

✅ **DO:**

- `patch`: Bug fixes only (1.0.0 → 1.0.1)
- `minor`: New features, backwards compatible (1.0.0 → 1.1.0)
- `major`: Breaking changes (1.0.0 → 2.0.0)

❌ **DON'T:**

- Use `patch` for new features
- Use `major` for bug fixes
- Skip versions (1.0.0 → 1.2.0)

### 3. Monitor After Promotion

✅ **DO:**

- Watch for errors immediately after promotion
- Check user feedback
- Monitor performance metrics
- Keep rollback ready

❌ **DON'T:**

- Promote and leave immediately
- Ignore error spikes
- Delete old versions

### 4. Keep All Versions

✅ **DO:**

- Preserve all built versions
- Keep version history for audit
- Allow rollback to any version

❌ **DON'T:**

- Delete old versions manually
- Clean up "to save space" (storage is cheap)
- Remove versions that are still in use

---

## Advanced Scenarios

### Hotfix During Testing

**Scenario:** v1.2.0 is in green being tested, but critical bug found in production v1.1.0

**Solution:**

```bash
# 1. Note current green version
# v1.2.0 is still being tested

# 2. Create hotfix from current production version
# Manually set package.json to 1.1.1
cd apps/analytics
npm version patch --no-git-tag-version
# Now at v1.1.1

# 3. Build hotfix
pnpm build:version analytics 1.1.1

# 4. Update green to hotfix temporarily
# Edit remote-versions.ts green to point to v1.1.1

# 5. Test hotfix in green

# 6. Promote hotfix
pnpm promote:auto analytics
# Blue now v1.1.1

# 7. Restore v1.2.0 to green
# Edit remote-versions.ts green back to v1.2.0

# 8. Continue testing v1.2.0
```

### Multiple Environments

**Scenario:** Want dev, staging, and production

**Extend the pattern:**

```typescript
export const defaultRemoteRegistry: RemoteRegistry = {
  analytics: {
    activeSlot: 'blue',
    blueVersion: '1.1.0', // Production
    greenVersion: '1.2.0', // Staging
    devVersion: '1.3.0', // Development
    // ... URLs
  },
};
```

---

## Production Deployment (Azure)

When ready for Azure deployment, the workflow is similar:

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy-analytics.yml
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

      - name: Get version
        id: version
        run: echo "VERSION=$(node -p "require('./apps/analytics/package.json').version")" >> $GITHUB_OUTPUT

      - name: Build
        run: |
          pnpm install
          pnpm build:version analytics ${{ steps.version.outputs.VERSION }}

      - name: Upload to Azure Blob Storage
        run: |
          az storage blob upload-batch \
            --account-name ${{ secrets.AZURE_STORAGE_ACCOUNT }} \
            --destination federated-apps/analytics/v${{ steps.version.outputs.VERSION }} \
            --source dist-versions/analytics/v${{ steps.version.outputs.VERSION }}

      - name: Update App Configuration (Green Slot)
        run: |
          az appconfig kv set \
            --name ${{ secrets.AZURE_APPCONFIG_NAME }} \
            --key analytics-green-version \
            --value ${{ steps.version.outputs.VERSION }}
```

### Production Promotion

```bash
# Azure CLI to promote green → blue
az appconfig kv set \
  --name myappconfig \
  --key analytics-active-slot \
  --value green

# Or update blue version directly
az appconfig kv set \
  --name myappconfig \
  --key analytics-blue-version \
  --value 1.1.0
```

---

## Summary

### Daily Workflow

```bash
# 1. Create next version
pnpm prepare:next analytics minor

# 2. Test
# Use deployment panel UI

# 3. Promote
pnpm promote:auto analytics

# 4. Restart host
pnpm dev:host
```

### Key Commands

- `pnpm prepare:next <app> <patch|minor|major>` - Create next version
- `pnpm promote:auto <app>` - Promote to production
- `pnpm serve:versions` - Start version server
- `pnpm dev:host` - Start host app

### Key Files

- `apps/analytics/package.json` - Version source of truth
- `apps/host/src/config/remote-versions.ts` - Deployment config
- `dist-versions/analytics/` - Built versions storage

### Support

- Full docs: [docs/VERSIONED_DEPLOYMENT.md](./VERSIONED_DEPLOYMENT.md)
- Quick ref: [docs/BLUE_GREEN_QUICKREF.md](./BLUE_GREEN_QUICKREF.md)
- Architecture: [docs/ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)

---

**Questions?** Check the troubleshooting section or review the example scenarios above.
