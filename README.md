# Role-Based Admin System

A complete role-based admin system built with Laravel (backend) and Next.js (frontend). This system provides authentication, authorization, and role-based access control using Spatie's Laravel Permission package.

## Tech Stack

### Backend
- Laravel 11
- Laravel Sanctum (API Token Authentication)
- Spatie Laravel Permission
- MySQL

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Context for state management

## Quick Start with Docker

The fastest way to get started is using Docker:

```bash
# Clone and enter directory
cd role-based-admin

# Run setup (builds, migrates, seeds)
make setup
```

Or manually:

```bash
# Copy environment file
cp backend/.env.docker backend/.env

# Build and start containers
docker-compose up -d --build

# Wait for MySQL to be ready, then run migrations
docker-compose exec backend php artisan key:generate
docker-compose exec backend php artisan migrate --seed
```

Access the application:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api

### Docker Commands (Makefile)

| Command | Description |
|---------|-------------|
| `make setup` | Initial setup (build + migrate + seed) |
| `make up` | Start containers |
| `make down` | Stop containers |
| `make restart` | Restart containers |
| `make logs` | View logs |
| `make shell-backend` | Shell into backend |
| `make shell-frontend` | Shell into frontend |
| `make migrate` | Run migrations |
| `make seed` | Run seeders |
| `make fresh` | Fresh migration with seeding |

## Project Structure

```
role-based-admin/
├── backend/               # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/
│   │   │           ├── AuthController.php
│   │   │           ├── UserController.php
│   │   │           └── ReportController.php
│   │   └── Models/
│   │       └── User.php
│   ├── database/
│   │   └── seeders/
│   │       └── RoleAndPermissionSeeder.php
│   └── routes/
│       └── api.php
├── frontend/              # Next.js App
│   └── src/
│       ├── app/
│       │   ├── dashboard/
│       │   ├── login/
│       │   ├── reports/
│       │   ├── unauthorized/
│       │   └── users/
│       ├── components/
│       │   ├── Navigation.tsx
│       │   └── ProtectedRoute.tsx
│       ├── contexts/
│       │   └── AuthContext.tsx
│       ├── lib/
│       │   └── api.ts
│       └── types/
│           └── index.ts
├── docker/                # Docker configuration
│   ├── nginx/
│   │   └── default.conf
│   └── start.sh
├── docker-compose.yml
└── Makefile
```

## Roles and Permissions

### Roles
| Role | Description |
|------|-------------|
| `admin` | Full system access, can manage users |
| `manager` | Can view dashboard and reports |
| `user` | Basic access, can view dashboard only |

### Permissions
| Permission | Description | Roles |
|------------|-------------|-------|
| `view_dashboard` | Access to dashboard | admin, manager, user |
| `manage_users` | Create, update, delete users | admin |
| `view_reports` | Access to reports section | admin, manager |

## API Endpoints

| Method | Endpoint | Description | Auth | Permission |
|--------|----------|-------------|------|------------|
| POST | `/api/login` | User login | No | - |
| GET | `/api/me` | Get current user | Yes | - |
| POST | `/api/logout` | User logout | Yes | - |
| GET | `/api/dashboard` | Dashboard stats | Yes | view_dashboard |
| GET | `/api/reports` | List reports | Yes | view_reports |
| GET | `/api/users` | List all users | Yes | manage_users |
| POST | `/api/users` | Create user | Yes | manage_users |
| GET | `/api/users/{id}` | Get user | Yes | manage_users |
| PUT | `/api/users/{id}` | Update user | Yes | manage_users |
| DELETE | `/api/users/{id}` | Delete user | Yes | manage_users |
| GET | `/api/roles` | List roles | Yes | manage_users |

## Manual Setup (Without Docker)

### Prerequisites
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   composer install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure your database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=role_based_admin
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Create the database:
   ```bash
   mysql -u root -e "CREATE DATABASE role_based_admin"
   ```

7. Run migrations:
   ```bash
   php artisan migrate
   ```

8. Seed the database:
   ```bash
   php artisan db:seed
   ```

9. Start the development server:
   ```bash
   php artisan serve
   ```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will be available at `http://localhost:3000`

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Manager | manager@example.com | password123 |
| User | user@example.com | password123 |

## Features

### Authentication
- JWT-like token authentication using Laravel Sanctum
- Secure token storage in localStorage
- Automatic token refresh on page load
- Protected routes with automatic redirects

### Authorization
- Role-based access control
- Permission-based route protection
- Dynamic navigation based on user permissions
- Unauthorized page for access denied

### User Management (Admin Only)
- View all users
- Create new users with role assignment
- Delete users
- Role-based user filtering

### Dashboard
- System statistics
- User counts by role
- Current user information display

### Reports (Admin & Manager)
- View system reports
- User statistics (total, this month, this week)
- Report categorization

## Security Features

1. **Token-Based Authentication**: Using Laravel Sanctum for secure API access
2. **CORS Configuration**: Properly configured for frontend domain
3. **Permission Middleware**: Server-side permission checking
4. **Client-Side Protection**: Route guards and permission checks
5. **Password Hashing**: Secure password storage using bcrypt

## Development

### Running Tests

Backend:
```bash
cd backend
php artisan test
```

Frontend:
```bash
cd frontend
npm run lint
```

### Building for Production

Backend:
```bash
cd backend
php artisan config:cache
php artisan route:cache
```

Frontend:
```bash
cd frontend
npm run build
```

## License

MIT License
