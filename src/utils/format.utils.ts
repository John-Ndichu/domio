import type { Property } from "../types";

export interface CurrencyConfig {
  code:   string;
  symbol: string;
  locale: string;
  decimalPlaces: number;
  symbolPosition: "before" | "after";
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  KES: { code: "KES", symbol: "KSh",  locale: "en-KE", decimalPlaces: 0, symbolPosition: "before" },
  USD: { code: "USD", symbol: "US$",  locale: "en-US", decimalPlaces: 0, symbolPosition: "before" },
  EUR: { code: "EUR", symbol: "€",    locale: "en-EU", decimalPlaces: 0, symbolPosition: "before" },
  GBP: { code: "GBP", symbol: "£",    locale: "en-GB", decimalPlaces: 0, symbolPosition: "before" },
  TZS: { code: "TZS", symbol: "TSh",  locale: "en-TZ", decimalPlaces: 0, symbolPosition: "before" },
  UGX: { code: "UGX", symbol: "USh",  locale: "en-UG", decimalPlaces: 0, symbolPosition: "before" },
};

export const EXCHANGE_RATES: Record<string, number> = {
  KES: 1,
  USD: 0.0077,
  EUR: 0.0071,
  GBP: 0.0061,
  TZS: 19.8,
  UGX: 28.4,
};

export function formatPrice(
  amount: number,
  currency = "KES",
  compact = true
): string {
  const cfg = CURRENCIES[currency] ?? CURRENCIES.KES;

  const converted =
    currency === "KES"
      ? amount
      : Math.round(amount * (EXCHANGE_RATES[currency] ?? 1));

  const symbol = cfg.symbol;

  if (compact) {
    if (converted >= 1_000_000_000)
      return `${symbol} ${(converted / 1_000_000_000).toFixed(1)}B`;
    if (converted >= 1_000_000)
      return `${symbol} ${(converted / 1_000_000).toFixed(1)}M`;
    if (converted >= 1_000)
      return `${symbol} ${(converted / 1_000).toFixed(0)}K`;
    return `${symbol} ${converted.toLocaleString(cfg.locale)}`;
  }

  return `${symbol} ${converted.toLocaleString(cfg.locale, {
    minimumFractionDigits: cfg.decimalPlaces,
    maximumFractionDigits: cfg.decimalPlaces,
  })}`;
}

export function formatPriceWithPeriod(
  amount: number,
  currency = "KES",
  period?: string
): string {
  const base = formatPrice(amount, currency);
  if (!period) return base;

  const periodSuffixes: Record<string, string> = {
    monthly: "/mo",
    yearly:  "/yr",
    weekly:  "/wk",
    daily:   "/day",
  };
  return `${base}${periodSuffixes[period] ?? ""}`;
}

export function formatPriceFull(amount: number, currency = "KES"): string {
  return formatPrice(amount, currency, false);
}

export function formatPricePerSqft(
  pricePerSqft: number,
  currency = "KES"
): string {
  const cfg = CURRENCIES[currency] ?? CURRENCIES.KES;
  return `${cfg.symbol} ${Math.round(pricePerSqft).toLocaleString(cfg.locale)} / sqft`;
}

export function formatPropertyPrice(property: Property): string {
  if (property.price.amount === 0) return "Price on Request";
  return formatPriceWithPeriod(
    property.price.amount,
    property.price.currency,
    property.price.period
  );
}

export function convertFromKES(kesAmount: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency] ?? 1;
  return Math.round(kesAmount * rate);
}

export function formatPriceRange(
  min: number,
  max: number,
  currency = "KES"
): string {
  if (!min && !max) return "Any Price";
  if (!min)         return `Up to ${formatPrice(max, currency)}`;
  if (!max)         return `From ${formatPrice(min, currency)}`;
  return `${formatPrice(min, currency)} – ${formatPrice(max, currency)}`;
}

export function formatArea(sqft: number): string {
  if (!sqft || sqft <= 0) return "—";

  if (sqft >= 43_560) {
    const acres = sqft / 43_560;
    const formatted = acres % 1 === 0 ? acres.toString() : acres.toFixed(2);
    return `${formatted} ${acres === 1 ? "acre" : "acres"}`;
  }

  return `${sqft.toLocaleString("en-KE")} sqft`;
}

