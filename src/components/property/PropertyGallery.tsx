import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Grid3x3 } from "lucide-react";
import type { Property } from "../../types";

interface PropertyGalleryProps {
  images: Property["images"];
}

const Lightbox: React.FC<{
  images: Property["images"];
  startIndex: number;
  onClose: () => void;
}> = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));

  React.useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/96 flex items-center justify-center"
      onClick={onClose}
    >
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all z-10">
        <X className="w-5 h-5" />
      </button>

      <button onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white z-10 transition-all">
        <ChevronLeft className="w-6 h-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.img
          key={idx}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          src={images[idx]?.url}
          alt={images[idx]?.alt}
          onClick={(e) => e.stopPropagation()}
          className="max-h-[88vh] max-w-[90vw] object-contain rounded-xl shadow-hero"
        />
      </AnimatePresence>

      <button onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white z-10 transition-all">
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-sm bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
        {idx + 1} / {images.length}
      </div>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button key={img.id} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all ${
              i === idx ? "border-white scale-105" : "border-white/20 opacity-60 hover:opacity-90"
            }`}>
            <img src={img.thumbnail} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export const PropertyGallery: React.FC<PropertyGalleryProps> = ({ images }) => {
  const [lightbox, setLightbox] = useState<number | null>(null);

  if (!images.length) return null;

  const main   = images[0];
  const thumbs = images.slice(1, 5);
  const extra  = images.length > 5 ? images.length - 5 : 0;

  return (
    <>
      <div className="grid grid-cols-4 gap-2 h-[420px] md:h-[520px] rounded-2xl overflow-hidden">
        <div className="col-span-4 md:col-span-2 row-span-2 relative group cursor-zoom-in overflow-hidden bg-ink-100"
          onClick={() => setLightbox(0)}>
          <img src={main?.url} alt={main?.alt}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/50 text-white text-xs px-2.5 py-1.5 rounded-lg backdrop-blur-sm">
            <Grid3x3 className="w-3 h-3" />
            {images.length} photos
          </div>
        </div>

        {Array.from({ length: 4 }).map((_, i) => {
          const img = thumbs[i];
          return (
            <div key={i}
              className={`relative group cursor-zoom-in overflow-hidden bg-ink-100 ${!img ? "hidden md:block" : ""}`}
              onClick={() => img && setLightbox(i + 1)}
            >
              {img ? (
                <>
                  <img src={img.url} alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-all" />
                  {i === 3 && extra > 0 && (
                    <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                      <div className="text-white text-center">
                        <p className="text-2xl font-bold">+{extra}</p>
                        <p className="text-xs text-white/70">more photos</p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-ink-100" />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
        )}
      </AnimatePresence>
    </>
  );
};