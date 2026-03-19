import { motion } from "framer-motion";
import { AgentCard } from "../agent/AgentCard";
import type { Agent } from "../../types";

export const AgentsSection: React.FC = () => {
  const { AGENTS } = require("../../data");
  const featured = (AGENTS as Agent[]).filter((a) => a.featured);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-bold tracking-widest uppercase text-accent mb-3">Our Team</p>
          <h2 className="text-display-md font-display text-ink-900">Meet Our Top Agents</h2>
          <p className="mt-3 text-ink-500 max-w-lg mx-auto">Verified professionals with deep local knowledge and proven track records.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((agent, i) => (
            <AgentCard key={agent.id} agent={agent} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};