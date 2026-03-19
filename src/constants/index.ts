import type { SelectOption, SortOption } from "../types";


export const APP_NAME = "Domio";
export const APP_TAGLINE = "Find Your Perfect Home";
export const APP_DESCRIPTION = "Kenya's most trusted real estate platform. Discover thousands of verified properties for rent and sale across Nairobi, Mombasa, Kisumu, and beyond.";
export const APP_URL = "https://domio.ke";


export const CURRENCY = { code: "KES", symbol: "KSh", locale: "en-KE" };
export const LANGUAGES  = ["English", "Swahili", "French"];
export const CURRENCIES = ["KES", "USD", "EUR", "GBP"];
export const AREA_UNITS = ["Square Feet", "Square Metres"];


export const PRICE_RANGES_RENT = [
  { label: "Any Price", value: "" },
  { label: "Up to KSh 30K", value: "0-30000" },
  { label: "KSh 30K–60K",   value: "30000-60000" },
  { label: "KSh 60K–100K",  value: "60000-100000" },
  { label: "KSh 100K–200K", value: "100000-200000" },
  { label: "KSh 200K+",     value: "200000-" },
];

export const PRICE_RANGES_SALE = [
  { label: "Any Price",     value: "" },
  { label: "Up to KSh 5M",  value: "0-5000000" },
  { label: "KSh 5M–15M",    value: "5000000-15000000" },
  { label: "KSh 15M–30M",   value: "15000000-30000000" },
  { label: "KSh 30M–60M",   value: "30000000-60000000" },
  { label: "KSh 60M+",      value: "60000000-" },
];

export const BEDS_OPTIONS = [
  { label: "Beds & Baths", value: "" },
  { label: "Studio",  value: "0" },
  { label: "1 Bed",   value: "1" },
  { label: "2 Beds",  value: "2" },
  { label: "3 Beds",  value: "3" },
  { label: "4 Beds",  value: "4" },
  { label: "5+ Beds", value: "5" },
];

export const PROPERTY_CATEGORIES = [
  { label: "Residential", value: "residential" },
  { label: "Commercial",  value: "commercial" },
];

export const COMPLETION_STATUS = [
  { label: "All",      value: "" },
  { label: "Ready",    value: "ready" },
  { label: "Off-Plan", value: "off_plan" },
];

