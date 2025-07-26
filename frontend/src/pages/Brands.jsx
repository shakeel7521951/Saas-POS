import React, { useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Trash2,
  MoreVertical,
  Eye,
} from "lucide-react";
import Modal from "../components/common/Modal";
import AddBrandForm from "../components/common/AddBrandForm";
import EditBrandForm from "../components/common/EditBrandForm";

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productCountFilter, setProductCountFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const brandsPerPage = 10;

  // Sample data with status and featured properties
  const sampleBrands = [
    {
      id: 1,
      name: "Nike",
      image: "https://via.placeholder.com/40",
      productCount: 125,
    },
    {
      id: 2,
      name: "Adidas",
      image: "https://via.placeholder.com/40",
      productCount: 98,
    },
    {
      id: 3,
      name: "Apple",
      image: "https://via.placeholder.com/40",
      productCount: 75,
    },
    {
      id: 4,
      name: "Samsung",
      image: "https://via.placeholder.com/40",
      productCount: 112,
    },
    {
      id: 5,
      name: "Sony",
      image: "https://via.placeholder.com/40",
      productCount: 64,
    },
    {
      id: 6,
      name: "Dell",
      image: "https://via.placeholder.com/40",
      productCount: 53,
    },
    {
      id: 7,
      name: "HP",
      image: "https://via.placeholder.com/40",
      productCount: 87,
    },
    {
      id: 8,
      name: "Lenovo",
      image: "https://via.placeholder.com/40",
      productCount: 42,
    },
    {
      id: 9,
      name: "Microsoft",
      image: "https://via.placeholder.com/40",
      productCount: 68,
    },
    {
      id: 10,
      name: "Canon",
      image: "https://via.placeholder.com/40",
      productCount: 39,
    },
    {
      id: 11,
      name: "Nikon",
      image: "https://via.placeholder.com/40",
      productCount: 31,
    },
    {
      id: 12,
      name: "LG",
      image: "https://via.placeholder.com/40",
      productCount: 58,
    },
    {
      id: 13,
      name: "Panasonic",
      image: "https://via.placeholder.com/40",
      productCount: 47,
    },
    {
      id: 14,
      name: "Philips",
      image: "https://via.placeholder.com/40",
      productCount: 36,
    },
    {
      id: 15,
      name: "Bose",
      image: "https://via.placeholder.com/40",
      productCount: 29,
    },
  ];

  // Filter options
  const productCountOptions = [
    { value: "All", label: "All Products" },
    { value: "0-50", label: "0-50 Products" },
    { value: "51-100", label: "51-100 Products" },
    { value: "100+", label: "100+ Products" },
  ];

  const filterBrands = () => {
    let filtered = sampleBrands;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((brand) =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply product count filter
    if (productCountFilter !== "All") {
      const [min, max] =
        productCountFilter === "100+"
          ? [100, Infinity]
          : productCountFilter.split("-").map(Number);
      filtered = filtered.filter(
        (brand) => brand.productCount >= min && brand.productCount <= max
      );
    }

    return filtered;
  };

  // Get current brands
  const filteredBrands = filterBrands();
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands.slice(
    indexOfFirstBrand,
    indexOfLastBrand
  );
  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBrand, setEditBrand] = useState(null);

  const handleAddBrand = () => {
    setShowAddModal(true);
  };

  const handleAddBrandSubmit = (data) => {
    console.log("New Brand:", data);
    setShowAddModal(false);
  };

  const handleEdit = (brandId) => {
    const brand = sampleBrands.find((b) => b.id === brandId);
    setEditBrand(brand);
    setShowEditModal(true);
  };

  const handleEditBrandSubmit = (data) => {
    console.log("Edited Brand:", data);
    setShowEditModal(false);
    setEditBrand(null);
  };

  const handleDelete = (brandId) => {
    console.log(`Delete brand ${brandId}`);
  };

  const handleView = (brandId) => {
    console.log(`View brand ${brandId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getProductCountColor = (count) => {
    if (count > 100) return 'bg-purple-100 text-purple-800';
    if (count > 50) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Add Brand Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Brand"
      >
        <AddBrandForm
          onSubmit={handleAddBrandSubmit}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Brand"
      >
        <EditBrandForm
          onSubmit={handleEditBrandSubmit}
          onCancel={() => setShowEditModal(false)}
          initialData={editBrand}
        />
      </Modal>
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Brand Management</h1>
          <p className="text-gray-600 mt-1">
            {filteredBrands.length} brands in inventory
          </p>
        </div>
        
        <button
          onClick={handleAddBrand}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by brand name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2.5 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm shadow-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Product Count Filter */}
        <select
          value={productCountFilter}
          onChange={(e) => {
            setProductCountFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {productCountOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Add Brand Button */}
        <button
          onClick={handleAddBrand}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Brand</span>
        </button>
      </div>

      {/* Brands Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBrands.length > 0 ? (
                currentBrands.map((brand, index) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstBrand + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {brand.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          brand.productCount > 100
                            ? "bg-purple-100 text-purple-800"
                            : brand.productCount > 50
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {brand.productCount} products
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(brand.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(brand.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(brand.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                        <button
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                          title="More"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">
                        No brands match your search criteria
                      </p>
                      <button
                        onClick={() => {
                          setSearchTerm("");
                          setProductCountFilter("All");
                          setCurrentPage(1);
                        }}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBrands.length > brandsPerPage && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">{indexOfFirstBrand + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastBrand, filteredBrands.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredBrands.length}</span>{" "}
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
                      {number}
                    </button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
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

export default Brands;
