import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight } from "lucide-react";
import { useScrollAnimation } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const CTASection: React.FC = () => {
  const navigate = useNavigate();
  const { ref, inView } = useScrollAnimation();
  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div ref={ref} initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-white/50 bg-white/10 px-4 py-2 rounded-full mb-6">
            List with Domio
          </span>
          <h2 className="font-display text-display-lg text-white mb-5 leading-tight">
            Sell or Rent Your Property Faster
          </h2>
          <p className="text-white/65 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join over 1,200 verified agents and thousands of landlords who trust Domio to connect them with serious buyers and tenants.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="xl" variant="white" className="text-ink-900"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate("/search")}>
              Browse Properties
            </Button>
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10"
              onClick={() => navigate("/about")}>
              Learn More
            </Button>
          </div>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Free to List", "Professional Photos", "Verified Buyers", "Analytics Dashboard"].map((item) => (
              <span key={item} className="text-white/50 text-sm">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
