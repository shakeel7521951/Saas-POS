import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const AddCategoryFormModal = ({ onSubmit, onCancel, parentOptions = [] }) => {
  const [form, setForm] = useState({
    name: "",
    parent: "",
    productCount: "",
    image: "",
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
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-lg p-6 relative border border-white/30 animate-fadeIn">
        {/* Close Icon */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
          onClick={onCancel}
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Category Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Category Name
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter category name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Parent Category */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Parent Category
            </label>
            <select
              name="parent"
              value={form.parent}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Parent</option>
              {parentOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Product Count */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Product Count
            </label>
            <input
              name="productCount"
              type="number"
              min={0}
              value={form.productCount}
              onChange={handleChange}
              required
              placeholder="Enter product count"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Image URL
            </label>
            <input
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              required
              placeholder="Enter image URL"
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
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryFormModal;
