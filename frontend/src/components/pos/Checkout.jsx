import React, { useState } from "react";

const Checkout = ({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [discount, setDiscount] = useState(0);

  // Refund modal state
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundCustomer, setRefundCustomer] = useState("");
  const [refundReason, setRefundReason] = useState("");
  const [refundItems, setRefundItems] = useState([]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08; // 8% tax
  const total = subtotal - discountAmount + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const transaction = {
      items: cartItems,
      customerName,
      paymentMethod,
      subtotal,
      discount: discountAmount,
      tax,
      total,
      timestamp: new Date().toISOString(),
    };

    console.log("Transaction:", transaction);
    alert("Transaction completed successfully!");

    // Clear cart and form
    onClearCart();
    setCustomerName("");
    setDiscount(0);
  };

  // Refund logic
  const handleRefund = () => {
    if (refundItems.length === 0 || !refundCustomer) {
      alert("Please select items and enter customer name for refund.");
      return;
    }
    const refund = {
      items: refundItems,
      customerName: refundCustomer,
      reason: refundReason,
      timestamp: new Date().toISOString(),
    };
    console.log("Refund:", refund);
    alert("Refund processed!");
    setShowRefundModal(false);
    setRefundCustomer("");
    setRefundReason("");
    setRefundItems([]);
  };

  return (
    <div className="h-full flex flex-col bg-white p-6 max-h-screen overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Checkout</h2>
        <div className="w-full h-px bg-gray-200"></div>
      </div>

      {/* Customer Info */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Customer Name
        </label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Cart Items */}
      <div className="flex-1 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Cart Items</h3>
        {cartItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🛒</div>
            <p>Your cart is empty</p>
            <p className="text-sm">Add products to get started</p>
          </div>
        ) : (
          <div className="space-y-3 h-fit">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-50 rounded-lg p-3 border border-gray-200"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-600">${item.price} each</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-600"
                    >
                      +
                    </button>
                  </div>
                  <div className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discount */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Discount (%)
        </label>
        <input
          type="number"
          min="0"
          max="100"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Payment Method */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="cash">Cash</option>
          <option value="card">Credit/Debit Card</option>
          <option value="digital">Digital Wallet</option>
        </select>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-800 mb-3">Order Summary</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({discount}%):</span>
              <span>-${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Tax (8%):</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-blue-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          Complete Transaction
        </button>
        <button
          onClick={onClearCart}
          disabled={cartItems.length === 0}
          className="w-full bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Clear Cart
        </button>
        <button
          onClick={() => setShowRefundModal(true)}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Refund
        </button>
      </div>

      {/* Refund Modal */}
      {showRefundModal && (
        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setShowRefundModal(false)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Process Refund
            </h3>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Name
            </label>
            <input
              type="text"
              value={refundCustomer}
              onChange={(e) => setRefundCustomer(e.target.value)}
              placeholder="Enter customer name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Items to Refund
            </label>
            <div className="mb-4 max-h-32 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={refundItems.some((ref) => ref.id === item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setRefundItems([...refundItems, item]);
                      } else {
                        setRefundItems(
                          refundItems.filter((ref) => ref.id !== item.id)
                        );
                      }
                    }}
                    className="mr-2"
                  />
                  <span>
                    {item.name} (${item.price})
                  </span>
                </div>
              ))}
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason
            </label>
            <input
              type="text"
              value={refundReason}
              onChange={(e) => setRefundReason(e.target.value)}
              placeholder="Reason for refund"
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            />
            <button
              onClick={handleRefund}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Submit Refund
            </button>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Items in cart:{" "}
          {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        </p>
      </div>
    </div>
  );
};

export default Checkout;
