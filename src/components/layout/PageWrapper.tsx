import React from "react";
import { motion } from "framer-motion";

interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children, className = "", noPadding }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -8 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className={`${noPadding ? "" : "pt-16 lg:pt-[72px]"} ${className}`}
  >
    {children}
  </motion.div>
);