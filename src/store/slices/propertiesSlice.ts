import { createAsyncThunk, createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit";
import { propertyService } from "../../services";
import type { ListingPurpose, Property, PropertyFilters, PropertySearchResult, PropertySortOption } from "../../types";
import type { RootState } from "../index";


interface PropertyLoadingState {
  items:       boolean;
  featured:    boolean;
  premium:     boolean;
  similar:     boolean;
  current:     boolean;
  newListings: boolean;
}

interface PropertyErrorState {
  items:   string | null;
  current: string | null;
}

export interface PropertiesState {
  items:           Property[];
  featured:        Property[];
  premium:         Property[];
  similar:         Property[];
  newListings:     Property[];
  current:         Property | null;
  recentlyViewed:  Property[];
  filters:         PropertyFilters;
  total:           number;
  page:            number;
  totalPages:      number;
  loading:         PropertyLoadingState;
  errors:          PropertyErrorState;
  viewMode:        "grid" | "list" | "map";
  filtersOpen:     boolean;
  lastFetchedAt:   string | null;
  isLoading:       boolean;
  isFeaturedLoading: boolean;
  isCurrentLoading:  boolean;
  error:           string | null;
}


export const DEFAULT_FILTERS: PropertyFilters = {
  purpose: "rent",
  page:    1,
  limit:   20,
  sortBy:  "date_desc",
};

const INIT_LOADING: PropertyLoadingState = {
  items: false, featured: false, premium: false,
  similar: false, current: false, newListings: false,
};

const INIT_ERRORS: PropertyErrorState = { items: null, current: null };

const initialState: PropertiesState = {
  items: [], featured: [], premium: [], similar: [],
  newListings: [], current: null, recentlyViewed: [],
  filters: DEFAULT_FILTERS,
  total: 0, page: 1, totalPages: 1,
  loading: INIT_LOADING, errors: INIT_ERRORS,
  viewMode: "grid", filtersOpen: false, lastFetchedAt: null,
  isLoading: false, isFeaturedLoading: false, isCurrentLoading: false, error: null,
};


export const fetchProperties = createAsyncThunk<
  PropertySearchResult, PropertyFilters, { rejectValue: string }
>(
  "properties/fetchAll",
  async (filters, { rejectWithValue }) => {
    try {
      return await propertyService.getAll(filters);
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to load properties");
    }
  }
);

export const fetchPropertyBySlug = createAsyncThunk<
  Property, string, { rejectValue: string }
>(
  "properties/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const property = await propertyService.getBySlug(slug);
      if (!property) return rejectWithValue("Property not found");
      return property;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to load property");
    }
  }
);

export const fetchPropertyById = createAsyncThunk<
  Property, string, { rejectValue: string }
>(
  "properties/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const property = await propertyService.getById(id);
      if (!property) return rejectWithValue("Property not found");
      return property;
    } catch (err) {
      return rejectWithValue(err instanceof Error ? err.message : "Failed to load property");
    }
  }
);

export const fetchFeaturedProperties = createAsyncThunk<Property[], number | undefined>(
  "properties/fetchFeatured",
  async (limit = 8) => propertyService.getFeatured(limit)
);

export const fetchPremiumProperties = createAsyncThunk<Property[], number | undefined>(
  "properties/fetchPremium",
  async (limit = 4) => propertyService.getPremium(limit)
);

export const fetchNewListings = createAsyncThunk<Property[], number | undefined>(
  "properties/fetchNew",
  async (limit = 6) => propertyService.getNew(limit)
);

export const fetchSimilarProperties = createAsyncThunk<
  Property[], { property: Property; limit?: number }
>(
  "properties/fetchSimilar",
  async ({ property, limit = 4 }) => propertyService.getSimilar(property, limit)
);

export const fetchAgentProperties = createAsyncThunk<Property[], string>(
  "properties/fetchByAgent",
  async (agentId) => propertyService.getByAgent(agentId)
);


