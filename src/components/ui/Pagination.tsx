import { motion } from "framer-motion";

export const Pagination: React.FC<{
  page: number; totalPages: number;
  onChange: (p: number) => void; className?: string;
}> = ({ page, totalPages, onChange, className }) => {
  if (totalPages <= 1) return null;
  const pages: (number | "…")[] = [];
  if (totalPages <= 7) { for (let i = 1; i <= totalPages; i++) pages.push(i); }
  else {
    pages.push(1);
    if (page > 3) pages.push("…");
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push("…");
    pages.push(totalPages);
  }
  return (
    <div className={cn("flex items-center gap-1.5 justify-center", className)}>
      <button onClick={() => page > 1 && onChange(page - 1)} disabled={page === 1}
        className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-semibold text-ink-500 hover:bg-ink-100 disabled:opacity-30 transition-colors">
        ←
      </button>
      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`el${i}`} className="h-9 w-9 flex items-center justify-center text-ink-400 text-sm">…</span>
        ) : (
          <motion.button key={p} whileTap={{ scale: 0.94 }} onClick={() => onChange(p as number)}
            className={cn(
              "h-9 w-9 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-200",
              p === page ? "bg-accent text-white shadow-blue" : "text-ink-600 hover:bg-ink-100"
            )}>
            {p}
          </motion.button>
        )
      )}
      <button onClick={() => page < totalPages && onChange(page + 1)} disabled={page === totalPages}
        className="h-9 w-9 rounded-xl flex items-center justify-center text-sm font-semibold text-ink-500 hover:bg-ink-100 disabled:opacity-30 transition-colors">
        →
      </button>
    </div>
  );
};