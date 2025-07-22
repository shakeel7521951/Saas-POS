import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Required field';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Min 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords mismatch';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header with accent color */}
        <div className="bg-slate-800 py-4 px-8">
          <h2 className="text-2xl font-bold text-white">Create Account</h2>
          <p className="text-slate-300 text-sm">Get started with your free account</p>
        </div>

        <div className="p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-slate-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${errors.name ? 'border-rose-300' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && <p className="text-xs text-rose-500">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-slate-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${errors.email ? 'border-rose-300' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="text-xs text-rose-500">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${errors.password ? 'border-rose-300' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="text-xs text-rose-500">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-2.5 border ${errors.confirmPassword ? 'border-rose-300' : 'border-slate-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-rose-500">{errors.confirmPassword}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg shadow-md transition-all duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                <>
                  Sign Up <FiArrowRight className="ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="pt-4 text-center text-sm text-slate-500">
            <p>Already have an account? <Link to="/login" className="font-medium text-slate-800 hover:text-slate-600 transition-colors">Sign in</Link></p>
            <p className="mt-2 text-xs">By continuing, you agree to our <a href="#" className="text-slate-700 hover:underline">Terms</a> and <a href="#" className="text-slate-700 hover:underline">Privacy Policy</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;