type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassArray
  | ClassDictionary;

type ClassArray      = ClassValue[];
type ClassDictionary = Record<string, unknown>;

function resolve(value: ClassValue): string[] {
  if (!value && value !== 0) return [];

  if (typeof value === "string") {
    return value.trim() ? [value.trim()] : [];
  }

  if (typeof value === "number") {
    return [String(value)];
  }

  if (Array.isArray(value)) {
    return value.flatMap(resolve);
  }

  if (typeof value === "object") {
    return Object.entries(value as ClassDictionary)
      .filter(([, active]) => Boolean(active))
      .map(([className]) => className.trim())
      .filter(Boolean);
  }

  return [];
}


function getTailwindBase(cls: string): string {
  const modifierMatch = cls.match(/^([a-z]+:)+(.+)$/);
  if (modifierMatch) {
    const prefix    = cls.slice(0, cls.lastIndexOf(":") + 1);
    const baseClass = cls.slice(cls.lastIndexOf(":") + 1);
    return prefix + getTailwindBase(baseClass);
  }

  const parts = cls.split("-");
  if (parts.length === 1) return parts[0];

  const COMPOUND_PREFIXES = new Set([
    "text", "bg", "border", "ring", "shadow", "outline",
    "fill", "stroke", "from", "via", "to", "placeholder",
    "caret", "accent", "decoration",
  ]);

  if (COMPOUND_PREFIXES.has(parts[0])) {
    return `${parts[0]}`;
  }

  const SPACING_UTILS = new Set([
    "p","m","px","py","pl","pr","pt","pb","mx","my","ml","mr","mt","mb",
    "gap","gap-x","gap-y","space-x","space-y","inset","inset-x","inset-y",
    "top","bottom","left","right","w","h","min-w","min-h","max-w","max-h",
    "basis","flex-grow","flex-shrink","order","z","opacity","scale",
    "translate-x","translate-y","rotate","skew-x","skew-y",
    "tracking","leading","rounded","blur","brightness","contrast",
    "saturate","hue-rotate","grayscale","duration","delay","ease",
  ]);

  if (SPACING_UTILS.has(parts[0])) return parts[0];

  return parts.slice(0, 2).join("-");
}

function mergeTailwindClasses(classes: string[]): string[] {
  const groupMap = new Map<string, string>();
  const standalone: string[] = [];

  for (const cls of classes) {
    if (!cls) continue;

    const isTailwindLike = /^-?[a-z]/.test(cls);
    if (!isTailwindLike) {
      standalone.push(cls);
      continue;
    }

    const base = getTailwindBase(cls);
    groupMap.set(base, cls);
  }

  return [...groupMap.values(), ...standalone];
}

export function cn(...inputs: ClassValue[]): string {
  const allClasses = inputs.flatMap(resolve);
  const tokens = allClasses.flatMap((c) => c.split(/\s+/).filter(Boolean));
  return mergeTailwindClasses(tokens).join(" ");
}

export function cx(...inputs: ClassValue[]): string {
  const tokens = inputs
    .flatMap(resolve)
    .flatMap((c) => c.split(/\s+/))
    .filter(Boolean);

  const seen  = new Set<string>();
  const result: string[] = [];
  for (const t of tokens) {
    seen.delete(t);
    result.push(t);
    seen.add(t);
  }
  const deduped = tokens.filter((t, i) => tokens.lastIndexOf(t) === i);
  return deduped.join(" ");
}

export const tw = cn;

export function clsx(...inputs: ClassValue[]): string {
  return cx(...inputs);
}


type VariantConfig<V extends Record<string, Record<string, ClassValue>>> = {
  base?: ClassValue;
  variants: V;
  defaultVariants?: { [K in keyof V]?: keyof V[K] };
  compoundVariants?: Array<
    { [K in keyof V]?: keyof V[K] } & { class: ClassValue }
  >;
};

