# Versioned Blue/Green Architecture Diagram

## 📊 System Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          DEVELOPMENT (LOCAL)                             │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Analytics      │      │   Version        │      │    Host App      │
│   Source Code    │──┬──▶│   Server         │◀─────│  (Port 3000)     │
│                  │  │   │  (Port 3100)     │      │                  │
│  apps/analytics/ │  │   │                  │      │  Loads remote    │
│    - src/        │  │   │  Serves static   │      │  based on active │
│    - components/ │  │   │  files from:     │      │  slot config     │
└──────────────────┘  │   │  dist-versions/  │      └──────────────────┘
                      │   └──────────────────┘
                      │
          ┌───────────┴───────────┐
          │                       │
          ▼                       ▼
┌──────────────────┐    ┌──────────────────┐
│  Build v1.0.0    │    │  Build v1.1.0    │
│  (Blue Slot)     │    │  (Green Slot)    │
└────────┬─────────┘    └────────┬─────────┘
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────┐
│      dist-versions/analytics/            │
│                                          │
│  ┌────────────────┐  ┌────────────────┐ │
│  │   v1.0.0/      │  │   v1.1.0/      │ │
│  │                │  │                │ │
│  │ remoteEntry.js │  │ remoteEntry.js │ │
│  │ assets/        │  │ assets/        │ │
│  │ index.html     │  │ index.html     │ │
│  │ version.json   │  │ version.json   │ │
│  └────────────────┘  └────────────────┘ │
│         ▲                    ▲           │
│         │                    │           │
│      BLUE (Prod)        GREEN (Staging)  │
└─────────┼────────────────────┼───────────┘
          │                    │
          │                    │
    Currently Active      Ready to Switch


┌─────────────────────────────────────────────────────────────────────────┐
│                        PRODUCTION (AZURE) - FUTURE                       │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   GitHub         │      │   Azure Blob     │      │   Azure CDN      │
│   Actions        │─────▶│   Storage        │─────▶│                  │
│                  │      │                  │      │  Global Edge     │
│  1. Build        │      │  Container:      │      │  Caching         │
│  2. Version      │      │  federated-apps/ │      │                  │
│  3. Upload       │      │                  │      │  cdn.example.com │
└──────────────────┘      │  /analytics/     │      └──────────────────┘
                          │    /v1.0.0/      │              │
                          │    /v1.1.0/      │              │
                          │    /v1.2.0/      │              │
                          └──────────────────┘              │
                                                            │
                                                            ▼
                          ┌──────────────────┐      ┌──────────────────┐
                          │   Azure App      │      │   Host App       │
                          │   Configuration  │◀─────│   (Production)   │
                          │                  │      │                  │
                          │  Key-Value:      │      │  Fetches config  │
                          │  - blue: v1.0.0  │      │  Loads remote    │
                          │  - green: v1.1.0 │      │                  │
                          │  - active: blue  │      └──────────────────┘
                          └──────────────────┘
```

## 🔄 Blue/Green Switching Flow

```
INITIAL STATE (Blue Active)
┌─────────────────────────────────────┐
│  Host App Config                    │
│  ─────────────────                  │
│  activeSlot: "blue"                 │
│  blueVersion: "1.0.0"               │
│  greenVersion: "1.1.0"              │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Version Server                     │
│  http://localhost:3100/             │
│                                     │
│  ✅ /analytics/v1.0.0/ ◀───── ACTIVE
│  ⏸️  /analytics/v1.1.0/ ◀───── STANDBY
└─────────────────────────────────────┘

USER SWITCHES TO GREEN
┌─────────────────────────────────────┐
│  Deployment Panel                   │
│  Click: "Switch to green"           │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  deploymentManager.switchSlot()     │
│  ─────────────────────────────────  │
│  1. Update activeSlot: "green"      │
│  2. Invalidate module cache         │
│  3. Next load uses v1.1.0           │
└─────────────────┬───────────────────┘
                  │
                  ▼
┌─────────────────────────────────────┐
│  Version Server                     │
│  http://localhost:3100/             │
│                                     │
│  ⏸️  /analytics/v1.0.0/ ◀───── STANDBY
│  ✅ /analytics/v1.1.0/ ◀───── ACTIVE
└─────────────────────────────────────┘

ZERO DOWNTIME ACHIEVED ✨
```

## 📦 Build Process

```
SOURCE CODE (apps/analytics/)
          │
          │ pnpm build:version analytics 1.0.0
          │
          ▼
