/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart, Share2, MapPin, Bed, Bath, Square, Eye, Calendar, CheckCircle,
  Phone, MessageCircle, Mail, ChevronLeft, ChevronRight, X, ZoomIn,
  Car, Clock, Star, Shield,
} from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Badge } from "../../components/ui/Badge";
import {
  fetchPropertyBySlug,
  fetchSimilarProperties,
  clearCurrent,
} from "../../store/slices/propertiesSlice";
import { addToast } from "../../store/slices/uiSlice";
import { sel } from "../../store/selectors";
import type { Property } from "../../types";
import { useAppDispatch, useAppSelector, useFavorites } from "../../hooks";
import { Divider } from "../../components/ui/Divider";
import { Button } from "../../components/ui/Button";
import { formatArea, formatDate, formatPriceWithPeriod } from "../../utils/format.utils";
import { getFurnishingLabel, getPropertyTypeLabel, getPurposeLabel } from "../../utils/property.utils";
import { cn } from "../../utils/clsx.utils";
import { PropertyCard } from "../../components/property/PropertyCard";
import { ICON_MAP } from "../../data/properties.data";

const Lightbox: React.FC<{
  images: Property["images"]; startIndex: number; onClose: () => void;
}> = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white z-10">
        <X className="w-8 h-8" />
      </button>
      <button onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <motion.img
        key={idx}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        src={images[idx]?.url}
        alt={images[idx]?.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] object-contain rounded-xl"
      />
      <button onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10 transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
        {idx + 1} / {images.length}
      </div>
    </motion.div>
  );
};

