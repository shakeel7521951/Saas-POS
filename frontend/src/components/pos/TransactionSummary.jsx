import React from "react";

const TransactionSummary = ({
  subtotal,
  discountTotal,
  vat,
  grandTotal,
  formatCurrency,
}) => {
  return (
    <div className="mt-6 border-t border-white pt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="w-full sm:w-1/2"></div>
        <div className="w-full sm:w-1/2 space-y-3 text-gray-700 bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between">
            <span className="font-medium">Subtotal:</span>
            <span className="font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Discount:</span>
            <span className="font-semibold text-red-500">
              -{formatCurrency(discountTotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">VAT (15%):</span>
            <span className="font-semibold">{formatCurrency(vat)}</span>
          </div>
          <div className="flex justify-between text-lg border-t pt-2 mt-2">
            <span className="font-bold">Grand Total:</span>
            <span className="font-bold text-blue-600">
              {formatCurrency(grandTotal)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
