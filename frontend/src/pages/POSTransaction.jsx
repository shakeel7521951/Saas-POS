import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../components/pos/POSTransaction.css';
import { ShoppingCart, Calendar, User, CreditCard, DollarSign, Search, Plus, Trash2, CheckCircle, RefreshCcw } from 'lucide-react';

// Mock data for products
const productList = [
  { id: 1, name: 'Laptop', price: 1200.00 },
  { id: 2, name: 'Mouse', price: 25.00 },
  { id: 3, name: 'Keyboard', price: 45.00 },
  { id: 4, name: 'Monitor', price: 300.00 },
  { id: 5, name: 'Headphones', price: 80.00 },
  { id: 6, name: 'Printer', price: 150.00 },
  { id: 7, name: 'Webcam', price: 60.00 },
  { id: 8, name: 'External Hard Drive', price: 120.00 },
  { id: 9, name: 'USB Cable', price: 10.00 },
  { id: 10, name: 'HDMI Cable', price: 15.00 },
];

// Mock data for companies
const companies = [
  { id: 1, name: 'Tech Solutions Inc.' },
  { id: 2, name: 'Global Retail Ltd.' },
  { id: 3, name: 'Modern Supplies Co.' },
  { id: 4, name: 'Express Merchants' },
];

const POSTransaction = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Math.floor(Math.random() * 10000));
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [items, setItems] = useState([{ id: uuidv4(), product: null, quantity: 1, price: 0, discount: 0, total: 0 }]);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeItemId, setActiveItemId] = useState(null);
  const [activeField, setActiveField] = useState(null);
  
  const searchRef = useRef(null);
  
  // Update date/time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format date and time
  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Calculate subtotal, VAT, and grand total
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  const discountTotal = items.reduce((sum, item) => sum + (item.price * item.quantity * item.discount / 100), 0);
  const vat = subtotal * 0.15; // Assuming 15% VAT
  const grandTotal = subtotal + vat;
  
  // Handle product search
  useEffect(() => {
    if (searchTerm) {
      const filtered = productList.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchTerm]);
  
  // Handle product selection
  const handleSelectProduct = (product, itemId) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newItem = { 
          ...item, 
          product: product, 
          price: product.price, 
          total: product.price * item.quantity * (1 - item.discount / 100) 
        };
        return newItem;
      }
      return item;
    }));
    setShowProductSearch(false);
    setSearchTerm('');
  };
  
  // Handle quantity change
  const handleQuantityChange = (value, itemId) => {
    const quantity = Math.max(1, parseInt(value) || 1);
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newItem = { 
          ...item, 
          quantity: quantity, 
          total: item.price * quantity * (1 - item.discount / 100) 
        };
        return newItem;
      }
      return item;
    }));
  };
  
  // Handle price change
  const handlePriceChange = (value, itemId) => {
    const price = parseFloat(value) || 0;
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newItem = { 
          ...item, 
          price: price, 
          total: price * item.quantity * (1 - item.discount / 100) 
        };
        return newItem;
      }
      return item;
    }));
  };
  
  // Handle discount change
  const handleDiscountChange = (value, itemId) => {
    const discount = Math.min(100, Math.max(0, parseFloat(value) || 0));
    setItems(items.map(item => {
      if (item.id === itemId) {
        const newItem = { 
          ...item, 
          discount: discount, 
          total: item.price * item.quantity * (1 - discount / 100) 
        };
        return newItem;
      }
      return item;
    }));
  };
  
  // Add a new row
  const addNewRow = () => {
    setItems([...items, { id: uuidv4(), product: null, quantity: 1, price: 0, discount: 0, total: 0 }]);
  };
  
  // Remove a row
  const removeRow = (itemId) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== itemId));
    }
  };
  
  // Clear all items
  const clearTransaction = () => {
    setItems([{ id: uuidv4(), product: null, quantity: 1, price: 0, discount: 0, total: 0 }]);
    setInvoiceNumber('INV-' + Math.floor(Math.random() * 10000));
  };
  
  // Handle finalize sale
  const finalizeSale = () => {
    // Here you would typically send data to an API
    console.log({
      company: selectedCompany,
      invoiceNumber,
      dateTime: currentDateTime,
      items,
      subtotal,
      discountTotal,
      vat,
      grandTotal
    });
    
    // Clear for next transaction
    clearTransaction();
    alert("Sale completed successfully!");
  };

  // Handle input field selection
  const handleFieldFocus = (itemId, field) => {
    setActiveItemId(itemId);
    setActiveField(field);
    if (field === 'product') {
      setShowProductSearch(true);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e, itemId, fieldIndex, rowIndex) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      // If we're on the last field of the last row, add a new row
      if (rowIndex === items.length - 1 && fieldIndex === 3) {
        addNewRow();
      } 
      
      // Otherwise move to the next field or row
      const nextFieldIndex = (fieldIndex + 1) % 4;
      const nextRowIndex = nextFieldIndex === 0 ? rowIndex + 1 : rowIndex;
      
      if (nextRowIndex < items.length) {
        const nextItemId = items[nextRowIndex].id;
        const fields = ['product', 'quantity', 'price', 'discount'];
        setActiveItemId(nextItemId);
        setActiveField(fields[nextFieldIndex]);
        
        // Focus on the next input
        const nextInput = document.querySelector(`[data-item-id="${nextItemId}"][data-field="${fields[nextFieldIndex]}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR'
    }).format(amount);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 font-lato pos-transaction">
      {/* Top Bar */}
      <div className="bg-[#004089] p-4 flex flex-wrap items-center justify-between shadow-md">
        <div className="flex items-center space-x-4 mb-2 md:mb-0">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold text-white">POS Transaction</h1>
          </div>
          <div className="relative">
            <select 
              value={selectedCompany.id}
              onChange={(e) => setSelectedCompany(companies.find(c => c.id === parseInt(e.target.value)))}
              className="bg-white text-gray-800 px-4 py-2 rounded-md appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-[#2a843f]"
            >
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#003070] px-3 py-2 rounded-md text-white">
            <Calendar className="h-5 w-5" />
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Date & Time</span>
              <span className="font-medium">{formattedDate} {formattedTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-[#003070] px-3 py-2 rounded-md text-white">
            <div className="bg-white rounded-full p-1">
              <User className="h-4 w-4 text-[#004089]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Cashier</span>
              <span className="font-medium">John Doe</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 bg-[#003070] px-3 py-2 rounded-md text-white">
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Invoice #</span>
              <span className="font-medium">{invoiceNumber}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main POS Table */}
      <div className="flex-1 overflow-auto p-5 pos-scrollbar">
        <div className="bg-white rounded-lg shadow-md mx-auto p-5" style={{ maxWidth: 'calc(100% - 160px)' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-100 text-gray-700 border-b">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left w-2/5">Product</th>
                  <th className="px-4 py-3 text-right">Quantity</th>
                  <th className="px-4 py-3 text-right">Price</th>
                  <th className="px-4 py-3 text-right">Discount %</th>
                  <th className="px-4 py-3 text-right">Line Total</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 divide-y divide-gray-100">
                {items.map((item, index) => (
                  <tr key={item.id} className="pos-table-row hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2 relative">
                      <div className="relative">
                        <input
                          type="text"
                          data-item-id={item.id}
                          data-field="product"
                          className="w-full px-3 py-2 border rounded-md pos-input focus:ring-2 focus:ring-[#2a843f] focus:border-transparent"
                          placeholder="Search product..."
                          value={item.product ? item.product.name : searchTerm}
                          onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowProductSearch(true);
                            setActiveItemId(item.id);
                          }}
                          onFocus={() => handleFieldFocus(item.id, 'product')}
                          onKeyDown={(e) => handleKeyDown(e, item.id, 0, index)}
                          ref={activeItemId === item.id && activeField === 'product' ? searchRef : null}
                        />
                        <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                      {showProductSearch && activeItemId === item.id && (
                        <div className="absolute z-10 w-full bg-white mt-1 border rounded-md shadow-lg max-h-60 overflow-auto pos-scrollbar">
                          {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                              <div
                                key={product.id}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectProduct(product, item.id)}
                              >
                                <div className="font-medium">{product.name}</div>
                                <div className="text-sm text-gray-500">{formatCurrency(product.price)}</div>
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-gray-500">No products found</div>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        data-item-id={item.id}
                        data-field="quantity"
                        min="1"
                        className="w-full px-3 py-2 border rounded-md text-right pos-input focus:ring-2 focus:ring-[#2a843f] focus:border-transparent"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(e.target.value, item.id)}
                        onFocus={() => handleFieldFocus(item.id, 'quantity')}
                        onKeyDown={(e) => handleKeyDown(e, item.id, 1, index)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        data-item-id={item.id}
                        data-field="price"
                        min="0"
                        step="0.01"
                        className="w-full px-3 py-2 border rounded-md text-right pos-input focus:ring-2 focus:ring-[#2a843f] focus:border-transparent"
                        value={item.price}
                        onChange={(e) => handlePriceChange(e.target.value, item.id)}
                        onFocus={() => handleFieldFocus(item.id, 'price')}
                        onKeyDown={(e) => handleKeyDown(e, item.id, 2, index)}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        data-item-id={item.id}
                        data-field="discount"
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border rounded-md text-right pos-input focus:ring-2 focus:ring-[#2a843f] focus:border-transparent"
                        value={item.discount}
                        onChange={(e) => handleDiscountChange(e.target.value, item.id)}
                        onFocus={() => handleFieldFocus(item.id, 'discount')}
                        onKeyDown={(e) => handleKeyDown(e, item.id, 3, index)}
                      />
                    </td>
                    <td className="px-4 py-2 text-right font-semibold">
                      {formatCurrency(item.total)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => removeRow(item.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="7" className="px-4 py-2">
                    <button 
                      onClick={addNewRow} 
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center space-x-1 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Item</span>
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          
          {/* Totals */}
          <div className="mt-6 border-t pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div className="w-full sm:w-1/2"></div>
              <div className="w-full sm:w-1/2 space-y-3 text-gray-700 bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between">
                  <span className="font-medium">Subtotal:</span>
                  <span className="font-semibold">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Discount:</span>
                  <span className="font-semibold text-red-500">-{formatCurrency(discountTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">VAT (15%):</span>
                  <span className="font-semibold">{formatCurrency(vat)}</span>
                </div>
                <div className="flex justify-between text-lg border-t border-gray-200 pt-2 mt-2">
                  <span className="font-bold">Grand Total:</span>
                  <span className="font-bold text-[#004089]">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-white p-4 shadow-md">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex space-x-2 mb-2 md:mb-0">
            <button 
              className="bg-[#004089] text-white px-6 py-2 rounded-md hover:bg-[#003070] transition-colors focus:outline-none focus:ring-2 focus:ring-[#003070] flex items-center space-x-2"
              onClick={() => alert("Cash payment selected")}
            >
              <DollarSign className="h-5 w-5" />
              <span>Cash Payment</span>
            </button>
            <button 
              className="bg-[#004089] text-white px-6 py-2 rounded-md hover:bg-[#003070] transition-colors focus:outline-none focus:ring-2 focus:ring-[#003070] flex items-center space-x-2"
              onClick={() => alert("Card payment selected")}
            >
              <CreditCard className="h-5 w-5" />
              <span>Card Payment</span>
            </button>
            <button 
              className="bg-amber-500 text-white px-6 py-2 rounded-md hover:bg-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 flex items-center space-x-2"
              onClick={() => alert("Refund initiated")}
            >
              <RefreshCcw className="h-5 w-5" />
              <span>Refund</span>
            </button>
            <button 
              className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center space-x-2"
              onClick={clearTransaction}
            >
              <Trash2 className="h-5 w-5" />
              <span>Clear</span>
            </button>
          </div>
          
          <button 
            className="bg-[#2a843f] text-white px-8 py-2 rounded-md hover:bg-[#1f6830] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1f6830] flex items-center space-x-2"
            onClick={finalizeSale}
          >
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Finalize Sale</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default POSTransaction;
