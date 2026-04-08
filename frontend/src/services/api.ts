import axios from 'axios';
import {
  Resource, Booking, User, Notification, Staff,
  AuthResponse, LoginCredentials, RegisterData, CreateBooking, DashboardStats,
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3010';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AuthResponse> =>
    api.post('/auth/login', credentials).then(r => r.data),
  register: (data: RegisterData): Promise<AuthResponse> =>
    api.post('/auth/register', data).then(r => r.data),
  getProfile: (): Promise<User> =>
    api.get('/auth/profile').then(r => r.data),
  updateProfile: (data: { name?: string; password?: string }): Promise<User> =>
    api.put('/auth/profile', data).then(r => r.data),
};

// ── Resources ─────────────────────────────────────────────────────────────────
export const resourcesAPI = {
  getAll: (type?: string): Promise<Resource[]> =>
    api.get('/resources', { params: type ? { type } : {} }).then(r => r.data),
  getById: (id: string): Promise<Resource> =>
    api.get(`/resources/${id}`).then(r => r.data),
  create: (data: Partial<Resource>): Promise<Resource> =>
    api.post('/resources', data).then(r => r.data),
  update: (id: string, data: Partial<Resource>): Promise<Resource> =>
    api.put(`/resources/${id}`, data).then(r => r.data),
  delete: (id: string): Promise<Resource> =>
    api.delete(`/resources/${id}`).then(r => r.data),
};

// ── Bookings ──────────────────────────────────────────────────────────────────
export const bookingsAPI = {
  findAll: (page = 1, limit = 50, userId?: string, status?: string): Promise<{ items: Booking[]; total: number; totalPages: number }> =>
    api.get('/admin/bookings', { params: { page, limit, userId, status } }).then(r => r.data),

  getMyBookings: (): Promise<Booking[]> =>
    api.get('/bookings').then(r => r.data),

  getById: (id: string): Promise<Booking> =>
    api.get(`/bookings/${id}`).then(r => r.data),

  create: (data: CreateBooking): Promise<Booking> =>
    api.post('/bookings', data).then(r => r.data),

  update: (id: string, data: Partial<Booking>): Promise<Booking> =>
    api.put(`/bookings/${id}`, data).then(r => r.data),

  delete: (id: string): Promise<void> =>
    api.delete(`/bookings/${id}`).then(r => r.data),

  getLobby: (): Promise<Booking[]> =>
    api.get('/bookings/lobby').then(r => r.data),

  // Admin actions
  approveBooking: (id: string, staffId?: string): Promise<Booking> =>
    api.post(`/admin/bookings/${id}/approve`, { staffId }).then(r => r.data),

  rejectBooking: (id: string): Promise<Booking> =>
    api.post(`/admin/bookings/${id}/reject`).then(r => r.data),

  markAsPaid: (id: string): Promise<Booking> =>
    api.post(`/admin/bookings/${id}/paid`).then(r => r.data),

  getDashboardStats: (): Promise<DashboardStats> =>
    api.get('/admin/bookings/dashboard').then(r => r.data),
};

// ── Staff ─────────────────────────────────────────────────────────────────────
export const staffAPI = {
  getAll: (): Promise<Staff[]> =>
    api.get('/staff').then(r => r.data.items ?? r.data),
  create: (data: Partial<Staff>): Promise<Staff> =>
    api.post('/staff', data).then(r => r.data),
  update: (id: string, data: Partial<Staff>): Promise<Staff> =>
    api.patch(`/staff/${id}`, data).then(r => r.data),
  remove: (id: string): Promise<void> =>
    api.delete(`/staff/${id}`).then(r => r.data),
};

// ── Users (admin) ─────────────────────────────────────────────────────────────
export const usersAPI = {
  getAll: (): Promise<User[]> =>
    api.get('/users').then(r => r.data),
  create: (data: { email: string; password: string; name?: string; role?: string }): Promise<User> =>
    api.post('/auth/register', data).then(r => r.data.user),
};

// ── Admin payments ────────────────────────────────────────────────────────────
export const adminPaymentsAPI = {
  getAll: (page = 1, limit = 50): Promise<any> =>
    api.get('/admin/payments', { params: { page, limit } }).then(r => r.data),
};

// ── Pricing ───────────────────────────────────────────────────────────────────
export const pricingAPI = {
  getAll: (resourceId?: string): Promise<any[]> =>
    api.get('/pricing', { params: resourceId ? { resourceId } : {} }).then(r => r.data),
  create: (data: any): Promise<any> =>
    api.post('/pricing', data).then(r => r.data),
  update: (id: string, data: any): Promise<any> =>
    api.put(`/pricing/${id}`, data).then(r => r.data),
  remove: (id: string): Promise<void> =>
    api.delete(`/pricing/${id}`).then(r => r.data),
};
// ── Wallet ────────────────────────────────────────────────────────────────────
export const walletAPI = {
  get: (): Promise<any> =>
    api.get('/wallet').then(r => r.data),
  getTransactions: (page = 1): Promise<any> =>
    api.get('/wallet/transactions', { params: { page } }).then(r => r.data),
  topUp: (amount: number, description?: string): Promise<any> =>
    api.post('/wallet/topup', { amount, description }).then(r => r.data),
  pay: (bookingId: string): Promise<any> =>
    api.post('/wallet/pay', { bookingId }).then(r => r.data),
};

// ── Reports ───────────────────────────────────────────────────────────────────
export const reportsAPI = {
  monthly: (year?: number, month?: number): Promise<any> =>
    api.get('/reports/monthly', { params: { year, month } }).then(r => r.data),
  yearly: (year?: number): Promise<any> =>
    api.get('/reports/yearly', { params: { year } }).then(r => r.data),
};
export const notificationsAPI = {
  getAll: (): Promise<Notification[]> =>
    api.get('/notifications').then(r => r.data),
  getUnread: (): Promise<Notification[]> =>
    api.get('/notifications/unread').then(r => r.data),
  getUnreadCount: (): Promise<number> =>
    api.get('/notifications/unread/count').then(r => r.data),
  markAsRead: (id: string): Promise<Notification> =>
    api.put(`/notifications/${id}/read`).then(r => r.data),
  markAllAsRead: (): Promise<void> =>
    api.put('/notifications/read-all').then(r => r.data),
};

export default api;

// ── Payments ──────────────────────────────────────────────────────────────────
export const paymentsAPI = {
  idramInitTopUp: (amount: number): Promise<{ paymentUrl: string; fields: Record<string, string> }> =>
    api.post('/payments/idram/initiate/topup', { amount }).then(r => r.data),
  idramInitBooking: (bookingId: string): Promise<{ paymentUrl: string; fields: Record<string, string> }> =>
    api.post('/payments/idram/initiate/booking', { bookingId }).then(r => r.data),
};
