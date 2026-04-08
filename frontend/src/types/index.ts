export interface Activity {
  id: string;
  title: string;
  description?: string;
  location: string;
  capacity: number;
  price: number;
  duration: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  resources?: Resource[];
  bookings?: Booking[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'ROOM' | 'EQUIPMENT' | 'COURT';
  isQuantifiable: boolean;
  totalCapacity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  pricingRules?: PricingRule[];
}

export interface PricingRule {
  id: string;
  resourceId: string;
  startTime: string;
  endTime: string;
  hourlyRate: number;
  label?: string;
}

export interface CreateBooking {
  resourceId: string;
  startTime: string;
  endTime: string;
  quantity?: number;
  notes?: string;
  isOpenForPartners?: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  resourceId: string;
  staffId?: string;
  startTime: string;
  endTime: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PAID';
  totalPrice: number;
  quantity: number;
  notes?: string;
  isOpenForPartners: boolean;
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
  user?: { id: string; email: string; name?: string };
  resource?: Resource;
  staff?: { id: string; name: string; specialty?: string };
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  specialty?: string;
  allowedResourceTypes: ('COURT' | 'ROOM' | 'EQUIPMENT')[];
  availability?: Record<string, string[]>;
  phone?: string;
  isActive: boolean;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'BOOKING_APPROVED' | 'BOOKING_REJECTED' | 'BOOKING_CONFIRMED' | 'BOOKING_CANCELLED';
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  stats: {
    pending: number;
    approved: number;
    rejected: number;
    paid: number;
    upcoming: number;
    total: number;
  };
  upcomingBookings: Booking[];
}
