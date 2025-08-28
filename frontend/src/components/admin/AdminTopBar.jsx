import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Bell,
  Settings,
  User,
  Menu,
  LogOut,
  Shield,
  HelpCircle,
  Moon,
  Sun,
  ChevronDown,
  Activity,
  Users,
  AlertTriangle,
} from "lucide-react";
import { useAuth, useLogout } from "../../hooks/useAuth";

const AdminTopBar = ({ toggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Redux hooks
  const { user } = useAuth();
  const { logout } = useLogout();

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "A";
    const firstName = user.firstName || "";
    const lastName = user.lastName || "";
    return (firstName[0] || "") + (lastName[0] || "");
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (!user) return "Admin User";
    return (
      user.fullName ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.email
    );
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  // Sample notifications - personalized for the user
  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Sync Failed",
      message: "Cafe Corner integration sync failed",
      time: "2 minutes ago",
      unread: true,
    },
    {
      id: 2,
      type: "info",
      title: "New Signup",
      message: `${
        user?.companyName || "TechStart Solutions"
      } joined the platform`,
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Payment Received",
      message: "$1,149 from Metro Retail Group",
      time: "3 hours ago",
      unread: false,
    },
    {
      id: 4,
      type: "info",
      title: "Welcome",
      message: `Welcome ${
        user?.firstName || "Admin"
      }, you have admin privileges`,
      time: "1 day ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "info":
        return <Users className="w-4 h-4 text-blue-500" />;
      case "success":
        return <Activity className="w-4 h-4 text-green-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Page Title & Breadcrumb */}
          <div className="hidden lg:block">
            <h1 className="text-xl font-medium text-gray-900 tracking-tight">
              Admin Control Panel
            </h1>
            <p className="text-xs text-gray-500 font-normal">
              System administration and monitoring
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden md:flex flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, users, transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          {/* <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button> */}

          {/* Help */}
          {/* <button className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
          </button> */}

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              {unreadCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-4 h-4 text-xs font-medium text-white rounded-full flex items-center justify-center"
                  style={{ backgroundColor: THEME.primary }}
                >
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-gray-100 shadow-lg py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">
                      Notifications
                    </h3>
                    <span className="text-xs text-gray-500 font-normal">
                      {unreadCount} unread
                    </span>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 transition-colors border-l-4 ${
                        notification.unread
                          ? "border-emerald-500 bg-emerald-50/30"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 font-light">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 border-t border-gray-100">
                  <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Settings */}
          {/* <button className="p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button> */}

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-sm font-medium">
                {getUserInitials()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-medium text-gray-900">
                  {getUserDisplayName()}
                </p>
                <p className="text-xs text-gray-500 font-light">
                  {user?.role === "admin" ? "System Administrator" : "User"}
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {/* User Dropdown */}
            {showUserMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-gray-100 shadow-lg py-2 z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-medium">
                      {getUserInitials()}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {getUserDisplayName()}
                      </p>
                      <p className="text-xs text-gray-500 font-light">
                        {user?.email || "admin@company.com"}
                      </p>
                      <p className="text-xs text-emerald-600 font-medium capitalize">
                        {user?.role || "Administrator"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-normal text-gray-700 hover:bg-gray-50 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-normal text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Admin Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-normal text-gray-700 hover:bg-gray-50 transition-colors">
                    <Shield className="w-4 h-4" />
                    <span>Security</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-xs font-normal text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-4">
        <div className="relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* Click outside handlers */}
      {(showNotifications || showUserMenu) && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => {
            setShowNotifications(false);
            setShowUserMenu(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminTopBar;
