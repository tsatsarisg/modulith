# Modulith

Express.js backend with MongoDB following Modular Monolith and Hexagonal Architecture principles.

## Stack

- Node.js 22 + TypeScript
- Express.js
- MongoDB 8
- Nginx
- Docker

## Installation

```bash
# Install dependencies
pnpm install

```

## Usage

### Development

```bash
# Local development
pnpm dev

# Docker (recommended)
make docker-dev
```

Access at `http://localhost`

### Production

```bash
make docker-prod
```

### Stop

```bash
make docker-down
```

## API Endpoints

- `GET /health` - Health check
- `GET /api/franchises` - Get all franchises
- `POST /api/franchises` - Create franchise
- `DELETE /api/franchises/:id` - Delete franchise
- `GET /api/users` - Get all users
- `POST /api/users` - Create user
- `DELETE /api/users/:id` - Delete user

## Testing

```bash
pnpm test
```

## License

ISC

