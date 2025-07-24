// Sidebar.jsx
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
} from "lucide-react";

const Sidebar = ({ selectedCompany, setSelectedCompany }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const companies = [
    { id: 1, name: "Company A", icon: Building2 },
    { id: 2, name: "Company B", icon: Store },
    { id: 3, name: "Company C", icon: ShoppingBag },
    { id: 4, name: "Company D", icon: Factory },
  ];

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      <div className="p-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800">POS System</h2>
      </div>

      <div className="p-5 border-b border-gray-200">
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Select Company
        </label>
        <div className="relative">
          <button
            className="w-full p-3 border-2 border-gray-200 rounded-lg bg-white cursor-pointer flex items-center justify-between hover:border-blue-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="flex items-center gap-3 truncate">
              <span className="text-blue-600">
                {React.createElement(
                  companies.find((c) => c.name === selectedCompany)?.icon || Building2,
                  { size: 20 }
                )}
              </span>
              <span className="font-medium text-gray-800 truncate">
                {selectedCompany || "Select Company"}
              </span>
            </span>
            <ChevronDown
              className={`text-gray-500 transform transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
              size={16}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 overflow-hidden">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className={`p-3 flex items-center gap-3 cursor-pointer transition-colors duration-200 hover:bg-gray-50 ${
                    company.name === selectedCompany ? "bg-blue-50 text-blue-700" : ""
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

      <div className="flex-1 p-5 overflow-y-auto">
        <h3 className="text-base font-semibold text-gray-800 mb-4">
          Quick Actions
        </h3>
        <ul className="space-y-2">
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <BarChart3 size={18} />
              Sales Report
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Package size={18} />
              Inventory
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Users size={18} />
              Customers
            </button>
          </li>
          <li>
            <button className="w-full p-3 text-left rounded-lg cursor-pointer text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-3">
              <Settings size={18} />
              Settings
            </button>
          </li>
        </ul>
      </div>

      <div className="p-5 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-800 text-sm">John Doe</div>
            <div className="text-xs text-gray-500">Cashier</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
