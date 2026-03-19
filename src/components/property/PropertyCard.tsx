import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, type Transition } from "framer-motion";
import { Heart, Eye, MapPin, CheckCircle } from "lucide-react";
import { Badge, type BadgeProps } from "../ui/Badge";

import { useFavorites } from "../../hooks";
import { Skeleton } from "../ui/Skeleton";
import type { ListingPurpose, Property } from "../../types";
import { cn } from "../../utils/clsx.utils";
import {
  getBedroomLabel,
  getPropertyTypeLabel,
  getPurposeColor,
  getPurposeLabel,
} from "../../utils/property.utils";
import { formatDate, formatPriceWithPeriod } from "../../utils/format.utils";

export const PropertyCardSkeleton: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div
    className={cn(
      "bg-white rounded-2xl overflow-hidden ",
      className,
    )}
  >
    <Skeleton className="h-52 w-full" rounded="rounded-none" />
    <div className="p-4 space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-5 w-4/5 rounded-lg" />
      <Skeleton className="h-4 w-1/2 rounded-lg" />
      <div className="flex gap-4">
        <Skeleton className="h-4 w-14 rounded-md" />
        <Skeleton className="h-4 w-12 rounded-md" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-ink-100">
        <Skeleton className="h-6 w-28 rounded-lg" />
        <Skeleton className="h-7 w-20 rounded-xl" />
      </div>
    </div>
  </div>
);

const BedIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M2 4v16M2 8h18a2 2 0 012 2v10M2 8v8a2 2 0 002 2h16M6 8V4" />
    <path d="M12 8V4" />
  </svg>
);
const BathIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 014 0v.5" />
  </svg>
);
const AreaIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 3v18M3 9h6M3 15h6M15 3v6M15 9h6M15 15v6M15 15h6" />
  </svg>
);

interface PropertyCardProps {
  property: Property;
  index?: number;
  layout?: "grid" | "list";
  variant?: "default" | "horizontal";
  className?: string;
}

