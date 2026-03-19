import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../index";
import type { Property, PropertyFilters } from "../../types";
import { selectActiveFilterCount, selectHasActiveFilters } from "../slices/propertiesSlice";
import { selectToasts, selectIsAuthModalOpen, selectAuthModalMode, selectIsMobileMenuOpen, selectIsPageLoading, selectIsSearchDrawerOpen, selectTheme, selectContactModalId, selectIsFavorite } from "../slices/uiSlice";


export {
  selectPropertiesWithMeta,
  selectFilterState,
  selectCurrentPropertyState,
  selectHomepageData,
  selectActiveFilterCount,
  selectHasActiveFilters,
} from "../slices/propertiesSlice";

export {
  selectToasts,
  selectIsAuthModalOpen,
  selectAuthModalMode,
  selectIsMobileMenuOpen,
  selectIsPageLoading,
  selectIsSearchDrawerOpen,
  selectTheme,
  selectContactModalId,
  selectCookieConsentDone,
  selectIsListPropModalOpen,
  selectFavoriteIds,
  selectFavoriteProps,
  selectFavoriteCount,
  selectAddedThisSession,
  selectIsFavorite,
  addToast,
  addSuccessToast,
  addErrorToast,
  removeToast,
  toggleFavorite,
  addFavorite,
  removeFavorite,
  openAuthModal,
  closeAuthModal,
  toggleMobileMenu,
  closeMobileMenu,
} from "../slices/uiSlice";

export const selectProperties         = (s: RootState): Property[]       => s.properties.items;
export const selectFeaturedProps      = (s: RootState): Property[]       => s.properties.featured;
export const selectPremiumProps       = (s: RootState): Property[]       => s.properties.premium;
export const selectSimilarProps       = (s: RootState): Property[]       => s.properties.similar;
export const selectNewListings        = (s: RootState): Property[]       => s.properties.newListings;
export const selectCurrentProperty    = (s: RootState)                   => s.properties.current;
export const selectRecentlyViewed     = (s: RootState): Property[]       => s.properties.recentlyViewed;
export const selectPropertyFilters    = (s: RootState): PropertyFilters  => s.properties.filters;
export const selectTotal              = (s: RootState): number            => s.properties.total;
export const selectPage               = (s: RootState): number            => s.properties.page;
export const selectTotalPages         = (s: RootState): number            => s.properties.totalPages;
export const selectLoading            = (s: RootState): boolean           => s.properties.loading.items;
export const selectFeaturedLoading    = (s: RootState): boolean           => s.properties.loading.featured;
export const selectCurrentLoading     = (s: RootState): boolean           => s.properties.loading.current;
export const selectSimilarLoading     = (s: RootState): boolean           => s.properties.loading.similar;
export const selectPremiumLoading     = (s: RootState): boolean           => s.properties.loading.premium;
export const selectNewListingsLoading = (s: RootState): boolean           => s.properties.loading.newListings;
export const selectPropertiesError    = (s: RootState): string | null     => s.properties.errors.items;
export const selectCurrentError       = (s: RootState): string | null     => s.properties.errors.current;
export const selectViewMode           = (s: RootState)                    => s.properties.viewMode;
export const selectFiltersOpen        = (s: RootState): boolean           => s.properties.filtersOpen;
export const selectLastFetchedAt      = (s: RootState): string | null     => s.properties.lastFetchedAt;
export const selectIsLoading          = (s: RootState): boolean           => s.properties.isLoading;

export const selectPropertiesLoading  = selectLoading;
export const selectIsFeaturedLoading  = selectFeaturedLoading;
export const selectIsCurrentLoading   = selectCurrentLoading;
export const isFeaturedLoading        = selectFeaturedLoading;
export const isCurrentLoading         = selectCurrentLoading;

const _items      = (s: RootState): Property[]         => s.properties.items;
const _isLoading  = (s: RootState): boolean             => s.properties.isLoading;
const _page       = (s: RootState): number              => s.properties.page;
const _totalPages = (s: RootState): number              => s.properties.totalPages;
const _total      = (s: RootState): number              => s.properties.total;
const _limit      = (s: RootState): number              => s.properties.filters.limit ?? 20;
const _sortBy     = (s: RootState): string              => s.properties.filters.sortBy ?? "date_desc";
const _purpose    = (s: RootState): string | undefined  => s.properties.filters.purpose;

export const selectHasResults = createSelector(
  _items, _isLoading,
  (items: Property[], loading: boolean) => !loading && items.length > 0
);

