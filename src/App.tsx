import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

import { useAppSelector } from "./hooks";
import { sel } from "./store/selectors";
import { AuthModal } from "./components/auth/AuthModal";
import { ToastContainer } from "./components/ui/Toast";

const Home           = lazy(() => import("./pages/Home"));
const Search         = lazy(() => import("./pages/Search"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Favorites      = lazy(() => import("./pages/Favorites"));
const About          = lazy(() => import("./pages/About"));
const NotFound       = lazy(() => import("./pages/NotFound"));

const PageLoader: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary-800 flex items-center justify-center animate-pulse">
        <span className="text-white font-bold text-xl font-display">D</span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-accent animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  </div>
);

const App: React.FC = () => {
  const location = useLocation();
  const authOpen = useAppSelector(sel.authOpen);

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/"                  element={<Home />} />
              <Route path="/search"            element={<Search />} />
              <Route path="/property/:slug"    element={<PropertyDetail />} />
              <Route path="/favorites"         element={<Favorites />} />
              <Route path="/about"             element={<About />} />
              <Route path="*"                  element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <ToastContainer />
      {authOpen && <AuthModal />}
    </div>
  );
};

export default App;