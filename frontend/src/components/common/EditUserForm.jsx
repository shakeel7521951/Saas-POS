import { useState, useEffect } from "react";

const EditUserForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: "",
    role: "Admin",
    phone: "",
    stores: "",
    createdOn: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        role: initialData.role || "Admin",
        phone: initialData.phone || "",
        stores: initialData.stores || "",
        createdOn: initialData.createdOn || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edited User:", form);
    onSubmit({ ...form, id: initialData.id });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
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
        <label className="block text-sm font-medium text-gray-700">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        >
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Staff">Staff</option>
        </select>
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
        <label className="block text-sm font-medium text-gray-700">
          Stores
        </label>
        <input
          type="number"
          name="stores"
          value={form.stores}
          onChange={handleChange}
          min={0}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Created On
        </label>
        <input
          type="date"
          name="createdOn"
          value={form.createdOn}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
        />
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

export default EditUserForm;
