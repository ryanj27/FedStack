#!/bin/bash

# Build Analytics with Version Number
# Creates a versioned build in dist-versions/analytics/{version}
#
# Usage:
#   ./scripts/build-versioned.sh analytics 1.0.0
#   ./scripts/build-versioned.sh analytics 1.1.0

set -e

APP_NAME=$1
VERSION=$2

if [ -z "$APP_NAME" ] || [ -z "$VERSION" ]; then
    echo "Usage: $0 <app-name> <version>"
    echo "Example: $0 analytics 1.0.0"
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
APP_DIR="$PROJECT_ROOT/apps/$APP_NAME"
DIST_VERSIONS="$PROJECT_ROOT/dist-versions"
VERSION_DIR="$DIST_VERSIONS/$APP_NAME/v$VERSION"

if [ ! -d "$APP_DIR" ]; then
    echo "❌ Error: App directory not found: $APP_DIR"
    exit 1
fi

echo "📦 Building $APP_NAME version $VERSION"
echo "   App directory: $APP_DIR"
echo "   Output directory: $VERSION_DIR"
echo ""

# Clean and create version directory
rm -rf "$VERSION_DIR"
mkdir -p "$VERSION_DIR"

# Build the app
echo "🔨 Running build..."
cd "$APP_DIR"
pnpm build

# Copy built files to versioned directory
echo "📂 Copying build artifacts..."
cp -r "$APP_DIR/dist/"* "$VERSION_DIR/"

# Create a version metadata file
echo "📝 Creating version metadata..."
cat > "$VERSION_DIR/version.json" <<EOF
{
  "app": "$APP_NAME",
  "version": "$VERSION",
  "buildDate": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "commit": "$(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')"
}
EOF

echo ""
echo "✅ Build complete!"
echo "   Version: $VERSION"
echo "   Location: $VERSION_DIR"
echo "   Files:"
ls -lh "$VERSION_DIR" | tail -n +2 | awk '{print "      - " $9 " (" $5 ")"}'
echo ""
echo "🌐 This version can be served at:"
echo "   http://localhost:3100/analytics/v$VERSION/remoteEntry.js"
