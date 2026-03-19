import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";

const COLS = {
  "Property Types": [
    { label: "Apartments",   href: "/search?type=apartment" },
    { label: "Villas",       href: "/search?type=villa" },
    { label: "Townhouses",   href: "/search?type=townhouse" },
    { label: "Penthouses",   href: "/search?type=penthouse" },
    { label: "Studios",      href: "/search?type=studio" },
    { label: "Land & Plots", href: "/search?type=land" },
  ],
  "Popular Areas": [
    { label: "Westlands",  href: "/search?area=westlands" },
    { label: "Karen",      href: "/search?area=karen" },
    { label: "Kilimani",   href: "/search?area=kilimani" },
    { label: "Lavington",  href: "/search?area=lavington" },
    { label: "Muthaiga",   href: "/search?area=muthaiga" },
    { label: "Runda",      href: "/search?area=runda" },
  ],
  "Company": [
    { label: "About Domio",   href: "/about" },
    { label: "Find Agents",   href: "/agents" },
    { label: "List Property", href: "/list" },
    { label: "Contact Us",    href: "/contact" },
    { label: "Careers",       href: "/careers" },
  ],
  "Support": [
    { label: "Help Centre",    href: "/help" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use",   href: "/terms" },
    { label: "Sitemap",        href: "/sitemap" },
  ],
};

export const Footer: React.FC = () => (
  <footer className="bg-ink-950 text-white">
    <div className="border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl text-white">Get the latest listings in your inbox</h3>
            <p className="text-sm text-white/50 mt-1">Weekly alerts, market insights and exclusive deals.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input type="email" placeholder="Your email address" className="h-11 flex-1 md:w-72 bg-white/10 border border-white/15 rounded-xl px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent transition-all" />
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-11 px-5 bg-accent hover:bg-accent-dark rounded-xl text-sm font-semibold text-white transition-colors flex items-center gap-2">
              Subscribe <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>

    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary-800 flex items-center justify-center">
              <span className="text-white font-bold text-lg font-display">D</span>
            </div>
            <span className="text-xl font-bold font-display text-white">Domio</span>
          </Link>
          <p className="text-sm text-white/50 leading-relaxed mb-6">Kenya's most trusted real estate platform. Find verified properties for rent and sale across the country.</p>
          <div className="space-y-2.5 text-sm text-white/50">
            {[{ icon: <MapPin className="w-4 h-4 text-accent" />, text: "Westgate Mall, Westlands, Nairobi" },
              { icon: <Phone className="w-4 h-4 text-accent" />,  text: "+254 20 123 4567" },
              { icon: <Mail className="w-4 h-4 text-accent" />,   text: "hello@domio.ke" }].map((item, i) => (
              <div key={i} className="flex items-center gap-2.5">{item.icon}<span>{item.text}</span></div>
            ))}
          </div>
          <div className="flex gap-2 mt-6">
            {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
              <motion.a key={i} href="#" whileHover={{ scale: 1.1, y: -2 }} className="w-9 h-9 rounded-xl bg-white/8 hover:bg-accent flex items-center justify-center text-white/50 hover:text-white transition-all">
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>
        {Object.entries(COLS).map(([title, links]) => (
          <div key={title}>
            <h4 className="text-xs font-bold text-white mb-4 tracking-widest uppercase">{title}</h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sm text-white/45 hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>

    <div className="border-t border-white/8">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-white/30">© {new Date().getFullYear()} Domio Properties Ltd. All rights reserved.</p>
        <div className="flex items-center gap-4 text-xs text-white/30">
          {["Privacy Policy","Terms of Use","Cookies"].map((label, i) => (
            <React.Fragment key={label}>
              {i > 0 && <span>·</span>}
              <Link to={`/${label.toLowerCase().replace(/ /g,"-")}`} className="hover:text-white/70 transition-colors">{label}</Link>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  </footer>
);