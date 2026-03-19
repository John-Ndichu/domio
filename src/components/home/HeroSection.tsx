import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search, MapPin, ChevronDown,
  ArrowRight, TrendingUp, Users,
  Sparkles,
} from "lucide-react";
import {
  BEDS_OPTIONS, COMPLETION_PCT, COMPLETION_STATUS, HANDOVER_BY,
  HERO_SLIDES, NAIROBI_AREAS, PAYMENT_PLANS, PRICE_RANGES_RENT,
  PRICE_RANGES_SALE, PROPERTY_CATEGORIES, PROPERTY_TYPES,
} from "../../constants";
import { cn } from "../../utils/clsx.utils";

type SearchTab = "properties" | "new_projects" | "truevalue" | "agents";
interface TabConfig { id: SearchTab; label: string; badge?: string }
interface Opt { label: string; value: string }

const TABS: TabConfig[] = [
  { id: "properties",   label: "Properties"  },
  { id: "new_projects", label: "New Projects" },
  { id: "truevalue",    label: "TrueValue™",  badge: "New" },
  { id: "agents",       label: "Agents"      },
];

const PROP_TYPE_OPTS: Opt[] = [
  { label: "Property Type", value: "" },
  ...PROPERTY_TYPES.map((t) => ({ label: t.label, value: String(t.value) })),
];

const SLIDE_DURATION_MS = 6000;