const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<PropertyFilters>>) {
      state.filters = { ...state.filters, ...action.payload, page: 1 };
    },

    replaceFilters(state, action: PayloadAction<PropertyFilters>) {
      state.filters = action.payload;
    },

    resetFilters(state) {
      state.filters = DEFAULT_FILTERS;
    },

    resetPriceFilters(state) {
      delete state.filters.minPrice;
      delete state.filters.maxPrice;
      state.filters.page = 1;
    },

    resetLocationFilters(state) {
      delete state.filters.city;
      delete state.filters.areas;
      state.filters.page = 1;
    },

    setPurpose(state, action: PayloadAction<ListingPurpose>) {
      state.filters.purpose = action.payload;
      state.filters.page    = 1;
      delete state.filters.minPrice;
      delete state.filters.maxPrice;
    },

    setSortBy(state, action: PayloadAction<PropertySortOption>) {
      state.filters.sortBy = action.payload;
      state.filters.page   = 1;
    },

    setPage(state, action: PayloadAction<number>) {
      const p = Math.max(1, Math.min(action.payload, state.totalPages));
      state.filters.page = p;
      state.page         = p;
    },

    nextPage(state) {
      if (state.page < state.totalPages) {
        state.page++;
        state.filters.page = state.page;
      }
    },

    prevPage(state) {
      if (state.page > 1) {
        state.page--;
        state.filters.page = state.page;
      }
    },

    setViewMode(state, action: PayloadAction<"grid" | "list" | "map">) {
      state.viewMode = action.payload;
    },

    openFiltersPanel(state)  { state.filtersOpen = true;  },
    closeFiltersPanel(state) { state.filtersOpen = false; },
    toggleFiltersPanel(state){ state.filtersOpen = !state.filtersOpen; },

    clearCurrent(state) {
      state.current        = null;
      state.similar        = [];
      state.errors.current = null;
      state.isCurrentLoading = false;
    },

    setCurrentProperty(state, action: PayloadAction<Property>) {
      state.current = action.payload;
    },

    addToRecentlyViewed(state, action: PayloadAction<Property>) {
      const without = state.recentlyViewed.filter((p) => p.id !== action.payload.id);
      state.recentlyViewed = [action.payload, ...without].slice(0, 8);
    },

    clearRecentlyViewed(state) { state.recentlyViewed = []; },

    clearAllErrors(state) { state.errors = INIT_ERRORS; state.error = null; },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading.items = true;
        state.isLoading     = true;
        state.errors.items  = null;
        state.error         = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading.items  = false;
        state.isLoading      = false;
        state.items          = action.payload.properties;
        state.total          = action.payload.total;
        state.page           = action.payload.page;
        state.totalPages     = action.payload.totalPages;
        state.lastFetchedAt  = new Date().toISOString();
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading.items = false;
        state.isLoading     = false;
        state.errors.items  = action.payload ?? "Unknown error";
        state.error         = action.payload ?? null;
        state.items         = [];
        state.total         = 0;
        state.totalPages    = 1;
      })

      .addCase(fetchPropertyBySlug.pending, (state) => {
        state.loading.current   = true;
        state.isCurrentLoading  = true;
        state.errors.current    = null;
        state.current           = null;
        state.similar           = [];
      })
      .addCase(fetchPropertyBySlug.fulfilled, (state, action) => {
        state.loading.current  = false;
        state.isCurrentLoading = false;
        state.current          = action.payload;
        const without = state.recentlyViewed.filter((p) => p.id !== action.payload.id);
        state.recentlyViewed   = [action.payload, ...without].slice(0, 8);
      })
      .addCase(fetchPropertyBySlug.rejected, (state, action) => {
        state.loading.current  = false;
        state.isCurrentLoading = false;
        state.errors.current   = action.payload ?? "Property not found";
      })

      .addCase(fetchPropertyById.pending, (state) => {
        state.loading.current  = true;
        state.isCurrentLoading = true;
        state.errors.current   = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading.current  = false;
        state.isCurrentLoading = false;
        state.current          = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading.current  = false;
        state.isCurrentLoading = false;
        state.errors.current   = action.payload ?? "Property not found";
      })

      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading.featured  = true;
        state.isFeaturedLoading = true;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading.featured  = false;
        state.isFeaturedLoading = false;
        state.featured          = action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state) => {
        state.loading.featured  = false;
        state.isFeaturedLoading = false;
      })

      .addCase(fetchPremiumProperties.pending,   (state) => { state.loading.premium = true;  })
      .addCase(fetchPremiumProperties.fulfilled,  (state, action) => {
        state.loading.premium = false;
        state.premium         = action.payload;
      })
      .addCase(fetchPremiumProperties.rejected,   (state) => { state.loading.premium = false; })

      .addCase(fetchNewListings.pending,   (state) => { state.loading.newListings = true;  })
      .addCase(fetchNewListings.fulfilled,  (state, action) => {
        state.loading.newListings = false;
        state.newListings         = action.payload;
      })
      .addCase(fetchNewListings.rejected,   (state) => { state.loading.newListings = false; })

      .addCase(fetchSimilarProperties.pending,   (state) => {
        state.loading.similar = true;
        state.similar         = [];
      })
      .addCase(fetchSimilarProperties.fulfilled,  (state, action) => {
        state.loading.similar = false;
        state.similar         = action.payload;
      })
      .addCase(fetchSimilarProperties.rejected,   (state) => { state.loading.similar = false; })

      .addCase(fetchAgentProperties.pending,   (state) => { state.loading.items = true; state.isLoading = true; })
      .addCase(fetchAgentProperties.fulfilled,  (state, action) => {
        state.loading.items = false;
        state.isLoading     = false;
        state.items         = action.payload;
        state.total         = action.payload.length;
        state.totalPages    = 1;
        state.page          = 1;
      })
      .addCase(fetchAgentProperties.rejected,   (state) => { state.loading.items = false; state.isLoading = false; });
  },
});


