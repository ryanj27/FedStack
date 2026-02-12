#!/bin/bash

# Smart Version Promotion - Automatically promotes version from package.json
# Reads the current version from apps/{app}/package.json and promotes it to production
#
# Usage:
#   ./scripts/promote-auto.sh analytics
#
# This script:
# 1. Reads version from apps/analytics/package.json
# 2. Verifies the build exists in dist-versions/
# 3. Updates remote-versions.ts automatically
# 4. Preserves all existing versions

set -e

APP_NAME=$1

if [ -z "$APP_NAME" ]; then
    echo "Usage: $0 <app-name>"
    echo "Example: $0 analytics"
    echo ""
    echo "This reads the version from apps/$APP_NAME/package.json"
    echo "and promotes it to production (blue slot)."
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_DIR="$PROJECT_ROOT/apps/$APP_NAME"
PACKAGE_JSON="$APP_DIR/package.json"
CONFIG_FILE="$PROJECT_ROOT/apps/host/src/config/remote-versions.ts"

echo "🤖 Smart Version Promotion for $APP_NAME"
echo ""

# Check if app exists
if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: App directory not found: $APP_DIR"
    echo ""
    echo "Available apps:"
    ls -1 "$PROJECT_ROOT/apps/" | sed 's/^/   - /'
    exit 1
fi

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "❌ Error: package.json not found: $PACKAGE_JSON"
    exit 1
fi

# Read version from package.json
VERSION=$(node -p "require('$PACKAGE_JSON').version")

if [ -z "$VERSION" ]; then
    echo "❌ Error: Could not read version from package.json"
    exit 1
fi

echo "📦 Detected version: v$VERSION (from package.json)"
echo ""

VERSION_DIR="$PROJECT_ROOT/dist-versions/$APP_NAME/v$VERSION"

# Verify version exists
if [ ! -d "$VERSION_DIR" ]; then
    echo "❌ Error: Version v$VERSION not built yet!"
    echo "   Expected: $VERSION_DIR"
    echo ""
    echo "💡 Build it first:"
    echo "   pnpm build:version $APP_NAME $VERSION"
    echo ""
    echo "Or use the prepare:next command to version + build in one step."
    exit 1
fi

echo "✅ Build found: v$VERSION"
echo ""

# Check if config file exists
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Error: Config file not found: $CONFIG_FILE"
    exit 1
fi

# Read current configuration
CURRENT_BLUE=$(grep "blueVersion:" "$CONFIG_FILE" | head -1 | sed "s/.*blueVersion: '\([^']*\)'.*/\1/")
CURRENT_GREEN=$(grep "greenVersion:" "$CONFIG_FILE" | head -1 | sed "s/.*greenVersion: '\([^']*\)'.*/\1/")

echo "📊 Current Configuration:"
echo "   Blue (Production):  v$CURRENT_BLUE"
echo "   Green (Staging):    v$CURRENT_GREEN"
echo ""
echo "🔄 Promoting to:"
echo "   Blue (Production):  v$VERSION ⬅ NEW"
echo "   Green (Staging):    (ready for next version)"
echo ""

# Confirm promotion
read -p "Continue with promotion? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Promotion cancelled"
    exit 0
fi

echo ""
echo "📝 Updating configuration..."

# Backup config file
BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
cp "$CONFIG_FILE" "$BACKUP_FILE"

# Update the configuration using Node.js for more reliable editing
node -e "
const fs = require('fs');
const configPath = '$CONFIG_FILE';
const appName = '$APP_NAME';
const newVersion = '$VERSION';

let content = fs.readFileSync(configPath, 'utf8');

// Update blueVersion
content = content.replace(
  /(${appName}:[\s\S]*?blueVersion:\s*')[^']*'/,
  \`\\\$1\${newVersion}'\`
);

// Update blueUrl
content = content.replace(
  /(blueUrl:[\\s\\S]*?'http:\\/\\/localhost:3100\\/${appName}\\/v)[^\\/]*(\\/remoteEntry\\.js')/,
  \`\\\$1\${newVersion}\\\$2\`
);

fs.writeFileSync(configPath, content, 'utf8');
console.log('✅ Configuration updated successfully');
" || {
    echo "❌ Error updating configuration"
    echo "Restoring backup..."
    cp "$BACKUP_FILE" "$CONFIG_FILE"
    exit 1
}

echo ""

# Show preserved versions
echo "📦 Preserved Versions (all kept for rollback):"
if [ -d "$PROJECT_ROOT/dist-versions/$APP_NAME" ]; then
    ls -1 "$PROJECT_ROOT/dist-versions/$APP_NAME/" 2>/dev/null | while read version; do
        if [ "$version" = "v$VERSION" ]; then
            echo "   ✓ $version ⬅ NOW PRODUCTION (blue)"
        elif [ "$version" = "v$CURRENT_BLUE" ]; then
            echo "   - $version (previous production)"
        else
            echo "   - $version"
        fi
    done
else
    echo "   (none yet)"
fi
echo ""

echo "🎉 Promotion Complete!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Restart the host application:"
echo "   cd apps/host && pnpm dev"
echo ""
echo "2. Verify production is serving v$VERSION:"
echo "   open http://localhost:3000/analytics"
echo ""
echo "3. Prepare next version for testing:"
echo "   pnpm prepare:next $APP_NAME minor    # 1.1.0 → 1.2.0"
echo "   or"
echo "   pnpm prepare:next $APP_NAME patch    # 1.1.0 → 1.1.1"
echo ""
echo "💾 Config backup saved: $BACKUP_FILE"
echo ""
echo "💡 To rollback:"
echo "   - Use deployment panel UI to switch slots"
echo "   - Or restore backup: cp $BACKUP_FILE $CONFIG_FILE"
echo ""
