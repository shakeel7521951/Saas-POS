import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddWarehouseFormModal = ({ onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    productCount: "",
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
    <div className="fixed inset-0 z-50 backdrop-blur-xl  flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative animate-fadeIn">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl"
          onClick={onCancel}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Warehouse
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Warehouse Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter warehouse name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Phone Number
            </label>
            <input
              name="phone"
              type="text"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Address
            </label>
            <input
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
              placeholder="Enter address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Product Count */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Count
            </label>
            <input
              name="productCount"
              type="number"
              value={form.productCount}
              onChange={handleChange}
              min={0}
              required
              placeholder="Enter product count"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
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
              Add Warehouse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWarehouseFormModal;
