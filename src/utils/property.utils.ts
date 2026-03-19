import type { CompletionStatus, FurnishingStatus, ListingPurpose, Property, PropertyAmenity, PropertyFilters, PropertySortOption, PropertyStatus, PropertyType } from "../types";
import { formatArea, formatPriceWithPeriod } from "./format.utils";

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  apartment:  "Apartment",
  villa:      "Villa",
  townhouse:  "Townhouse",
  penthouse:  "Penthouse",
  studio:     "Studio",
  duplex:     "Duplex",
  land:       "Land / Plot",
  commercial: "Commercial",
  office:     "Office Space",
  warehouse:  "Warehouse",
};

export const PROPERTY_TYPE_PLURAL: Record<PropertyType, string> = {
  apartment:  "Apartments",
  villa:      "Villas",
  townhouse:  "Townhouses",
  penthouse:  "Penthouses",
  studio:     "Studios",
  duplex:     "Duplexes",
  land:       "Land & Plots",
  commercial: "Commercial Spaces",
  office:     "Office Spaces",
  warehouse:  "Warehouses",
};

export const PROPERTY_TYPE_ICONS: Record<PropertyType, string> = {
  apartment:  "🏢",
  villa:      "🏡",
  townhouse:  "🏘️",
  penthouse:  "🌆",
  studio:     "🛋️",
  duplex:     "🏠",
  land:       "🌍",
  commercial: "🏪",
  office:     "💼",
  warehouse:  "🏭",
};

export const PURPOSE_LABELS: Record<ListingPurpose, string> = {
  sale:      "For Sale",
  rent:      "For Rent",
  shortterm: "Short Term",
};

export const PURPOSE_SHORT_LABELS: Record<ListingPurpose, string> = {
  sale:      "Sale",
  rent:      "Rent",
  shortterm: "Short Term",
};

export const FURNISHING_LABELS: Record<FurnishingStatus, string> = {
  furnished:      "Furnished",
  unfurnished:    "Unfurnished",
  semi_furnished: "Semi-Furnished",
};

export const COMPLETION_LABELS: Record<CompletionStatus, string> = {
  ready:    "Ready to Move In",
  off_plan: "Off-Plan",
};

export const STATUS_LABELS: Record<PropertyStatus, string> = {
  available:   "Available",
  sold:        "Sold",
  rented:      "Rented",
  under_offer: "Under Offer",
  off_plan:    "Off-Plan",
};

export function getPropertyTypeLabel(type: PropertyType): string {
  return PROPERTY_TYPE_LABELS[type] ?? type;
}

export function getPropertyTypePlural(type: PropertyType): string {
  return PROPERTY_TYPE_PLURAL[type] ?? `${PROPERTY_TYPE_LABELS[type]}s`;
}

export function getPropertyTypeIcon(type: PropertyType): string {
  return PROPERTY_TYPE_ICONS[type] ?? "🏠";
}

export function getPurposeLabel(purpose: ListingPurpose): string {
  return PURPOSE_LABELS[purpose] ?? purpose;
}

export function getPurposeShortLabel(purpose: ListingPurpose): string {
  return PURPOSE_SHORT_LABELS[purpose] ?? purpose;
}

export function getFurnishingLabel(f: FurnishingStatus): string {
  return FURNISHING_LABELS[f] ?? f;
}

export function getCompletionLabel(c: CompletionStatus): string {
  return COMPLETION_LABELS[c] ?? c;
}

export function getStatusLabel(status: PropertyStatus): string {
  return STATUS_LABELS[status] ?? status;
}

export function getBedroomLabel(n: number): string {
  if (n === 0) return "Studio";
  if (n === 1) return "1 Bed";
  return `${n} Beds`;
}

export function getBedroomShortLabel(n: number): string {
  if (n === 0) return "Studio";
  return `${n}BR`;
}

export function getBathroomLabel(n: number): string {
  if (n === 1) return "1 Bath";
  return `${n} Baths`;
}