export const selectIsEmpty = createSelector(
  _items, _isLoading,
  (items: Property[], loading: boolean) => !loading && items.length === 0
);

export const selectIsLastPage = createSelector(
  _page, _totalPages,
  (page: number, totalPages: number) => page >= totalPages
);

export const selectIsFirstPage = createSelector(
  _page,
  (page: number) => page === 1
);

export const selectPurposeLabel = createSelector(
  _purpose,
  (purpose: string | undefined): string => {
    const map: Record<string, string> = {
      rent: "For Rent", sale: "For Sale", shortterm: "Short Term",
    };
    return purpose ? (map[purpose] ?? "Properties") : "Properties";
  }
);

export const selectCurrentPageCount = createSelector(
  _items,
  (items: Property[]) => items.length
);

export const selectShowingLabel = createSelector(
  _page, _limit, _total,
  (page: number, limit: number, total: number): string => {
    if (total === 0) return "No properties found";
    if (total === 1) return "Showing 1 property";
    const start = (page - 1) * limit + 1;
    const end   = Math.min(page * limit, total);
    return `Showing ${start}–${end} of ${total.toLocaleString()} properties`;
  }
);

export const selectSortByLabel = createSelector(
  _sortBy,
  (sortBy: string): string => {
    const map: Record<string, string> = {
      date_desc: "Newest First",      date_asc:   "Oldest First",
      price_asc: "Price: Low to High", price_desc: "Price: High to Low",
      area_desc: "Largest Area",       area_asc:   "Smallest Area",
      popularity:"Most Popular",
    };
    return map[sortBy] ?? "Sort By";
  }
);

export const selectAllToasts  = (s: RootState) => s.ui.toasts;
export const selectToastCount = (s: RootState): number => s.ui.toasts.length;

export const selectAnyModalOpen = createSelector(
  (s: RootState): boolean => s.ui.isAuthModalOpen,
  (auth: boolean) => auth
);

export const selectIsDarkMode = (_: RootState): boolean => false;

export const selectFavIds   = (s: RootState): string[]   => s.favorites.propertyIds;
export const selectFavProps = (s: RootState): Property[] => s.favorites.properties;

const _favIds = (s: RootState): string[] => s.favorites.propertyIds;

export const selectFavoriteIdSet = createSelector(
  _favIds,
  (ids: string[]): Set<string> => new Set<string>(ids)
);

export const selectSavedCount = createSelector(
  _favIds,
  (ids: string[]): number => ids.length
);

export const selectHasFavorites = createSelector(
  selectSavedCount,
  (count: number): boolean => count > 0
);

export const sel = {
  properties:       selectProperties,
  featured:         selectFeaturedProps,
  premium:          selectPremiumProps,
  similar:          selectSimilarProps,
  newListings:      selectNewListings,
  current:          selectCurrentProperty,
  recentlyViewed:   selectRecentlyViewed,
  filters:          selectPropertyFilters,
  total:            selectTotal,
  page:             selectPage,
  totalPages:       selectTotalPages,
  loading:          selectLoading,
  featuredLoading:  selectFeaturedLoading,
  currentLoading:   selectCurrentLoading,
  similarLoading:   selectSimilarLoading,
  premiumLoading:   selectPremiumLoading,
  viewMode:         selectViewMode,
  filtersOpen:      selectFiltersOpen,
  error:            selectPropertiesError,
  currentError:     selectCurrentError,
  lastFetchedAt:    selectLastFetchedAt,
  hasResults:       selectHasResults,
  isEmpty:          selectIsEmpty,
  showingLabel:     selectShowingLabel,
  sortByLabel:      selectSortByLabel,
  activeFilterCount: selectActiveFilterCount,
  hasActiveFilters:  selectHasActiveFilters,

  toasts:          selectToasts,
  authOpen:        selectIsAuthModalOpen,
  authMode:        selectAuthModalMode,
  mobileMenu:      selectIsMobileMenuOpen,
  pageLoading:     selectIsPageLoading,
  searchDrawer:    selectIsSearchDrawerOpen,
  theme:           selectTheme,
  isDark:          selectIsDarkMode,
  contactModalId:  selectContactModalId,

  favIds:          selectFavIds,
  favProps:        selectFavProps,
  favCount:        selectSavedCount,
  hasFavorites:    selectHasFavorites,
  isFav:           selectIsFavorite,
  favoriteIdSet:   selectFavoriteIdSet,
} as const;