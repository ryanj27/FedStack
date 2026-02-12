#!/bin/bash

# Make a visual change to analytics app to test blue/green switching
# This helps demonstrate that switching actually loads different versions

set -e

VERSION=$1

if [ -z "$VERSION" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 1.1.0"
    echo ""
    echo "This script adds a version banner to the analytics app to make"
    echo "blue/green switching visually obvious during testing."
    exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
METRICS_FILE="$PROJECT_ROOT/apps/analytics/src/components/MetricsSummary.tsx"

echo "📝 Adding version banner to analytics app..."

# Check if version banner already exists
if grep -q "VERSION_BANNER" "$METRICS_FILE"; then
    echo "⚠️  Version banner code already exists in MetricsSummary.tsx"
    echo "   To rebuild: ./scripts/build-versioned.sh analytics $VERSION"
    exit 0
fi

# Backup original
cp "$METRICS_FILE" "$METRICS_FILE.backup"

# Create updated file with version banner
cat > "$METRICS_FILE" << 'EOF'
/**
 * Metrics Summary Component
 *
 * Displays high-level business metrics and KPIs.
 * This component is exposed via Module Federation for use in the host app.
 */

import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as MoneyIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

// VERSION_BANNER: Used for blue/green testing
const VERSION = import.meta.env.VITE_APP_VERSION || '1.0.0';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactElement;
  color: 'primary' | 'success' | 'warning' | 'error';
}

function MetricCard({ title, value, change, icon, color }: MetricCardProps) {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box
            sx={{
              bgcolor: `${color}.light`,
              p: 1.5,
              borderRadius: 2,
              mr: 2,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 1 }}>
          {value}
        </Typography>
        <Typography variant="body2" color={color}>
          {change}
        </Typography>
      </CardContent>
    </Card>
  );
}

export function MetricsSummary() {
  return (
    <Box>
      {/* Version Banner for Blue/Green Testing */}
      <Card
        sx={{
          mb: 3,
          bgcolor: VERSION.includes('1.0') ? 'primary.main' : 'success.main',
          color: 'white',
        }}
      >
        <CardContent sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" component="div">
              📊 Analytics Module Version
            </Typography>
            <Chip
              label={`v${VERSION}`}
              sx={{
                bgcolor: 'rgba(255,255,255,0.2)',
                color: 'white',
                fontWeight: 'bold',
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ opacity: 0.9 }}>
            {VERSION.includes('1.0')
              ? '🔵 BLUE SLOT - Production Stable'
              : '🟢 GREEN SLOT - Latest Version'}
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Revenue"
            value="$142.5K"
            change="↑ 12.5% from last month"
            icon={<MoneyIcon />}
            color="success"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Active Users"
            value="8,426"
            change="↑ 5.2% from last week"
            icon={<PeopleIcon />}
            color="primary"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Conversion Rate"
            value="3.24%"
            change="↑ 0.4% from last month"
            icon={<TrendingUpIcon />}
            color="warning"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Total Orders"
            value="1,234"
            change="↓ 2.1% from last week"
            icon={<CartIcon />}
            color="error"
          />
        </Grid>
      </Grid>
    </Box>
  );
}
EOF

echo "✅ Version banner added!"
echo ""
echo "📦 Building versioned app..."
"$SCRIPT_DIR/build-versioned.sh" analytics "$VERSION"

echo ""
echo "🎨 Visual difference added:"
echo "   - v1.0.0: Blue banner (BLUE SLOT)"
echo "   - v1.1.0+: Green banner (GREEN SLOT)"
echo ""
echo "🔄 To see the difference:"
echo "   1. Build both versions:"
echo "      ./scripts/build-versioned.sh analytics 1.0.0"
echo "      ./scripts/make-version-different.sh 1.1.0"
echo ""
echo "   2. Start servers:"
echo "      pnpm dev:versions"
echo ""
echo "   3. Navigate to http://localhost:3000/analytics"
echo "      and use deployment panel to switch"
echo ""
echo "💡 To restore original:"
echo "   mv $METRICS_FILE.backup $METRICS_FILE"
echo ""
