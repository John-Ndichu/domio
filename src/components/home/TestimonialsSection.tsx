import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TESTIMONIALS } from "../../data/agents.data";
import { useScrollAnimation } from "../../hooks";
import { SectionHeader } from "../common/SectionHeader";
import { cn } from "../../utils/clsx.utils";

export const TestimonialsSection: React.FC = () => {
  const { ref, inView } = useScrollAnimation();
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="py-20 bg-ink-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div ref={ref} initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <SectionHeader
            tag="Client Stories"
            title="Real experiences from real people who found their perfect property on Domio."
            align="center"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {TESTIMONIALS.map((t, i) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { ref: tRef, inView: tIn } = useScrollAnimation();
            return (
              <motion.div key={t.id} ref={tRef}
                initial={{ opacity: 0, y: 28 }} animate={tIn ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={cn(
                  "bg-white rounded-3xl p-6 transition-all duration-300 h-full flex flex-col",
                  active === i && "ring-2 ring-accent"
                )}
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-ink-700 leading-relaxed italic flex-1">"{t.comment}"</p>
                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-ink-100">
                  <img src={t.photo} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-ink-900 text-sm">{t.name}</p>
                    <p className="text-xs text-ink-500">{t.role}{t.company ? ` · ${t.company}` : ""}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className={cn("h-1.5 rounded-full transition-all duration-300",
                i === active ? "w-8 bg-accent" : "w-2 bg-ink-300")} />
          ))}
        </div>
      </div>
    </section>
  );
};