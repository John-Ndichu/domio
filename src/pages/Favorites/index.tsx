import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Search } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { PropertyCard } from "../../components/property/PropertyCard";
import { Button } from "../../components/ui/Button";
import { useAppSelector } from "../../hooks";
import { sel } from "../../store/selectors";

const Favorites: React.FC = () => {
  const favProps = useAppSelector(sel.favProps);

  return (
    <PageWrapper>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[60vh]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-display-sm text-ink-900">Saved Properties</h1>
            <p className="text-ink-500 mt-1">
              {favProps.length === 0
                ? "You haven't saved any properties yet"
                : `${favProps.length} saved propert${favProps.length === 1 ? "y" : "ies"}`}
            </p>
          </div>
          {favProps.length > 0 && (
            <Link to="/search">
              <Button variant="outline" leftIcon={<Search className="w-4 h-4" />}>
                Browse More
              </Button>
            </Link>
          )}
        </div>

        {favProps.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-red-300" />
            </div>
            <h2 className="font-display text-2xl text-ink-800 mb-3">No saved properties yet</h2>
            <p className="text-ink-500 max-w-sm mb-8 text-sm leading-relaxed">
              Tap the heart icon on any property to save it here for easy access later.
            </p>
            <Link to="/search">
              <Button size="lg" leftIcon={<Search className="w-4 h-4" />}>
                Start Browsing Properties
              </Button>
            </Link>
          </motion.div>
        )}

        {favProps.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {favProps.map((property, i) => (
                <PropertyCard key={property.id} property={property} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Favorites;