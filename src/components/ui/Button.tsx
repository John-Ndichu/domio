/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/clsx.utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const VARIANTS = {
  primary:   "bg-accent hover:bg-accent-dark text-white shadow-blue hover:shadow-lg",
  secondary: "bg-primary-800 hover:bg-primary-900 text-white",
  outline:   "border-2 border-accent text-accent hover:bg-accent hover:text-white",
  ghost:     "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  white:     "bg-white text-ink-900 hover:bg-ink-50 shadow-card",
  danger:    "bg-danger hover:bg-danger/90 text-white",
};

const SIZES = {
  xs: "h-7  px-3   text-xs  rounded-lg  gap-1.5",
  sm: "h-9  px-4   text-sm  rounded-xl  gap-2",
  md: "h-11 px-5   text-sm  rounded-xl  gap-2",
  lg: "h-12 px-6   text-base rounded-xl gap-2.5",
  xl: "h-14 px-8   text-base rounded-2xl gap-3",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, leftIcon, rightIcon, fullWidth, className, children, disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref as any}
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-body font-600 transition-all duration-200 cursor-pointer select-none",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          VARIANTS[variant],
          SIZES[size],
          fullWidth && "w-full",
          className
        )}
        {...(props as any)}
      >
        {loading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : leftIcon}
        {children}
        {!loading && rightIcon}
      </motion.button>
    );
  }
);
Button.displayName = "Button";