# Modulith

Modern Express.js modulith following vertical-slice architecture with CQRS and clear separation of concerns.

## Architecture

- **Vertical Slices** — Feature-based modules (users, franchises) instead of horizontal layers
- **CQRS** — Commands and Queries separated for clarity and scalability
- **Component Facade** — Clean public API for each module
- **Type Safety** — TypeScript with Zod validation
- **RESTful API** — Standard HTTP conventions

## Stack

- **Runtime**: Node.js 22+
- **Framework**: Express.js 4
- **Database**: MongoDB 8 (via Docker or external)
- **Validation**: Zod
- **Security**: Helmet
- **Package Manager**: pnpm 10+

## Prerequisites

- Node.js >= 22.0.0
- pnpm >= 10.28.0
- Docker & Docker Compose (optional, recommended for development)

## Installation

Install dependencies with pnpm:

```bash
pnpm install
```

## Development

- Run local development server with hot reload:

```bash
pnpm dev
```

- You can also use the `Makefile` targets (recommended convenience wrappers):

```bash
# start local dev (calls `pnpm dev`)
make dev

# start Docker-based development environment
make docker-dev
```

- Equivalent direct npm scripts are available:

```bash
pnpm run docker:dev   # Docker Compose dev
pnpm run docker:prod  # Docker Compose prod
pnpm run docker:down  # Stop docker compose
```

- Build and run production:

```bash
pnpm build
pnpm start
```

## Testing & Quality

- Run unit and integration tests:

```bash
pnpm test
pnpm run test:unit
```

- Run end-to-end tests (E2E):

```bash
pnpm run test:e2e
```

- E2E tests use an in-memory MongoDB instance (`mongodb-memory-server`) and set required test environment variables in `test/e2e/setup.ts`. You do not need a running MongoDB instance to run the E2E suite locally.

- Lint, fix, and format:

```bash
pnpm lint
pnpm lint:fix
pnpm format
```

## API Endpoints (overview)

- `GET /health` — Health check

Franchises:
- `GET /franchises`
- `GET /franchises/:id`
- `POST /franchises`
- `DELETE /franchises/:id`

Users:
- `GET /users`
- `GET /users/:id`
- `POST /users`
- `DELETE /users/:id`

Refer to the route files under `src/web` for complete request/response shapes and validation schemas.

## Environment

Example environment files are in `deployment/envs/` (used by the Makefile and Docker scripts). The development and production envs include more settings than shown below; update credentials before deploying to production.

Example `deployment/envs/.env.dev` highlights:

```
NODE_ENV=development
PORT_NUMBER=8080
LOG_LEVEL=debug

# MongoDB (Docker) - includes credentials for the containerized DB
DOCKER_MONGO_URL=mongodb://admin:pass123@mongodb:27017
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=pass123
DB_NAME=franchises

# Collection names
FRANCHISE_COLLECTION_NAME=franchises
USER_COLLECTION_NAME=users

# JWT
JWT_SECRET=your-secret-key-at-least-32-characters-long
JWT_EXPIRES_IN=86400
```

The `PORT_NUMBER` in the repo env files is set to `8080`, so the service will listen on `http://localhost:8080` when run with those envs.

For production, `deployment/envs/.env.prod` keeps similar keys but you must replace placeholder credentials (e.g. `CHANGE_ME`) with secure values before deployment.

## Docker

Use the `Makefile` helpers or the `package.json` scripts to run via Docker Compose.

```bash
# via Makefile
make docker-dev
make docker-prod
make docker-down

# via pnpm scripts
pnpm run docker:dev
pnpm run docker:prod
pnpm run docker:down
```

The Docker Compose files are in `deployment/docker-compose.yml` and the env files are in `deployment/envs/`.

## Development Notes

- Entry point: `src/index.ts`
- App configuration and routes: `src/App.ts`, `src/routes.ts`
- Feature slices live under `src/components/` (e.g. `auth`, `user`, `franchise`)