export const {
  setFilters, replaceFilters, resetFilters, resetPriceFilters, resetLocationFilters,
  setPurpose, setSortBy,
  setPage, nextPage, prevPage,
  setViewMode,
  openFiltersPanel, closeFiltersPanel, toggleFiltersPanel,
  clearCurrent, setCurrentProperty,
  addToRecentlyViewed, clearRecentlyViewed,
  clearAllErrors,
} = propertiesSlice.actions;

const selectPropsSlice      = (s: RootState): PropertiesState  => s.properties;
const selectFiltersSlice    = (s: RootState): PropertyFilters  => s.properties.filters;

export const selectPropertiesWithMeta = createSelector(
  selectPropsSlice,
  (s: PropertiesState) => ({
    properties: s.items,
    loading:    s.loading.items,
    total:      s.total,
    error:      s.errors.items,
  })
);

export const selectFilterState = createSelector(
  selectPropsSlice,
  (s: PropertiesState) => ({
    filters:     s.filters,
    viewMode:    s.viewMode,
    filtersOpen: s.filtersOpen,
    page:        s.page,
    totalPages:  s.totalPages,
    total:       s.total,
  })
);

export const selectCurrentPropertyState = createSelector(
  selectPropsSlice,
  (s: PropertiesState) => ({
    property: s.current,
    loading:  s.loading.current,
    error:    s.errors.current,
    similar:  s.similar,
  })
);

export const selectHomepageData = createSelector(
  selectPropsSlice,
  (s: PropertiesState) => ({
    featured:        s.featured,
    premium:         s.premium,
    newListings:     s.newListings,
    featuredLoading: s.loading.featured,
    premiumLoading:  s.loading.premium,
    newLoading:      s.loading.newListings,
  })
);

export const selectActiveFilterCount = createSelector(
  selectFiltersSlice,
  (f: PropertyFilters) =>
    [
      (f.types?.length ?? 0) > 0,
      f.minPrice !== undefined || f.maxPrice !== undefined,
      f.minBeds  !== undefined,
      f.maxBeds  !== undefined,
      f.minArea  !== undefined || f.maxArea !== undefined,
      (f.furnishing?.length ?? 0) > 0,
      !!f.completion,
      (f.amenities?.length ?? 0) > 0,
      (f.areas?.length ?? 0) > 0,
      !!f.keywords,
    ].filter(Boolean).length
);

export const selectHasActiveFilters = createSelector(
  selectActiveFilterCount,
  (count: number) => count > 0
);

export default propertiesSlice.reducer;