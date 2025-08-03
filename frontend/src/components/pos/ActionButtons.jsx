import React from "react";
import {
  DollarSign,
  CreditCard,
  RefreshCcw,
  Trash2,
  CheckCircle,
} from "lucide-react";

const ActionButtons = ({ activeTab, clearTransaction, finalizeSale }) => {
  const getCurrentTabGradient = () => {
    const gradients = {
      quotation:
        "bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800",
      order:
        "bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-600 hover:to-yellow-800",
      sales:
        "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
      returns:
        "bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800",
    };
    return gradients[activeTab] || gradients.sales;
  };

  return (
    <div className="p-4 shadow-lg border-t border-white">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex space-x-2 mb-2 md:mb-0">
          {activeTab !== "returns" && (
            <>
              <button
                className={`${getCurrentTabGradient()} text-white px-6 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center space-x-2 shadow-lg transform hover:scale-105`}
                onClick={() => alert("Cash payment selected")}
              >
                <DollarSign className="h-5 w-5" />
                <span>Cash Payment</span>
              </button>
              <button
                className={`${getCurrentTabGradient()} text-white px-6 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 flex items-center space-x-2 shadow-lg transform hover:scale-105`}
                onClick={() => alert("Card payment selected")}
              >
                <CreditCard className="h-5 w-5" />
                <span>Card Payment</span>
              </button>
            </>
          )}

          {activeTab === "returns" && (
            <button
              className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white px-6 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
              onClick={() => alert("Return processed")}
            >
              <RefreshCcw className="h-5 w-5" />
              <span>Process Return</span>
            </button>
          )}

          <button
            className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white px-6 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
            onClick={clearTransaction}
          >
            <Trash2 className="h-5 w-5" />
            <span>Clear</span>
          </button>
        </div>

        <button
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-8 py-2 rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 flex items-center space-x-2 shadow-lg transform hover:scale-105"
          onClick={finalizeSale}
        >
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">
            {activeTab === "quotation"
              ? "Save Quote"
              : activeTab === "order"
              ? "Confirm Order"
              : activeTab === "returns"
              ? "Process Return"
              : "Finalize Sale"}
          </span>
        </button>
      </div>
    </div>
  );
};
export default ActionButtons;
