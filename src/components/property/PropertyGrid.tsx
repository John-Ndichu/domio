import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PropertyCard, PropertyCardSkeleton } from "./PropertyCard";
import type { Property } from "../../types";
import { cn } from "../../utils/clsx.utils";
import { SearchIcon} from "lucide-react";
import { EmptyState } from "../common/EmptyState";


interface PropertyGridProps {
  properties: Property[];
  isLoading?: boolean;
  skeletonCount?: number;
  viewMode?: "grid" | "list";
  className?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: { label: string; href?: string; onClick?: () => void };
}

export const PropertyGrid: React.FC<PropertyGridProps> = ({
  properties,
  isLoading,
  skeletonCount = 8,
  viewMode = "grid",
  className,
  emptyTitle = "No Properties Found",
  emptyDescription = "Try adjusting your search filters to find more properties.",
  emptyAction,
}) => {
  const gridClass = cn(
    viewMode === "grid"
      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      : "flex flex-col gap-4",
    className
  );

  if (isLoading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!properties.length) {
    return (
      <EmptyState
        icon={SearchIcon}
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
        className={className}
      />
    );
  }

  return (
    <motion.div layout className={gridClass}>
      <AnimatePresence mode="popLayout">
        {properties.map((p, i) => (
          <PropertyCard
            key={p.id}
            property={p}
            index={i}
            layout={viewMode}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};