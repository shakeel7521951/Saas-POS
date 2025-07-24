import React, { useState } from "react";
import {
  Building2,
  Store,
  ShoppingBag,
  Factory,
  ChevronDown,
  BarChart3,
  Package,
  Users,
  Settings,
  User,
  LayoutGrid,
  Tags,
  Landmark,
  ArrowLeftRight,
  FileText,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = ({
  selectedCompany,
  setSelectedCompany,
  isOpen,
  toggleSidebar,
}) => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isAccountingDropdownOpen, setIsAccountingDropdownOpen] = useState(false);

  const companies = [
    { id: 1, name: "Company A", icon: Building2 },
    { id: 2, name: "Company B", icon: Store },
    { id: 3, name: "Company C", icon: ShoppingBag },
    { id: 4, name: "Company D", icon: Factory },
  ];

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.name);
    setIsCompanyDropdownOpen(false);
  };

  return (
    <div
      className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md z-30 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Top Section */}
      <div className="p-5 border-b border-gray-200 bg-gray-50 flex justify-between items-center md:block">
        <h2 className="text-xl font-semibold text-gray-800">POS System</h2>
        <button
          onClick={toggleSidebar}
          className="md:hidden text-2xl text-gray-600"
        >
          &times;
        </button>
      </div>

      {/* Company Dropdown */}
      <div className="p-5 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Select Company
        </label>
        <div className="relative">
          <button
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
            onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
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
            <ChevronDown
              className={`text-gray-500 transform transition-transform duration-200 ${
                isCompanyDropdownOpen ? "rotate-180" : ""
              }`}
              size={16}
            />
          </button>

          {isCompanyDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 overflow-hidden">
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

      {/* Menu Items */}
      <div className="flex-1 p-5 overflow-y-auto">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <ul className="space-y-2">
          {/* Product Dropdown */}
          <li>
            <button
              onClick={() => setIsProductDropdownOpen(!isProductDropdownOpen)}
              className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                <Package size={18} />
                Product
              </span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isProductDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isProductDropdownOpen && (
              <ul className="mt-1 ml-6 space-y-1">
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
                    <LayoutGrid size={16} />
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/brands" className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2">
                    <Tags size={16} />
                    Brands
                  </Link>
                </li>
                <li>
                  <Link to="/ware-houses" className="w-full p-2 text-sm rounded-lg text-gray-600 hover:bg-gray-100 flex items-center gap-2">
                    <Tags size={16} />
                    Ware-Houses
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Accounting Dropdown */}
          <li>
            <button
              onClick={() => setIsAccountingDropdownOpen(!isAccountingDropdownOpen)}
              className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center justify-between"
            >
              <span className="flex items-center gap-3">
                <Landmark size={18} />
                Accounting
              </span>
              <ChevronDown
                size={16}
                className={`transform transition-transform duration-200 ${
                  isAccountingDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isAccountingDropdownOpen && (
              <ul className="mt-1 ml-6 space-y-1">
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

          {/* Other Items */}
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <BarChart3 size={18} />
              Sales Report
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Package size={18} />
              Inventory
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Users size={18} />
              Customers
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Settings size={18} />
              Settings
            </button>
          </li>
        </ul>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <div className="font-semibold text-gray-800 text-sm">John Doe</div>
            <div className="text-xs text-gray-500">Cashier</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;