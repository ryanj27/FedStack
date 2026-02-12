# Testing Your Versioned Blue/Green Deployment

Complete testing guide for the versioned deployment system with blue/green slots.

## Quick Test (5 Minutes)

### Prerequisites

Ensure you have versioned builds available:

```bash
# Check if versions exist
ls -la dist-versions/analytics/

# If empty, build versions
pnpm prepare:next analytics patch  # Creates v1.0.1
```

### Step 1: Start Version Server

```bash
# From project root
pnpm serve:versions
```

This starts the version storage server on port 3100, serving built versions from `dist-versions/`.

You should see:

```
✓ analytics/v1.0.0 → http://localhost:3100/analytics/v1.0.0/remoteEntry.js
✓ analytics/v1.1.0 → http://localhost:3100/analytics/v1.1.0/remoteEntry.js
```

### Step 2: Start Host Application

```bash
# In a new terminal
cd apps/host
VITE_USE_VERSIONED=true pnpm dev
```

This starts the host app on port 3000 in versioned mode (loads from port 3100).

**Alternative**: Use the combined command:

```bash
pnpm dev:versions
```

### Step 3: Open Deployment Control Panel

Navigate to: http://localhost:3000/deployment

You should see:

- Blue Slot (v1.0.0) - marked as ACTIVE ✓
- Green Slot (v1.1.0) - inactive
- Three action buttons

### Step 4: Test Switching

1. Click **"Switch to Green"** button
2. Notice the active slot changes from blue → green
3. The analytics page now loads v1.1.0
4. Check browser console: `[Remote Registry] Loading "analytics" from green slot (v1.1.0)`

### Step 5: Test Rollback

1. Click **"Rollback"** button
2. Active slot switches back to blue
3. Analytics loads v1.0.0 again
4. Console shows rollback event

## Verify It's Working

### Check Active Slot Configuration

Check the active configuration:

```bash
# View current slot settings
cat apps/host/src/config/remote-versions.ts | grep -A 5 "analytics:"
```

Should show:

```typescript
analytics: {
  activeSlot: 'blue',
  blueVersion: '1.0.0',
  greenVersion: '1.1.0',
  // ...
}
```

### Check Network Tab

1. Open DevTools Network tab
2. Filter for "remoteEntry"
3. Switch slots in deployment panel
4. You should see requests to different versions:
   - Blue: `http://localhost:3100/analytics/v1.0.0/remoteEntry.js`
   - Green: `http://localhost:3100/analytics/v1.1.0/remoteEntry.js`

### Test Version Metadata

Visit version metadata endpoints:

```bash
# Check v1.0.0 metadata
curl http://localhost:3100/analytics/v1.0.0/version.json

# Check v1.1.0 metadata
curl http://localhost:3100/analytics/v1.1.0/version.json
```

## Complete Deployment Workflow Test

### Scenario: Deploy Analytics v1.1.0 → v1.2.0

This tests the complete promotion workflow.

#### Step 1: Prepare Next Version

```bash
# Create v1.2.0 with new features
pnpm prepare:next analytics minor
```

This will:

- Increment version (1.1.0 → 1.2.0)
- Build the new version
- Update green slot to v1.2.0
- Create config backup

#### Step 2: Verify Build

```bash
# Check that v1.2.0 was built
ls -la dist-versions/analytics/v1.2.0/

# Should see:
# remoteEntry.js
# version.json
# assets/
# index.html
```

#### Step 3: Test Green Slot

1. Go to http://localhost:3000/deployment
2. Click "Switch to Green"
3. Navigate to http://localhost:3000/analytics
4. Verify version v1.2.0 is displayed (check footer or metrics)

#### Step 4: Promote to Production

```bash
pnpm promote:auto analytics
```

Expected output:

```
🤖 Smart Version Promotion for analytics
📦 Detected version: v1.2.0
✅ Build found: v1.2.0

📊 Current Configuration:
   Blue (Production):  v1.1.0
   Green (Staging):    v1.2.0

🔄 Promoting to:
   Blue (Production):  v1.2.0 ⬅ NEW

Continue? (y/n) y
✅ Configuration updated
🎉 Promotion Complete!
```

