import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft } from "lucide-react";
import { PageWrapper } from "../../components/layout/PageWrapper";
import { Button } from "../../components/ui/Button";

const NotFound: React.FC = () => {
  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative mb-8"
          >
            <div className="font-display text-[160px] leading-none text-ink-300 select-none">404</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="font-display text-3xl text-ink-900 mb-3">Page not found</h1>
            <p className="text-ink-500 mb-8 leading-relaxed">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/">
                <Button className="text-white" size="lg" leftIcon={<Home className="w-4 h-4" />}>
                  Go Home
                </Button>
              </Link>
              <Link to="/search">
                <Button size="lg" variant="outline" leftIcon={<Search className="w-4 h-4" />}>
                  Browse Properties
                </Button>
              </Link>
            </div>

            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-sm text-ink-500 hover:text-accent transition-colors mx-auto mt-6"
            >
              <ArrowLeft className="w-4 h-4" /> Go back
            </button>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default NotFound;