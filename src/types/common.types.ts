export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "success" | "white";
export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeVariant = "default" | "primary" | "success" | "warning" | "danger" | "info" | "premium" | "featured" | "new" | "verified" | "rent" | "sale";
export type InputSize = "sm" | "md" | "lg";
export type ToastType = "success" | "error" | "warning" | "info";
export type ViewMode = "grid" | "list" | "map";
export type ThemeMode = "light" | "dark";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  disabled?: boolean;
  description?: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: string;
  children?: NavItem[];
  badge?: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  image: string;
  country: string;
  propertyCount: number;
  description?: string;
  lat: number;
  lng: number;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  role: string;
  company?: string;
  comment: string;
  rating: number;
  date: string;
  propertyType?: string;
}

export interface PlatformStat {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export type UserRole = "buyer" | "seller" | "agent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  photo?: string;
  role: UserRole;
  verified: boolean;
  savedProperties: string[];
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}