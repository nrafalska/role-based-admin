.PHONY: help build up down restart logs shell-backend shell-frontend migrate seed fresh

# Default target
help:
	@echo "Role-Based Admin System - Docker Commands"
	@echo ""
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@echo "  build          Build all Docker images"
	@echo "  up             Start all containers"
	@echo "  down           Stop all containers"
	@echo "  restart        Restart all containers"
	@echo "  logs           View container logs"
	@echo "  shell-backend  Open shell in backend container"
	@echo "  shell-frontend Open shell in frontend container"
	@echo "  migrate        Run database migrations"
	@echo "  seed           Run database seeders"
	@echo "  fresh          Fresh migration with seeding"
	@echo "  setup          Initial setup (build + migrate + seed)"

# Build Docker images
build:
	docker-compose build

# Start containers
up:
	docker-compose up -d

# Stop containers
down:
	docker-compose down

# Restart containers
restart:
	docker-compose restart

# View logs
logs:
	docker-compose logs -f

# Shell into backend
shell-backend:
	docker-compose exec backend bash

# Shell into frontend
shell-frontend:
	docker-compose exec frontend sh

# Run migrations
migrate:
	docker-compose exec backend php artisan migrate

# Run seeders
seed:
	docker-compose exec backend php artisan db:seed

# Fresh migration with seeding
fresh:
	docker-compose exec backend php artisan migrate:fresh --seed

# Initial setup
setup:
	@echo "🚀 Setting up Role-Based Admin System..."
	@if [ ! -f ./backend/.env ]; then \
		echo "📋 Creating .env from .env.docker..."; \
		cp ./backend/.env.docker ./backend/.env; \
	fi
	docker-compose build
	docker-compose up -d
	@echo "⏳ Waiting for MySQL..."
	@sleep 15
	docker-compose exec backend php artisan key:generate --force
	docker-compose exec backend php artisan migrate --force
	docker-compose exec backend php artisan db:seed --force
	@echo ""
	@echo "✅ Setup complete!"
	@echo ""
	@echo "📍 Access:"
	@echo "   Frontend: http://localhost:3000"
	@echo "   API: http://localhost:8000/api"
	@echo ""
	@echo "👤 Credentials:"
	@echo "   admin@example.com / password123"
	@echo "   manager@example.com / password123"
	@echo "   user@example.com / password123"
