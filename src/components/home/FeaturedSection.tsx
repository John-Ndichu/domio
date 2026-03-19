import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector, useScrollAnimation } from "../../hooks";
import { useEffect, useState } from "react";
import { fetchFeaturedProperties } from "../../store/slices/propertiesSlice";
import { motion } from "framer-motion";
import { SectionHeader } from "../common/SectionHeader";
import { Button } from "../ui/Button";
import { PropertyCardSkeleton } from "../property/PropertyCardSkeleton";
import { ArrowRight } from "lucide-react";
import { PropertyCard } from "../property/PropertyCard";
import type { Property } from "../../types";
import { cn } from "../../utils/clsx.utils";
import { selectFeaturedLoading, selectFeaturedProps } from "../../store/selectors";

export const FeaturedSection: React.FC = () => {
  const dispatch = useAppDispatch();
  const featured = useAppSelector(selectFeaturedProps);
  const loading  = useAppSelector(selectFeaturedLoading);
  const navigate = useNavigate();
  const [tab, setTab] = useState<"all" | "rent" | "sale">("all");
  const { ref, inView } = useScrollAnimation();

  useEffect(() => { dispatch(fetchFeaturedProperties(8)); }, [dispatch]);

  const filtered = tab === "all" ? featured : featured.filter((p) => p.purpose === tab);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader
            tag="Featured Listings"
            title="Curated selection of premium verified properties."
            align="center"
          />

          <div className="flex gap-2 mt-7 mb-8 justify-center">
            {(["all","rent","sale"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm border transition-all duration-200",
                  tab === t ? "bg-accent border-accent text-white shadow-blue" : "border-ink-200 text-ink-700 hover:border-accent hover:text-accent"
                )}>
                {t === "all" ? "All Properties" : t === "rent" ? "For Rent" : "For Sale"}
              </button>
            ))}
          </div>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <PropertyCardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.slice(0, 8).map((p: Property, i: number | undefined) => (
              <PropertyCard key={p.id} property={p} index={i} />
            ))}
          </motion.div>
        )}

        <div className="text-center mt-10">
          <Button className="text-white" size="lg" onClick={() => navigate("/search")} rightIcon={<ArrowRight className="w-4 h-4" />}>
            Explore All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};