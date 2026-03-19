/* eslint-disable react-hooks/refs */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAppDispatch, useAppSelector, useScrollPast, useBodyScrollLock } from "../../hooks";
import { sel } from "../../store/selectors";
import { toggleMobileMenu, closeMobileMenu, openAuthModal } from "../../store/slices/uiSlice";
import { Button } from "../ui/Button";
import { cn } from "../../utils/clsx.utils";
import type { NavLink } from "../../types/nav.types";
import { ArrowRight, ChevronDown, DollarSign, Globe, Heart, LogIn, Menu, Ruler, Search, X } from "lucide-react";
import { AREA_UNITS, CURRENCIES, LANGUAGES } from "../../constants";
import { NAV } from "../../constants/nav";
import MobileNav from "./MobileNav";

interface SettingGroupProps {
  label: string;
  icon: React.ReactNode;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

const SettingGroup: React.FC<SettingGroupProps> = ({ label, icon, options, value, onChange }) => (
  <div>
    <p className="flex items-center gap-1.5 text-xs font-bold text-ink-800 uppercase tracking-widest mb-2">
      {icon} {label}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs  border-2 transition-all",
            value === o
              ? "border-accent bg-primary-50 text-accent"
              : "border-ink-200 text-ink-800 hover:border-accent/40"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  </div>
);

const Dropdown: React.FC<{ link: NavLink; isOpen: boolean; onClose: () => void }> = ({
  link, isOpen, onClose,
}) => {
  if (!link.children) return null;
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{   opacity: 0, y: 6,  scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "absolute top-full mt-2 bg-white rounded-2xl shadow-hero border border-neutral-300 overflow-hidden z-50",
            link.mega ? "right-0 w-[560px]" : "left-0 min-w-[300px]"
          )}
        >
          <div className="px-5 py-3 bg-gradient-to-r from-primary-50 to-white border-b border-neutral-300">
            <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">{link.label}</p>
          </div>

