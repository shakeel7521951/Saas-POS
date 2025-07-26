import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddProductFormModal = ({ onSubmit, onCancel, categoryOptions = [] }) => {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl p-6 relative border border-white/30 animate-fadeIn">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
          onClick={onCancel}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Product Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Price
            </label>
            <input
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              min={0}
              required
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Category</option>
              {categoryOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Stock
            </label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              min={0}
              required
              placeholder="Enter stock quantity"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">SKU</label>
            <input
              name="sku"
              type="text"
              value={form.sku}
              onChange={handleChange}
              required
              placeholder="Enter SKU"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductFormModal;