export function getPropertySummary(property: Property): string {
  const parts: string[] = [];
  if (property.type === "land") {
    parts.push(formatArea(property.area));
    return parts.join(" · ");
  }
  if (property.bedrooms >= 0)  parts.push(getBedroomLabel(property.bedrooms));
  if (property.bathrooms > 0)  parts.push(getBathroomLabel(property.bathrooms));
  if (property.area > 0)       parts.push(formatArea(property.area));
  return parts.join(" · ");
}

export function getPurposeColor(purpose: ListingPurpose): string {
  const map: Record<ListingPurpose, string> = {
    sale:      "bg-primary-700 text-white",
    rent:      "bg-accent text-white",
    shortterm: "bg-amber-500 text-white",
  };
  return map[purpose] ?? "bg-ink-600 text-white";
}

export function getPurposeBorderColor(purpose: ListingPurpose): string {
  const map: Record<ListingPurpose, string> = {
    sale:      "border-primary-600 text-primary-700",
    rent:      "border-accent text-accent",
    shortterm: "border-amber-400 text-amber-600",
  };
  return map[purpose] ?? "border-ink-400 text-ink-600";
}

export function getStatusColor(status: PropertyStatus): string {
  const map: Record<PropertyStatus, string> = {
    available:   "text-emerald-600 bg-emerald-50 border-emerald-200",
    sold:        "text-red-600 bg-red-50 border-red-200",
    rented:      "text-blue-600 bg-blue-50 border-blue-200",
    under_offer: "text-amber-600 bg-amber-50 border-amber-200",
    off_plan:    "text-purple-600 bg-purple-50 border-purple-200",
  };
  return map[status] ?? "text-ink-600 bg-ink-50";
}

export function getStatusDotColor(status: PropertyStatus): string {
  const map: Record<PropertyStatus, string> = {
    available:   "bg-emerald-500",
    sold:        "bg-red-500",
    rented:      "bg-blue-500",
    under_offer: "bg-amber-500",
    off_plan:    "bg-purple-500",
  };
  return map[status] ?? "bg-ink-400";
}

export function getPriceDiff(propertyPrice: number, marketAverage: number): number {
  if (!marketAverage) return 0;
  return parseFloat((((propertyPrice - marketAverage) / marketAverage) * 100).toFixed(1));
}

export function getPriceVsMarket(propertyPrice: number, marketAverage: number): string {
  const diff = getPriceDiff(propertyPrice, marketAverage);
  if (Math.abs(diff) < 5) return "At market price";
  if (diff < 0)  return `${Math.abs(diff)}% below average`;
  return `${diff}% above average`;
}

export function calculateYield(
  purchasePrice: number,
  monthlyRent: number
): number {
  if (!purchasePrice || !monthlyRent) return 0;
  return parseFloat(((monthlyRent * 12) / purchasePrice * 100).toFixed(2));
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  termYears: number
): number {
  const r = annualRate / 100 / 12;         
  const n = termYears * 12;             
  if (r === 0) return Math.round(principal / n);
  const monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return Math.round(monthly);
}

export function describeFilters(filters: PropertyFilters): string {
  const parts: string[] = [];

  if (filters.types?.length === 1) {
    parts.push(getPropertyTypePlural(filters.types[0]));
  } else if (filters.types && filters.types.length > 1) {
    parts.push("Properties");
  } else {
    parts.push("Properties");
  }

  if (filters.purpose) {
    parts.push(getPurposeLabel(filters.purpose).toLowerCase());
  }

  if (filters.areas?.length === 1) {
    parts.push(`in ${filters.areas[0]}`);
  } else if (filters.areas && filters.areas.length > 1) {
    parts.push(`in ${filters.areas.slice(0, 2).join(", ")}`);
    if (filters.areas.length > 2) parts.push(`+${filters.areas.length - 2} more`);
  } else if (filters.city) {
    parts.push(`in ${filters.city}`);
  } else {
    parts.push("in Kenya");
  }

  return parts.join(" ");
}