          <div className={cn("p-2.5", link.mega && "grid grid-cols-2 gap-0.5")}>
            {link.children.map((child) => (
              <Link
                key={child.href}
                to={child.href}
                onClick={onClose}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-primary-50 group transition-all duration-150"
              >
                <span className="w-8 h-8 rounded-lg bg-primary-100 group-hover:bg-primary-200 flex items-center justify-center text-primary-600 flex-shrink-0 mt-0.5 transition-colors">
                  {child.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm  text-ink-800 group-hover:text-primary-700 transition-colors leading-tight">
                      {child.label}
                    </span>
                    {child.badge && (
                      <span className="text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full flex-shrink-0">
                        {child.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-800 mt-0.5 leading-tight">{child.description}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-ink-300 group-hover:text-primary-400 opacity-0 group-hover:opacity-100 mt-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>

          <div className="px-5 py-3 border-t border-neutral-300 bg-ink-50/50">
            <Link
              to={link.href ?? "/search"}
              onClick={onClose}
              className="text-xs  text-accent hover:text-accent-dark flex items-center gap-1 transition-colors"
            >
              View all {link.label.toLowerCase()} listings
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const SiteSettings: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [lang, setLang] = useState("English");
  const [curr, setCurr] = useState("KES");
  const [unit, setUnit] = useState("Square Feet");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0,  scale: 1    }}
          exit={{   opacity: 0, y: 6,  scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-hero border border-neutral-300 overflow-hidden z-50"
        >
          <div className="px-5 py-3 bg-gradient-to-r from-primary-50 to-white border-b border-neutral-300">
            <p className="text-xs font-bold text-primary-600 uppercase tracking-widest">Site Settings</p>
          </div>
          <div className="p-4 space-y-4">
            <SettingGroup label="Language"  icon={<Globe className="w-3.5 h-3.5" />}      options={LANGUAGES}  value={lang} onChange={setLang} />
            <SettingGroup label="Currency"  icon={<DollarSign className="w-3.5 h-3.5" />} options={CURRENCIES} value={curr} onChange={setCurr} />
            <SettingGroup label="Area Unit" icon={<Ruler className="w-3.5 h-3.5" />}      options={AREA_UNITS} value={unit} onChange={setUnit} />
          </div>
          <div className="px-4 py-3 border-t border-neutral-300">
            <Button fullWidth size="sm" className="text-white" onClick={onClose}>Save Preferences</Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export const Header: React.FC = () => {
  const dispatch   = useAppDispatch();
  const location   = useLocation();
  const navigate   = useNavigate();
  const mobileOpen = useAppSelector(sel.mobileMenu) as boolean;
  const favCount   = (useAppSelector(sel.favIds) as string[]).length;
  const scrolled   = useScrollPast(24);
  const isHome     = location.pathname === "/";
  const transparent = isHome && !scrolled && !mobileOpen;

  const [openDrop,     setOpenDrop]     = useState<string | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [searchOpen,   setSearchOpen]   = useState(false);
  const [query,        setQuery]        = useState("");

  const navRef      = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  useBodyScrollLock(mobileOpen);

 
  const prevPathRef = useRef(location.pathname);
  if (prevPathRef.current !== location.pathname) {
    prevPathRef.current = location.pathname;
    dispatch(closeMobileMenu());
    setOpenDrop(null);
    setSettingsOpen(false);
    setSearchOpen(false);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenDrop(null);
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node))
        setSettingsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDrop = useCallback((label: string) => {
    setOpenDrop((p) => (p === label ? null : label));
    setSettingsOpen(false);
    setSearchOpen(false);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?keywords=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 inset-x-0 z-[80] transition-all duration-500",
          transparent
            ? "bg-transparent"
            : "bg-white/97 backdrop-blur-xl border-b border-neutral-300"
        )}
        initial={false}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 lg:h-[72px] gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.06, rotate: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-primary-500 flex items-center justify-center shadow-blue"
              >
                <span className="text-white font-bold text-lg font-display">D</span>
              </motion.div>
              <span className={cn(
                "text-xl font-bold font-display tracking-tight transition-colors duration-300",
                transparent ? "text-white" : "text-ink-900"
              )}>
                Domio
              </span>
            </Link>

            <nav ref={navRef} className="hidden lg:flex items-center gap-0.5 flex-1">
              {NAV.map((link) => (
                <div key={link.label} className="relative">
                  {link.children ? (
                    <button
                      onClick={() => toggleDrop(link.label)}
                      className={cn(
                        "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm  transition-all duration-200 select-none",
                        openDrop === link.label
                          ? transparent ? "bg-white/15 text-white" : "bg-primary-50 text-primary-700"
                          : transparent
                            ? "text-white/90 hover:text-white hover:bg-white/10"
                            : "text-ink-800 hover:text-ink-900 hover:bg-ink-100"
                      )}
                    >
                      {link.label}
                      {link.badge && (
                        <span className="text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                      <motion.span
                        animate={{ rotate: openDrop === link.label ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      to={link.href!}
                      className={cn(
                        "px-3.5 py-2 rounded-xl text-sm  transition-all duration-200 block",
                        location.pathname === link.href
                          ? transparent ? "bg-white/15 text-white" : "bg-primary-50 text-primary-700"
                          : transparent
                            ? "text-white/90 hover:text-white hover:bg-white/10"
                            : "text-ink-800 hover:text-ink-900 hover:bg-ink-100"
                      )}
                    >
                      {link.label}
                    </Link>
                  )}
                  <Dropdown link={link} isOpen={openDrop === link.label} onClose={() => setOpenDrop(null)} />
                </div>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5 ml-auto">

              {/* Search toggle */}
              <motion.button
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  setSearchOpen((o) => !o);
                  setOpenDrop(null);
                  setSettingsOpen(false);
                }}
                className={cn(
                  "hidden sm:flex h-9 w-9 rounded-xl items-center justify-center transition-all",
                  searchOpen
                    ? "bg-accent text-white"
                    : transparent
                      ? "text-white/80 hover:bg-white/10 hover:text-white"
                      : "text-ink-800 hover:bg-ink-100 hover:text-ink-900"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={searchOpen ? "x" : "s"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {searchOpen ? <X className="w-4.5 h-4.5" /> : <Search className="w-4.5 h-4.5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              {/* Favorites */}
              <Link
                to="/favorites"
                className={cn(
                  "relative hidden sm:flex h-9 w-9 rounded-xl items-center justify-center transition-all",
                  transparent
                    ? "text-white/80 hover:bg-white/10 hover:text-white"
                    : "text-ink-800 hover:bg-ink-100 hover:text-ink-900"
                )}
              >
                <Heart className="w-4.5 h-4.5" />
                <AnimatePresence>
                  {favCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                      className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-accent text-white text-[9px] font-bold rounded-full flex items-center justify-center px-0.5"
                    >
                      {favCount > 9 ? "9+" : favCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Site settings */}
              <div ref={settingsRef} className="relative hidden lg:block">
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={() => {
                    setSettingsOpen((o) => !o);
                    setOpenDrop(null);
                    setSearchOpen(false);
                  }}
                  className={cn(
                    "h-9 w-9 rounded-xl flex items-center justify-center transition-all border-2",
                    settingsOpen
                      ? "border-accent bg-primary-50 text-accent"
                      : transparent
                        ? "border-white/20 text-white/80 hover:bg-white/10 hover:text-white hover:border-white/30"
                        : "border-ink-200 text-ink-800 hover:bg-ink-100 hover:border-ink-300"
                  )}
                >
                  <Menu className="w-4 h-4" />
                </motion.button>
                <SiteSettings isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
              </div>

              <Button
                size="sm"
                variant={transparent ? "white" : "primary"}
                className={cn("hidden sm:flex text-white", transparent && "text-ink-900")}
                leftIcon={<LogIn className="w-3.5 h-3.5" />}
                onClick={() => dispatch(openAuthModal("login"))}
              >
                Sign up or Log in
              </Button>

              {/* Mobile hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => dispatch(toggleMobileMenu())}
                className={cn(
                  "lg:hidden h-9 w-9 rounded-xl flex items-center justify-center transition-all",
                  transparent ? "text-white hover:bg-white/10" : "text-ink-700 hover:bg-ink-100"
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={mobileOpen ? "c" : "o"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden bg-white"
            >
              <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-3">
                  <div className="flex-1 flex items-center gap-3 h-11 bg-ink-50 border border-ink-200 rounded-xl px-4 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all">
                    <Search className="w-4 h-4 text-ink-800 flex-shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search by area, property type, or keyword…"
                      className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-800 outline-none font-body"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="text-ink-800 hover:text-ink-700 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <Button type="submit" size="md">Search</Button>
                </form>
                <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                  <span className="text-xs text-ink-800 font-medium">Popular:</span>
                  {["Apartments in Westlands", "Villas in Karen", "Penthouses for Sale", "Short-term rentals"].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        navigate(`/search?keywords=${encodeURIComponent(q)}`);
                        setSearchOpen(false);
                      }}
                      className="text-xs text-accent  hover:text-accent-dark bg-primary-50 hover:bg-primary-100 px-2.5 py-1 rounded-full transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-ink-950/60 z-[78] lg:hidden backdrop-blur-sm"
            onClick={() => dispatch(closeMobileMenu())}
          />
        )}
      </AnimatePresence>

      <MobileNav isOpen={mobileOpen} />
    </>
  );
};