type VariantProps<V extends Record<string, Record<string, ClassValue>>> = {
  [K in keyof V]?: keyof V[K];
};

 
export function cva<V extends Record<string, Record<string, ClassValue>>>(
  config: VariantConfig<V>
): (props?: VariantProps<V> & { class?: ClassValue }) => string {
  return (props = {}) => {
    const { class: extraClass, ...variantProps } = props;
    const merged = { ...config.defaultVariants, ...variantProps };

    const classes: ClassValue[] = [config.base];

    for (const [key, value] of Object.entries(merged)) {
      const variantGroup = config.variants[key];
      if (variantGroup && value !== undefined) {
        classes.push(variantGroup[value as string]);
      }
    }

    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...compoundConditions } = compound;
        const matches = Object.entries(compoundConditions).every(
          ([key, val]) => merged[key as keyof typeof merged] === val
        );
        if (matches) classes.push(compoundClass);
      }
    }

    classes.push(extraClass);

    return cn(...classes);
  };
}

export const domioVariants = {
  button: {
    primary:   "bg-accent hover:bg-accent-dark text-white shadow-blue",
    secondary: "bg-primary-800 hover:bg-primary-900 text-white",
    outline:   "border-2 border-accent text-accent hover:bg-accent hover:text-white",
    ghost:     "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
    white:     "bg-white text-ink-900 hover:bg-ink-50 shadow-card",
    danger:    "bg-danger hover:bg-danger/90 text-white",
    success:   "bg-success hover:bg-success/90 text-white",
  },

  buttonSize: {
    xs: "h-7  px-3   text-xs  rounded-lg  gap-1.5",
    sm: "h-9  px-4   text-sm  rounded-xl  gap-2",
    md: "h-11 px-5   text-sm  rounded-xl  gap-2",
    lg: "h-12 px-6   text-base rounded-xl gap-2.5",
    xl: "h-14 px-8   text-base rounded-2xl gap-3",
  },

  badge: {
    default:  "bg-ink-100    text-ink-600",
    primary:  "bg-primary-100 text-primary-700 ring-1 ring-primary-200",
    success:  "bg-emerald-50  text-emerald-700 ring-1 ring-emerald-200",
    warning:  "bg-amber-50    text-amber-700   ring-1 ring-amber-200",
    danger:   "bg-red-50      text-red-600     ring-1 ring-red-200",
    info:     "bg-sky-50      text-sky-700     ring-1 ring-sky-200",
    premium:  "bg-gradient-to-r from-amber-400 to-orange-400 text-white",
    featured: "bg-gradient-to-r from-primary-500 to-accent text-white",
    new:      "bg-emerald-500 text-white",
    verified: "bg-primary-500 text-white",
    rent:     "bg-accent      text-white",
    sale:     "bg-primary-700 text-white",
    muted:    "bg-ink-100     text-ink-600",
  },

  input: {
    sm: "h-9  text-sm  rounded-xl px-3",
    md: "h-11 text-sm  rounded-xl px-3.5",
    lg: "h-13 text-base rounded-xl px-4",
  },

  card: {
    default: "bg-white rounded-2xl shadow-card",
    hover:   "bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300",
    glass:   "glass rounded-2xl",
    dark:    "glass-dark rounded-2xl text-white",
    flat:    "bg-ink-50 rounded-2xl border border-ink-200",
  },

  animate: {
    fadeUp:    "animate-fade-up",
    fadeIn:    "animate-fade-in",
    shimmer:   "animate-shimmer",
    float:     "animate-float",
    pulse:     "animate-pulse",
    bounce:    "animate-bounce",
  },
} as const;

export function focusRing(
  color: "accent" | "red" | "green" | "white" = "accent"
): string {
  const colors = {
    accent: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    red:    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
    green:  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success focus-visible:ring-offset-2",
    white:  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white  focus-visible:ring-offset-2",
  };
  return colors[color];
}

export function gridCols(maxCols: 2 | 3 | 4 | 5 | 6): string {
  const map: Record<number, string> = {
    2: "grid grid-cols-1 sm:grid-cols-2",
    3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    6: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
  };
  return map[maxCols] ?? map[4];
}

export function interactive(base: string, hoverText?: string, hoverBg?: string): string {
  return cn(
    base,
    hoverText && `hover:${hoverText}`,
    hoverBg   && `hover:${hoverBg}`,
    "cursor-pointer transition-colors duration-200"
  );
}

export const srOnly = "sr-only" as const;

export const notSrOnly = "not-sr-only" as const;


export type { ClassValue, ClassArray, ClassDictionary, VariantProps };