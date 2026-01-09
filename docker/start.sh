#!/bin/bash
set -e

echo "🚀 Starting Role-Based Admin System..."

# Copy docker env if .env doesn't exist
if [ ! -f ./backend/.env ]; then
    echo "📋 Creating .env from .env.docker..."
    cp ./backend/.env.docker ./backend/.env
fi

# Start containers
echo "🐳 Starting Docker containers..."
docker-compose up -d

# Wait for MySQL to be ready
echo "⏳ Waiting for MySQL to be ready..."
sleep 10

# Run migrations and seeders
echo "📦 Running migrations..."
docker-compose exec backend php artisan key:generate --force
docker-compose exec backend php artisan migrate --force

echo "🌱 Running seeders..."
docker-compose exec backend php artisan db:seed --force

echo "✅ Setup complete!"
echo ""
echo "📍 Access the application:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000/api"
echo ""
echo "👤 Demo credentials:"
echo "   Admin: admin@example.com / password123"
echo "   Manager: manager@example.com / password123"
echo "   User: user@example.com / password123"
