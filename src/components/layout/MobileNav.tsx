/* eslint-disable react-hooks/refs */
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ChevronDown,
  Heart,
  Users,
  BarChart3,
  BookOpen,
  Briefcase,
  Sparkles,
  HelpCircle,
  LogIn,
  Plus,
} from "lucide-react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { closeMobileMenu, openAuthModal } from "../../store/selectors";
import { Button } from "../ui/Button";
import { NAV } from "../../constants/nav";

interface MobileNavProps {
  isOpen: boolean;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen }) => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<string | null>(null);
  const prevOpenRef = useRef(isOpen);
  if (prevOpenRef.current !== isOpen) {
    prevOpenRef.current = isOpen;
    if (!isOpen && expanded !== null) {
      setExpanded(null);
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 34 }}
          className="fixed top-0 right-0 h-full w-[320px] max-w-[90vw] bg-white z-[100] lg:hidden shadow-hero flex flex-col"
        >
          <div className="flex items-center justify-between px-5 h-16 border-b border-neutral-300 flex-shrink-0">
            <Link
              to="/"
              onClick={() => dispatch(closeMobileMenu())}
              className="flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent to-primary-800 flex items-center justify-center">
                <span className="text-white font-bold font-display">D</span>
              </div>
              <span className="font-bold font-display text-ink-900 text-lg">
                Domio
              </span>
            </Link>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(closeMobileMenu())}
              className="h-8 w-8 rounded-xl bg-ink-100 hover:bg-ink-200 flex items-center justify-center text-ink-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Nav items */}
          <nav className="flex-1 overflow-y-auto">
            <div className="py-2">
              {NAV.map((link, idx) => (
                <div key={link.label}>
                  {link.children ? (
                    <>
                      <button
                        onClick={() =>
                          setExpanded((p) =>
                            p === link.label ? null : link.label,
                          )
                        }
                        className="w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold text-ink-800 hover:bg-ink-50 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          {link.label}
                          {link.badge && (
                            <span className="text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">
                              {link.badge}
                            </span>
                          )}
                        </span>
                        <motion.span
                          animate={{
                            rotate: expanded === link.label ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-4 h-4 text-ink-400" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {expanded === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.22,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden bg-gradient-to-b from-ink-50/80 to-ink-50/40"
                          >
                            {link.children.map((child, i) => (
                              <motion.div
                                key={child.href}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.04, duration: 0.2 }}
                              >
                                <Link
                                  to={child.href}
                                  onClick={() => dispatch(closeMobileMenu())}
                                  className="flex items-center gap-3 px-7 py-2.5 text-sm text-ink-600 hover:text-primary-700 hover:bg-primary-50/80 transition-colors"
                                >
                                  <span className="text-ink-400 flex-shrink-0">
                                    {child.icon}
                                  </span>
                                  <span className="flex-1">{child.label}</span>
                                  {child.badge && (
                                    <span className="text-[10px] font-bold bg-accent text-white px-1.5 py-0.5 rounded-full">
                                      {child.badge}
                                    </span>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        to={link.href!}
                        onClick={() => dispatch(closeMobileMenu())}
                        className="flex items-center h-12 px-5 text-sm font-semibold text-ink-800 hover:bg-primary-50 hover:text-primary-700 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  )}

                  {idx < NAV.length - 1 && (
                    <div className="mx-5 h-px bg-ink-100" />
                  )}
                </div>
              ))}

              <div className="mt-2 border-t border-neutral-300 pt-2">
                {[
                  {
                    label: "Saved Properties",
                    href: "/favorites",
                    icon: <Heart className="w-4 h-4" />,
                  },
                  {
                    label: "Find my Agent",
                    href: "/agents",
                    icon: <Users className="w-4 h-4" />,
                  },
                  {
                    label: "Market Intelligence",
                    href: "/market",
                    icon: <BarChart3 className="w-4 h-4" />,
                  },
                  {
                    label: "Guides",
                    href: "/guides",
                    icon: <BookOpen className="w-4 h-4" />,
                  },
                  {
                    label: "Agent Portal",
                    href: "/agent-portal",
                    icon: <Briefcase className="w-4 h-4" />,
                  },
                  {
                    label: "Events",
                    href: "/events",
                    icon: <Sparkles className="w-4 h-4" />,
                  },
                  {
                    label: "Help Centre",
                    href: "/help",
                    icon: <HelpCircle className="w-4 h-4" />,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => dispatch(closeMobileMenu())}
                    className="flex items-center gap-3 h-12 px-5 text-sm font-semibold text-ink-600 hover:bg-ink-50 hover:text-ink-900 transition-colors"
                  >
                    <span className="text-ink-400">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="flex-shrink-0 px-4 pb-8 pt-4 space-y-2.5 border-t border-neutral-300 bg-white">
            <Button
              className="text-white"
              fullWidth
              size="lg"
              variant="primary"
              leftIcon={<LogIn className="w-4 h-4" />}
              onClick={() => {
                dispatch(openAuthModal("login"));
                dispatch(closeMobileMenu());
              }}
            >
              Sign up or Log in
            </Button>
            <Button
              fullWidth
              size="lg"
              variant="outline"
              leftIcon={<Plus className="w-4 h-4" />}
              onClick={() => {
                dispatch(openAuthModal("register"));
                dispatch(closeMobileMenu());
              }}
            >
              List Your Property
            </Button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default MobileNav;
