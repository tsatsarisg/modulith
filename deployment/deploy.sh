#!/bin/bash

# Production Deployment Script
# This script automates the deployment process with safety checks

set -e

echo "🚀 Starting production deployment..."

# Check if .env.prod exists
if [ ! -f "deployment/envs/.env.prod" ]; then
    echo "❌ Error: deployment/envs/.env.prod file not found"
    exit 1
fi

# Pull latest changes (optional - comment out if not needed)
# git pull origin main

# Install/update dependencies
echo "📦 Installing dependencies with pnpm..."
pnpm install --frozen-lockfile

# Run tests
echo "🧪 Running tests..."
pnpm test

# Build and start containers
echo "🐳 Building and starting Docker containers..."
ENVIRONMENT=prod docker-compose -f deployment/docker-compose.yml up --build -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check health
echo "🏥 Checking service health..."
if curl -f http://localhost/health > /dev/null 2>&1; then
    echo "✅ Deployment successful! Services are healthy."
else
    echo "❌ Health check failed. Rolling back..."
    docker-compose -f deployment/docker-compose.yml down
    exit 1
fi

# Show running containers
echo "📊 Running containers:"
docker-compose -f deployment/docker-compose.yml ps

echo "🎉 Deployment complete!"
