import React from "react";
import { cn } from "../../utils/clsx.utils";
import type { SelectOption } from "../../types";
import { ChevronDown } from "lucide-react";


// ─── INPUT ────────────────────────────────────────────────────────
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  inputSize?: "sm" | "md" | "lg";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, inputSize = "md", className, ...props }, ref) => {
    const sizes = { sm: "h-9 text-sm", md: "h-11 text-sm", lg: "h-13 text-base" };
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && <label className="text-sm font-600 text-ink-700">{label}</label>}
        <div className={cn(
          "flex items-center gap-2 w-full bg-white border rounded-xl px-3.5 transition-all duration-200",
          "focus-within:border-accent focus-within:ring-3 focus-within:ring-accent/10",
          error ? "border-danger ring-2 ring-danger/10" : "border-ink-200",
          sizes[inputSize], className
        )}>
          {leftIcon && <span className="text-ink-400 flex-shrink-0">{leftIcon}</span>}
          <input
            ref={ref}
            className="flex-1 bg-transparent outline-none text-ink-900 placeholder:text-ink-400 font-body min-w-0"
            {...props}
          />
          {rightIcon && <span className="text-ink-400 flex-shrink-0">{rightIcon}</span>}
        </div>
        {error && <p className="text-xs text-danger font-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

// ─── SELECT ───────────────────────────────────────────────────────
interface SelectProps {
  label?: string;
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label, options, value, onChange, placeholder = "Select…", className, size = "md", error,
}) => {
  const sizes = { sm: "h-9 text-sm", md: "h-11 text-sm", lg: "h-13 text-base" };
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-600 text-ink-700">{label}</label>}
      <div className={cn(
        "relative flex items-center bg-white border rounded-xl transition-all duration-200",
        "focus-within:border-accent focus-within:ring-3 focus-within:ring-accent/10",
        error ? "border-danger" : "border-ink-200",
        sizes[size], className
      )}>
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full h-full px-3.5 pr-9 bg-transparent outline-none text-ink-900 font-body appearance-none cursor-pointer"
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 w-4 h-4 text-ink-400 pointer-events-none" />
      </div>
      {error && <p className="text-xs text-danger font-500">{error}</p>}
    </div>
  );
};

// ─── RANGE SLIDER ─────────────────────────────────────────────────
interface RangeSliderProps {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  format?: (v: number) => string;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  label, min, max, step = 1, value, onChange, format = (v) => v.toLocaleString(),
}) => {
  const percent = (v: number) => ((v - min) / (max - min)) * 100;
  return (
    <div className="flex flex-col gap-3 w-full">
      {label && (
        <div className="flex justify-between">
          <span className="text-sm font-600 text-ink-700">{label}</span>
          <span className="text-sm text-ink-500">
            {format(value[0])} — {format(value[1])}
          </span>
        </div>
      )}
      <div className="relative h-5 flex items-center">
        <div className="absolute w-full h-1.5 bg-ink-200 rounded-full" />
        <div
          className="absolute h-1.5 bg-accent rounded-full"
          style={{ left: `${percent(value[0])}%`, right: `${100 - percent(value[1])}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value[0]}
          onChange={(e) => {
            const v = +e.target.value;
            if (v < value[1]) onChange([v, value[1]]);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: value[0] > max - (max - min) / 10 ? 5 : 3 }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value[1]}
          onChange={(e) => {
            const v = +e.target.value;
            if (v > value[0]) onChange([value[0], v]);
          }}
          className="absolute w-full h-full opacity-0 cursor-pointer"
          style={{ zIndex: 4 }}
        />
        <div
          className="absolute w-4.5 h-4.5 rounded-full bg-white border-2 border-accent shadow-blue cursor-grab"
          style={{ left: `calc(${percent(value[0])}% - 9px)` }}
        />
        <div
          className="absolute w-4.5 h-4.5 rounded-full bg-white border-2 border-accent shadow-blue cursor-grab"
          style={{ left: `calc(${percent(value[1])}% - 9px)` }}
        />
      </div>
    </div>
  );
};

// ─── CHECKBOX ─────────────────────────────────────────────────────
interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange, className }) => (
  <label className={cn("flex items-center gap-2.5 cursor-pointer group", className)}>
    <div className={cn(
      "w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200",
      checked ? "bg-accent border-accent" : "border-ink-300 group-hover:border-accent"
    )}>
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
    <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
    <span className="text-sm text-ink-700 group-hover:text-ink-900">{label}</span>
  </label>
);