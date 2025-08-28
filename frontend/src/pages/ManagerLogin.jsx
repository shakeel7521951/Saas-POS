import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Shield, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useLogin } from "../hooks/useAuth";

const ManagerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Redux hooks
  const { isAuthenticated, error, clearError } = useAuth();
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // Sage theme colors
  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) {
      clearError();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      console.log("Login successful:", result.user);
    } else {
      console.error("Login failed:", result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left panel: Branding */}
          <div className="p-12 bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">SAGE POS</h1>
                  <p className="text-emerald-100">Point of Sale System</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Manager Portal
                </h2>
                <p className="text-emerald-100 text-lg leading-relaxed">
                  Access your store management dashboard to handle daily
                  operations, track sales, manage inventory, and serve customers
                  efficiently.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Fast</div>
                  <div className="text-emerald-100 text-sm">Processing</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Secure</div>
                  <div className="text-emerald-100 text-sm">Transactions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Form */}
          <div className="p-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  Manager Sign In
                </h3>
                <p className="text-gray-600">
                  Enter your credentials to access the POS system
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      autoComplete="username"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors"
                      placeholder="manager@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      autoComplete="current-password"
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-200"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:ring-offset-2 transition-all duration-200"
                  style={{ backgroundColor: THEME.primary }}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Signing in...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Sign In to POS System{" "}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  )}
                </motion.button>
              </form>

              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/signup"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <motion.span
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center"
                  >
                    Sign up <ArrowRight className="ml-1 w-4 h-4" />
                  </motion.span>
                </Link>
              </div>

              <div className="text-center pt-6 border-t border-gray-100">
                <Link
                  to="/admin/login"
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Admin Access
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ManagerLogin;
