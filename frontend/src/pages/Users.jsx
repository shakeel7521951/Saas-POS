import React, { useState, useMemo } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit2,
  Trash2,
  MoreVertical,
} from "lucide-react";
import Modal from "../components/common/Modal";
import AddUserForm from "../components/common/AddUserForm";
import EditUserForm from "../components/common/EditUserForm";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const sampleUsers = [
    {
      id: 1,
      name: "John Doe",
      role: "Admin",
      phone: "(555) 123-4567",
      stores: 3,
      createdOn: "2023-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Manager",
      phone: "(555) 987-6543",
      stores: 2,
      createdOn: "2023-02-20",
    },
    {
      id: 3,
      name: "Robert Johnson",
      role: "Staff",
      phone: "(555) 456-7890",
      stores: 1,
      createdOn: "2023-03-10",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Manager",
      phone: "(555) 789-0123",
      stores: 2,
      createdOn: "2023-04-05",
    },
    {
      id: 5,
      name: "Michael Wilson",
      role: "Staff",
      phone: "(555) 234-5678",
      stores: 1,
      createdOn: "2023-05-12",
    },
    {
      id: 6,
      name: "Sarah Brown",
      role: "Admin",
      phone: "(555) 345-6789",
      stores: 4,
      createdOn: "2023-06-18",
    },
    {
      id: 7,
      name: "David Miller",
      role: "Staff",
      phone: "(555) 567-8901",
      stores: 1,
      createdOn: "2023-07-22",
    },
    {
      id: 8,
      name: "Lisa Taylor",
      role: "Manager",
      phone: "(555) 678-9012",
      stores: 3,
      createdOn: "2023-08-30",
    },
    {
      id: 9,
      name: "James Anderson",
      role: "Staff",
      phone: "(555) 890-1234",
      stores: 1,
      createdOn: "2023-09-05",
    },
    {
      id: 10,
      name: "Emma Thomas",
      role: "Admin",
      phone: "(555) 901-2345",
      stores: 5,
      createdOn: "2023-10-12",
    },
    {
      id: 11,
      name: "Daniel White",
      role: "Staff",
      phone: "(555) 012-3456",
      stores: 1,
      createdOn: "2023-11-19",
    },
    {
      id: 12,
      name: "Olivia Harris",
      role: "Manager",
      phone: "(555) 123-7890",
      stores: 2,
      createdOn: "2023-12-25",
    },
  ];

  const roleOptions = [
    { value: "All", label: "All Roles" },
    { value: "Admin", label: "Admin" },
    { value: "Manager", label: "Manager" },
    { value: "Staff", label: "Staff" },
  ];

  const filteredUsers = useMemo(() => {
    let filtered = sampleUsers;

    if (searchTerm) {
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.phone.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "All") {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    return filtered;
  }, [searchTerm, roleFilter]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editUser, setEditUser] = useState(null);

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleAddUserSubmit = (data) => {
    // Already logs in form
    setShowAddModal(false);
  };

  const handleEdit = (id) => {
    const user = sampleUsers.find((u) => u.id === id);
    setEditUser(user);
    setShowEditModal(true);
  };

  const handleEditUserSubmit = (data) => {
    // Already logs in form
    setShowEditModal(false);
    setEditUser(null);
  };

  const handleDelete = (id) => console.log("Delete user", id);
  const handleView = (id) => console.log("View user", id);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add User"
      >
        <AddUserForm
          onSubmit={handleAddUserSubmit}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
      >
        <EditUserForm
          onSubmit={handleEditUserSubmit}
          onCancel={() => setShowEditModal(false)}
          initialData={editUser}
        />
      </Modal>
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
        <p className="text-sm text-gray-600">
          Manage your users and their roles
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute top-2.5 left-3 w-4 h-4 text-gray-400" />
        </div>

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full py-2 px-4 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        >
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddUser}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
        >
          <Plus className="w-4 h-4" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-auto">
        <table className="w-full min-w-[800px] divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "SL",
                "User",
                "Role",
                "Phone Number",
                "Stores",
                "Created On",
                "Action",
              ].map((title) => (
                <th
                  key={title}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase"
                >
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user, i) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {indexOfFirstUser + i + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "Admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "Manager"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.stores}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {user.createdOn}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button title="View" onClick={() => handleView(user.id)}>
                        <Eye className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                      </button>
                      <button title="Edit" onClick={() => handleEdit(user.id)}>
                        <Edit2 className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(user.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                      </button>
                      <button title="More">
                        <MoreVertical className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {indexOfFirstUser + 1} to{" "}
            {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  onClick={() => paginate(page)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === page
                      ? "bg-blue-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