#### Step 5: Restart Host

```bash
# Stop host terminal (Ctrl+C), then restart
cd apps/host
VITE_USE_VERSIONED=true pnpm dev
```

#### Step 6: Verify Production

1. Go to http://localhost:3000/deployment
2. Blue slot should show v1.2.0
3. Navigate to http://localhost:3000/analytics
4. Verify v1.2.0 is now in production

## Testing Rollback Scenarios

### Scenario 1: Immediate Rollback via UI

**When**: Issues found immediately after deployment

1. Go to deployment panel
2. Click "Rollback" button
3. Previous version restored instantly
4. No build or config changes needed

### Scenario 2: Rollback to Specific Version

**When**: Need to rollback to older version

```bash
# Edit remote-versions.ts
# Change blueVersion to desired version
blueVersion: '1.0.0',  # Rollback to v1.0.0

# Restart host
cd apps/host
VITE_USE_VERSIONED=true pnpm dev
```

### Scenario 3: Rollback Using Config Backup

**When**: Config got corrupted

```bash
# List available backups
ls -lt apps/host/src/config/remote-versions.ts.backup.*

# Restore backup
cp apps/host/src/config/remote-versions.ts.backup.20251022_143022 \
   apps/host/src/config/remote-versions.ts

# Restart host
```

## Advanced Testing

### Test Automated Workflow

Test the complete automation cycle:

```bash
# 1. Prepare patch version
pnpm prepare:next analytics patch  # v1.2.0 → v1.2.1

# 2. Test in green
# (manually test via deployment panel)

# 3. Promote when ready
pnpm promote:auto analytics

# 4. Restart and verify
```

### Test Multiple Version Bumps

```bash
# Create several versions rapidly
pnpm prepare:next analytics patch  # v1.0.0 → v1.0.1
pnpm prepare:next analytics patch  # v1.0.1 → v1.0.2
pnpm prepare:next analytics minor  # v1.0.2 → v1.1.0
pnpm prepare:next analytics major  # v1.1.0 → v2.0.0

# All versions preserved for rollback
ls -la dist-versions/analytics/
```

### Test Version Server Directory Browsing

```bash
# Visit in browser
open http://localhost:3100/

# Should show directory listing:
# 📁 analytics/
#    📁 v1.0.0/
#    📁 v1.1.0/
#    📁 v1.2.0/
```

### Test Missing Version Handling

```bash
# Try to promote non-existent version
cd apps/analytics
npm version patch --no-git-tag-version  # Bump to v1.5.0 (but don't build)

pnpm promote:auto analytics
# Should error: "Build not found for v1.5.0"
```

## Regular Development Testing

### Test Regular Dev Mode (No Versioning)

```bash
# Start all apps in dev mode
pnpm dev

# This starts:
# - Remote: http://localhost:3001/
# - Analytics: http://localhost:3002/ (live dev server)
# - Host: http://localhost:3000/
```

Analytics loads from the **live dev server** (port 3002), not versioned builds.

**Use this for**: Active development with hot reload

### Test Versioned Dev Mode

```bash
# Start with versioned builds
pnpm dev:versions

# This starts:
# - Version server: http://localhost:3100/
# - Host: http://localhost:3000/ (VITE_USE_VERSIONED=true)
```

Analytics loads from **versioned builds** (port 3100).

**Use this for**: Testing blue/green deployments locally

## Expected Console Output

### When Switching Slots

```
[Remote Registry] Switched "analytics" from blue (v1.0.0) to green (v1.1.0)
```

### When Promoting

```
🤖 Smart Version Promotion for analytics
📦 Detected version: v1.1.0
✅ Configuration updated
```

### When Preparing Next Version

