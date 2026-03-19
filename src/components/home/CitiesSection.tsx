import { useNavigate } from "react-router-dom";
import { useScrollAnimation } from "../../hooks";
import { motion } from "framer-motion";
import { SectionHeader } from "../common/SectionHeader";
import { CITIES } from "../../data/agents.data";

export const CitiesSection: React.FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useScrollAnimation();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader
            tag="Browse by City"
            title="Explore Property Markets"
            align="center"
          />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
          {CITIES.map((city, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref: cRef, inView: cIn } = useScrollAnimation();
            return (
              <motion.div key={city.id} ref={cRef}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={cIn ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: i * 0.07, duration: 0.5 }}
              >
                <motion.button
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/search?city=${city.slug}`)}
                  className="group relative w-full rounded-2xl overflow-hidden shadow-card aspect-[3/4] cursor-pointer"
                >
                  <img src={city.image} alt={city.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-left">
                    <p className="font-bold text-white text-sm leading-tight">{city.name}</p>
                    <p className="text-white/60 text-xs mt-0.5">{city.propertyCount.toLocaleString()} listings</p>
                  </div>
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};