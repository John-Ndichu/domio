/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { SearchFilters } from "../../components/search/SearchFilters";
import { SearchSortBar, SearchHeader, NoResults } from "../../components/search/SearchSort";
import { useAppDispatch, useAppSelector, useBodyScrollLock } from "../../hooks";
import { sel } from "../../store/selectors";
import { setFilters, resetFilters, setPage, setViewMode } from "../../store/slices/propertiesSlice";
import { fetchProperties } from "../../store/slices/propertiesSlice";
import type { ListingPurpose, PropertyFilters, PropertySortOption } from "../../types";
import { PropertyCardSkeleton } from "../../components/property/PropertyCardSkeleton";
import { Pagination } from "../../components/ui/Pagination";
import { PropertyCard } from "../../components/property/PropertyCard";
import { cn } from "../../utils/clsx.utils";

const Search: React.FC = () => {
  const dispatch     = useAppDispatch();
  const [params]     = useSearchParams();
  const properties   = useAppSelector(sel.properties);
  const loading      = useAppSelector(sel.loading);
  const filters      = useAppSelector(sel.filters);
  const total        = useAppSelector(sel.total);
  const totalPages   = useAppSelector(sel.totalPages);
  const page         = useAppSelector(sel.page);
  const viewMode     = useAppSelector(sel.viewMode);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useBodyScrollLock(mobileFiltersOpen);

  useEffect(() => {
    const init: Partial<PropertyFilters> = {};
    if (params.get("purpose"))    init.purpose    = params.get("purpose") as ListingPurpose;
    if (params.get("type"))       init.types      = [params.get("type") as any];
    if (params.get("area"))       init.areas      = [params.get("area")!];
    if (params.get("city"))       init.city       = params.get("city")!;
    if (params.get("completion")) init.completion = params.get("completion") as any;
    if (Object.keys(init).length) dispatch(setFilters(init));
    else dispatch(fetchProperties(filters));
  }, []); // eslint-disable-line

  const handleFilterChange = useCallback((f: Partial<PropertyFilters>) => {
    dispatch(setFilters(f));
  }, [dispatch]);

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handlePageChange = useCallback((p: number) => {
    dispatch(setPage(p));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dispatch]);

  const skeletonCount = viewMode === "list" ? 6 : 9;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-ink-50">
        <div className="bg-white border-b border-ink-100 sticky top-16 lg:top-[72px] z-40">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <SearchHeader
              purpose={filters.purpose}
              type={filters.types?.[0]}
              area={filters.areas?.[0]}
              city={filters.city}
            />
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">

            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-[136px] rounded-2xl overflow-hidden bg-white max-h-[calc(100vh-160px)] overflow-y-auto filter-scroll">
                <SearchFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onReset={handleReset}
                />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              <SearchSortBar
                total={total}
                sortBy={filters.sortBy}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                viewMode={viewMode as any}
                onSortChange={(s: PropertySortOption) => dispatch(setFilters({ sortBy: s }))}
                onViewChange={(v) => dispatch(setViewMode(v))}
                loading={loading}
                onFilterOpen={() => setMobileFiltersOpen(true)}
              />

              <div className="mt-5">
                {loading ? (
                  <div className={cn(
                    "grid gap-5",
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                  )}>
                    {Array.from({ length: skeletonCount }).map((_, i) => (
                      <PropertyCardSkeleton key={i} />
                    ))}
                  </div>
                ) : properties.length === 0 ? (
                  <NoResults onReset={handleReset} />
                ) : (
                  <motion.div
                    layout
                    className={cn(
                      "grid gap-5",
                      viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
                    )}
                  >
                    <AnimatePresence mode="popLayout">
                      {properties.map((p, i) => (
                        <PropertyCard
                          key={p.id}
                          property={p}
                          index={i}
                          layout={viewMode === "list" ? "list" : "grid"}
                        />
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>

              {!loading && totalPages > 1 && (
                <div className="mt-10">
                  <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink-950/60 z-[90] lg:hidden backdrop-blur-sm"
              onClick={() => setMobileFiltersOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed top-0 left-0 h-full w-[320px] z-[91] lg:hidden shadow-hero bg-white flex flex-col"
            >
              <SearchFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleReset}
                isMobile
                onClose={() => setMobileFiltersOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};

export default Search;