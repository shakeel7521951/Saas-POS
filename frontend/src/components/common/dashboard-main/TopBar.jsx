import React, { useState, useEffect, useRef } from "react";
import {
  User,
  LogOut,
  CheckCircle,
  XCircle,
  ChevronDown,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../../../hooks/useAuth";
import { useSage } from "../../../hooks/useSage";
import CompanySelector from "../CompanySelector";

const TopBar = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Refs for click outside handling
  const userMenuRef = useRef(null);

  // Redux hooks
  const { user } = useAuth();
  const { logout } = useLogout();
  const { isConnected } = useSage();

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return (firstName[0] || "") + (lastName[0] || "");
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "User";
    return (
      user.fullName ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.email
    );
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 py-3.5 flex items-center justify-between shadow-sm">
      {/* Company Selector */}
      <CompanySelector />

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Connection Status */}
        <div
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
            isConnected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {isConnected ? <CheckCircle size={14} /> : <XCircle size={14} />}
          <span>{isConnected ? "Connected" : "Disconnected"}</span>
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
          >
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              {getUserInitials()}
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-sm font-medium text-gray-700">
                {getUserDisplayName()}
              </div>
              <div className="text-xs text-gray-500 capitalize">
                {user?.role || "User"}
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </button>
          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {getUserInitials()}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {getUserDisplayName()}
                      </div>
                      <div className="text-sm text-gray-500">{user?.email}</div>
                      <div className="text-xs text-gray-400 capitalize">
                        {user?.role} • {user?.companyName}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate("/account/my-account");
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                  >
                    <User size={16} /> My Account
                  </button>
                  <button
                    onClick={() => {
                      navigate("/account/billing-subscription");
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                  >
                    <Settings size={16} /> Settings
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