const getPurposeVariant = (purpose: ListingPurpose): BadgeProps["variant"] => {
  switch (purpose) {
    case "sale":
      return "sale";
    case "rent":
      return "rent";
    case "shortterm":
      return "info";
    default:
      return "muted";
  }
};
export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  index = 0,
  layout = "grid",
  variant = "default",
  className,
}) => {
  const { isFav, toggle } = useFavorites();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgIdx, setImgIdx] = useState(0);
  const favorited = isFav(property.id);
  const isHoriz = layout === "list" || variant === "horizontal";
  const primaryImg = property.images[imgIdx] ?? property.images[0];

  const cardMotion: {
    initial: { opacity: number; y: number };
    animate: { opacity: number; y: number };
    transition: Transition;
  } = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      delay: index * 0.06,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  };

  if (isHoriz) {
    return (
      <motion.div
        {...cardMotion}
        className={cn(
          "property-card bg-white rounded-2xl overflow-hidden  flex flex-col sm:flex-row",
          className,
        )}
      >
        <Link
          to={`/property/${property.slug}`}
          className="relative w-full sm:w-64 flex-shrink-0 h-52 sm:h-auto overflow-hidden bg-ink-100"
        >
          {!imgLoaded && <div className="absolute inset-0 skeleton" />}
          <img
            src={primaryImg?.url}
            alt={primaryImg?.alt}
            onLoad={() => setImgLoaded(true)}
            className={cn(
              "card-image w-full h-full object-cover",
              !imgLoaded && "opacity-0",
            )}
          />
          <div className="absolute inset-0 bg-gradient-card pointer-events-none" />
          {property.isPremium && (
            <div className="absolute top-2.5 left-2.5 badge-premium text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Premium
            </div>
          )}
        </Link>

        <Link
          to={`/property/${property.slug}`}
          className="flex-1 p-5 flex flex-col justify-between min-w-0"
        >
          <div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              <Badge variant={getPurposeVariant(property.purpose)} size="sm">
                {getPurposeLabel(property.purpose)}
              </Badge>
              <Badge variant="muted" size="sm">
                {getPropertyTypeLabel(property.type)}
              </Badge>
              {property.isNew && (
                <Badge variant="new" size="sm">
                  New
                </Badge>
              )}
              {property.isVerified && (
                <span className="flex items-center gap-1 text-xs text-primary-600 ">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            <h3 className=" text-ink-900 text-sm leading-snug line-clamp-2 hover:text-accent transition-colors mb-1.5">
              {property.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-ink-600 mb-3">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="truncate">
                {property.location.area}, {property.location.city}
              </span>
            </div>
            <div className="flex items-center gap-3.5 text-xs text-ink-600">
              {property.bedrooms > 0 && (
                <span className="flex items-center gap-1.5 text-ink-600">
                  <BedIcon />
                  {getBedroomLabel(property.bedrooms)}
                </span>
              )}
              {property.bathrooms > 0 && (
                <span className="flex items-center gap-1.5 text-ink-600">
                  <BathIcon />
                  {property.bathrooms} Bath
                </span>
              )}
              {property.area > 0 && (
                <span className="flex items-center gap-1.5 text-ink-600">
                  <AreaIcon />
                  {property.area.toLocaleString()} sqft
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-ink-100">
            <div>
              <p className="text-lg font-bold text-ink-900">
                {formatPriceWithPeriod(
                  property.price.amount,
                  property.price.currency,
                  property.price.period,
                )}
              </p>
              {property.price.pricePerSqft && (
                <p className="text-xs text-ink-800">
                  KSh {property.price.pricePerSqft.toLocaleString()}/sqft
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-800">
              <Eye className="w-3.5 h-3.5" />
              <span>
                {property.views >= 1000
                  ? `${(property.views / 1000).toFixed(1)}k`
                  : property.views}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      {...cardMotion}
      className={cn(
        "property-card bg-white rounded-2xl overflow-hidden  group",
        className,
      )}
    >
      <Link
        to={`/property/${property.slug}`}
        className="block relative h-52 overflow-hidden bg-ink-100"
      >
        {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        <img
          src={primaryImg?.url}
          alt={primaryImg?.alt}
          onLoad={() => setImgLoaded(true)}
          className={cn(
            "card-image w-full h-full object-cover",
            !imgLoaded && "opacity-0",
          )}
        />

        <div className="absolute inset-0 bg-gradient-card pointer-events-none" />

        <div className="absolute bottom-2.5 left-2.5">
          <span
            className={cn(
              "text-xs px-2.5 py-1 rounded-full",
              getPurposeColor(property.purpose),
            )}
          >
            {getPurposeLabel(property.purpose)}
          </span>
        </div>

        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          {property.isPremium && (
            <span className="badge-premium text-white text-xs font-bold px-2.5 py-1 rounded-full">
              Premium
            </span>
          )}
          {property.isNew && (
            <span className="bg-emerald-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
              New
            </span>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={(e) => {
            e.preventDefault();
            toggle(property);
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={favorited ? "on" : "off"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              <Heart
                className={cn(
                  "w-4 h-4 transition-colors",
                  favorited ? "fill-red-500 text-red-500" : "text-ink-800",
                )}
              />
            </motion.span>
          </AnimatePresence>
        </motion.button>

        {property.images.length > 1 && (
          <div className="absolute bottom-2.5 right-2.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {property.images.slice(0, 5).map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.preventDefault();
                  setImgIdx(i);
                }}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === imgIdx ? "w-4 bg-white" : "w-1.5 bg-white/60",
                )}
              />
            ))}
          </div>
        )}
      </Link>

      <Link to={`/property/${property.slug}`} className="block p-4">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <Badge variant="muted" size="sm">
            {getPropertyTypeLabel(property.type)}
          </Badge>
          {property.isVerified && (
            <span className="flex items-center gap-1 text-xs text-primary-600 ">
              <CheckCircle className="w-3 h-3" /> Verified
            </span>
          )}
          {property.furnishing === "furnished" && (
            <Badge variant="info" size="sm">
              Furnished
            </Badge>
          )}
        </div>

        <h3 className=" text-ink-900 text-sm leading-snug line-clamp-2 hover:text-accent transition-colors mb-1.5">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-xs text-ink-600 mb-3">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-ink-800" />
          <span className="truncate">
            {property.location.area}, {property.location.city}
          </span>
        </div>

        <div className="flex items-center gap-3.5 text-xs text-ink-600 mb-3.5">
          {property.bedrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BedIcon />
              {getBedroomLabel(property.bedrooms)}
            </span>
          )}
          {property.bathrooms > 0 && (
            <span className="flex items-center gap-1.5">
              <BathIcon />
              {property.bathrooms}
            </span>
          )}
          {property.area > 0 && (
            <span className="flex items-center gap-1.5">
              <AreaIcon />
              {property.area.toLocaleString()} sqft
            </span>
          )}
        </div>

        <div className="flex items-end justify-between pt-3 border-t border-ink-100">
          <div>
            <p className="text-base font-bold text-ink-900 leading-tight">
              {formatPriceWithPeriod(
                property.price.amount,
                property.price.currency,
                property.price.period,
              )}
            </p>
            {property.price.pricePerSqft && property.purpose === "sale" && (
              <p className="text-xs text-ink-800 mt-0.5">
                KSh {property.price.pricePerSqft.toLocaleString()}/sqft
              </p>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-ink-800">
            <Eye className="w-3.5 h-3.5" />
            <span>
              {property.views >= 1000
                ? `${(property.views / 1000).toFixed(1)}k`
                : property.views}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={property.agent.photo}
            alt={property.agent.name}
            className="w-6 h-6 rounded-full object-cover ring-1 ring-ink-200"
          />
          <span className="text-xs text-ink-800 truncate max-w-[120px]">
            {property.agent.name}
          </span>
        </div>
        <span className="text-xs text-ink-800">
          {formatDate(property.createdAt)}
        </span>
      </div>
    </motion.div>
  );
};