const HeroBackground: React.FC<{ activeSlide: number }> = ({ activeSlide }) => {
  useEffect(() => {
    HERO_SLIDES.forEach(({ image }) => {
      const img = new Image();
      img.src = image;
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute inset-0">
      {HERO_SLIDES.map((slide, i) => (
        <motion.div
          key={slide.id}
          className="absolute inset-0"
          animate={{ opacity: i === activeSlide ? 1 : 0 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
          style={{ zIndex: i === activeSlide ? 2 : 1 }}
        >
          <motion.img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            animate={i === activeSlide
              ? { scale: 1.06, filter: "brightness(0.92)" }
              : { scale: 1.12, filter: "brightness(0.7)" }
            }
            transition={i === activeSlide
              ? { duration: SLIDE_DURATION_MS / 1000, ease: "linear" }
              : { duration: 1.6, ease: "easeInOut" }
            }
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/80 via-primary-600/30 to-primary-600/20 z-[3] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-600/50 via-transparent to-transparent z-[3] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-600/60 to-transparent z-[3] pointer-events-none" />
    </div>
  );
};

const SlideIndicators: React.FC<{
  total: number;
  active: number;
  onSelect: (i: number) => void;
}> = ({ total, active, onSelect }) => (
  <div className="flex items-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <button
        key={i}
        onClick={() => onSelect(i)}
        aria-label={`Go to slide ${i + 1}`}
        className="relative h-[3px] rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-all duration-300"
        style={{ width: i === active ? 40 : 14, transition: "width 0.3s ease, background-color 0.2s" }}
      >
        {i === active && (
          <motion.div
            key={`bar-${active}`}
            className="absolute inset-y-0 left-0 bg-white rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: SLIDE_DURATION_MS / 1000, ease: "linear" }}
          />
        )}
      </button>
    ))}
  </div>
);

const FilterSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: Opt[];
  className?: string;
}> = ({ value, onChange, options, className }) => (
  <div className={cn("relative flex-shrink-0", className)}>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        h-10 pl-3 pr-8 bg-white border border-neutral-200 rounded-xl
        text-sm font-medium text-neutral-700 appearance-none outline-none
        cursor-pointer hover:border-accent focus:border-accent
        focus:ring-2 focus:ring-accent/10 transition-all w-full
        
      "
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink-700 pointer-events-none" />
  </div>
);

const LocationInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  className?: string;
}> = ({ value, onChange, placeholder = "City, area or neighbourhood", className }) => {
  const [showDrop, setShowDrop] = useState(false);

  const filtered = useMemo(
    () => value.length >= 2
      ? NAIROBI_AREAS.filter((a) => a.toLowerCase().includes(value.toLowerCase())).slice(0, 6)
      : [],
    [value]
  );

  return (
    <div className={cn("relative flex-1 min-w-0", className)}>
      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-accent pointer-events-none z-10" />
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setShowDrop(e.target.value.length >= 2); }}
        onFocus={() => { if (filtered.length > 0) setShowDrop(true); }}
        onBlur={() => setTimeout(() => setShowDrop(false), 150)}
        placeholder={placeholder}
        className="w-full h-full pl-10 pr-4 bg-transparent outline-none text-sm text-neutral-900 placeholder:text-ink-700 font-medium"
      />
      <AnimatePresence>
        {showDrop && filtered.length > 0 && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-neutral-100 overflow-hidden z-[100]"
          >
            {filtered.map((a) => (
              <li key={a}>
                <button
                  role="option"
                  onMouseDown={(e) => { e.preventDefault(); onChange(a); setShowDrop(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-neutral-700 hover:bg-accent/5 hover:text-accent flex items-center gap-3 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-neutral-300 flex-shrink-0" />
                  {a}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const AiStrip: React.FC = () => (
  <div className="flex items-center justify-between bg-gradient-to-r from-accent/8 to-violet-500/5 border border-accent/15 rounded-xl px-4 py-2.5 gap-3">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-7 h-7 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-3.5 h-3.5 text-accent" />
      </div>
      <span className="text-sm text-neutral-600 font-medium truncate">
        Find your perfect property with AI — ask anything
      </span>
    </div>
    <button className="flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent/80 transition-colors flex-shrink-0 whitespace-nowrap">
      Try DomioAI <ArrowRight className="w-3.5 h-3.5" />
    </button>
  </div>
);

const SearchPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab,     setActiveTab]     = useState<SearchTab>("properties");
  const [purpose,       setPurpose]       = useState<"buy" | "rent">("buy");
  const [area,          setArea]          = useState("");
  const [propType,      setPropType]      = useState("");
  const [beds,          setBeds]          = useState("");
  const [price,         setPrice]         = useState("");
  const [completion,    setCompletion]    = useState("");
  const [category,      setCategory]      = useState("residential");
  const [handover,      setHandover]      = useState("");
  const [payment,       setPayment]       = useState("");
  const [completionPct, setCompletionPct] = useState("");
  const [tvPurpose,     setTvPurpose]     = useState<"sale" | "rent">("sale");
  const [tvLocation,    setTvLocation]    = useState("");
  const [agentQuery,    setAgentQuery]    = useState("");
  const [agentArea,     setAgentArea]     = useState("");
  const [agentSpec,     setAgentSpec]     = useState("");

  const handleSearch = useCallback(() => {
    if (activeTab === "properties") {
      const p = new URLSearchParams();
      p.set("purpose", purpose === "buy" ? "sale" : "rent");
      if (area)       p.set("area", area);
      if (propType)   p.set("type", propType);
      if (beds)       p.set("minBeds", beds);
      if (price) {
        const [min, max] = price.split("-");
        if (min) p.set("minPrice", min);
        if (max && max !== "") p.set("maxPrice", max);
      }
      if (completion) p.set("completion", completion);
      navigate(`/search?${p.toString()}`);
    } else if (activeTab === "new_projects") {
      const p = new URLSearchParams({ completion: "off_plan" });
      if (area)          p.set("area", area);
      if (category)      p.set("category", category);
      if (handover)      p.set("handover", handover);
      if (payment)       p.set("payment", payment);
      if (completionPct) p.set("completionPct", completionPct);
      navigate(`/search?${p.toString()}`);
    } else if (activeTab === "truevalue") {
      const p = new URLSearchParams({ purpose: tvPurpose });
      if (tvLocation) p.set("area", tvLocation);
      navigate(`/valuation?${p.toString()}`);
    } else {
      const p = new URLSearchParams();
      if (agentQuery) p.set("q", agentQuery);
      if (agentArea)  p.set("area", agentArea);
      if (agentSpec)  p.set("spec", agentSpec);
      navigate(`/agents?${p.toString()}`);
    }
  }, [activeTab, purpose, area, propType, beds, price, completion,
      category, handover, payment, completionPct, tvPurpose, tvLocation,
      agentQuery, agentArea, agentSpec, navigate]);

  const priceOptions = purpose === "buy" ? PRICE_RANGES_SALE : PRICE_RANGES_RENT;

  return (
    <div className="w-full max-w-[820px] bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.28),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden">

      <div className="flex border-b border-neutral-100 overflow-x-auto scrollbar-none">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex-shrink-0 flex items-center gap-1.5 px-5 py-3.5 text-sm  transition-all duration-200 whitespace-nowrap border-b-2 relative",
              activeTab === tab.id
                ? "text-accent border-accent"
                : "text-ink-700 hover:text-neutral-700 border-transparent"
            )}
          >
            {tab.label}
            {tab.badge && (
              <span className="text-[9px] font-bold bg-accent text-white px-1.5 py-[3px] rounded-full leading-none tracking-wide uppercase">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-5">
        <AnimatePresence mode="wait">

          {activeTab === "properties" && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex rounded-xl border border-neutral-200 overflow-hidden flex-shrink-0 h-12 self-stretch">
                  {(["buy", "rent"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPurpose(p); setPrice(""); }}
                      className={cn(
                        "flex-1 sm:flex-none px-5 text-sm  transition-all duration-200",
                        purpose === p ? "bg-accent text-white" : "text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      {p === "buy" ? "Buy" : "Rent"}
                    </button>
                  ))}
                </div>

                <div className="flex-1 flex items-center h-12 bg-neutral-50 border border-neutral-200 rounded-xl px-1 focus-within:border-accent focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(var(--color-accent),0.08)] transition-all">
                  <LocationInput value={area} onChange={setArea} />
                </div>

                <button
                  onClick={handleSearch}
                  className="h-12 px-7 bg-accent hover:bg-accent/90 active:scale-[0.98] text-white  rounded-xl text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-[0_4px_14px_rgba(var(--color-accent),0.35)]"
                >
                  <Search className="w-4 h-4" />
                  <span>Search</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center bg-neutral-50 border border-neutral-200 rounded-xl overflow-hidden flex-shrink-0 h-10">
                  {COMPLETION_STATUS.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setCompletion(s.value)}
                      className={cn(
                        "px-3.5 h-full text-sm  transition-all whitespace-nowrap",
                        completion === s.value ? "bg-accent text-white" : "text-neutral-600 hover:bg-neutral-100"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <FilterSelect value={propType} onChange={setPropType} options={PROP_TYPE_OPTS} className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
                <FilterSelect value={beds}     onChange={setBeds}     options={BEDS_OPTIONS}   className="flex-1 min-w-[100px] sm:w-36 sm:flex-none" />
                <FilterSelect value={price}    onChange={setPrice}    options={priceOptions}   className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
              </div>

              <AiStrip />
            </motion.div>
          )}

          {activeTab === "new_projects" && (
            <motion.div
              key="new_projects"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex-1 flex items-center h-12 bg-neutral-50 border border-neutral-200 rounded-xl px-1 focus-within:border-accent focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(var(--color-accent),0.08)] transition-all">
                  <LocationInput value={area} onChange={setArea} />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-12 px-7 bg-accent hover:bg-accent/90 active:scale-[0.98] text-white  rounded-xl text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-[0_4px_14px_rgba(var(--color-accent),0.35)]"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <FilterSelect value={category}      onChange={setCategory}      options={PROPERTY_CATEGORIES} className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
                <FilterSelect value={handover}      onChange={setHandover}      options={HANDOVER_BY}         className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
                <FilterSelect value={payment}       onChange={setPayment}       options={PAYMENT_PLANS}       className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
                <FilterSelect value={completionPct} onChange={setCompletionPct} options={COMPLETION_PCT}      className="flex-1 min-w-[120px] sm:w-36 sm:flex-none" />
              </div>
              <AiStrip />
            </motion.div>
          )}

          {activeTab === "truevalue" && (
            <motion.div
              key="truevalue"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3 mb-1">
                <div className="flex rounded-xl border border-neutral-200 overflow-hidden flex-shrink-0">
                  {(["sale", "rent"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setTvPurpose(p)}
                      className={cn(
                        "px-5 h-10 text-sm  transition-all duration-200",
                        tvPurpose === p ? "bg-accent text-white" : "text-neutral-600 hover:bg-neutral-50"
                      )}
                    >
                      {p === "sale" ? "Sale" : "Rent"}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-accent font-bold bg-accent/10 px-2.5 py-1 rounded-full tracking-wide">NEW</span>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex-1 flex items-center h-12 bg-neutral-50 border border-neutral-200 rounded-xl px-1 focus-within:border-accent focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(var(--color-accent),0.08)] transition-all">
                  <LocationInput value={tvLocation} onChange={setTvLocation} placeholder="Enter area or building name" />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-12 px-6 bg-accent hover:bg-accent/90 active:scale-[0.98] text-white  rounded-xl text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-[0_4px_14px_rgba(var(--color-accent),0.35)] whitespace-nowrap"
                >
                  <TrendingUp className="w-4 h-4" /> Get Report
                </button>
              </div>

              <p className="text-xs text-ink-700 leading-relaxed">
                Type a neighbourhood or building name to generate a data-backed valuation report.{" "}
                <button className="text-accent  hover:underline underline-offset-2">View Sample</button>
              </p>
            </motion.div>
          )}

          {activeTab === "agents" && (
            <motion.div
              key="agents"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex-1 flex items-center gap-2.5 h-12 bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 focus-within:border-accent focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(var(--color-accent),0.08)] transition-all">
                  <Users className="w-4 h-4 text-ink-700 flex-shrink-0" />
                  <input
                    type="text"
                    value={agentQuery}
                    onChange={(e) => setAgentQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search by agent name or agency"
                    className="flex-1 bg-transparent text-sm text-neutral-900 placeholder:text-ink-700 outline-none font-medium"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="h-12 px-7 bg-accent hover:bg-accent/90 active:scale-[0.98] text-white  rounded-xl text-sm flex items-center justify-center gap-2 transition-all flex-shrink-0 shadow-[0_4px_14px_rgba(var(--color-accent),0.35)]"
                >
                  <Search className="w-4 h-4" /> Search
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
                <div className="flex-1 flex items-center h-10 bg-neutral-50 border border-neutral-200 rounded-xl px-1 focus-within:border-accent focus-within:bg-white transition-all">
                  <LocationInput value={agentArea} onChange={setAgentArea} placeholder="Agent area (e.g. Westlands)" />
                </div>
                <FilterSelect
                  value={agentSpec}
                  onChange={setAgentSpec}
                  className="sm:w-44"
                  options={[
                    { label: "Specialisation", value: ""            },
                    { label: "Residential",    value: "residential" },
                    { label: "Commercial",     value: "commercial"  },
                    { label: "Luxury",         value: "luxury"      },
                    { label: "Off-Plan",       value: "off_plan"    },
                    { label: "Rentals",        value: "rentals"     },
                  ]}
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-ink-700 font-medium">Top areas:</span>
                {["Westlands", "Karen", "Kilimani", "Lavington", "Runda"].map((a) => (
                  <button
                    key={a}
                    onClick={() => setAgentArea(a)}
                    className="text-xs text-neutral-600 bg-neutral-100 hover:bg-accent/10 hover:text-accent px-3 py-1.5 rounded-full font-medium transition-colors"
                  >
                    {a}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export const HeroSection: React.FC = () => {
  const heroRef     = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const yParallax   = useTransform(scrollY, [0, 600], [0, 140]);
  const opacityFade = useTransform(scrollY, [0, 340], [1, 0]);
  const scaleFade   = useTransform(scrollY, [0, 340], [1, 0.96]);

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setSlide((s) => (s + 1) % HERO_SLIDES.length),
      SLIDE_DURATION_MS
    );
    return () => clearInterval(t);
  }, []);

  const handleSelect = useCallback((i: number) => setSlide(i), []);

  return (
    <section
      ref={heroRef}
      className="
        relative overflow-hidden bg-neutral-950
        /* Mobile: tall but not full screen to avoid search panel overflow */
        min-h-[100svh]
        /* Tablet + */
        sm:h-screen sm:min-h-[700px] sm:max-h-[980px]
      "
    >
      <motion.div className="absolute inset-0" style={{ y: yParallax }}>
        <HeroBackground activeSlide={slide} />
      </motion.div>

      <div className="absolute top-24 right-[10%] w-[500px] h-[500px] bg-accent/6 rounded-full blur-[160px] pointer-events-none z-[4]" />
      <div className="absolute bottom-20 left-6 w-[280px] h-[280px] bg-blue-300/5 rounded-full blur-[100px] pointer-events-none z-[4]" />

      <motion.div
        style={{ opacity: opacityFade, scale: scaleFade }}
        className="
          relative z-[5] h-full flex flex-col items-center
          /* Mobile: top-pad to clear navbar, pb to breathe above slide indicators */
          justify-start pt-28 pb-20 px-4
          /* Tablet+: center vertically */
          sm:justify-center sm:pt-0 sm:pb-0 sm:px-6
          text-center
        "
      >
        <div className="mb-2 w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`headline-${slide}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0  }}
              exit={{ opacity: 0, y: -12   }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight drop-">
                {HERO_SLIDES[slide].title}
                <span className="block mt-1 text-white/80 font-normal text-2xl sm:text-3xl md:text-4xl">
                  {HERO_SLIDES[slide].subtitle}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/60 text-sm sm:text-base font-medium mb-7 sm:mb-8 tracking-wide"
        >
          100+ verified properties. Find yours today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center"
        >
          <SearchPanel />
        </motion.div>

      </motion.div>

      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-[5]">
        <SlideIndicators
          total={HERO_SLIDES.length}
          active={slide}
          onSelect={handleSelect}
        />
      </div>
    </section>
  );
};