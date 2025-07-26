import { useState, useEffect } from "react";

const EditSupplierForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    phone: "",
    email: "",
    products: "",
    since: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        contact: initialData.contact || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        products: initialData.products || "",
        since: initialData.since || "",
        status: initialData.status || "Active",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited Supplier:", form);
    onSubmit({ ...form, id: initialData.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Supplier Name
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Contact Person
        </label>
        <input
          type="text"
          name="contact"
          value={form.contact}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Products
        </label>
        <input
          type="number"
          name="products"
          value={form.products}
          onChange={handleChange}
          min={0}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Since</label>
        <input
          type="date"
          name="since"
          value={form.since}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Active">Active</option>
          <option value="Preferred">Preferred</option>
          <option value="Pending">Pending</option>
          <option value="Inactive">Inactive</option>
          <option value="New">New</option>
        </select>
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditSupplierForm;
