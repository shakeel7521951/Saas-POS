import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  FileText,
  ClipboardList,
  ShoppingCart,
  RefreshCw,
  Building2,
  Users,
  Package,
  Warehouse,
  User,
  CreditCard,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  Zap,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [openDropdowns, setOpenDropdowns] = useState({
    transactions: false,
    data: false,
    billing: false,
    integrations: false,
  });

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // Mobile toggle button
  const MobileToggleButton = () => (
    <button
      onClick={toggleSidebar}
      className="md:hidden absolute -right-12 top-4 p-2 rounded-md bg-green-600 text-white shadow-md"
    >
      {isOpen ? <X size={22} /> : <Menu size={22} />}
    </button>
  );

  return (
    <>
      <MobileToggleButton />
      <motion.div
        initial={{ x: -260 }}
        animate={{ x: isOpen ? 0 : -260 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-30"
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="p-5 border-b border-gray-200 bg-gray-50 flex items-center gap-2">
            <ShoppingCart className="text-green-600" size={20} />
            <h2 className="text-lg font-semibold text-gray-800">Sage POS</h2>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2 text-sm">
              {/* Dashboard */}
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  <Home size={18} />
                  Dashboard
                </Link>
              </li>

              {/* Transactions Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("transactions")}
                  className="flex items-center justify-between w-full p-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <FileText size={18} />
                    Transactions
                  </span>
                  {openDropdowns.transactions ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <AnimatePresence>
                  {openDropdowns.transactions && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-1 space-y-1"
                    >
                      <li>
                        <Link
                          to="/transactions/sales-invoices"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <ClipboardList size={16} /> Sales Invoices
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/transactions/quotations"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <FileText size={16} /> Quotations
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/transactions/orders"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <ShoppingCart size={16} /> Orders
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/transactions/returns"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <RefreshCw size={16} /> Returns
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Data Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("data")}
                  className="flex items-center justify-between w-full p-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <Package size={18} />
                    Data
                  </span>
                  {openDropdowns.data ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <AnimatePresence>
                  {openDropdowns.data && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-1 space-y-1"
                    >
                      <li>
                        <Link
                          to="/data/customers"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Users size={16} /> Customers
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/data/items"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Package size={16} /> Items
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/data/warehouses"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Warehouse size={16} /> Warehouses
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Billing & Account Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("billing")}
                  className="flex items-center justify-between w-full p-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <CreditCard size={18} />
                    Billing & Account
                  </span>
                  {openDropdowns.billing ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <AnimatePresence>
                  {openDropdowns.billing && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-1 space-y-1"
                    >
                      <li>
                        <Link
                          to="/account/my-account"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <User size={16} /> My Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/account/billing-subscription"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <CreditCard size={16} /> Billing & Subscription
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Integrations Dropdown */}
              <li>
                <button
                  onClick={() => toggleDropdown("integrations")}
                  className="flex items-center justify-between w-full p-3 rounded-md text-gray-700 hover:bg-green-50 hover:text-green-700 transition"
                >
                  <span className="flex items-center gap-3">
                    <Zap size={18} />
                    Integrations
                  </span>
                  {openDropdowns.integrations ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </button>
                <AnimatePresence>
                  {openDropdowns.integrations && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-8 mt-1 space-y-1"
                    >
                      <li>
                        <Link
                          to="/integrations/sage"
                          className="flex items-center gap-2 p-2 rounded-md text-gray-600 hover:bg-green-50 hover:text-green-700"
                        >
                          <Settings size={16} /> Sage Integration
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