export const HANDOVER_BY = [
  { label: "Handover By", value: "" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028+", value: "2028" },
];

export const PAYMENT_PLANS = [
  { label: "Payment Plan", value: "" },
  { label: "0% Down",      value: "0" },
  { label: "10% Down",     value: "10" },
  { label: "20% Down",     value: "20" },
];

export const COMPLETION_PCT = [
  { label: "% Completion", value: "" },
  { label: "0–25%",  value: "0-25" },
  { label: "25–50%", value: "25-50" },
  { label: "50–75%", value: "50-75" },
  { label: "75–100%",value: "75-100" },
];

export const PROPERTY_TYPES: SelectOption[] = [
  { value: "apartment",   label: "Apartment" },
  { value: "villa",       label: "Villa" },
  { value: "townhouse",   label: "Townhouse" },
  { value: "penthouse",   label: "Penthouse" },
  { value: "studio",      label: "Studio" },
  { value: "duplex",      label: "Duplex" },
  { value: "land",        label: "Land / Plot" },
  { value: "commercial",  label: "Commercial" },
  { value: "office",      label: "Office Space" },
  { value: "warehouse",   label: "Warehouse" },
];

export const LISTING_PURPOSES: SelectOption[] = [
  { value: "rent",       label: "For Rent" },
  { value: "sale",       label: "For Sale" },
  { value: "shortterm",  label: "Short Term" },
];

export const BEDROOM_OPTIONS: SelectOption[] = [
  { value: "0", label: "Studio" },
  { value: "1", label: "1 Bed" },
  { value: "2", label: "2 Beds" },
  { value: "3", label: "3 Beds" },
  { value: "4", label: "4 Beds" },
  { value: "5", label: "5+ Beds" },
];

export const SORT_OPTIONS: SortOption[] = [
  { value: "date_desc",   label: "Newest First" },
  { value: "price_asc",   label: "Price: Low to High" },
  { value: "price_desc",  label: "Price: High to Low" },
  { value: "area_desc",   label: "Largest Area" },
  { value: "popularity",  label: "Most Popular" },
];

export const CITIES_LIST = [
  { value: "nairobi",  label: "Nairobi" },
  { value: "mombasa",  label: "Mombasa" },
  { value: "kisumu",   label: "Kisumu" },
  { value: "nakuru",   label: "Nakuru" },
  { value: "eldoret",  label: "Eldoret" },
  { value: "thika",    label: "Thika" },
];

export const NAIROBI_AREAS = [
  "Westlands","Kilimani","Lavington","Karen","Runda","Muthaiga","Gigiri",
  "Riverside","Kileleshwa","Parklands","Spring Valley","Loresho","Langata",
  "South B","South C","Upperhill","CBD","Hurlingham","Ngong Road","Syokimau",
  "Ruiru","Thika Road","Kasarani","Roysambu","Ruaka","Ridgeways",
];

export const AMENITY_LIST = [
  { id: "pool",         name: "Swimming Pool",  icon: "🏊", category: "interior" },
  { id: "gym",          name: "Gym / Fitness",  icon: "💪", category: "interior" },
  { id: "ac",           name: "Air Conditioning",icon: "❄️", category: "interior" },
  { id: "balcony",      name: "Balcony",         icon: "🏠", category: "interior" },
  { id: "maid_room",    name: "Maid's Room",     icon: "🛏️", category: "interior" },
  { id: "study",        name: "Study Room",      icon: "📚", category: "interior" },
  { id: "concierge",    name: "Concierge",       icon: "🏨", category: "building" },
  { id: "security",     name: "24/7 Security",   icon: "🔒", category: "building" },
  { id: "cctv",         name: "CCTV",            icon: "📷", category: "building" },
  { id: "elevator",     name: "Elevator",        icon: "🛗", category: "building" },
  { id: "backup_power", name: "Backup Power",    icon: "⚡", category: "building" },
  { id: "borehole",     name: "Borehole Water",  icon: "💧", category: "building" },
  { id: "intercom",     name: "Intercom",        icon: "📞", category: "building" },
  { id: "garden",       name: "Garden",          icon: "🌿", category: "outdoor" },
  { id: "parking",      name: "Parking",         icon: "🚗", category: "outdoor" },
  { id: "bbq",          name: "BBQ Area",        icon: "🔥", category: "outdoor" },
  { id: "kids_play",    name: "Kids Play Area",  icon: "🎮", category: "outdoor" },
  { id: "tennis",       name: "Tennis Court",    icon: "🎾", category: "outdoor" },
];

export const ROUTES = {
  HOME:           "/",
  SEARCH:         "/search",
  PROPERTY:       "/property/:slug",
  AGENT:          "/agent/:slug",
  DASHBOARD:      "/dashboard",
  FAVORITES:      "/favorites",
  ABOUT:          "/about",
  CONTACT:        "/contact",
  NOT_FOUND:      "*",
};

export const ANIMATION = {
  spring:        { type: "spring", stiffness: 300, damping: 30 },
  springBounce:  { type: "spring", stiffness: 260, damping: 20 },
  easeOutExpo:   { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  easeOut:       { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  stagger:       0.07,
  pageEnter:     { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export const ITEMS_PER_PAGE = 20;

export const HERO_SLIDES = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1600&q=80",
    title: "Find Your Dream Home",
    subtitle: "in Nairobi",
    tag: "Premium Listings",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80",
    title: "Luxury Villas",
    subtitle: "in Karen & Runda",
    tag: "Exclusive Properties",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
    title: "Modern Apartments",
    subtitle: "in Westlands & Kilimani",
    tag: "New Listings",
  },
];