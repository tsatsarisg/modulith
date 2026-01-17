.PHONY: help install dev build test clean docker-dev docker-prod docker-down docker-logs

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies with pnpm
	pnpm install --frozen-lockfile

dev: ## Run local development server
	pnpm run dev

build: ## Build the application
	pnpm run build

test: ## Run tests
	pnpm test

clean: ## Clean build artifacts
	pnpm run clean

docker-dev: ## Start development environment with Docker
	ENVIRONMENT=dev docker-compose -f deployment/docker-compose.yml --env-file deployment/envs/.env.dev up --build

docker-prod: ## Start production environment with Docker
	ENVIRONMENT=prod docker-compose -f deployment/docker-compose.yml --env-file deployment/envs/.env.prod up --build

docker-down: ## Stop and remove Docker containers
	docker-compose -f deployment/docker-compose.yml down

docker-logs: ## Show Docker container logs
	docker-compose -f deployment/docker-compose.yml logs -f

docker-clean: ## Remove all containers, volumes, and images
	docker-compose -f deployment/docker-compose.yml down -v --rmi all

deploy: ## Deploy to production (automated)
	./deployment/deploy.sh

health: ## Check service health
	@curl -f http://localhost/health && echo "✅ Services are healthy" || echo "❌ Health check failed"