export function getActiveFilterCount(filters: PropertyFilters): number {
  let count = 0;
  if (filters.types?.length)     count++;
  if (filters.minPrice || filters.maxPrice)  count++;
  if (filters.minBeds !== undefined)         count++;
  if (filters.maxBeds !== undefined)         count++;
  if (filters.minArea || filters.maxArea)    count++;
  if (filters.furnishing?.length)            count++;
  if (filters.completion)                    count++;
  if (filters.amenities?.length)             count++;
  if (filters.areas?.length)                 count++;
  if (filters.keywords)                      count++;
  return count;
}

export function matchesKeyword(property: Property, keyword: string): boolean {
  if (!keyword.trim()) return true;
  const kw    = keyword.toLowerCase();
  const words = kw.split(/\s+/);
  const searchable = [
    property.title,
    property.description,
    property.location.area,
    property.location.city,
    property.location.subArea ?? "",
    property.location.landmark ?? "",
    property.type,
    ...(property.tags ?? []),
    ...property.amenities.map((a) => a.name),
  ].join(" ").toLowerCase();

  return words.every((word) => searchable.includes(word));
}

export function sortProperties(
  properties: Property[],
  sortBy: PropertySortOption
): Property[] {
  const sorted = [...properties];

  switch (sortBy) {
    case "price_asc":
      return sorted.sort((a, b) => a.price.amount - b.price.amount);

    case "price_desc":
      return sorted.sort((a, b) => b.price.amount - a.price.amount);

    case "area_asc":
      return sorted.sort((a, b) => a.area - b.area);

    case "area_desc":
      return sorted.sort((a, b) => b.area - a.area);

    case "popularity":
      return sorted.sort((a, b) => b.views - a.views);

    case "date_asc":
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

    case "date_desc":
    default:
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

export function filterByAmenities(
  properties: Property[],
  requiredAmenityIds: string[]
): Property[] {
  if (!requiredAmenityIds.length) return properties;
  return properties.filter((p) =>
    requiredAmenityIds.every((id) => p.amenities.some((a) => a.id === id))
  );
}

export function getPropertyBadges(property: Property): {
  label: string;
  variant: string;
}[] {
  const badges: { label: string; variant: string }[] = [];
  if (property.isPremium)                     badges.push({ label: "⭐ Premium",   variant: "premium"  });
  if (property.isNew)                         badges.push({ label: "New",         variant: "new"      });
  if (property.isVerified)                    badges.push({ label: "✓ Verified",  variant: "verified" });
  if (property.furnishing === "furnished")    badges.push({ label: "Furnished",   variant: "info"     });
  if (property.completion === "off_plan")     badges.push({ label: "Off-Plan",    variant: "warning"  });
  return badges;
}

export function getPrimaryImage(property: Property): string {
  const primary = property.images.find((img) => img.isPrimary);
  return (primary ?? property.images[0])?.url ?? "";
}

export function getPrimaryThumbnail(property: Property): string {
  const primary = property.images.find((img) => img.isPrimary);
  return (primary ?? property.images[0])?.thumbnail ?? "";
}

export function hasFloorPlan(property: Property): boolean {
  return Boolean(property.floorPlans && property.floorPlans.length > 0);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hasVirtualTour(_property: Property): boolean {
  return false;
}

export function getPropertyUrl(property: Property, base = "https://domio.ke"): string {
  return `${base}/property/${property.slug}`;
}

export function getWhatsAppShareUrl(property: Property): string {
  const url  = getPropertyUrl(property);
  const text = encodeURIComponent(
    `Check out this property on Domio:\n${property.title}\n${formatPropertyPrice(property)}\n${url}`
  );
  return `https://wa.me/?text=${text}`;
}

export function getAgentWhatsAppUrl(property: Property): string {
  const phone = property.agent.whatsapp ?? property.agent.phone;
  const number = phone.replace(/\D/g, "");
  const text  = encodeURIComponent(
    `Hi ${property.agent.name}, I'm interested in this property:\n${property.title}\n${getPropertyUrl(property)}`
  );
  return `https://wa.me/${number}?text=${text}`;
}

export function getAgentEmailUrl(property: Property): string {
  const subject = encodeURIComponent(`Enquiry: ${property.title}`);
  const body    = encodeURIComponent(
    `Hi ${property.agent.name},\n\nI am interested in the following property:\n\n${property.title}\n${formatPropertyPrice(property)}\n${getPropertyUrl(property)}\n\nPlease get in touch.\n\nThank you.`
  );
  return `mailto:${property.agent.email}?subject=${subject}&body=${body}`;
}

function formatPropertyPrice(property: Property): string {
  return formatPriceWithPeriod(
    property.price.amount,
    property.price.currency,
    property.price.period
  );
}

export function getPropertyMetaTitle(property: Property): string {
  const bed     = property.bedrooms > 0 ? `${getBedroomLabel(property.bedrooms)} ` : "";
  const type    = getPropertyTypeLabel(property.type);
  const purpose = getPurposeLabel(property.purpose);
  const area    = property.location.area;
  const price   = formatPropertyPrice(property);
  return `${bed}${type} ${purpose} in ${area} | ${price} | Domio`;
}

export function getPropertyMetaDesc(property: Property): string {
  const beds    = property.bedrooms > 0 ? `${getBedroomLabel(property.bedrooms).toLowerCase()}, ` : "";
  const baths   = property.bathrooms > 0 ? `${getBathroomLabel(property.bathrooms).toLowerCase()} ` : "";
  const type    = getPropertyTypeLabel(property.type);
  const purpose = getPurposeLabel(property.purpose).toLowerCase();
  const area    = `${property.location.area}, ${property.location.city}`;
  const size    = formatArea(property.area);
  const price   = formatPropertyPrice(property);
  const suffix  = property.isVerified ? " Contact verified agent now." : "";
  return `${beds}${baths}${type} ${purpose} in ${area}. ${size}. ${price}.${suffix}`;
}

export function validateProperty(property: Partial<Property>): string[] {
  const errors: string[] = [];
  if (!property.title?.trim())          errors.push("title");
  if (!property.description?.trim())    errors.push("description");
  if (!property.type)                   errors.push("type");
  if (!property.purpose)                errors.push("purpose");
  if (!property.price?.amount || property.price.amount <= 0) errors.push("price");
  if (!property.location?.city?.trim()) errors.push("location.city");
  if (!property.location?.area?.trim()) errors.push("location.area");
  if (!property.images?.length)         errors.push("images");
  if (!property.agent?.id)              errors.push("agent");
  return errors;
}

export function isExpired(property: Property): boolean {
  if (!property.expiresAt) return false;
  return new Date(property.expiresAt) < new Date();
}

export function isRecentListing(property: Property, withinDays = 14): boolean {
  const diffMs   = Date.now() - new Date(property.createdAt).getTime();
  const diffDays = diffMs / 86_400_000;
  return diffDays <= withinDays;
}

export function groupAmenities(amenities: PropertyAmenity[]): Record<string, PropertyAmenity[]> {
  return amenities.reduce<Record<string, PropertyAmenity[]>>((acc, a) => {
    const cat = a.category ?? "other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(a);
    return acc;
  }, {});
}

export function hasAmenity(property: Property, amenityId: string): boolean {
  return property.amenities.some((a) => a.id === amenityId);
}

const HIGHLIGHT_ORDER = [
  "pool", "gym", "balcony", "parking", "security",
  "elevator", "garden", "concierge", "backup_power", "ac",
];

export function getHighlightAmenities(
  property: Property,
  limit = 4
): PropertyAmenity[] {
  const amenityIds = new Set(property.amenities.map((a) => a.id));
  const ordered = HIGHLIGHT_ORDER.filter((id) => amenityIds.has(id));
  const highlighted = ordered.map((id) =>
    property.amenities.find((a) => a.id === id)!
  );
  const remaining = property.amenities.filter(
    (a) => !HIGHLIGHT_ORDER.includes(a.id)
  );
  return [...highlighted, ...remaining].slice(0, limit);
}

export const NEARBY_ICONS: Record<string, string> = {
  school:    "🏫",
  hospital:  "🏥",
  mall:      "🛍️",
  metro:     "🚇",
  airport:   "✈️",
  beach:     "🏖️",
  park:      "🌳",
};

export function getNearbyIcon(type: string): string {
  return NEARBY_ICONS[type] ?? "📍";
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function round(value: number, decimals = 0): number {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}