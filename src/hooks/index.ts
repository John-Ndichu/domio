import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchProperties, fetchFeaturedProperties, fetchPremiumProperties, setFilters, setPage, setViewMode } from "../store/slices/propertiesSlice";
import { toggleFavorite } from "../store/slices/uiSlice";
import { sel } from "../store/selectors";
import type { Property, PropertyFilters } from "../types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useDebounce<T>(value: T, delay = 400): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const h = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(h);
  }, [value, delay]);
  return debouncedValue;
}

export function useProperties() {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(sel.properties);
  const loading    = useAppSelector(sel.loading);
  const filters    = useAppSelector(sel.filters);
  const total      = useAppSelector(sel.total);
  const totalPages = useAppSelector(sel.totalPages);
  const page       = useAppSelector(sel.page);
  const viewMode   = useAppSelector(sel.viewMode);
  const search = useCallback((f: Partial<PropertyFilters>) => { dispatch(setFilters(f)); }, [dispatch]);
  const changePage = useCallback((p: number) => {
    dispatch(setPage(p));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);
  const changeViewMode = useCallback((m: "grid"|"list"|"map") => { dispatch(setViewMode(m)); }, [dispatch]);
  useEffect(() => { dispatch(fetchProperties(filters)); }, [dispatch, filters]);
  return { properties, loading, filters, total, totalPages, page, viewMode, search, changePage, changeViewMode };
}

export function useFeaturedProperties(limit = 6) {
  const dispatch = useAppDispatch();
  const featured = useAppSelector(sel.featured);
  const loading  = useAppSelector(sel.featuredLoading);
  useEffect(() => { dispatch(fetchFeaturedProperties(limit)); }, [dispatch, limit]);
  return { featured, loading };
}

export function usePremiumProperties(limit = 4) {
  const dispatch = useAppDispatch();
  const premium  = useAppSelector(sel.premium);
  useEffect(() => { dispatch(fetchPremiumProperties(limit)); }, [dispatch, limit]);
  return { premium };
}


export function useFavorites() {
  const dispatch = useAppDispatch();
  const favIds   = useAppSelector(sel.favIds);
  const favProps = useAppSelector(sel.favProps);
  const isFav    = useCallback((id: string) => favIds.includes(id), [favIds]);
  const toggle   = useCallback((p: Property) => dispatch(toggleFavorite(p)), [dispatch]);
  return { favIds, favProps, isFav, toggle };
}

export function useScrollAnimation(threshold = 0.12) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true });
  return { ref, inView };
}

export function useParallax(speed = 0.3) {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const h = () => setOffset(window.scrollY * speed);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [speed]);
  return offset;
}

export function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const h = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return size;
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [locked]);
}

export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) callback();
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [callback]);
  return ref;
}

export function useScrollPast(threshold = 80): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const handler = () => setPast(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return past;
}