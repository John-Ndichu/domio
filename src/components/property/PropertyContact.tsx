import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Mail, CheckCircle, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../ui/Button";
import { useAppDispatch } from "../../hooks";
import { addToast } from "../../store/slices/uiSlice";
import type { Property } from "../../types";
import { StarRating } from "../ui/StarRating";
import { formatPriceWithPeriod } from "../../utils/format.utils";

export const PropertyContact: React.FC<{ property: Property }> = ({ property }) => {
  const { agent }  = property;
  const dispatch   = useAppDispatch();
  const [showPhone, setShowPhone] = useState(false);
  const [msgOpen,   setMsgOpen]   = useState(false);
  const [message,   setMessage]   = useState("");
  const [sending,   setSending]   = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setMessage("");
    setMsgOpen(false);
    dispatch(addToast({
      type: "success",
      title: "Message sent!",
      message: `${agent.name} will respond ${agent.responseTime.toLowerCase()}.`,
    }));
  };

  return (
    <div className="bg-white rounded-3xl border border-ink-100 shadow-card overflow-hidden">

      <div className="bg-gradient-to-br from-primary-800 to-accent p-5 text-white">
        <p className="text-2xl font-bold">
          {formatPriceWithPeriod(property.price.amount, property.price.currency, property.price.period)}
        </p>
        {property.price.pricePerSqft && (
          <p className="text-sm text-white/70 mt-0.5">KSh {property.price.pricePerSqft.toLocaleString()} per sqft</p>
        )}
        {property.price.serviceCharge && (
          <p className="text-xs text-white/50 mt-1">
            + KSh {property.price.serviceCharge.toLocaleString()}/month service charge
          </p>
        )}
      </div>

      <div className="p-5">
        {/* Agent info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-shrink-0">
            <img src={agent.photo} alt={agent.name}
              className="w-14 h-14 rounded-2xl object-cover" />
            {agent.verified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center ring-2 ring-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-ink-900">{agent.name}</p>
            <p className="text-xs text-ink-500 truncate">{agent.agency}</p>
            <StarRating rating={agent.rating} size="sm" showNumber />
          </div>
          <img src={agent.agencyLogo} alt={agent.agency}
            className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-ink-100" />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-ink-50 rounded-xl py-2.5 text-center">
            <p className="text-base font-bold text-ink-900">{agent.totalListings}</p>
            <p className="text-xs text-ink-500">Listings</p>
          </div>
          <div className="bg-ink-50 rounded-xl py-2.5 text-center">
            <p className="text-base font-bold text-ink-900">{agent.rating}</p>
            <p className="text-xs text-ink-500">Rating</p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5 mb-4">
          <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span className="text-xs font-semibold text-emerald-700">
            Responds {agent.responseTime.toLowerCase()}
          </span>
        </div>

        <p className="text-xs text-ink-400 text-center mb-4">
          Speaks: {agent.languages.join(", ")}
        </p>

        <div className="space-y-2.5">
          <Button fullWidth size="lg" leftIcon={<Phone className="w-4 h-4" />}
            onClick={() => {
              if (showPhone) window.open(`tel:${agent.phone}`);
              else setShowPhone(true);
            }}>
            {showPhone ? agent.phone : "Show Phone Number"}
          </Button>

          <Button fullWidth size="lg" variant="outline"
            leftIcon={<MessageCircle className="w-4 h-4" />}
            onClick={() => window.open(`https://wa.me/${agent.whatsapp?.replace(/\D/g, "") ?? agent.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi, I'm interested in ${property.title}`)}`)}>
            WhatsApp
          </Button>

          <button
            onClick={() => setMsgOpen((o) => !o)}
            className="w-full flex items-center justify-between h-11 px-4 border border-ink-200 rounded-xl text-sm font-semibold text-ink-600 hover:border-accent hover:text-accent transition-all"
          >
            <span className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Agent</span>
            {msgOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {msgOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-3">
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hi ${agent.name}, I'm interested in this property. Please get in touch.`}
                  className="w-full bg-ink-50 border border-ink-200 rounded-2xl px-4 py-3 text-sm text-ink-800 placeholder:text-ink-400 outline-none resize-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
                />
                <Button fullWidth size="md" loading={sending}
                  onClick={handleSend} disabled={!message.trim()}>
                  Send Message
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};