import React, { useState } from "react";
import {
  Building2,
  Store,
  ShoppingBag,
  Factory,
  ChevronDown,
  ChevronUp,
  BarChart2,
  Package,
  Users,
  Settings,
  User,
  LayoutGrid,
  Tag,
  Warehouse,
  Landmark,
  ArrowLeftRight,
  FileText,
  CreditCard,
  ShoppingCart,
  ClipboardList,
  Wallet,
  Home,
  Menu,
  X,
  Tags
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({
  selectedCompany,
  setSelectedCompany,
  isOpen,
  toggleSidebar,
}) => {
  const [openDropdowns, setOpenDropdowns] = useState({
    company: false,
    product: false,
    accounting: false,
    reports: false
  });

  const companies = [
    { id: 1, name: "Company A", icon: Building2 },
    { id: 2, name: "Company B", icon: Store },
    { id: 3, name: "Company C", icon: ShoppingBag },
    { id: 4, name: "Company D", icon: Factory },
  ];

  const toggleDropdown = (dropdown) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.name);
    toggleDropdown('company');
  };

  // Mobile responsive toggle button for sidebar
  const MobileToggleButton = () => (
    <button
      onClick={toggleSidebar}
      className="md:hidden absolute -right-12 top-4 p-2 rounded-md bg-white shadow-md"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  return (
    <>
      <MobileToggleButton />
      
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white shadow-md z-30 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Top Section */}
          <div className="p-5 border-b border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-blue-600" size={20} />
                <h2 className="text-xl font-semibold text-gray-800">POS System</h2>
              </div>
            </div>
          </div>

          {/* Company Dropdown */}
          <div className="p-5 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Company
            </label>
            <div className="relative">
              <button
                className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                onClick={() => toggleDropdown('company')}
              >
                <span className="flex items-center gap-3 truncate">
                  <span className="text-blue-600">
                    {React.createElement(
                      companies.find((c) => c.name === selectedCompany)?.icon ||
                        Building2,
                      { size: 20 }
                    )}
                  </span>
                  <span className="font-medium text-gray-800 truncate">
                    {selectedCompany || "Select Company"}
                  </span>
                </span>
                {openDropdowns.company ? (
                  <ChevronUp className="text-gray-500" size={16} />
                ) : (
                  <ChevronDown className="text-gray-500" size={16} />
                )}
              </button>

              {openDropdowns.company && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 overflow-hidden max-h-60 overflow-y-auto">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className={`p-3 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${
                        company.name === selectedCompany
                          ? "bg-blue-50 text-blue-700"
                          : ""
                      }`}
                      onClick={() => handleCompanySelect(company)}
                    >
                      <span className="text-blue-600">
                        {React.createElement(company.icon, { size: 20 })}
                      </span>
                      <span className="font-medium truncate">{company.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Menu Items with Scroll */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-5">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Home size={18} />
                Quick Actions
              </h3>
              <ul className="space-y-2">
                {/* Dashboard */}
                <li>
                  <Link
                    to="/dashboard"
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3"
                  >
                    <BarChart2 size={18} />
                    Dashboard
                  </Link>
                </li>

                {/* Product Dropdown */}
                <li>
                  <button
                    onClick={() => toggleDropdown('product')}
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <Package size={18} />
                      Products
                    </span>
                    {openDropdowns.product ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {openDropdowns.product && (
                    <ul className="mt-1 ml-8 space-y-1">
                      <li>
                        <Link
                          to="/categories"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <LayoutGrid size={16} />
                          Categories
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/products"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Tag size={16} />
                          Products
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/brands" 
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Tags size={16} />
                          Brands
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/warehouses" 
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Warehouse size={16} />
                          Warehouses
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Sales */}
                <li>
                  <Link
                    to="/sales"
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3"
                  >
                    <ShoppingCart size={18} />
                    Sales
                  </Link>
                </li>

                {/* Accounting Dropdown */}
                <li>
                  <button
                    onClick={() => toggleDropdown('accounting')}
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <Landmark size={18} />
                      Accounting
                    </span>
                    {openDropdowns.accounting ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {openDropdowns.accounting && (
                    <ul className="mt-1 ml-8 space-y-1">
                      <li>
                        <Link
                          to="/accounting/accounts"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <CreditCard size={16} />
                          Accounts
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/accounting/money-transfer"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <ArrowLeftRight size={16} />
                          Money Transfer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/accounting/balance-sheet"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <FileText size={16} />
                          Balance Sheet
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Reports Dropdown */}
                <li>
                  <button
                    onClick={() => toggleDropdown('reports')}
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-3">
                      <ClipboardList size={18} />
                      Reports
                    </span>
                    {openDropdowns.reports ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {openDropdowns.reports && (
                    <ul className="mt-1 ml-8 space-y-1">
                      <li>
                        <Link
                          to="/reports/sales"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <BarChart2 size={16} />
                          Sales Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/inventory"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Package size={16} />
                          Inventory Report
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/reports/financial"
                          className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2"
                        >
                          <Wallet size={16} />
                          Financial Report
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>

                {/* Customers */}
                <li>
                  <Link
                    to="/customers"
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3"
                  >
                    <Users size={18} />
                    Customers
                  </Link>
                </li>

                {/* Settings */}
                <li>
                  <Link
                    to="/settings"
                    className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <div className="font-semibold text-gray-800 text-sm">Shakeel</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;