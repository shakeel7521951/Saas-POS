import React from "react";
import { ShoppingCart, Calendar, User } from "lucide-react";

const POSHeader = ({
  transactionTypes,
  activeTab,
  formattedDate,
  formattedTime,
  invoiceNumber,
}) => {
  const getCurrentTabGradient = () => {
    const gradients = {
      quotation: "bg-gradient-to-t from-gray-500 to-gray-700",
      order: "bg-gradient-to-t from-yellow-500 to-yellow-700",
      sales: "bg-gradient-to-t from-blue-500 to-blue-700",
      returns: "bg-gradient-to-t from-red-500 to-red-700",
    };
    return gradients[activeTab] || gradients.sales;
  };

  return (
    <div
      className={`${getCurrentTabGradient()} p-4 flex flex-wrap items-center justify-between shadow-md`}
    >
      <div className="flex items-center space-x-4 mb-2 md:mb-0">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-white" />
          <h1 className="text-xl font-bold text-white">
            {transactionTypes.find((tab) => tab.id === activeTab)?.name ||
              "POS Transaction"}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-black bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-md text-white">
          <Calendar className="h-5 w-5" />
          <div className="flex flex-col">
            <span className="text-xs opacity-80">Date & Time</span>
            <span className="font-medium">
              {formattedDate} {formattedTime}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-black bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-md text-white">
          <div className="bg-white rounded-full p-1">
            <User className="h-4 w-4 text-gray-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs opacity-80">Cashier</span>
            <span className="font-medium">John Doe</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-black bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-md text-white">
          <div className="flex flex-col">
            <span className="text-xs opacity-80">
              {activeTab === "quotation"
                ? "Quote #"
                : activeTab === "order"
                ? "Order #"
                : activeTab === "returns"
                ? "Return #"
                : "Invoice #"}
            </span>
            <span className="font-medium">{invoiceNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default POSHeader;
