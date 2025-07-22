import React, { useState } from "react";
import Sidebar from "../components/pos/Sidebar";
import ProductTabs from "../components/pos/ProductTabs";
import Checkout from "../components/pos/Checkout";
import { Menu, X, ShoppingCart } from "lucide-react";

const POS = () => {
  const [selectedCompany, setSelectedCompany] = useState("Company A");
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Navigation Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">POS System</h1>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="relative p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </div>
        </button>
      </div>

      <div className="flex h-screen lg:h-[calc(100vh-0px)] overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
            <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-xl z-60">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Menu</h2>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <Sidebar
                selectedCompany={selectedCompany}
                setSelectedCompany={setSelectedCompany}
              />
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 bg-white border-r border-gray-200 shadow-lg">
          <Sidebar
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
          />
        </div>

        {/* Center Content */}
        <div className="flex-1 bg-white overflow-y-auto p-3 sm:p-4 lg:p-6">
          <ProductTabs
            selectedCompany={selectedCompany}
            onAddToCart={addToCart}
          />
        </div>

        {/* Mobile Checkout Overlay */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setIsCheckoutOpen(false)}
            ></div>
            <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-60">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold">Checkout</h2>
                <button
                  onClick={() => setIsCheckoutOpen(false)}
                  className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              <Checkout
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeFromCart}
                onClearCart={clearCart}
              />
            </div>
          </div>
        )}

        {/* Desktop Checkout */}
        <div className="hidden lg:block w-80 xl:w-96 bg-white border-l border-gray-200 shadow-lg">
          <Checkout
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClearCart={clearCart}
          />
        </div>
      </div>
    </div>
  );
};

export default POS;