```
🚀 Preparing Next Version for analytics
📦 Current version: v1.0.0
🔢 Incrementing version (minor)...
✅ New version: v1.1.0
🔨 Building v1.1.0...
✅ Green slot updated to v1.1.0
```

## Troubleshooting

### Version server not responding

**Error**: `GET http://localhost:3100/analytics/v1.0.0/remoteEntry.js net::ERR_CONNECTION_REFUSED`

**Solution**:

```bash
# Start version server
pnpm serve:versions

# Or use combined command
pnpm dev:versions
```

### Host loading wrong port

**Issue**: Host trying to load from port 3002 instead of 3100

**Cause**: `VITE_USE_VERSIONED` not set

**Solution**:

```bash
# Set environment variable
VITE_USE_VERSIONED=true pnpm dev:host

# Or use the preset command
pnpm dev:versions
```

### Version not found

**Error**: `404 Not Found: /analytics/v1.2.0/remoteEntry.js`

**Cause**: Version wasn't built

**Solution**:

```bash
# Build the specific version
pnpm build:version analytics 1.2.0

# Or prepare it properly
pnpm prepare:next analytics minor
```

### Config not updating after promotion

**Issue**: Blue slot still shows old version after `promote:auto`

**Cause**: Host dev server needs restart

**Solution**:

```bash
# Stop host (Ctrl+C), then restart
cd apps/host
VITE_USE_VERSIONED=true pnpm dev
```

### Can't find deployment page

**Error**: 404 on /deployment

**Solution**: Ensure host is running:

```bash
cd apps/host
pnpm dev
```

## What Success Looks Like

✅ **Version server running** on port 3100  
✅ **Multiple versions available** in dist-versions/  
✅ **Deployment panel loads** with current versions displayed  
✅ **Switching changes version** in real-time  
✅ **Prepare:next creates new version** and updates green  
✅ **Promote:auto updates blue** without manual editing  
✅ **All versions preserved** for instant rollback  
✅ **Network requests** show correct versioned URLs

## Production Testing Checklist

Before deploying to production:

- [ ] Test complete promotion workflow (prepare → test → promote)
- [ ] Verify all versions build successfully
- [ ] Test rollback via UI
- [ ] Test rollback via config restore
- [ ] Verify version metadata (version.json)
- [ ] Test with multiple simultaneous users
- [ ] Verify CDN/blob storage paths work
- [ ] Test automated CI/CD pipeline
- [ ] Document team deployment procedures
- [ ] Train team on promotion workflow

## Integration Testing

### Test with Remote App

```bash
# Start all services
pnpm serve:versions  # Terminal 1
pnpm dev:remote      # Terminal 2
VITE_USE_VERSIONED=true pnpm dev:host  # Terminal 3
```

Visit:

- http://localhost:3000/analytics (versioned, v1.0.0)
- http://localhost:3000/federated (live dev, from port 3001)

### Test Production Build

```bash
# Build host for production
cd apps/host
pnpm build

# Preview production build
pnpm preview

# Should work with version server on 3100
```

## Next Steps

After successful local testing:

1. **CI/CD**: Automate `prepare:next` and `promote:auto` in pipeline
2. **Azure Setup**: Configure Azure Blob Storage for versioned builds
3. **Monitoring**: Add real-time metrics and error tracking
4. **Gradual Rollout**: Implement canary deployments (10% → 50% → 100%)
5. **Automation**: Set up automatic rollback on error thresholds

## Documentation References

- **Complete Workflow**: [PROMOTION_GUIDE.md](./PROMOTION_GUIDE.md)
- **Quick Reference**: [BLUE_GREEN_QUICKREF.md](./BLUE_GREEN_QUICKREF.md)
- **Architecture**: [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md)
- **Technical Details**: [VERSIONED_DEPLOYMENT.md](./VERSIONED_DEPLOYMENT.md)

---

**You now have a production-ready versioned deployment system!** 🎉

All versions are preserved, promotions are automated, and rollbacks are instant. Test thoroughly locally, then deploy to production with confidence.
