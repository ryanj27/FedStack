# FedStack ✅

_Modern React + TypeScript Microfrontend Architecture_

A production-quality React + TypeScript multi-app setup using TanStack Router, Vite + Module Federation, and Material UI.

**Status**: Fully functional with remote components successfully loading across applications.

## Architecture

This project demonstrates a microfrontend architecture with:

- **Host Application** (port 3000): Main application shell with routing and theme management
- **Remote Application** (port 3001): User management components and federated pages
- **Analytics Application** (port 3002): Business metrics and analytics dashboard
- **Shared Packages**: Type-safe contracts and shared TypeScript definitions

## Tech Stack

- **Framework**: TanStack Router for client-side routing and navigation
- **Build Tool**: Vite with Module Federation
- **UI Library**: Material UI v5 with custom theming and dark mode
- **Type Safety**: TypeScript with strict mode
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

Run all applications concurrently:

```bash
pnpm dev
```

Or run individually:

```bash
# Host application (localhost:3000)
pnpm dev:host

# Remote application (localhost:3001)
pnpm dev:remote

# Analytics application (localhost:3002)
pnpm dev:analytics
```

### Production Build

Build all applications:

```bash
pnpm build
```

Build individually:

```bash
pnpm build:host
pnpm build:remote
pnpm build:analytics
```

### Testing

Run all tests:

```bash
pnpm test
```

### Code Quality

```bash
# Lint all files
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm type-check
```

## Features Demonstrated

### Module Federation

- Host app consumes components from multiple remote applications
- Shared dependencies (React, MUI, TanStack libraries) across all applications
- Independent deployment capabilities for each microfrontend
- Multi-remote architecture demonstrating scalable federation patterns

### Theme Integration

- Central theme management in host application
- Dark mode toggle that affects all remote components
- Material UI theme inheritance across federation boundary

### Type Safety

- Shared TypeScript interfaces for component contracts
- Path aliases for clean imports
- Strict TypeScript configuration

### Development Experience

- Hot reload for both applications during development
- Fallback components when remote loading fails
- Developer tools for routing and queries

## Project Structure

```
├── apps/
│   ├── host/                 # Main application shell
│   │   ├── src/
│   │   │   ├── routes/       # TanStack Router routes
│   │   │   ├── components/   # Host-specific components
│   │   │   └── theme/        # Theme configuration
│   │   └── vite.config.ts    # Module Federation config
│   ├── remote/               # Remote microfrontend (User Management)
│   │   ├── src/
│   │   │   ├── components/   # Federated components
│   │   │   └── routes/       # Standalone routes
│   │   └── vite.config.ts    # Federation exports
│   └── analytics/            # Analytics microfrontend (Business Metrics)
│       ├── src/
│       │   ├── components/   # Analytics components
│       │   └── routes/       # Analytics routes
│       └── vite.config.ts    # Federation exports
├── packages/
│   ├── shared-types/         # Common TypeScript types
│   └── ui-contracts/         # Component contracts
└── package.json              # Workspace configuration
```

## Component Federation

### Exposed Components

**Remote Application (User Management):**

- `UserCard`: Displays user information with actions
- `FederatedPage`: Complete page component with navigation
- `RemoteApp`: Standalone application entry point

**Analytics Application (Business Metrics):**

- `MetricsSummary`: Dashboard widget showing key business metrics
- `AnalyticsPage`: Complete analytics dashboard with charts and tabs
- `AnalyticsApp`: Standalone analytics application entry point

### Consumed Components (Host)

- Remote components are lazy-loaded with error boundaries
- Theme context is automatically passed to all remote components
- Type-safe props via shared contracts
- Multi-remote architecture with fault isolation

## Environment Variables

### Host Application (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Host Application
VITE_REMOTE_URL=http://localhost:3001
VITE_ANALYTICS_URL=http://localhost:3002
```

### Remote Application (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Remote Application
```

### Analytics Application (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Analytics Application
```

## Performance Considerations

- Code splitting via TanStack Router's lazy loading
- Shared dependencies to avoid duplication across all remotes
- Tree shaking for optimal bundle sizes
- Emotion-based MUI styles work efficiently with Module Federation
- Multi-remote architecture with independent deployment cycles

## Future Enhancements

Possible improvements and extensions:

1. **SSR Integration**: Add server-side rendering with TanStack Start
2. **CI/CD Pipeline**: Automated testing and deployment for all applications
3. **Bundle Analysis**: Webpack Bundle Analyzer integration
4. **Authentication**: Shared authentication state across all apps
5. **Error Boundaries**: Enhanced error handling for federation failures
6. **Advanced Federation**: Version management and graceful degradation
7. **Monitoring**: Performance monitoring and error tracking across remotes
8. **State Management**: Shared state via Zustand or Redux Toolkit
9. **Additional Remotes**: Extend to more specialized microfrontends
10. **Container Orchestration**: Docker setup for development and deployment

## Troubleshooting

### Common Issues

1. **Remote component not loading**: Check that remote apps are running on correct ports (3001, 3002)
2. **Theme not applying**: Ensure ThemeProvider is wrapping remote components
3. **Type errors**: Run `pnpm type-check` to verify all type definitions
4. **Hot reload not working**: Restart development servers
5. **Analytics widget not showing**: Verify analytics app is running on port 3002

### Development Tips

- Use browser dev tools to inspect Module Federation loading
- Check network tab for remote entry point requests (remoteEntry.js)
- Use React dev tools to verify theme context propagation
- Test each remote application independently before integration
- Monitor console for federation loading errors

## License

MIT License - see LICENSE file for details.
