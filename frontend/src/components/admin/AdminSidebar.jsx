import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  ChevronDown,
  ChevronRight,
  Package,
  TrendingUp,
  Globe,
  Menu,
  X,
} from "lucide-react";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [expandedMenus, setExpandedMenus] = useState({});

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  const toggleMenu = (menuKey) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: BarChart3,
      path: "/admin/dashboard",
    },
    {
      key: "companies",
      label: "Companies",
      icon: Building2,
      path: "/admin/companies",
    },
    {
      key: "subscriptions",
      label: "Subscriptions & Plans",
      icon: Package,
      submenu: [
        {
          label: "Plans Management",
          path: "/admin/subscriptions/plans",
          icon: Package,
        },
        {
          label: "Company Subscriptions",
          path: "/admin/subscriptions/companies",
          icon: CreditCard,
        },
      ],
    },
    {
      key: "billing",
      label: "Billing & Payments",
      icon: CreditCard,
      path: "/admin/billing",
    },
    {
      key: "sage",
      label: "Sage Integrations",
      icon: Globe,
      path: "/admin/sage",
    },
    {
      key: "reports",
      label: "Reports",
      icon: TrendingUp,
      path: "/admin/reports",
    },
    {
      key: "settings",
      label: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  const isActiveLink = (path) => {
    if (path === "/admin/dashboard" && location.pathname === "/admin")
      return true;
    return (
      location.pathname === path || location.pathname.startsWith(path + "/")
    );
  };

  const hasActiveSubmenu = (submenu) => {
    return submenu?.some((item) => isActiveLink(item.path));
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isOpen ? 0 : -320,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:relative top-0 left-0 h-full w-80 bg-white border-r border-gray-100 z-50 flex flex-col shadow-xl lg:shadow-none"
      >
        {/* Header */}
        <div className="px-8 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div
                className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm"
                style={{ backgroundColor: THEME.primary }}
              >
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h1 className="text-lg font-medium text-gray-900 tracking-tight">
                  SAGE Admin
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  System Control
                </p>
              </div>
            </div>
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isExpanded = expandedMenus[item.key];
              const isActive = item.path
                ? isActiveLink(item.path)
                : hasActiveSubmenu(item.submenu);

              return (
                <div key={item.key}>
                  {item.submenu ? (
                    // Menu with submenu
                    <div>
                      <button
                        onClick={() => toggleMenu(item.key)}
                        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                          isActive
                            ? "text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                        style={{
                          backgroundColor: isActive
                            ? THEME.primary
                            : "transparent",
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-5 h-5" />
                          <span className="font-normal text-xs">
                            {item.label}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                        )}
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="ml-4 mt-2 space-y-1">
                              {item.submenu.map((subItem) => {
                                const SubIcon = subItem.icon;
                                const isSubActive = isActiveLink(subItem.path);

                                return (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                      isSubActive
                                        ? "text-white shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                    style={{
                                      backgroundColor: isSubActive
                                        ? THEME.primary
                                        : "transparent",
                                    }}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                    <span className="text-xs font-normal">
                                      {subItem.label}
                                    </span>
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    // Direct menu item
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
                        isActive
                          ? "text-white shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      style={{
                        backgroundColor: isActive
                          ? THEME.primary
                          : "transparent",
                      }}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-normal text-xs">{item.label}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        {/* <div className="p-6 border-t border-gray-100">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Admin Access
                </p>
                <p className="text-xs text-gray-600">Full System Control</p>
              </div>
            </div>
          </div>
        </div> */}
      </motion.div>
    </>
  );
};

export default AdminSidebar;
