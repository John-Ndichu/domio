import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { sel } from "../../store/selectors/index";
import { removeToast } from "../../store/slices/uiSlice";
import type { Toast } from "../../types";

const TOAST_ICONS: Record<Toast["type"], React.ReactNode> = {
  success: <CheckCircle2  className="w-5 h-5 text-emerald-500 flex-shrink-0" />,
  error:   <AlertCircle   className="w-5 h-5 text-red-500 flex-shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />,
  info:    <Info           className="w-5 h-5 text-blue-500 flex-shrink-0" />,
};

const ToastItem: React.FC<{ toast: Toast }> = ({ toast }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const t = setTimeout(
      () => dispatch(removeToast(toast.id)),
      toast.duration ?? 4000
    );
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, dispatch]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0,  scale: 1  }}
      exit={{    opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="flex items-start gap-3 px-4 py-3.5 rounded-2xl border border-ink-100 bg-white shadow-card max-w-sm w-full pointer-events-auto"
    >
      {TOAST_ICONS[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink-900">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-ink-500 mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => dispatch(removeToast(toast.id))}
        className="text-ink-300 hover:text-ink-600 mt-0.5 flex-shrink-0 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export const ToastContainer: React.FC = () => {
  const toasts = useAppSelector(sel.toasts) as Toast[];
  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
};