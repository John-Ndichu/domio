import React from "react";
import { cn } from "../../utils/clsx.utils";

export interface BadgeProps {
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "premium" | "featured" | "new" | "verified" | "rent" | "sale" | "muted";
  size?: "sm" | "md";
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

const VARIANTS = {
  primary:  "bg-primary-100 text-primary-700 ring-1 ring-primary-200",
  success:  "bg-emerald-50  text-emerald-700 ring-1 ring-emerald-200",
  warning:  "bg-amber-50    text-amber-700   ring-1 ring-amber-200",
  danger:   "bg-red-50      text-red-600     ring-1 ring-red-200",
  info:     "bg-sky-50      text-sky-700     ring-1 ring-sky-200",
  premium:  "bg-gradient-to-r from-amber-400 to-orange-400 text-white shadow-sm",
  featured: "bg-gradient-to-r from-primary-500 to-accent text-white shadow-sm",
  new:      "bg-emerald-500 text-white",
  verified: "bg-primary-500 text-white",
  rent:     "bg-accent      text-white",
  sale:     "bg-primary-700 text-white",
  muted:    "bg-ink-100     text-ink-600",
};

const SIZES = {
  sm: "text-2xs px-2 py-0.5 rounded-md gap-1",
  md: "text-xs  px-2.5 py-1 rounded-lg gap-1.5",
};

export const Badge: React.FC<BadgeProps> = ({ variant = "primary", size = "md", icon, className, children }) => (
  <span className={cn("inline-flex items-center font-body font-600 leading-none", VARIANTS[variant], SIZES[size], className)}>
    {icon && <span className="text-current">{icon}</span>}
    {children}
  </span>
);