import { useState } from "react";
import { Mail, Lock, ArrowRight, Settings } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sage theme colors with admin accent
  const THEME = {
    primary: "#7c3aed", // Purple for admin
    primaryDark: "#6d28d9",
    accent: "#a855f7",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.log("Admin login data:", { ...formData, role: "admin" });
      // TODO: Implement actual login logic and redirect to admin dashboard
    } finally {
      setIsSubmitting(false);
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
          <div className="p-12 bg-gradient-to-br from-violet-600 to-purple-700 flex flex-col justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-600/20" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full" />

            <div className="relative z-10 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Settings className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">SAGE ADMIN</h1>
                  <p className="text-violet-100">Administrative Panel</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Admin Portal
                </h2>
                <p className="text-violet-100 text-lg leading-relaxed">
                  Access the administrative dashboard to manage companies, 
                  subscriptions, billing, integrations, and system reports.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Total</div>
                  <div className="text-violet-100 text-sm">Control</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Advanced</div>
                  <div className="text-violet-100 text-sm">Analytics</div>
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
                  Administrator Sign In
                </h3>
                <p className="text-gray-600">
                  Enter your admin credentials to access the control panel
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Email
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500 transition-colors"
                      placeholder="admin@sagepos.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Admin Password
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
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-500 transition-colors"
                      placeholder="Enter admin password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-violet-600 border-gray-300 rounded focus:ring-violet-200"
                    />
                    <span className="ml-2 text-sm text-gray-600">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-sm font-medium text-violet-600 hover:text-violet-700 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  whileHover={{ scale: 1.01 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:ring-offset-2 transition-all duration-200"
                  style={{ backgroundColor: THEME.primary }}
                >
                  {isSubmitting ? (
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
                      Access Admin Panel <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  )}
                </motion.button>
              </form>

              {/* Back to main login */}
              <div className="text-center pt-6 border-t border-gray-100">
                <Link
                  to="/manager/login"
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors inline-flex items-center"
                >
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Manager Login
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