┌─────────────────────────┐
│  1. TypeScript Compile  │
│     tsc                 │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  2. Vite Build          │
│     Module Federation   │
│     - remoteEntry.js    │
│     - code splitting    │
│     - assets            │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  3. Create Version Dir  │
│     dist-versions/      │
│       analytics/        │
│         v1.0.0/         │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  4. Copy Build Files    │
│     - remoteEntry.js    │
│     - assets/*          │
│     - index.html        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│  5. Generate Metadata   │
│     version.json:       │
│     {                   │
│       "app": "...",     │
│       "version": "...", │
│       "buildDate": "",  │
│       "commit": "..."   │
│     }                   │
└────────┬────────────────┘
         │
         ▼
      COMPLETE ✅
```

## 🌐 URL Structure

```
LOCAL DEVELOPMENT
─────────────────

Version Server: http://localhost:3100/
│
├── / ──────────────────────────── Directory listing
│
├── /analytics/ ───────────────────── App listing
│   │
│   ├── /v1.0.0/ ──────────────────── Blue version
│   │   ├── remoteEntry.js ◀───────── Module Federation entry
│   │   ├── assets/
│   │   │   ├── App-XXX.js
│   │   │   ├── index-XXX.js
│   │   │   └── *.css
│   │   ├── index.html
│   │   └── version.json ◀──────────── Version metadata
│   │
│   └── /v1.1.0/ ──────────────────── Green version
│       └── (same structure)

Host App: http://localhost:3000/
├── / ──────────────────────────────── Home
├── /analytics ─────────────────────── Loads remote
├── /deployment ────────────────────── Blue/Green controls


PRODUCTION (AZURE)
──────────────────

Azure CDN: https://cdn.example.com/
│
├── /analytics/
│   ├── /v1.0.0/
│   │   ├── remoteEntry.js ◀───────── Cached at edge
│   │   └── assets/
│   │
│   └── /v1.1.0/
│       └── (same structure)

Azure Blob: https://storage.example.com/
│
└── federated-apps/ (container)
    └── analytics/
        ├── v1.0.0/
        └── v1.1.0/
```

## 🎯 Deployment Workflow

```
DEVELOPER WORKFLOW
──────────────────

┌────────────────┐
│ 1. Make Change │
│    Edit code   │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 2. Build       │
│    v1.2.0      │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 3. Update      │
│    Config      │
│    green:1.2.0 │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 4. Test        │
│    Green slot  │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 5. Switch      │
│    to Green    │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ 6. Monitor     │
│    (or rollback)
└────────────────┘


CI/CD WORKFLOW (PRODUCTION)
────────────────────────────

┌────────────────┐
│ PR Merged      │
│ to main        │
└───────┬────────┘
        │
        ▼
┌────────────────────────┐
│ GitHub Actions         │
│ ─────────────────────  │
│ 1. Get version from    │
│    package.json        │
│ 2. Run tests           │
│ 3. Build production    │
│ 4. Upload to Azure     │
│    Blob Storage        │
│ 5. Update App Config   │
│    (green slot)        │
└───────┬────────────────┘
        │
        ▼
┌────────────────┐
│ Green slot now │
│ has new version│
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Admin reviews  │
│ in staging     │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ Admin switches │
│ to green via   │
│ deployment UI  │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ App Config     │
│ updated:       │
│ active = green │
└───────┬────────┘
        │
        ▼
┌────────────────┐
│ All hosts fetch│
│ new config and │
│ load green     │
└────────────────┘
```

## 🏗️ Component Interaction

```
┌─────────────────────────────────────────────────────────────┐
│                    Host Application                          │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Deployment Control Panel                              │ │
│  │  ────────────────────────                              │ │
│  │  Current: BLUE v1.0.0                                  │ │
│  │                                                         │ │
│  │  [ Switch to Green ]  [ Rollback ]  [ Promote ]       │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│                          │ User clicks                       │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  useRemoteVersion Hook                                 │ │
│  │  ─────────────────────                                 │ │
│  │  - getStatus()                                         │ │
│  │  - switchSlot()                                        │ │
│  │  - rollback()                                          │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│                          │ Calls                             │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  DeploymentManager                                     │ │
│  │  ──────────────────                                    │ │
│  │  - switchSlot(remoteName)                              │ │
│  │  - promoteInactiveSlot()                               │ │
│  │  - rollback()                                          │ │
│  └───────────────────────┬────────────────────────────────┘ │
│                          │                                   │
│                          │ Updates                           │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  Remote Registry (remote-versions.ts)                  │ │
│  │  ────────────────────────────────────                  │ │
│  │  {                                                     │ │
│  │    analytics: {                                        │ │
│  │      activeSlot: "blue" → "green",                    │ │
│  │      blueVersion: "1.0.0",                            │ │
│  │      greenVersion: "1.1.0",                           │ │
│  │      blueUrl: "...v1.0.0/remoteEntry.js",            │ │
│  │      greenUrl: "...v1.1.0/remoteEntry.js"            │ │
│  │    }                                                   │ │
│  │  }                                                     │ │
│  └───────────────────────┬────────────────────────────────┘ │
└──────────────────────────┼──────────────────────────────────┘
                           │
                           │ Fetches from
                           ▼
┌─────────────────────────────────────────────────────────────┐
│              Version Server (Port 3100)                      │
│                                                              │
│  GET /analytics/v1.1.0/remoteEntry.js                       │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  Serves from: dist-versions/analytics/v1.1.0/       │   │
│  │  Headers: CORS, Cache-Control, Content-Type         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📈 Version History

```
Timeline View
─────────────

v1.0.0 (Initial Release)
  │ ▼─────────────── Deployed to BLUE (Production)
  │
  │ Time passes...
  │
v1.1.0 (Bug fixes)
  │ ▼─────────────── Deployed to GREEN (Staging)
  │ ├─────────────── Testing in green slot
  │ ├─────────────── Approved
  │ └─────────────── SWITCH: Green becomes production
  │
  │ Now v1.0.0 is in BLUE (standby)
  │ Now v1.1.0 is in GREEN (production) ✅
  │
v1.2.0 (New feature)
  │ ▼─────────────── Deployed to BLUE (Staging)
  │ ├─────────────── Testing in blue slot
  │ ├─────────────── Approved
  │ └─────────────── SWITCH: Blue becomes production
  │
  │ Now v1.2.0 is in BLUE (production) ✅
  │ Now v1.1.0 is in GREEN (standby)
  │
  ▼


Storage View
────────────

dist-versions/analytics/
├── v1.0.0/  ◀── Historical (can rollback anytime)
├── v1.1.0/  ◀── Standby (GREEN)
├── v1.2.0/  ◀── Production (BLUE) ✅
└── v1.3.0/  ◀── Building... (future)
```

---

This architecture provides:

- ✅ Zero-downtime deployments
- ✅ Instant rollback capability
- ✅ Version immutability
- ✅ Multiple versions in parallel
- ✅ Production-ready design
- ✅ Cost-efficient storage
- ✅ CDN-friendly caching
