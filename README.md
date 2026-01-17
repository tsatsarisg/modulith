# Modulith

Modern Express.js modulith following vertical slice architecture with CQRS pattern and clean separation of concerns.

## Architecture

- **Vertical Slices** - Feature-based modules (users, franchises) instead of horizontal layers
- **CQRS** - Commands and Queries separated for clarity and scalability
- **Component Facade** - Clean public API for each module
- **Type Safety** - Full TypeScript with Zod validation
- **RESTful API** - Standard HTTP conventions

## Stack

- **Runtime**: Node.js 22+ with TypeScript
- **Framework**: Express.js 4
- **Database**: MongoDB 8 with Mongoose
- **Validation**: Zod
- **Security**: Helmet
- **Package Manager**: pnpm 10+

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.28.0
- Docker & Docker Compose (for containerized setup)
- MongoDB 8 (or use Docker)

## Installation

```bash
# Install dependencies
pnpm install
```

## Development

```bash
# Local development with hot reload
pnpm dev

# Docker development (recommended)
make docker-dev

# Build TypeScript
pnpm build

# Run production build
pnpm start
```

## Testing

```bash
# Run tests
pnpm test

# Lint code
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format
```

## API Endpoints

### Health
- `GET /health` - Health check

### Franchises
- `GET /franchises` - List all franchises
- `GET /franchises/:id` - Get franchise by ID
- `POST /franchises` - Create new franchise
- `DELETE /franchises/:id` - Delete franchise

### Users
- `GET /users` - List all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `DELETE /users/:id` - Delete user

## Environment Variables

Required environment variables (see `deployment/envs/.env.dev`):

```
NODE_ENV=development
PORT_NUMBER=3000
DOCKER_MONGO_URL=mongodb://mongo:27017
DB_NAME=modulith
```

## Docker

```bash
# Start development environment
make docker-dev

# Start production environment
make docker-prod

# Stop all containers
make docker-down
```

Access the application at `http://localhost`

## License

ISC

