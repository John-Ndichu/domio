import PROPERTIES from "../data/properties.data";
import type { Property, PropertyFilters, PropertySearchResult, PropertyStats } from "../types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const propertyService = {
  async getAll(filters?: PropertyFilters): Promise<PropertySearchResult> {
    await delay(450);
    let results = [...PROPERTIES];

    if (filters?.purpose)
      results = results.filter((p) => p.purpose === filters.purpose);
    if (filters?.types?.length)
      results = results.filter((p) => filters.types!.includes(p.type));
    if (filters?.city)
      results = results.filter((p) => p.location.city.toLowerCase() === filters.city!.toLowerCase());
    if (filters?.areas?.length)
      results = results.filter((p) => filters.areas!.some((a) => p.location.area.toLowerCase().includes(a.toLowerCase())));
    if (filters?.minPrice !== undefined)
      results = results.filter((p) => p.price.amount >= filters.minPrice!);
    if (filters?.maxPrice !== undefined)
      results = results.filter((p) => p.price.amount <= filters.maxPrice!);
    if (filters?.minBeds !== undefined)
      results = results.filter((p) => p.bedrooms >= filters.minBeds!);
    if (filters?.maxBeds !== undefined)
      results = results.filter((p) => p.bedrooms <= filters.maxBeds!);
    if (filters?.minArea !== undefined)
      results = results.filter((p) => p.area >= filters.minArea!);
    if (filters?.maxArea !== undefined)
      results = results.filter((p) => p.area <= filters.maxArea!);
    if (filters?.furnishing?.length)
      results = results.filter((p) => filters.furnishing!.includes(p.furnishing));
    if (filters?.keywords) {
      const kw = filters.keywords.toLowerCase();
      results = results.filter((p) =>
        p.title.toLowerCase().includes(kw) ||
        p.description.toLowerCase().includes(kw) ||
        p.location.area.toLowerCase().includes(kw) ||
        p.location.city.toLowerCase().includes(kw)
      );
    }

    switch (filters?.sortBy) {
      case "price_asc":  results.sort((a, b) => a.price.amount - b.price.amount); break;
      case "price_desc": results.sort((a, b) => b.price.amount - a.price.amount); break;
      case "area_desc":  results.sort((a, b) => b.area - a.area); break;
      case "area_asc":   results.sort((a, b) => a.area - b.area); break;
      case "popularity": results.sort((a, b) => b.views - a.views); break;
      default:           results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const start = (page - 1) * limit;

    return {
      properties: results.slice(start, start + limit),
      total: results.length,
      page,
      limit,
      totalPages: Math.ceil(results.length / limit),
      filters,
    };
  },

  async getById(id: string): Promise<Property | null> {
    await delay(250);
    return PROPERTIES.find((p) => p.id === id) ?? null;
  },

  async getBySlug(slug: string): Promise<Property | null> {
    await delay(250);
    return PROPERTIES.find((p) => p.slug === slug) ?? null;
  },

  async getFeatured(limit = 6): Promise<Property[]> {
    await delay(300);
    return PROPERTIES.filter((p) => p.isFeatured).slice(0, limit);
  },

  async getPremium(limit = 4): Promise<Property[]> {
    await delay(200);
    return PROPERTIES.filter((p) => p.isPremium).slice(0, limit);
  },

  async getNew(limit = 6): Promise<Property[]> {
    await delay(200);
    return PROPERTIES.filter((p) => p.isNew).slice(0, limit);
  },

  async getSimilar(property: Property, limit = 4): Promise<Property[]> {
    await delay(300);
    return PROPERTIES.filter(
      (p) => p.id !== property.id && p.purpose === property.purpose &&
        (p.type === property.type || p.location.area === property.location.area)
    ).slice(0, limit);
  },

  async getStats(): Promise<PropertyStats> {
    await delay(150);
    const total = PROPERTIES.length;
    const avgPrice = PROPERTIES.reduce((a, b) => a + b.price.amount, 0) / total;
    const avgArea = PROPERTIES.reduce((a, b) => a + b.area, 0) / total;
    return {
      totalListings: total,
      averagePrice: Math.round(avgPrice),
      averageArea: Math.round(avgArea),
      pricePerSqft: Math.round(avgPrice / avgArea),
      trend: "up",
      trendPercentage: 8.2,
    };
  },

  async getByAgent(agentId: string): Promise<Property[]> {
    await delay(250);
    return PROPERTIES.filter((p) => p.agent.id === agentId);
  },
};