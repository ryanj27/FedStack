/**
 * Deployment Control Panel
 *
 * Admin component for managing blue/green deployments of federated remotes.
 * Provides real-time switching between deployment slots for zero-downtime deployments.
 */

import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Alert,
  CircularProgress,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  SwapHoriz as SwapIcon,
  PlayArrow as PromoteIcon,
  Undo as RollbackIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
  Circle as DotIcon,
} from '@mui/icons-material';
import { useRemoteVersion } from '../hooks/useRemoteVersion';

export interface DeploymentControlPanelProps {
  remoteName: string;
  title?: string;
  description?: string;
}

export function DeploymentControlPanel({
  remoteName,
  title = 'Analytics Deployment',
  description = 'Manage blue/green deployment slots',
}: DeploymentControlPanelProps) {
  const { status, isTransitioning, switchSlot, promote, rollback, refresh } =
    useRemoteVersion(remoteName);

  return (
    <Card elevation={3}>
      <CardContent>
        <Stack spacing={2}>
          {/* Header */}
          <Box>
            <Typography variant="h6" gutterBottom>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>

          <Divider />

          {/* Status Overview */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="subtitle2" color="text.secondary">
              Current Status:
            </Typography>
            <Chip
              label={`${status.activeSlot.toUpperCase()} (v${status.activeVersion})`}
              color={status.activeSlot === 'blue' ? 'primary' : 'success'}
              icon={<CheckIcon />}
            />
          </Stack>

          {/* Deployment Slots */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Deployment Slots
            </Typography>
            <Stack spacing={1.5}>
              {/* Blue Slot */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor:
                    status.activeSlot === 'blue' ? 'primary.50' : 'grey.50',
                  border: 1,
                  borderColor:
                    status.activeSlot === 'blue' ? 'primary.main' : 'grey.300',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DotIcon
                        sx={{
                          fontSize: 12,
                          color:
                            status.activeSlot === 'blue'
                              ? 'primary.main'
                              : 'grey.400',
                        }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        Blue Slot
                      </Typography>
                      {status.activeSlot === 'blue' && (
                        <Chip label="ACTIVE" size="small" color="primary" />
                      )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      Version: {status.blueVersion}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Production
                  </Typography>
                </Stack>
              </Box>

              {/* Green Slot */}
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor:
                    status.activeSlot === 'green' ? 'success.50' : 'grey.50',
                  border: 1,
                  borderColor:
                    status.activeSlot === 'green' ? 'success.main' : 'grey.300',
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DotIcon
                        sx={{
                          fontSize: 12,
                          color:
                            status.activeSlot === 'green'
                              ? 'success.main'
                              : 'grey.400',
                        }}
                      />
                      <Typography variant="body2" fontWeight={600}>
                        Green Slot
                      </Typography>
                      {status.activeSlot === 'green' && (
                        <Chip label="ACTIVE" size="small" color="success" />
                      )}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      Version: {status.greenVersion}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Staging/Canary
                  </Typography>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Divider />

          {/* Actions */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Deployment Actions
            </Typography>
            <Stack spacing={1.5}>
              <Tooltip title="Switch traffic to the other deployment slot">
                <Button
                  variant="contained"
                  startIcon={
                    isTransitioning ? (
                      <CircularProgress size={20} />
                    ) : (
                      <SwapIcon />
                    )
                  }
                  onClick={switchSlot}
                  disabled={isTransitioning}
                  fullWidth
                >
                  Switch to {status.inactiveSlot} (v{status.inactiveVersion})
                </Button>
              </Tooltip>

              <Tooltip title="Promote inactive slot to active (same as switch)">
                <Button
                  variant="outlined"
                  color="success"
                  startIcon={<PromoteIcon />}
                  onClick={promote}
                  disabled={isTransitioning}
                  fullWidth
                >
                  Promote {status.inactiveSlot} to Active
                </Button>
              </Tooltip>

              <Tooltip title="Instant rollback to previous slot">
                <Button
                  variant="outlined"
                  color="warning"
                  startIcon={<RollbackIcon />}
                  onClick={rollback}
                  disabled={isTransitioning}
                  fullWidth
                >
                  Rollback (Emergency)
                </Button>
              </Tooltip>

              <Button
                variant="text"
                startIcon={<RefreshIcon />}
                onClick={refresh}
                disabled={isTransitioning}
                size="small"
              >
                Refresh Status
              </Button>
            </Stack>
          </Box>

          {/* Info Alert */}
          <Alert severity="info" sx={{ mt: 1 }}>
            <Typography variant="caption">
              <strong>Development Mode:</strong> Slot switching in dev mode only
              updates the in-memory state. To test blue/green deployments,
              manually edit <code>remote-versions.ts</code> to change the{' '}
              <code>activeSlot</code> value, then restart the host server.
            </Typography>
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              <strong>Production:</strong> In production, slot switching would
              update a remote config service (feature flags, Redis, etc.) and
              changes take effect on next page load.
            </Typography>
          </Alert>
        </Stack>
      </CardContent>
    </Card>
  );
}
