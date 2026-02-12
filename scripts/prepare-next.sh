#!/bin/bash

# Prepare Next Version - Increment version, build, and update green slot
# Uses npm version command for semver compliance
#
# Usage:
#   ./scripts/prepare-next.sh analytics patch   # 1.0.0 → 1.0.1
#   ./scripts/prepare-next.sh analytics minor   # 1.0.0 → 1.1.0
#   ./scripts/prepare-next.sh analytics major   # 1.0.0 → 2.0.0
#
# This script:
# 1. Increments version in apps/{app}/package.json
# 2. Builds the new version
# 3. Updates remote-versions.ts green slot automatically
# 4. Ready for testing

set -e

APP_NAME=$1
INCREMENT_TYPE=$2

if [ -z "$APP_NAME" ] || [ -z "$INCREMENT_TYPE" ]; then
    echo "Usage: $0 <app-name> <patch|minor|major>"
    echo ""
    echo "Examples:"
    echo "  $0 analytics patch   # 1.0.0 → 1.0.1 (bug fixes)"
    echo "  $0 analytics minor   # 1.0.0 → 1.1.0 (new features)"
    echo "  $0 analytics major   # 1.0.0 → 2.0.0 (breaking changes)"
    echo ""
    echo "This will:"
    echo "  1. Increment version in package.json"
    echo "  2. Build the new version"
    echo "  3. Update green slot config"
    echo "  4. Ready for testing"
    exit 1
fi

# Validate increment type
if [[ ! "$INCREMENT_TYPE" =~ ^(patch|minor|major)$ ]]; then
    echo "❌ Error: INCREMENT_TYPE must be patch, minor, or major"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_DIR="$PROJECT_ROOT/apps/$APP_NAME"
PACKAGE_JSON="$APP_DIR/package.json"
CONFIG_FILE="$PROJECT_ROOT/apps/host/src/config/remote-versions.ts"

echo "🚀 Preparing Next Version for $APP_NAME"
echo ""

# Check if app exists
if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: App directory not found: $APP_DIR"
    exit 1
fi

# Check if package.json exists
if [ ! -f "$PACKAGE_JSON" ]; then
    echo "❌ Error: package.json not found: $PACKAGE_JSON"
    exit 1
fi

# Read current version
CURRENT_VERSION=$(node -p "require('$PACKAGE_JSON').version")
echo "📦 Current version: v$CURRENT_VERSION"

# Increment version
cd "$APP_DIR"
echo "🔢 Incrementing version ($INCREMENT_TYPE)..."
npm version "$INCREMENT_TYPE" --no-git-tag-version > /dev/null

# Read new version
NEW_VERSION=$(node -p "require('$PACKAGE_JSON').version")
echo "✅ New version: v$NEW_VERSION"
echo ""

# Build the new version
echo "🔨 Building v$NEW_VERSION..."
cd "$PROJECT_ROOT"
"$SCRIPT_DIR/build-versioned.sh" "$APP_NAME" "$NEW_VERSION"

echo ""
echo "📝 Updating green slot configuration..."

# Backup config file
BACKUP_FILE="$CONFIG_FILE.backup.$(date +%Y%m%d_%H%M%S)"
cp "$CONFIG_FILE" "$BACKUP_FILE"

# Update the configuration using Node.js
node -e "
const fs = require('fs');
const configPath = '$CONFIG_FILE';
const appName = '$APP_NAME';
const newVersion = '$NEW_VERSION';

let content = fs.readFileSync(configPath, 'utf8');

// Update greenVersion
content = content.replace(
  /(${appName}:[\s\S]*?greenVersion:\s*')[^']*'/,
  \`\\\$1\${newVersion}'\`
);

// Update greenUrl
content = content.replace(
  /(greenUrl:[\\s\\S]*?'http:\\/\\/localhost:3100\\/${appName}\\/v)[^\\/]*(\\/remoteEntry\\.js')/,
  \`\\\$1\${newVersion}\\\$2\`
);

fs.writeFileSync(configPath, content, 'utf8');
console.log('✅ Green slot updated to v' + newVersion);
" || {
    echo "❌ Error updating configuration"
    echo "Restoring backup..."
    cp "$BACKUP_FILE" "$CONFIG_FILE"
    exit 1
}

echo ""
echo "🎉 Version v$NEW_VERSION Ready for Testing!"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Start/restart the host application:"
echo "   pnpm dev:host"
echo ""
echo "2. Navigate to deployment panel:"
echo "   open http://localhost:3000/deployment"
echo ""
echo "3. Switch to green slot to test v$NEW_VERSION"
echo ""
echo "4. When testing is complete and approved:"
echo "   pnpm promote:auto $APP_NAME"
echo ""
echo "💾 Config backup saved: $BACKUP_FILE"
echo ""
