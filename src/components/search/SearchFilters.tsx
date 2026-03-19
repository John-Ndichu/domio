import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import { PROPERTY_TYPES, AMENITY_LIST, NAIROBI_AREAS } from "../../constants";
import { Button } from "../ui/Button";
import { RangeSlider, Checkbox } from "../ui/Input";
import type { FurnishingStatus, PropertyFilters, PropertyType } from "../../types";
import { formatPrice } from "../../utils/format.utils";
import { cn } from "../../utils/clsx.utils";

interface SearchFiltersProps {
  filters: PropertyFilters;
  onChange: (f: Partial<PropertyFilters>) => void;
  onReset: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const PRICE_MAX_RENT = 500000;
const PRICE_MAX_SALE = 200000000;
const AREA_MAX       = 20000;

const FilterSection: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-100 pb-5 mb-5 last:border-none last:pb-0 last:mb-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full mb-4 group"
      >
        <h3 className="text-sm font-bold text-ink-800 uppercase tracking-wide">{title}</h3>
        {open ? (
          <ChevronUp className="w-4 h-4 text-ink-400 group-hover:text-ink-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-ink-400 group-hover:text-ink-600" />
        )}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters, onChange, onReset, isMobile, onClose,
}) => {
  const isRent     = filters.purpose !== "sale";
  const priceMax   = isRent ? PRICE_MAX_RENT : PRICE_MAX_SALE;
  const priceRange: [number, number] = [filters.minPrice ?? 0, filters.maxPrice ?? priceMax];
  const areaRange: [number, number]  = [filters.minArea ?? 0, filters.maxArea ?? AREA_MAX];

  const toggleType = (type: PropertyType) => {
    const curr = filters.types ?? [];
    onChange({ types: curr.includes(type) ? curr.filter((t) => t !== type) : [...curr, type] });
  };

  const toggleFurnishing = (f: FurnishingStatus) => {
    const curr = filters.furnishing ?? [];
    onChange({ furnishing: curr.includes(f) ? curr.filter((x) => x !== f) : [...curr, f] });
  };

  const toggleAmenity = (id: string) => {
    const curr = filters.amenities ?? [];
    onChange({ amenities: curr.includes(id) ? curr.filter((a) => a !== id) : [...curr, id] });
  };

  const toggleArea = (area: string) => {
    const curr = filters.areas ?? [];
    onChange({ areas: curr.includes(area) ? curr.filter((a) => a !== area) : [...curr, area] });
  };

  const activeCount = [
    (filters.types?.length ?? 0) > 0,
    !!filters.minPrice || !!filters.maxPrice,
    !!filters.minBeds,
    (filters.furnishing?.length ?? 0) > 0,
    (filters.amenities?.length ?? 0) > 0,
    (filters.areas?.length ?? 0) > 0,
    !!filters.minArea || !!filters.maxArea,
  ].filter(Boolean).length;

  return (
    <div className="bg-white h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-ink-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4.5 h-4.5 text-accent" />
          <span className="font-bold text-ink-900 text-base">Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <button onClick={onReset} className="text-sm text-accent hover:text-accent-dark  transition-colors">
              Reset all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-ink-100 flex items-center justify-center text-ink-500">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-0">

        <FilterSection title="Property Type">
          <div className="grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map((pt) => {
              const active = filters.types?.includes(pt.value as PropertyType);
              return (
                <motion.button
                  key={pt.value}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleType(pt.value as PropertyType)}
                  className={cn(
                    "h-9 px-3 rounded-xl text-sm  border-2 transition-all duration-200 text-left",
                    active
                      ? "border-accent bg-primary-50 text-accent"
                      : "border-ink-200 text-ink-600 hover:border-ink-300 hover:text-ink-800"
                  )}
                >
                  {pt.label}
                </motion.button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Price Range">
          <RangeSlider
            min={0}
            max={priceMax}
            step={isRent ? 5000 : 500000}
            value={priceRange}
            onChange={([min, max]) => onChange({ minPrice: min, maxPrice: max === priceMax ? undefined : max })}
            format={(v) => formatPrice(v, "KES", true)}
          />
          <div className="flex gap-2 mt-4">
            <div className="flex-1">
              <label className="text-xs text-ink-500 mb-1 block">Min Price</label>
              <div className="h-9 bg-ink-50 border border-ink-200 rounded-xl px-3 flex items-center">
                <span className="text-sm text-ink-700">{formatPrice(priceRange[0], "KES", true)}</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-xs text-ink-500 mb-1 block">Max Price</label>
              <div className="h-9 bg-ink-50 border border-ink-200 rounded-xl px-3 flex items-center">
                <span className="text-sm text-ink-700">
                  {priceRange[1] >= priceMax ? "Any" : formatPrice(priceRange[1], "KES", true)}
                </span>
              </div>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Bedrooms">
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Studio", value: 0 },
              { label: "1+", value: 1 },
              { label: "2+", value: 2 },
              { label: "3+", value: 3 },
              { label: "4+", value: 4 },
              { label: "5+", value: 5 },
            ].map((opt) => {
              const active = filters.minBeds === opt.value;
              return (
                <motion.button
                  key={opt.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onChange({ minBeds: active ? undefined : opt.value })}
                  className={cn(
                    "h-9 w-14 rounded-xl text-sm  border-2 transition-all duration-200",
                    active
                      ? "border-accent bg-primary-50 text-accent"
                      : "border-ink-200 text-ink-600 hover:border-ink-300"
                  )}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Area (sqft)" defaultOpen={false}>
          <RangeSlider
            min={0}
            max={AREA_MAX}
            step={100}
            value={areaRange}
            onChange={([min, max]) => onChange({ minArea: min || undefined, maxArea: max >= AREA_MAX ? undefined : max })}
            format={(v) => `${v.toLocaleString()} sqft`}
          />
        </FilterSection>

        <FilterSection title="Furnishing" defaultOpen={false}>
          <div className="space-y-3">
            {[
              { value: "furnished",       label: "Furnished" },
              { value: "semi_furnished",  label: "Semi-Furnished" },
              { value: "unfurnished",     label: "Unfurnished" },
            ].map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                checked={filters.furnishing?.includes(opt.value as FurnishingStatus) ?? false}
                onChange={() => toggleFurnishing(opt.value as FurnishingStatus)}
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Completion Status" defaultOpen={false}>
          <div className="space-y-3">
            {[
              { value: "ready",    label: "Ready to Move" },
              { value: "off_plan", label: "Off-Plan / Under Construction" },
            ].map((opt) => (
              <Checkbox
                key={opt.value}
                label={opt.label}
                checked={filters.completion === opt.value}
                onChange={() =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  onChange({ completion: filters.completion === opt.value ? undefined : (opt.value as any) })
                }
              />
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Nairobi Areas" defaultOpen={false}>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {NAIROBI_AREAS.map((area) => {
              const active = filters.areas?.includes(area);
              return (
                <motion.button
                  key={area}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => toggleArea(area)}
                  className={cn(
                    "h-8 px-2.5 rounded-lg text-xs  border text-left truncate transition-all",
                    active
                      ? "border-accent bg-primary-50 text-accent"
                      : "border-ink-200 text-ink-600 hover:border-ink-300"
                  )}
                >
                  {area}
                </motion.button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Amenities" defaultOpen={false}>
          <div className="space-y-2.5">
            {AMENITY_LIST.slice(0, 12).map((amenity) => (
              <Checkbox
                key={amenity.id}
                label={`${amenity.icon} ${amenity.name}`}
                checked={filters.amenities?.includes(amenity.id) ?? false}
                onChange={() => toggleAmenity(amenity.id)}
              />
            ))}
          </div>
        </FilterSection>
      </div>

      {isMobile && (
        <div className="p-4 border-t border-ink-100 flex-shrink-0">
          <Button fullWidth size="lg" onClick={onClose}>
            Show Results
          </Button>
        </div>
      )}
    </div>
  );
};