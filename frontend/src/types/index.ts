// User and authentication types
export interface User {
  id: number;
  name: string;
  email: string;
  roles: string[];
  permissions: string[];
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export interface MeResponse {
  user: User;
}

// API response types
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// User management types
export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
}

export interface UsersResponse {
  users: User[];
}

export interface RolesResponse {
  roles: string[];
}

// Dashboard types
export interface DashboardStats {
  total_users: number;
  users_by_role: Record<string, number>;
}

export interface DashboardResponse {
  stats: DashboardStats;
}

// Report types
export interface Report {
  id: number;
  title: string;
  description: string;
  type: string;
  created_at: string;
}

export interface UserStats {
  total: number;
  this_month: number;
  this_week: number;
}

export interface ReportsResponse {
  reports: Report[];
  user_stats: UserStats;
}

// Permission constants
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_USERS: 'manage_users',
  VIEW_REPORTS: 'view_reports',
} as const;

export const ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;
