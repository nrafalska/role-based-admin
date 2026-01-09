import {
  LoginCredentials,
  LoginResponse,
  MeResponse,
  UsersResponse,
  CreateUserData,
  UpdateUserData,
  User,
  RolesResponse,
  DashboardResponse,
  ReportsResponse,
} from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Token management
let authToken: string | null = null;

export const setToken = (token: string | null) => {
  authToken = token;
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
};

export const getToken = (): string | null => {
  if (authToken) return authToken;
  if (typeof window !== 'undefined') {
    authToken = localStorage.getItem('auth_token');
  }
  return authToken;
};

export const clearToken = () => {
  authToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers || {}),
  };

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Auth API
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await apiRequest<LoginResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    setToken(response.token);
    return response;
  },

  me: async (): Promise<MeResponse> => {
    return apiRequest<MeResponse>('/me');
  },

  logout: async (): Promise<void> => {
    try {
      await apiRequest('/logout', { method: 'POST' });
    } finally {
      clearToken();
    }
  },
};

// Users API (admin only)
export const usersApi = {
  getAll: async (): Promise<UsersResponse> => {
    return apiRequest<UsersResponse>('/users');
  },

  getById: async (id: number): Promise<{ user: User }> => {
    return apiRequest<{ user: User }>(`/users/${id}`);
  },

  create: async (data: CreateUserData): Promise<{ message: string; user: User }> => {
    return apiRequest<{ message: string; user: User }>('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  update: async (id: number, data: UpdateUserData): Promise<{ message: string; user: User }> => {
    return apiRequest<{ message: string; user: User }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: number): Promise<{ message: string }> => {
    return apiRequest<{ message: string }>(`/users/${id}`, {
      method: 'DELETE',
    });
  },

  getRoles: async (): Promise<RolesResponse> => {
    return apiRequest<RolesResponse>('/roles');
  },
};

// Dashboard API
export const dashboardApi = {
  getStats: async (): Promise<DashboardResponse> => {
    return apiRequest<DashboardResponse>('/dashboard');
  },
};

// Reports API
export const reportsApi = {
  getAll: async (): Promise<ReportsResponse> => {
    return apiRequest<ReportsResponse>('/reports');
  },
};
