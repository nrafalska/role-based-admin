# Role-Based Admin System

A complete role-based admin system built with Laravel (backend) and Next.js (frontend). This system provides authentication, authorization, and role-based access control using Spatie's Laravel Permission package.

## Tech Stack

### Backend
- Laravel 11
- Laravel Sanctum (API Token Authentication)
- Spatie Laravel Permission
- SQLite (no setup required)

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- React Context for state management

## Quick Start

### Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
touch database/database.sqlite
php artisan migrate
php artisan db:seed
php artisan serve
```

API: http://localhost:8000

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

App: http://localhost:3000

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | password123 |
| Manager | manager@example.com | password123 |
| User | user@example.com | password123 |

## Roles and Permissions

| Role | Permissions |
|------|-------------|
| `admin` | view_dashboard, manage_users, view_reports |
| `manager` | view_dashboard, view_reports |
| `user` | view_dashboard |

## API Endpoints

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| POST | `/api/login` | User login | - |
| GET | `/api/me` | Get current user | auth |
| POST | `/api/logout` | User logout | auth |
| GET | `/api/dashboard` | Dashboard stats | view_dashboard |
| GET | `/api/reports` | List reports | view_reports |
| GET | `/api/users` | List all users | manage_users |
| POST | `/api/users` | Create user | manage_users |
| DELETE | `/api/users/{id}` | Delete user | manage_users |

## Project Structure

```
role-based-admin/
├── backend/                 # Laravel API
│   ├── app/Http/Controllers/Api/
│   │   ├── AuthController.php
│   │   ├── UserController.php
│   │   └── ReportController.php
│   ├── database/seeders/
│   │   └── RoleAndPermissionSeeder.php
│   └── routes/api.php
│
└── frontend/                # Next.js App
    └── src/
        ├── app/
        │   ├── login/
        │   ├── dashboard/
        │   ├── users/        # admin only
        │   ├── reports/      # admin + manager
        │   └── unauthorized/
        ├── components/
        ├── contexts/AuthContext.tsx
        └── lib/api.ts
```

## License

MIT
