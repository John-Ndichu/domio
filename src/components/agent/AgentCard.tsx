import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle, Phone, MessageCircle, Globe, Award } from "lucide-react";
import { Button } from "../ui/Button";
import { StarRating } from "../ui/StarRating";
import type { Agent } from "../../types";

interface AgentCardProps {
  agent: Agent;
  index?: number;
  compact?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, index = 0, compact }) => {
  const callAgent = () => window.open(`tel:${agent.phone}`);
  const waAgent   = () => window.open(`https://wa.me/${agent.whatsapp?.replace(/\D/g, "") ?? agent.phone.replace(/\D/g,"")}`);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300 flex items-center gap-3"
      >
        <div className="relative flex-shrink-0">
          <img src={agent.photo} alt={agent.name}
            className="w-12 h-12 rounded-xl object-cover" />
          {agent.verified && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center ring-2 ring-white">
              <CheckCircle className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-ink-900 text-sm truncate">{agent.name}</p>
          <p className="text-xs text-ink-500 truncate">{agent.agency.name}</p>
          <StarRating rating={agent.rating} size="sm" showNumber />
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={callAgent}
          className="w-9 h-9 rounded-xl bg-primary-50 text-accent hover:bg-accent hover:text-white flex items-center justify-center transition-all flex-shrink-0">
          <Phone className="w-4 h-4" />
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <div className="relative h-24 bg-gradient-to-br from-primary-800 to-accent overflow-hidden">
        {agent.coverPhoto && (
          <img src={agent.coverPhoto} alt="" className="w-full h-full object-cover opacity-30" />
        )}
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "20px 20px" }} />
        {agent.featured && (
          <div className="absolute top-3 right-3 bg-gold text-white text-xs font-bold px-2.5 py-1 rounded-full">
          Featured
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <div className="relative -mt-8 mb-3 flex items-end justify-between">
          <div className="relative">
            <img src={agent.photo} alt={agent.name}
              className="w-16 h-16 rounded-2xl object-cover ring-3 ring-white shadow-md" />
            {agent.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center ring-2 ring-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 px-2.5 py-1.5 rounded-full mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700">{agent.responseTime}</span>
          </div>
        </div>

        <Link to={`/agent/${agent.slug}`}
          className="font-bold text-ink-900 text-base hover:text-accent transition-colors block leading-tight">
          {agent.name}
        </Link>
        <div className="flex items-center gap-1.5 mt-0.5 mb-3">
          <img src={agent.agency.logo} alt={agent.agency.name}
            className="w-4 h-4 rounded object-cover" />
          <span className="text-xs text-ink-500 truncate">{agent.agency.name}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={agent.rating} showNumber />
          <span className="text-xs text-ink-400">({agent.reviewCount} reviews)</span>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Active",  value: agent.activeListings },
            { label: "Sold",    value: agent.soldListings },
            { label: "Rented",  value: agent.rentedListings },
          ].map((s) => (
            <div key={s.label} className="bg-ink-50 rounded-xl p-2.5 text-center">
              <p className="font-bold text-ink-900 text-sm">{s.value}</p>
              <p className="text-xs text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <Globe className="w-3.5 h-3.5 text-ink-400 flex-shrink-0" />
          <span className="text-xs text-ink-500 truncate">{agent.languages.join(", ")}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.specializations.slice(0, 2).map((s) => (
            <span key={s} className="text-xs bg-primary-50 text-primary-700 px-2.5 py-1 rounded-full font-medium">
              {s}
            </span>
          ))}
        </div>

        {agent.awards && agent.awards.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            <Award className="w-3.5 h-3.5 text-gold flex-shrink-0" />
            <span className="text-xs text-ink-500 truncate">{agent.awards[0].title} {agent.awards[0].year}</span>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="primary" size="sm" fullWidth leftIcon={<Phone className="w-3.5 h-3.5" />} onClick={callAgent}>
            Call
          </Button>
          <Button variant="outline" size="sm" fullWidth leftIcon={<MessageCircle className="w-3.5 h-3.5" />} onClick={waAgent}>
            WhatsApp
          </Button>
        </div>
      </div>
    </motion.div>
  );
};