# React + TypeScript Microfrontend Setup

## 🚀 Overview

This project demonstrates a production-quality microfrontend architecture using:

- **TanStack Router** - Client-side routing with type safety
- **Vite + Module Federation** - Build tool with federated modules
- **Material UI v5** - Component library with theming
- **TypeScript** - Type safety across applications
- **TanStack Query** - Data fetching and state management
- **Vitest + React Testing Library** - Testing framework

## 📁 Project Structure

```
├── package.json                    # Root workspace configuration
├── pnpm-workspace.yaml            # pnpm workspace setup
├── tsconfig.json                  # Base TypeScript config
├── apps/
│   ├── host/                      # Host application (Shell)
│   │   ├── src/
│   │   │   ├── components/        # Host-specific components
│   │   │   ├── routes/           # Route components
│   │   │   ├── theme/            # Theme context and configuration
│   │   │   └── types/            # Module federation types
│   │   └── vite.config.ts        # Host Vite + MF config
│   └── remote/                    # Remote application (Microfrontend)
│       ├── src/
│       │   ├── components/        # Federated components
│       │   ├── routes/           # Remote routes
│       │   └── __tests__/        # Component tests
│       └── vite.config.ts        # Remote Vite + MF config
└── packages/                      # Shared packages
    ├── shared-types/              # Common TypeScript types
    └── ui-contracts/              # Component interface contracts
```

## 🔧 Development Setup

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start both applications concurrently
pnpm dev

# Or start individually
pnpm dev:host    # Host app on http://localhost:3000
pnpm dev:remote  # Remote app on http://localhost:3001
```

### Testing

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests for specific app
pnpm test:host
pnpm test:remote
```

## 🏗️ Architecture Details

### Host Application (Shell)

The host application serves as the main shell that:

- Provides global navigation and theme management
- Loads and orchestrates remote microfrontends
- Handles routing between different applications
- Manages shared state and theme context

**Key Features:**

- Dark/Light mode toggle with theme inheritance
- TanStack Router for type-safe routing
- Material UI theming shared across microfrontends
- Module Federation configuration for remote consumption

### Remote Application (Microfrontend)

The remote application exposes components that can be consumed by the host:

- **UserCard**: Displays user information with actions
- **FederatedPage**: Complete page component
- **RemoteApp**: Standalone application capability

**Key Features:**

- Can run independently or as federated component
- TanStack Query for data fetching
- Material UI components with theme inheritance
- Comprehensive TypeScript typing

### Module Federation Configuration

**Host Configuration:**

```typescript
remotes: {
  remote: {
    type: 'module',
    name: 'remote',
    entry: 'http://localhost:3001/remoteEntry.js',
    entryGlobalName: 'remote',
    shareScope: 'default',
  },
}
```

**Remote Configuration:**

```typescript
exposes: {
  './UserCard': './src/components/UserCard.tsx',
  './FederatedPage': './src/components/FederatedPage.tsx',
  './RemoteApp': './src/App.tsx',
}
```

### Shared Dependencies

Both applications share these dependencies as singletons:

- React & React DOM
- Material UI & Emotion
- TanStack Query

## 🎨 Theming

The theming system provides:

- **Dark/Light mode toggle** in the host navigation
- **Theme inheritance** from host to remote components
- **Material UI customization** with consistent branding
- **Responsive design** across all breakpoints

## 📝 Type Safety

Type safety is ensured through:

- **Shared type packages** for common interfaces
- **UI contracts** for component prop definitions
- **Module federation types** for remote component imports
- **Strict TypeScript configuration** across all packages

## 🧪 Testing Strategy

- **Unit tests** for individual components
- **Integration tests** for federated component loading
- **Type checking** as part of the testing pipeline
- **Coverage reporting** for code quality metrics

## 📊 Features Demonstrated

### ✅ Core Functionality

- [x] Module Federation setup with Vite
- [x] Remote component loading and error handling
- [x] Theme inheritance across applications
- [x] Type-safe routing with TanStack Router
- [x] Data fetching with TanStack Query
- [x] Material UI integration

### ✅ Production Features

- [x] Error boundaries and fallback components
- [x] Loading states and suspense handling
- [x] TypeScript strict mode compliance
- [x] ESLint and Prettier configuration
- [x] Test setup with Vitest
- [x] Monorepo structure with pnpm workspaces

### ✅ User Experience

- [x] Dark/Light mode toggle
- [x] Responsive navigation
- [x] Loading and error states
- [x] Accessible components
- [x] Clean Material UI design

## 🔍 Debug Tools

Access the debug page at `/debug` to test Module Federation functionality:

- **Module Federation Test**: Verifies remote module loading
- **Network Access Test**: Checks remote entry point accessibility
- **Component Load Test**: Tests lazy loading mechanisms

## 🚀 Deployment Considerations

For production deployment:

1. **Environment Configuration**: Update remote entry URLs for production
2. **Build Optimization**: Configure Vite build settings for optimal bundles
3. **CDN Setup**: Host remote entries on CDN for better performance
4. **Error Monitoring**: Implement error tracking for federation failures
5. **Health Checks**: Monitor remote application availability

## 📖 Development Guidelines

### Adding New Remote Components

1. Create component in `apps/remote/src/components/`
2. Add to `vite.config.ts` exposes section
3. Create type definitions in `packages/ui-contracts/`
4. Import and use in host application with error boundaries

### Shared Dependencies

When adding new shared dependencies:

1. Add to both host and remote `vite.config.ts` shared sections
2. Ensure version compatibility
3. Test federation functionality after changes

### Theme Customization

Modify theme in `apps/host/src/theme/ThemeContext.tsx` to customize:

- Color palette
- Typography settings
- Component overrides
- Responsive breakpoints

---

## 🎯 Success Criteria Met

This implementation successfully demonstrates:

- ✅ **Microfrontend Architecture**: Working Module Federation setup
- ✅ **Type Safety**: Full TypeScript integration with shared types
- ✅ **Modern Tech Stack**: TanStack Router, Vite, Material UI
- ✅ **Theme Inheritance**: Consistent theming across applications
- ✅ **Production Quality**: Error handling, testing, and documentation
- ✅ **Developer Experience**: Hot reload, debugging tools, and clear structure

The project is ready for development and can serve as a foundation for building scalable microfrontend applications.
