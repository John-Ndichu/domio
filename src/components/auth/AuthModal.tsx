import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import { useAppDispatch, useAppSelector, useBodyScrollLock } from "../../hooks";
import { sel } from "../../store/selectors";
import { closeAuthModal, openAuthModal, addToast } from "../../store/slices/uiSlice";
import { Button } from "../ui/Button";
import { Divider } from "../ui/Divider";

export const AuthModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const mode     = useAppSelector(sel.authMode);
  const isLogin  = mode === "login";

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const [form, setForm]                 = useState({ name: "", email: "", phone: "", password: "" });

  useBodyScrollLock(true);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    dispatch(closeAuthModal());
    dispatch(addToast({
      type: "success",
      title: isLogin ? "Welcome back!" : "Account created!",
      message: isLogin ? "You have signed in successfully." : "Your account has been created.",
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && dispatch(closeAuthModal())}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-ink-950/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 24 }}
          transition={{ type: "spring", stiffness: 340, damping: 30 }}
          className="relative bg-white rounded-3xl shadow-hero w-full max-w-md overflow-hidden"
        >
          <div className="h-1.5 bg-gradient-to-r from-primary-700 via-accent to-primary-400" />

          <button
            onClick={() => dispatch(closeAuthModal())}
            className="absolute top-4 right-4 w-8 h-8 rounded-xl bg-ink-100 hover:bg-ink-200 flex items-center justify-center text-ink-500 hover:text-ink-800 transition-all z-10"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="px-8 pt-8 pb-8">
            <div className="flex flex-col items-center mb-8">
            
              <h2 className="font-display text-2xl text-ink-900 text-center">
                {isLogin ? "Welcome back" : "Create your account"}
              </h2>
              <p className="text-sm text-ink-500 mt-1.5 text-center">
                {isLogin
                  ? "Sign in to save properties and connect with agents"
                  : "Join 50,000+ happy Domio users across Kenya"}
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-6">
              <SocialButton icon="G" label="Continue with Google" color="#4285F4" />
            </div>

            <Divider label="or continue with email" className="mb-6" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    key="register-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    <AuthInput
                      icon={<User className="w-4 h-4" />}
                      type="text"
                      placeholder="Full name"
                      value={form.name}
                      onChange={set("name")}
                      required
                    />
                    <AuthInput
                      icon={<Phone className="w-4 h-4" />}
                      type="tel"
                      placeholder="Phone number"
                      value={form.phone}
                      onChange={set("phone")}
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <AuthInput
                icon={<Mail className="w-4 h-4" />}
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={set("email")}
                required
              />

              <div className="relative">
                <AuthInput
                  icon={<Lock className="w-4 h-4" />}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={form.password}
                  onChange={set("password")}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-accent hover:text-accent-dark font-medium">
                    Forgot password?
                  </button>
                </div>
              )}

         

              <Button type="submit" fullWidth size="lg" loading={loading} className="mt-2">
                {isLogin ? "Sign In" : "Create Account"}
              </Button>
            </form>

            {/* Toggle mode */}
            <p className="text-center text-sm text-ink-500 mt-6">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => dispatch(openAuthModal(isLogin ? "register" : "login"))}
                className="text-accent hover:text-accent-dark font-semibold transition-colors"
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const AuthInput: React.FC<{
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}> = ({ icon, ...props }) => (
  <div className="flex items-center gap-3 h-12 bg-ink-50 border border-ink-200 rounded-xl px-3.5 transition-all focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 focus-within:bg-white">
    <span className="text-ink-400 flex-shrink-0">{icon}</span>
    <input
      {...props}
      className="flex-1 bg-transparent outline-none text-sm text-ink-900 placeholder:text-ink-400 font-body"
    />
  </div>
);

const SocialButton: React.FC<{ icon: string; label: string; color: string }> = ({ icon, label, color }) => (
  <motion.button
    type="button"
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    className="flex items-center gap-3 h-11 w-full bg-white border border-ink-200 hover:border-ink-300 rounded-xl px-4 text-sm font-semibold text-ink-700 hover:bg-ink-50 transition-all"
  >
    <div
      className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <span className="flex-1 text-center">{label}</span>
  </motion.button>
);