export function formatAreaDual(sqft: number): string {
  if (!sqft || sqft <= 0) return "—";
  const sqm = Math.round(sqft * 0.0929);
  return `${sqft.toLocaleString("en-KE")} sqft (${sqm.toLocaleString("en-KE")} sqm)`;
}

export function sqftToSqm(sqft: number): number {
  return Math.round(sqft * 0.0929);
}

export function sqmToSqft(sqm: number): number {
  return Math.round(sqm / 0.0929);
}

export function acresToSqft(acres: number): number {
  return Math.round(acres * 43_560);
}

export function sqftToAcres(sqft: number): number {
  return parseFloat((sqft / 43_560).toFixed(4));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Unknown date";

  const now  = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1_000); // seconds

  if (diff < 60)        return "Just now";
  if (diff < 3_600)     return `${Math.floor(diff / 60)}m ago`;
  if (diff < 7_200)     return "1 hour ago";
  if (diff < 86_400)    return `${Math.floor(diff / 3_600)}h ago`;
  if (diff < 172_800)   return "Yesterday";
  if (diff < 604_800)   return `${Math.floor(diff / 86_400)} days ago`;
  if (diff < 2_592_000) return `${Math.floor(diff / 604_800)} weeks ago`;
  if (diff < 31_536_000) return `${Math.floor(diff / 2_592_000)} months ago`;

  return date.toLocaleDateString("en-KE", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
}

export function formatDateFull(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-KE", {
    day:   "numeric",
    month: "long",
    year:  "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-KE", {
    day:   "numeric",
    month: "short",
    year:  "numeric",
  });
}

export function formatMemberSince(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "—";
  return `Active since ${date.toLocaleDateString("en-KE", { month: "long", year: "numeric" })}`;
}

export function formatListingAge(dateStr: string): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "Recently listed";

  const diffDays = Math.floor((Date.now() - date.getTime()) / 86_400_000);

  if (diffDays === 0) return "Listed today";
  if (diffDays === 1) return "Listed yesterday";
  if (diffDays < 7)   return `Listed ${diffDays} days ago`;
  if (diffDays < 30)  return `Listed ${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `Listed ${Math.floor(diffDays / 30)} months ago`;
  return `Listed ${Math.floor(diffDays / 365)} years ago`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-KE");
}

export function formatCompactNumber(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000)     return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)         return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

export function formatViews(views: number): string {
  const count = formatCompactNumber(views);
  return `${count} ${views === 1 ? "view" : "views"}`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

export function formatYield(yieldPercent: number): string {
  return `${yieldPercent.toFixed(1)}% yield`;
}

export function truncate(str: string, maxLength: number): string {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "…";
}

export function truncateWords(str: string, wordCount: number): string {
  if (!str) return "";
  const words = str.trim().split(/\s+/);
  if (words.length <= wordCount) return str;
  return words.slice(0, wordCount).join(" ") + "…";
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/[^a-z0-9\s-]/g, "")    
    .replace(/\s+/g, "-")            
    .replace(/-+/g, "-")             
    .replace(/^-+|-+$/g, "");
}

export function capitalise(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function titleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => capitalise(txt));
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) {
    const local = digits.slice(3);
    return `+254 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  if (digits.startsWith("0") && digits.length === 10) {
    const local = digits.slice(1);
    return `+254 ${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
  }
  return phone;
}

export function maskPhone(phone: string): string {
  const last4 = phone.replace(/\s/g, "").slice(-4);
  return `+254 *** *** ${last4}`;
}

export function telLink(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  if (digits.startsWith("254")) return digits;
  return digits;
}

export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1_000)} m`;
  return `${km % 1 === 0 ? km : km.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hrs  = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hrs} ${hrs === 1 ? "hr" : "hrs"}`;
  return `${hrs} hr ${mins} min`;
}

export function formatPermit(permit?: string): string {
  if (!permit) return "—";
  return permit.length > 20 ? `${permit.slice(0, 17)}…` : permit;
}

export function ordinal(n: number): string {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`;
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k    = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i    = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export const formatPriceCompact = (amount: number, currency = "KES") =>
  formatPrice(amount, currency, true);

export const formatRentalPrice = (amount: number, currency = "KES", period = "monthly") =>
  formatPriceWithPeriod(amount, currency, period);