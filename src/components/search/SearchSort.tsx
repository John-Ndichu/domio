import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, List, Map, ArrowUpDown } from "lucide-react";
import { SORT_OPTIONS } from "../../constants";
import type { PropertySortOption } from "../../types";
import { cn } from "../../utils/clsx.utils";

interface SearchSortProps {
  total: number;
  sortBy?: PropertySortOption;
  viewMode: "grid" | "list" | "map";
  onSortChange: (s: PropertySortOption) => void;
  onViewChange: (v: "grid" | "list" | "map") => void;
  loading?: boolean;
  onFilterOpen?: () => void;
}

export const SearchSortBar: React.FC<SearchSortProps> = ({
  total, sortBy, viewMode, onSortChange, onViewChange, loading, onFilterOpen,
}) => (
  <div className="flex items-center justify-between gap-4 py-3 border-b border-ink-100">
    <div className="flex items-center gap-3">
      {onFilterOpen && (
        <button
          onClick={onFilterOpen}
          className="lg:hidden flex items-center gap-2 h-9 px-3.5 bg-white border border-ink-200 rounded-xl text-sm font-semibold text-ink-700 hover:border-accent transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 12h10M11 20h2" />
          </svg>
          Filters
        </button>
      )}
      <p className="text-sm text-ink-600">
        {loading ? (
          <span className="inline-block w-16 h-4 skeleton rounded" />
        ) : (
          <>
            <span className="font-bold text-ink-900">{total.toLocaleString()}</span>
            {" "}propert{total === 1 ? "y" : "ies"} found
          </>
        )}
      </p>
    </div>

    <div className="flex items-center gap-2">
      <div className="relative hidden sm:flex items-center">
        <ArrowUpDown className="absolute left-3 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
        <select
          value={sortBy ?? "date_desc"}
          onChange={(e) => onSortChange(e.target.value as PropertySortOption)}
          className="h-9 pl-8 pr-4 bg-white border border-ink-200 rounded-xl text-sm font-semibold text-ink-700 appearance-none outline-none hover:border-accent focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all cursor-pointer"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center bg-ink-100 rounded-xl p-1 gap-0.5">
        {([
          { mode: "grid", Icon: LayoutGrid },
          { mode: "list", Icon: List },
          { mode: "map",  Icon: Map },
        ] as const).map(({ mode, Icon }) => (
          <button
            key={mode}
            onClick={() => onViewChange(mode)}
            className={cn(
              "w-8 h-7 rounded-lg flex items-center justify-center transition-all duration-200",
              viewMode === mode
                ? "bg-white shadow-sm text-ink-900"
                : "text-ink-500 hover:text-ink-700"
            )}
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
    </div>
  </div>
);

interface SearchHeaderProps {
  purpose?: string;
  type?: string;
  area?: string;
  city?: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({ purpose, type, area, city }) => {
  const heading = [
    type ? `${type.charAt(0).toUpperCase() + type.slice(1)}s` : "Properties",
    "for",
    purpose === "sale" ? "Sale" : purpose === "shortterm" ? "Short Term" : "Rent",
    area ? `in ${area}` : city ? `in ${city}` : "in Kenya",
  ].join(" ");

  return (
    <div className="pb-4">
      <h1 className="font-display text-display-sm text-ink-900 leading-tight">{heading}</h1>
      <p className="text-sm text-ink-500 mt-1">
        Browse verified listings from trusted agents across Kenya
      </p>
    </div>
  );
};

export const NoResults: React.FC<{ onReset?: () => void }> = ({ onReset }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center justify-center py-24 px-8 text-center"
  >
    <h3 className="font-display text-2xl text-ink-900 mb-2">No properties found</h3>
    <p className="text-ink-500 text-sm max-w-sm mb-6">
      Try adjusting your search filters or expanding your search area to find more properties.
    </p>
    {onReset && (
      <button
        onClick={onReset}
        className="h-10 px-6 bg-accent text-white rounded-xl text-sm font-semibold hover:bg-accent-dark transition-colors"
      >
        Reset Filters
      </button>
    )}
  </motion.div>
);