import React, { useState } from "react";
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
import AddSupplierForm from "../components/common/AddSupplierForm";
import EditSupplierForm from "../components/common/EditSupplierForm";

const Suppliers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const suppliersPerPage = 10;

  // Status filter options
  const statusOptions = [
    { value: 'All', label: 'All Suppliers' },
    { value: 'Active', label: 'Active' },
    { value: 'Preferred', label: 'Preferred' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'New', label: 'New' }
  ];

  // Sample data
  const sampleSuppliers = [
    {
      id: 1,
      name: "Global Electronics",
      contact: "John Smith",
      phone: "(555) 123-4567",
      email: "john@globalelectronics.com",
      products: 42,
      since: "2020-05-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Premium Textiles",
      contact: "Sarah Johnson",
      phone: "(555) 987-6543",
      email: "sarah@premiumtextiles.com",
      products: 28,
      since: "2021-02-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Quality Foods Inc.",
      contact: "Michael Brown",
      phone: "(555) 456-7890",
      email: "michael@qualityfoods.com",
      products: 15,
      since: "2022-03-10",
      status: "Pending",
    },
    {
      id: 4,
      name: "Industrial Parts Co.",
      contact: "Emily Davis",
      phone: "(555) 789-0123",
      email: "emily@industrialparts.com",
      products: 37,
      since: "2019-04-05",
      status: "Active",
    },
    {
      id: 5,
      name: "Office Supplies Ltd.",
      contact: "Robert Wilson",
      phone: "(555) 234-5678",
      email: "robert@officesupplies.com",
      products: 8,
      since: "2023-05-12",
      status: "Inactive",
    },
    {
      id: 6,
      name: "Fashion Trends",
      contact: "Lisa Miller",
      phone: "(555) 345-6789",
      email: "lisa@fashiontrends.com",
      products: 21,
      since: "2021-06-18",
      status: "Active",
    },
    {
      id: 7,
      name: "Tech Components",
      contact: "David Taylor",
      phone: "(555) 567-8901",
      email: "david@techcomponents.com",
      products: 0,
      since: "2023-07-22",
      status: "New",
    },
    {
      id: 8,
      name: "Building Materials Corp.",
      contact: "Jennifer Anderson",
      phone: "(555) 678-9012",
      email: "jennifer@buildingmaterials.com",
      products: 53,
      since: "2018-08-30",
      status: "Preferred",
    },
    {
      id: 9,
      name: "Home Decor Imports",
      contact: "Thomas White",
      phone: "(555) 890-1234",
      email: "thomas@homedecor.com",
      products: 19,
      since: "2022-09-05",
      status: "Active",
    },
    {
      id: 10,
      name: "Auto Parts Direct",
      contact: "Jessica Harris",
      phone: "(555) 901-2345",
      email: "jessica@autoparts.com",
      products: 31,
      since: "2020-10-12",
      status: "Active",
    },
    {
      id: 11,
      name: "Medical Supplies LLC",
      contact: "Daniel Martin",
      phone: "(555) 012-3456",
      email: "daniel@medicalsupplies.com",
      products: 12,
      since: "2023-11-19",
      status: "Pending",
    },
    {
      id: 12,
      name: "Sports Equipment Inc.",
      contact: "Amanda Thompson",
      phone: "(555) 123-7890",
      email: "amanda@sportsequipment.com",
      products: 27,
      since: "2021-12-25",
      status: "Preferred",
    },
  ];

  // Status filter options
  const statusOptions = [
    { value: "All", label: "All Suppliers" },
    { value: "Active", label: "Active" },
    { value: "Preferred", label: "Preferred" },
    { value: "Pending", label: "Pending" },
    { value: "Inactive", label: "Inactive" },
    { value: "New", label: "New" },
  ];

  const filterSuppliers = () => {
    let filtered = sampleSuppliers;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (supplier) =>
          supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
          supplier.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (supplier) => supplier.status === statusFilter
      );
    }

    return filtered;
  };

  const filteredSuppliers = filterSuppliers();
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = filteredSuppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );
  const totalPages = Math.ceil(filteredSuppliers.length / suppliersPerPage);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSupplier, setEditSupplier] = useState(null);

  const handleAddSupplier = () => {
    setShowAddModal(true);
  };

  const handleAddSupplierSubmit = (data) => {
    // Already logs in form
    setShowAddModal(false);
  };

  const handleEdit = (supplierId) => {
    const supplier = sampleSuppliers.find((s) => s.id === supplierId);
    setEditSupplier(supplier);
    setShowEditModal(true);
  };

  const handleEditSupplierSubmit = (data) => {
    // Already logs in form
    setShowEditModal(false);
    setEditSupplier(null);
  };

  const handleDelete = (supplierId) => {
    console.log(`Delete supplier ${supplierId}`);
  };

  const handleView = (supplierId) => {
    console.log(`View supplier ${supplierId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Add Supplier Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Supplier"
      >
        <AddSupplierForm
          onSubmit={handleAddSupplierSubmit}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
      {/* Edit Supplier Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Supplier"
      >
        <EditSupplierForm
          onSubmit={handleEditSupplierSubmit}
          onCancel={() => setShowEditModal(false)}
          initialData={editSupplier}
        />
      </Modal>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Supplier Management
        </h1>
        <p className="text-gray-600">
          Manage your suppliers and vendor relationships
        </p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-blue-400" />
          </div>
          <input
            type="text"
            placeholder="Search suppliers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 pl-10 pr-4 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white text-blue-900"
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {/* Add Supplier Button */}
        <button
          onClick={handleAddSupplier}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Supplier</span>
        </button>
      </div>
      {/* Suppliers Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-xl shadow-lg border border-blue-100">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-blue-200">
            <thead className="bg-blue-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Since
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-blue-100">
              {currentSuppliers.length > 0 ? (
                currentSuppliers.map((supplier, index) => (
                  <tr key={supplier.id} className="hover:bg-blue-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-blue-900">
                      {indexOfFirstSupplier + index + 1}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-600 text-sm font-medium">
                            {supplier.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {supplier.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {supplier.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-blue-900">
                      {supplier.contact}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-blue-900">
                      {supplier.phone}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-blue-900 font-medium">
                      {supplier.products}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-blue-900">
                      {new Date(supplier.since).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          supplier.status === "Preferred"
                            ? "bg-purple-100 text-purple-800"
                            : supplier.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : supplier.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : supplier.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {supplier.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(supplier.id)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(supplier.id)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(supplier.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="8"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">
                        No suppliers match your search criteria
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setStatusFilter("All");
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Reset filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredSuppliers.length > suppliersPerPage && (
          <div className="border-t border-blue-200 px-6 py-4 flex items-center justify-between bg-blue-50 rounded-b-xl">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {indexOfFirstSupplier + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastSupplier, filteredSuppliers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredSuppliers.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                {/* Page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => paginate(pageNumber)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === pageNumber
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-blue-300 bg-white text-sm font-medium text-blue-700">
                    ...
                  </span>
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Suppliers;
