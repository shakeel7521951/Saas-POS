import React from "react";

const TabNavigation = ({ transactionTypes, activeTab, setActiveTab }) => {
  const getTabGradient = (tab) => {
    const gradients = {
      quotation:
        activeTab === tab.id
          ? "bg-gradient-to-r from-gray-500 to-gray-700"
          : "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600",
      order:
        activeTab === tab.id
          ? "bg-gradient-to-r from-yellow-500 to-yellow-700"
          : "bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600",
      sales:
        activeTab === tab.id
          ? "bg-gradient-to-r from-blue-500 to-blue-700"
          : "bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600",
      returns:
        activeTab === tab.id
          ? "bg-gradient-to-r from-red-500 to-red-700"
          : "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600",
    };
    return gradients[tab.id] || gradients.sales;
  };

  return (
    <div className=" border-gray-200 shadow-sm pb-2">
      <div className="flex space-x-0">
        {transactionTypes.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 text-white font-semibold transition-all duration-300 focus:outline-none transform hover:scale-105 ${getTabGradient(
              tab
            )} ${activeTab === tab.id ? "shadow-lg" : "shadow-md"}`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;
