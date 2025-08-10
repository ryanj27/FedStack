# FedStack ✅

_Modern React + TypeScript Microfrontend Architecture_

A production-quality React + TypeScript multi-app setup using TanStack Router, Vite + Module Federation, and Material UI.

**Status**: Fully functional with remote components successfully loading across applications.

## Architecture

This project demonstrates a microfrontend architecture with:

- **Host Application** (port 5177): Main application shell with routing and theme management
- **Remote Application** (port 5176): Federated components and pages that are consumed by the host
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

Run both applications concurrently:

```bash
pnpm dev
```

Or run individually:

```bash
# Host application (localhost:5177)
pnpm dev:host

# Remote application (localhost:5176)
pnpm dev:remote
```

### Production Build

Build both applications:

```bash
pnpm build
```

Build individually:

```bash
pnpm build:host
pnpm build:remote
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

- Host app consumes remote components dynamically
- Shared dependencies (React, MUI) across applications
- Independent deployment capabilities

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
│   │   │   ├── routes/       # TanStack Start routes
│   │   │   ├── components/   # Host-specific components
│   │   │   └── theme/        # Theme configuration
│   │   └── vite.config.ts    # Module Federation config
│   └── remote/               # Remote microfrontend
│       ├── src/
│       │   ├── components/   # Federated components
│       │   └── routes/       # Standalone routes
│       └── vite.config.ts    # Federation exports
├── packages/
│   ├── shared-types/         # Common TypeScript types
│   └── ui-contracts/         # Component contracts
└── package.json              # Workspace configuration
```

## Component Federation

### Exposed Components (Remote)

- `UserCard`: Displays user information with actions
- `FederatedPage`: Complete page component with navigation
- `RemoteApp`: Standalone application entry point

### Consumed Components (Host)

- Remote components are lazy-loaded with error boundaries
- Theme context is automatically passed to remote components
- Type-safe props via shared contracts

## Environment Variables

### Host Application (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Host Application
VITE_REMOTE_URL=http://localhost:5174
```

### Remote Application (.env)

```env
VITE_API_URL=http://localhost:3001/api
VITE_APP_NAME=Remote Application
```

## Performance Considerations

- Code splitting via TanStack Start's lazy loading
- Shared dependencies to avoid duplication
- Tree shaking for optimal bundle sizes
- Emotion-based MUI styles work efficiently with Module Federation

## Future Enhancements

Possible improvements and extensions:

1. **SSR Integration**: Add server-side rendering with TanStack Start
2. **CI/CD Pipeline**: Automated testing and deployment
3. **Bundle Analysis**: Webpack Bundle Analyzer integration
4. **Authentication**: Shared authentication state across apps
5. **Error Boundaries**: Enhanced error handling for federation failures
6. **Advanced Federation**: Version management and graceful degradation
7. **Monitoring**: Performance monitoring and error tracking
8. **State Management**: Shared state via Zustand or Redux Toolkit

## Troubleshooting

### Common Issues

1. **Remote component not loading**: Check that remote app is running on port 3001
2. **Theme not applying**: Ensure ThemeProvider is wrapping remote components
3. **Type errors**: Run `pnpm type-check` to verify all type definitions
4. **Hot reload not working**: Restart development servers

### Development Tips

- Use browser dev tools to inspect Module Federation loading
- Check network tab for remote entry point requests
- Use React dev tools to verify theme context propagation

## License

MIT License - see LICENSE file for details.