const PropertyGallery: React.FC<{ images: Property["images"] }> = ({ images }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const main   = images[0];
  const thumbs = images.slice(1, 5);

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[420px] lg:h-[520px] rounded-3xl overflow-hidden">
        <div
          className="col-span-4 lg:col-span-2 row-span-2 relative cursor-zoom-in group"
          onClick={() => setLightbox(0)}
        >
          <img src={main?.url} alt={main?.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          <div className="absolute bottom-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded-lg backdrop-blur-sm flex items-center gap-1">
            <ZoomIn className="w-3 h-3" /> {images.length} photos
          </div>
        </div>

        {thumbs.map((img, i) => (
          <div
            key={img.id}
            className="col-span-1 relative cursor-zoom-in group overflow-hidden"
            onClick={() => setLightbox(i + 1)}
          >
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all" />
            {i === 3 && images.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white  text-lg">
                +{images.length - 5}
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

const ContactCard: React.FC<{ property: Property }> = ({ property }) => {
  const [msgOpen, setMsgOpen] = useState(false);
  const [msg, setMsg]         = useState("");
  const dispatch              = useAppDispatch();

  const sendMessage = () => {
    if (!msg.trim()) return;
    dispatch(addToast({ type: "success", title: "Message sent!", message: `${property.agent.name} will respond within ${property.agent.responseTime.toLowerCase()}.` }));
    setMsg("");
    setMsgOpen(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sticky top-[96px]">
      {/* Price */}
      <div className="mb-5">
        <p className="text-2xl font-bold text-ink-900">
          {formatPriceWithPeriod(property.price.amount, property.price.currency, property.price.period)}
        </p>
        {property.price.pricePerSqft && (
          <p className="text-sm text-ink-700 mt-0.5">KSh {property.price.pricePerSqft.toLocaleString()} per sqft</p>
        )}
        {property.price.serviceCharge && (
          <p className="text-xs text-ink-700 mt-1">Service charge: KSh {property.price.serviceCharge.toLocaleString()}/month</p>
        )}
      </div>

      <Divider className="mb-5" />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative">
          <img src={property.agent.photo} alt={property.agent.name} className="w-14 h-14 rounded-2xl object-cover" />
          {property.agent.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center ring-2 ring-white">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-ink-900 text-sm">{property.agent.name}</p>
          <p className="text-xs text-ink-700 truncate mt-0.5">{property.agent.agency}</p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-xs  text-ink-700">{property.agent.rating}</span>
            <span className="text-xs text-ink-700">· {property.agent.totalListings} listings</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2 mb-5">
        <Clock className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
        <span className="text-xs  text-emerald-700">Typically responds {property.agent.responseTime.toLowerCase()}</span>
      </div>

      <div className="space-y-2.5">
        <Button className="text-white" fullWidth size="lg" leftIcon={<Phone className="w-4 h-4" />}
          onClick={() => window.open(`tel:${property.agent.phone}`)}>
          Call Agent
        </Button>
        <Button fullWidth size="lg" variant="outline" leftIcon={<MessageCircle className="w-4 h-4" />}
          onClick={() => window.open(`https://wa.me/${(property.agent.whatsapp ?? property.agent.phone).replace(/\D/g, "")}`)}>
          WhatsApp
        </Button>
        <Button fullWidth size="lg" variant="ghost" leftIcon={<Mail className="w-4 h-4" />}
          onClick={() => setMsgOpen((o) => !o)}>
          Email Agent
        </Button>
      </div>

      <AnimatePresence>
        {msgOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              <textarea
                rows={4}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder={`Hi ${property.agent.name}, I'm interested in this property. Please contact me.`}
                className="w-full bg-ink-50 border border-ink-200 rounded-2xl px-4 py-3 text-sm text-ink-800 placeholder:text-ink-700 outline-none resize-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
              />
              <Button fullWidth size="md" onClick={sendMessage} disabled={!msg.trim()}>
                Send Message
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-ink-700 mt-4">
        Speaks: {property.agent.languages.join(", ")}
      </p>
    </div>
  );
};

const PropertyDetail: React.FC = () => {
  const { slug }    = useParams<{ slug: string }>();
  const dispatch    = useAppDispatch();
  const navigate    = useNavigate();
  const property    = useAppSelector(sel.current);
  const loading     = useAppSelector(sel.currentLoading);
  const similar     = useAppSelector(sel.similar);
  const { isFav, toggle } = useFavorites();
  const favorited   = property ? isFav(property.id) : false;
  const [activeTab, setActiveTab] = useState<"overview"|"amenities"|"location"|"nearby">("overview");
  const [shareMsg, setShareMsg]   = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (slug) dispatch(fetchPropertyBySlug(slug));
    return () => { dispatch(clearCurrent()); };
  }, [slug, dispatch]);

  useEffect(() => {
    if (property) dispatch(fetchSimilarProperties({ property, limit: 4 }));
  }, [property, dispatch]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setShareMsg(true);
    setTimeout(() => setShareMsg(false), 2500);
    dispatch(addToast({ type: "info", title: "Link copied!", message: "Property link has been copied to clipboard." }));
  };

  if (loading || !property) {
    return (
      <PageWrapper>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="skeleton h-[480px] rounded-3xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton h-8 w-2/3 rounded-xl" />
              <div className="skeleton h-5 w-1/2 rounded-xl" />
              <div className="skeleton h-32 rounded-2xl" />
            </div>
            <div className="skeleton h-96 rounded-3xl" />
          </div>
        </div>
      </PageWrapper>
    );
  }

  const TABS = [
    { id: "overview",  label: "Overview" },
    { id: "amenities", label: "Amenities" },
    { id: "location",  label: "Location" },
    { id: "nearby",    label: "Nearby" },
  ];

  const amenityGroups = {
    interior:  property.amenities.filter((a) => a.category === "interior"),
    building:  property.amenities.filter((a) => a.category === "building"),
    outdoor:   property.amenities.filter((a) => a.category === "outdoor"),
    nearby:    property.amenities.filter((a) => a.category === "nearby"),
  };

  return (
    <PageWrapper>
      <div className="bg-ink-50 min-h-screen">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">

          <nav className="flex items-center gap-2 text-sm text-ink-700 mb-6">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span>›</span>
            <Link to="/search" className="hover:text-accent transition-colors">Properties</Link>
            <span>›</span>
            <Link to={`/search?area=${property.location.area}`} className="hover:text-accent transition-colors">{property.location.area}</Link>
            <span>›</span>
            <span className="text-ink-800 font-medium truncate max-w-[200px]">{property.title}</span>
          </nav>

          <PropertyGallery images={property.images} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white rounded-3xl p-6">
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  <Badge variant={property.purpose === "sale" ? "sale" : "rent"}>
                    {getPurposeLabel(property.purpose)}
                  </Badge>
                  <Badge variant="muted">{getPropertyTypeLabel(property.type)}</Badge>
                  {property.isVerified && <Badge variant="verified" icon={<CheckCircle className="w-3 h-3" />}>Verified</Badge>}
                  {property.isPremium && <Badge variant="premium">⭐ Premium</Badge>}
                  {property.isNew && <Badge variant="new">New</Badge>}
                  <Badge variant={property.furnishing === "furnished" ? "success" : "muted"}>
                    {getFurnishingLabel(property.furnishing)}
                  </Badge>
                </div>

                <h1 className="font-display text-display-sm text-ink-900 leading-tight mb-2">{property.title}</h1>

                <div className="flex items-center gap-1.5 text-ink-800 mb-5">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>{property.location.address || `${property.location.area}, ${property.location.city}`}</span>
                  {property.location.landmark && (
                    <span className="text-ink-700">· Near {property.location.landmark}</span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: <Bed className="w-5 h-5 text-accent" />,    label: "Bedrooms",  value: property.bedrooms === 0 ? "Studio" : `${property.bedrooms} Bed${property.bedrooms > 1 ? "s" : ""}` },
                    { icon: <Bath className="w-5 h-5 text-accent" />,   label: "Bathrooms", value: `${property.bathrooms} Bath${property.bathrooms > 1 ? "s" : ""}` },
                    { icon: <Square className="w-5 h-5 text-accent" />, label: "Area",      value: formatArea(property.area) },
                    { icon: <Car className="w-5 h-5 text-accent" />,    label: "Parking",   value: property.parkingSpaces ? `${property.parkingSpaces} Space${property.parkingSpaces > 1 ? "s" : ""}` : "None" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3 bg-ink-50 rounded-2xl p-3.5">
                      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center flex-shrink-0">{icon}</div>
                      <div>
                        <p className="text-xs text-ink-700">{label}</p>
                        <p className="font-bold text-ink-900 text-sm">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-ink-100">
                  <div className="flex items-center gap-3 text-sm text-ink-700">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{property.views.toLocaleString()} views</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Listed {formatDate(property.createdAt)}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={handleShare}
                      className="h-9 px-4 rounded-xl border border-ink-200 hover:border-accent text-sm  text-ink-800 hover:text-accent flex items-center gap-2 transition-all"
                    >
                      <Share2 className="w-4 h-4" /> Share
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggle(property)}
                      className={cn(
                        "h-9 px-4 rounded-xl border text-sm  flex items-center gap-2 transition-all",
                        favorited ? "border-red-200 bg-red-50 text-red-500" : "border-ink-200 hover:border-red-200 text-ink-800 hover:text-red-500"
                      )}
                    >
                      <Heart className={cn("w-4 h-4", favorited && "fill-red-500")} />
                      {favorited ? "Saved" : "Save"}
                    </motion.button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl overflow-hidden">
                <div className="flex border-b border-ink-100 overflow-x-auto">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onClick={() => setActiveTab(tab.id as any)}
                      className={cn(
                        "flex-shrink-0 px-5 h-12 text-sm  border-b-2 transition-all duration-200",
                        activeTab === tab.id
                          ? "border-accent text-accent"
                          : "border-transparent text-ink-700 hover:text-ink-800"
                      )}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {activeTab === "overview" && (
                      <motion.div key="overview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <h2 className="font-bold text-ink-900 text-lg mb-4">About this property</h2>
                        <div className="text-ink-800 text-sm leading-relaxed whitespace-pre-line space-y-3">
                          {property.description.split("\n").map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                          {[
                            { label: "Property Type",  value: getPropertyTypeLabel(property.type) },
                            { label: "Purpose",        value: getPurposeLabel(property.purpose) },
                            { label: "Furnishing",     value: getFurnishingLabel(property.furnishing) },
                            { label: "Completion",     value: property.completion === "ready" ? "Ready to Move" : "Off-Plan" },
                            property.yearBuilt ? { label: "Year Built", value: String(property.yearBuilt) } : null,
                            property.floors ? { label: "Floors", value: String(property.floors) } : null,
                            property.parkingSpaces ? { label: "Parking Spaces", value: String(property.parkingSpaces) } : null,
                            property.permitNumber ? { label: "Permit No.", value: property.permitNumber } : null,
                          ].filter(Boolean).map((item) => (
                            <div key={item!.label} className="bg-ink-50 rounded-xl p-3.5">
                              <p className="text-xs text-ink-700 mb-0.5">{item!.label}</p>
                              <p className="text-sm  text-ink-900">{item!.value}</p>
                            </div>
                          ))}
                        </div>

                        {property.tags && property.tags.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {property.tags.map((tag) => (
                              <span key={tag} className="text-xs bg-primary-50 text-primary-700 px-3 py-1.5 rounded-full font-medium border border-primary-100">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )}

             {activeTab === "amenities" && (
  <motion.div
    key="amenities"
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
  >
    <h2 className="font-bold text-ink-900 text-lg mb-5">Amenities & Features</h2>

    {Object.entries(amenityGroups)
      .filter(([, items]) => items.length > 0)
      .map(([cat, items]) => (
        <div key={cat} className="mb-6">
          <h3 className="text-xs font-bold text-ink-700 uppercase tracking-widest mb-3">
            {cat === "interior"
              ? "Interior"
              : cat === "building"
              ? "Building"
              : cat === "outdoor"
              ? "Outdoor"
              : "Nearby"}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {items.map((a) => {
              const IconComponent = ICON_MAP[a.id];

              return (
                <div
                  key={a.id}
                  className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-3.5 py-2.5"
                >
                  {IconComponent ? (
                    <IconComponent className="text-base" />
                  ) : (
                    <span className="text-base">{a.icon}</span>
                  )}
                  <span className="text-sm font-medium text-emerald-800">
                    {a.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
  </motion.div>
)}

                    {activeTab === "location" && (
                      <motion.div key="location" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <h2 className="font-bold text-ink-900 text-lg mb-4">Location</h2>
                        <p className="text-sm text-ink-800 mb-4">
                          <MapPin className="w-4 h-4 inline mr-1 text-accent" />
                          {property.location.address || `${property.location.area}, ${property.location.city}`}
                        </p>
                        <div className="rounded-2xl overflow-hidden h-72 bg-ink-100 relative">
                          <iframe
                            title="Property Location"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src={`https://maps.google.com/maps?q=${property.location.lat},${property.location.lng}&z=15&output=embed`}
                            allowFullScreen
                          />
                        </div>
                        <p className="text-xs text-ink-700 mt-2 flex items-center gap-1">
                          <Shield className="w-3.5 h-3.5" /> Exact location provided after contacting agent
                        </p>
                      </motion.div>
                    )}

                    {activeTab === "nearby" && (
                      <motion.div key="nearby" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                        <h2 className="font-bold text-ink-900 text-lg mb-4">What's Nearby</h2>
                        {property.nearby && property.nearby.length > 0 ? (
                          <div className="space-y-3">
                            {property.nearby.map((place, i) => {
                              const icons: Record<string, string> = { school:"🏫", hospital:"🏥", mall:"🛍️", metro:"🚇", airport:"✈️", beach:"🏖️", park:"🌳" };
                              return (
                                <div key={i} className="flex items-center justify-between bg-ink-50 rounded-xl p-3.5">
                                  <div className="flex items-center gap-3">
                                    <span className="text-xl">{icons[place.type] || "📍"}</span>
                                    <div>
                                      <p className="text-sm  text-ink-800">{place.name}</p>
                                      <p className="text-xs text-ink-700 capitalize">{place.type}</p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-bold text-ink-900">{place.distance} km</p>
                                    {place.duration && <p className="text-xs text-ink-700">{place.duration} min</p>}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <p className="text-sm text-ink-700">No nearby places information available.</p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {similar.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl text-ink-900 mb-5">Similar Properties</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {similar.slice(0, 4).map((p, i) => (
                      <PropertyCard key={p.id} property={p} index={i} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-1">
              <ContactCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PropertyDetail;