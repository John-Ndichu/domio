import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Property, Toast } from "../../types";
import type { RootState } from "../index";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toasts:           [] as Toast[],
    isAuthModalOpen:  false,
    authModalMode:    "login" as "login" | "register",
    isMobileMenuOpen: false,
  },
  reducers: {
    addToast(state, action: PayloadAction<Omit<Toast, "id">>) {
      if (state.toasts.length >= 5) state.toasts.shift();
      state.toasts.push({ ...action.payload, id: Date.now().toString() });
    },
    addSuccessToast(
      state,
      action: PayloadAction<{ title: string; message?: string; duration?: number }>
    ) {
      if (state.toasts.length >= 5) state.toasts.shift();
      state.toasts.push({ id: Date.now().toString(), type: "success", ...action.payload });
    },
    addErrorToast(
      state,
      action: PayloadAction<{ title: string; message?: string }>
    ) {
      if (state.toasts.length >= 5) state.toasts.shift();
      state.toasts.push({ id: Date.now().toString(), type: "error", duration: 6000, ...action.payload });
    },
    removeToast(state, action: PayloadAction<string>) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
    clearAllToasts(state) {
      state.toasts = [];
    },
    openAuthModal(state, action: PayloadAction<"login" | "register">) {
      state.isAuthModalOpen = true;
      state.authModalMode   = action.payload;
    },
    closeAuthModal(state) { state.isAuthModalOpen = false; },
    switchAuthMode(state) {
      state.authModalMode = state.authModalMode === "login" ? "register" : "login";
    },
    toggleMobileMenu(state) { state.isMobileMenuOpen = !state.isMobileMenuOpen; },
    closeMobileMenu(state)  { state.isMobileMenuOpen = false; },
    openMobileMenu(state)   { state.isMobileMenuOpen = true; },
  },
});

export const {
  addToast, addSuccessToast, addErrorToast, removeToast, clearAllToasts,
  openAuthModal, closeAuthModal, switchAuthMode,
  toggleMobileMenu, closeMobileMenu, openMobileMenu,
} = uiSlice.actions;

export const uiReducer = uiSlice.reducer;

export const selectToasts           = (s: RootState) => s.ui.toasts;
export const selectIsAuthModalOpen  = (s: RootState) => s.ui.isAuthModalOpen;
export const selectAuthModalMode    = (s: RootState) => s.ui.authModalMode;
export const selectIsMobileMenuOpen = (s: RootState) => s.ui.isMobileMenuOpen;

export const selectIsPageLoading       = (_: RootState): boolean          => false;
export const selectIsSearchDrawerOpen  = (_: RootState): boolean          => false;
export const selectTheme               = (_: RootState): "light" | "dark" => "light";
export const selectContactModalId      = (_: RootState): string | null    => null;
export const selectCookieConsentDone   = (_: RootState): boolean          => false;
export const selectIsListPropModalOpen = (_: RootState): boolean          => false;


const loadIds = (): string[] => {
  try {
    const saved = localStorage.getItem("domio_favorites");
    return saved ? (JSON.parse(saved) as string[]) : [];
  } catch { return []; }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    propertyIds: loadIds(),
    properties:  [] as Property[],
  },
  reducers: {
    toggleFavorite(state, action: PayloadAction<Property>) {
      const id  = action.payload.id;
      const idx = state.propertyIds.indexOf(id);
      if (idx === -1) {
        state.propertyIds.push(id);
        state.properties.push(action.payload);
      } else {
        state.propertyIds.splice(idx, 1);
        state.properties = state.properties.filter((p) => p.id !== id);
      }
      try {
        localStorage.setItem("domio_favorites", JSON.stringify(state.propertyIds));
      } catch { /* empty */ }
    },
    addFavorite(state, action: PayloadAction<Property>) {
      if (!state.propertyIds.includes(action.payload.id)) {
        state.propertyIds.push(action.payload.id);
        state.properties.push(action.payload);
        try {
          localStorage.setItem("domio_favorites", JSON.stringify(state.propertyIds));
        } catch { /* empty */ }
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      const idx = state.propertyIds.indexOf(action.payload);
      if (idx !== -1) {
        state.propertyIds.splice(idx, 1);
        state.properties = state.properties.filter((p) => p.id !== action.payload);
        try {
          localStorage.setItem("domio_favorites", JSON.stringify(state.propertyIds));
        } catch { /* empty */ }
      }
    },
    clearAllFavorites(state) {
      state.propertyIds = [];
      state.properties  = [];
      try { localStorage.removeItem("domio_favorites"); } catch { /* empty */ }
    },
  },
});

export const {
  toggleFavorite,
  addFavorite,
  removeFavorite,
  clearAllFavorites,
} = favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;

export const selectFavoriteIds   = (s: RootState): string[]  => s.favorites.propertyIds;
export const selectFavoriteProps = (s: RootState): Property[] => s.favorites.properties;
export const selectFavoriteCount = (s: RootState): number     => s.favorites.propertyIds.length;
export const selectIsFavorite    = (id: string) => (s: RootState): boolean =>
  s.favorites.propertyIds.includes(id);

export const selectAddedThisSession = (_: RootState): number => 0;