import React, { useState } from "react";
import { Package, RotateCcw, History, Search } from "lucide-react";

const ProductTabs = ({ selectedCompany, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState("products");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample data
  const sampleProducts = [
    {
      id: 1,
      name: "Coffee",
      price: 4.99,
      category: "Beverages",
      stock: 50,
      sku: "BEV001",
    },
    {
      id: 2,
      name: "Sandwich",
      price: 8.99,
      category: "Food",
      stock: 25,
      sku: "FD001",
    },
    {
      id: 3,
      name: "Tea",
      price: 3.99,
      category: "Beverages",
      stock: 30,
      sku: "BEV002",
    },
    {
      id: 4,
      name: "Burger",
      price: 12.99,
      category: "Food",
      stock: 15,
      sku: "FD002",
    },
    {
      id: 5,
      name: "Juice",
      price: 5.99,
      category: "Beverages",
      stock: 40,
      sku: "BEV003",
    },
  ];

  const sampleRefunds = [
    {
      id: 1,
      productName: "Coffee",
      quantity: 2,
      amount: 9.98,
      date: "2025-07-20",
      reason: "Customer complaint",
    },
    {
      id: 2,
      productName: "Sandwich",
      quantity: 1,
      amount: 8.99,
      date: "2025-07-19",
      reason: "Wrong order",
    },
    {
      id: 3,
      productName: "Burger",
      quantity: 1,
      amount: 12.99,
      date: "2025-07-18",
      reason: "Quality issue",
    },
  ];

  const sampleHistory = [
    {
      id: 1,
      transactionId: "TXN001",
      items: "Coffee x2, Tea x1",
      total: 13.97,
      date: "2025-07-22",
      time: "10:30 AM",
    },
    {
      id: 2,
      transactionId: "TXN002",
      items: "Burger x1, Juice x1",
      total: 18.98,
      date: "2025-07-22",
      time: "11:15 AM",
    },
    {
      id: 3,
      transactionId: "TXN003",
      items: "Sandwich x2",
      total: 17.98,
      date: "2025-07-21",
      time: "2:45 PM",
    },
    {
      id: 4,
      transactionId: "TXN004",
      items: "Coffee x1, Sandwich x1",
      total: 13.98,
      date: "2025-07-21",
      time: "3:20 PM",
    },
  ];

  const tabs = [
    { id: "products", label: "Products", icon: Package },
    { id: "refunds", label: "Refunds", icon: RotateCcw },
    { id: "history", label: "History", icon: History },
  ];

  const filterData = (data, searchField) => {
    return data.filter((item) =>
      item[searchField].toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderProductsTable = () => {
    const filteredProducts = filterData(sampleProducts, "name");

    return (
      <div className="h-full overflow-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg min-w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                  {product.sku}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-900 font-medium">
                      {product.name}
                    </div>
                    <div className="sm:hidden text-xs text-gray-500">
                      {product.category}
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-xs sm:text-sm text-gray-900 font-medium">
                      ${product.price}
                    </div>
                    <div className="md:hidden text-xs">
                      <span
                        className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 20
                        ? "bg-green-100 text-green-800"
                        : product.stock > 10
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onAddToCart(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-md text-xs sm:text-sm font-medium transition-colors duration-200"
                  >
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderRefundsTable = () => {
    const filteredRefunds = filterData(sampleRefunds, "productName");

    return (
      <div className="h-full overflow-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg min-w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reason
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredRefunds.map((refund) => (
              <tr key={refund.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-gray-900">
                      {refund.productName}
                    </div>
                    <div className="sm:hidden text-xs text-gray-500">
                      Qty: {refund.quantity}
                    </div>
                    <div className="md:hidden text-xs text-gray-500">
                      {refund.date}
                    </div>
                    <div className="lg:hidden text-xs text-gray-500 truncate">
                      {refund.reason}
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {refund.quantity}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                  ${refund.amount}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {refund.date}
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {refund.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderHistoryTable = () => {
    const filteredHistory = filterData(sampleHistory, "transactionId");

    return (
      <div className="h-full overflow-auto">
        <table className="w-full bg-white border border-gray-200 rounded-lg min-w-full">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="hidden lg:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredHistory.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-xs sm:text-sm font-medium text-blue-600">
                      {transaction.transactionId}
                    </div>
                    <div className="sm:hidden text-xs text-gray-500 truncate">
                      {transaction.items}
                    </div>
                    <div className="md:hidden text-xs text-gray-500">
                      {transaction.date} {transaction.time}
                    </div>
                  </div>
                </td>
                <td className="hidden sm:table-cell px-6 py-4 text-sm text-gray-900">
                  <div className="max-w-xs truncate">{transaction.items}</div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                  ${transaction.total}
                </td>
                <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.date}
                </td>
                <td className="hidden lg:table-cell px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header with company info */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {selectedCompany} - Point of Sale
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your products, refunds, and transaction history
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4 sm:mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-md px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4 sm:mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSearchTerm("");
                }}
                className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {React.createElement(tab.icon, { size: 16 })}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-hidden min-h-0">
        <div className="h-full overflow-y-auto">
          {activeTab === "products" && renderProductsTable()}
          {activeTab === "refunds" && renderRefundsTable()}
          {activeTab === "history" && renderHistoryTable()}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
