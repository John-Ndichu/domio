export type PropertyType =
  | "apartment" | "villa" | "townhouse" | "penthouse"
  | "studio" | "duplex" | "land" | "commercial" | "office" | "warehouse";

export type ListingPurpose = "sale" | "rent" | "shortterm";
export type PropertyStatus = "available" | "sold" | "rented" | "under_offer" | "off_plan";
export type FurnishingStatus = "furnished" | "unfurnished" | "semi_furnished";
export type CompletionStatus = "ready" | "off_plan";
export type PropertySortOption =
  | "price_asc" | "price_desc" | "date_desc" | "date_asc" | "area_asc" | "area_desc" | "popularity";

export interface PropertyLocation {
  city: string;
  area: string;
  subArea?: string;
  address?: string;
  lat: number;
  lng: number;
  neighborhood?: string;
  landmark?: string;
}

export interface PropertyPrice {
  amount: number;
  currency: string;
  period?: "monthly" | "yearly" | "weekly";
  pricePerSqft?: number;
  serviceCharge?: number;
  originalAmount?: number;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  icon: string;
  category: "interior" | "building" | "outdoor" | "nearby";
}

export interface PropertyImage {
  id: string;
  url: string;
  thumbnail: string;
  alt: string;
  isPrimary?: boolean;
  order: number;
}

export interface PropertyFloorPlan {
  id: string;
  url: string;
  label: string;
}

export interface NearbyPlace {
  name: string;
  type: "school" | "hospital" | "mall" | "metro" | "airport" | "beach" | "park";
  distance: number;
  duration?: number;
}

export interface PropertyAgent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  email: string;
  whatsapp?: string;
  agency: string;
  agencyLogo: string;
  rating: number;
  totalListings: number;
  responseTime: string;
  languages: string[];
  verified: boolean;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PropertyType;
  purpose: ListingPurpose;
  status: PropertyStatus;
  furnishing: FurnishingStatus;
  completion: CompletionStatus;
  price: PropertyPrice;
  location: PropertyLocation;
  bedrooms: number;
  bathrooms: number;
  area: number;
  floors?: number;
  parkingSpaces?: number;
  images: PropertyImage[];
  floorPlans?: PropertyFloorPlan[];
  amenities: PropertyAmenity[];
  agent: PropertyAgent;
  nearby?: NearbyPlace[];
  views: number;
  isFeatured: boolean;
  isVerified: boolean;
  isPremium: boolean;
  isNew: boolean;
  tags?: string[];
  yearBuilt?: number;
  permitNumber?: string;
  rera?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
}

export interface PropertyFilters {
  purpose?: ListingPurpose;
  types?: PropertyType[];
  city?: string;
  areas?: string[];
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minArea?: number;
  maxArea?: number;
  furnishing?: FurnishingStatus[];
  completion?: CompletionStatus;
  amenities?: string[];
  keywords?: string;
  sortBy?: PropertySortOption;
  page?: number;
  limit?: number;
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filters?: PropertyFilters;
}

export interface PropertyStats {
  totalListings: number;
  averagePrice: number;
  averageArea: number;
  pricePerSqft: number;
  trend: "up" | "down" | "stable";
  trendPercentage: number;
}