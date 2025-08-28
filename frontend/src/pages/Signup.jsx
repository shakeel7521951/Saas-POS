import React, { useState, useEffect } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
  Shield,
  AlertCircle,
  Building,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, useRegister } from "../hooks/useAuth";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Redux hooks
  const { isAuthenticated, error, clearError } = useAuth();
  const { register, isLoading } = useRegister();
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors when user starts typing
    if (error) {
      clearError();
    }
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      phone: formData.phone,
    });

    if (result.success) {
      console.log("Registration successful:", result.user);
    } else {
      console.error("Registration failed:", result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.98 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "circOut" }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden grid grid-cols-1 lg:grid-cols-2"
        >
          {/* Left panel: Branding */}
          <div className="p-12 bg-gradient-to-br from-emerald-600 to-teal-700 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-600/20" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-white/10 rounded-full" />

            <div className="relative z-10 space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">SAGE POS</h1>
                  <p className="text-emerald-100">
                    Join thousands of businesses
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-white">
                  Start Your Journey
                </h2>
                <p className="text-emerald-100 text-lg leading-relaxed">
                  Create your account and unlock powerful POS features designed
                  for modern businesses.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50K+</div>
                  <div className="text-emerald-100 text-sm">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-emerald-100 text-sm">Uptime</div>
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
                  Create Account
                </h3>
                <p className="text-gray-600">
                  Join our platform and start managing your business
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
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 col-span-2"
                    >
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      <span className="text-red-700 text-sm">{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Two Column Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 border ${
                          validationErrors.firstName
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-emerald-500 transition-colors`}
                        placeholder="John"
                      />
                    </div>
                    {validationErrors.firstName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {validationErrors.firstName}
                      </motion.p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 border ${
                          validationErrors.lastName
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-emerald-500 transition-colors`}
                        placeholder="Doe"
                      />
                    </div>
                    {validationErrors.lastName && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {validationErrors.lastName}
                      </motion.p>
                    )}
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-colors"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  {/* Email */}
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
                        className={`w-full pl-12 pr-4 py-3 border ${
                          validationErrors.email
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-emerald-500 transition-colors`}
                        placeholder="name@company.com"
                      />
                    </div>
                    {validationErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {validationErrors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Password */}
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
                        className={`w-full pl-12 pr-4 py-3 border ${
                          validationErrors.password
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-emerald-500 transition-colors`}
                        placeholder="Create a strong password"
                      />
                    </div>
                    {validationErrors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {validationErrors.password}
                      </motion.p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className={`w-full pl-12 pr-4 py-3 border ${
                          validationErrors.confirmPassword
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-200 focus:ring-emerald-200"
                        } rounded-xl focus:outline-none focus:ring-2 focus:border-emerald-500 transition-colors`}
                        placeholder="Confirm your password"
                      />
                    </div>
                    {validationErrors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-1"
                      >
                        {validationErrors.confirmPassword}
                      </motion.p>
                    )}
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-200 mt-1"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                {/* Submit Button */}
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
                      Creating account...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      Create Account <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  )}
                </motion.button>
              </form>

              <div className="text-center">
                <span className="text-sm text-gray-500">
                  Already have an account?{" "}
                </span>
                <Link
                  to="/login"
                  className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <motion.span
                    whileHover={{ x: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center"
                  >
                    Sign in
                  </motion.span>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
