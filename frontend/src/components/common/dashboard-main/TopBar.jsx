import React, { useState, useEffect, useRef } from "react";
import {
  Bell,
  User,
  LogOut,
  CheckCircle,
  XCircle,
  ChevronDown,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth, useLogout } from "../../../hooks/useAuth";
import CompanySelector from "../CompanySelector";

const TopBar = () => {
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  // Refs for click outside handling
  const userMenuRef = useRef(null);
  const notifRef = useRef(null);

  // Redux hooks
  const { user } = useAuth();
  const { logout } = useLogout();

  const isConnected = true; // Replace with real connection state

  // Sample notifications - could be fetched from Redux/API
  const notifications = [
    {
      id: 1,
      type: "billing",
      title: "Billing Alert",
      message: `Hi ${
        user?.firstName || "User"
      }, your subscription expires in 3 days`,
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "sync",
      title: "Sync Issue",
      message: "Last data sync failed. Please check your connection.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: 3,
      type: "success",
      title: "Backup Complete",
      message: "Your data has been successfully backed up.",
      time: "1 day ago",
      read: true,
    },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
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

  // Get notification icon
  const getNotificationIcon = (type) => {
    switch (type) {
      case "billing":
        return "💳";
      case "sync":
        return "⚠️";
      case "success":
        return "✅";
      default:
        return "🔔";
    }
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

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="text-xs text-blue-600 font-medium">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition ${
                          !notification.read ? "bg-blue-50/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-800 truncate">
                                {notification.title}
                              </p>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-2">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-gray-500">
                      <Bell size={24} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="p-3 border-t border-gray-100">
                    <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View All Notifications
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
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
