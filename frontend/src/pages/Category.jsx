import { useState } from "react";
import Modal from "../components/common/Modal";
import AddCategoryForm from "../components/common/AddCategoryForm";
import EditCategoryForm from "../components/common/EditCategoryForm";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Download,
  Printer,
} from "lucide-react";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParent, setSelectedParent] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const categoriesPerPage = 10;

  // Sample data
  const sampleCategories = [
    {
      id: 1,
      name: "Beverages",
      parent: "None",
      productCount: 24,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 2,
      name: "Food",
      parent: "None",
      productCount: 32,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 3,
      name: "Coffee",
      parent: "Beverages",
      productCount: 12,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 4,
      name: "Tea",
      parent: "Beverages",
      productCount: 8,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 5,
      name: "Sandwiches",
      parent: "Food",
      productCount: 15,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 6,
      name: "Burgers",
      parent: "Food",
      productCount: 10,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 7,
      name: "Desserts",
      parent: "None",
      productCount: 18,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 8,
      name: "Cakes",
      parent: "Desserts",
      productCount: 7,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 9,
      name: "Ice Cream",
      parent: "Desserts",
      productCount: 11,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 10,
      name: "Juices",
      parent: "Beverages",
      productCount: 4,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 11,
      name: "Smoothies",
      parent: "Beverages",
      productCount: 6,
      image: "https://via.placeholder.com/40",
    },
    {
      id: 12,
      name: "Salads",
      parent: "Food",
      productCount: 7,
      image: "https://via.placeholder.com/40",
    },
  ];

  // Get unique parent categories for filter
  const parentCategories = [
    "All",
    "None",
    ...new Set(
      sampleCategories.map((cat) => cat.parent).filter((p) => p !== "None")
    ),
  ];

  const filterCategories = () => {
    let filtered = sampleCategories;

    if (selectedParent !== "All") {
      filtered = filtered.filter((cat) => cat.parent === selectedParent);
    }

    if (searchTerm) {
      filtered = filtered.filter((cat) =>
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Get current categories
  const filteredCategories = filterCategories();
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleAddCategory = () => {
    setShowAddModal(true);
  };

  const handleAddCategorySubmit = (data) => {
    console.log("New Category:", data);
    setShowAddModal(false);
  };

  const handleEdit = (categoryId) => {
    const category = sampleCategories.find((c) => c.id === categoryId);
    setEditCategory(category);
    setShowEditModal(true);
  };

  const handleEditCategorySubmit = (data) => {
    console.log("Edited Category:", data);
    setShowEditModal(false);
    setEditCategory(null);
  };

  const handleDelete = (categoryId) => {
    console.log(`Delete category ${categoryId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className=" flex flex-col p-4 bg-gray-50">
      {/* Add Category Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Category"
      >
        <AddCategoryForm
          onSubmit={handleAddCategorySubmit}
          onCancel={() => setShowAddModal(false)}
          parentOptions={parentCategories}
        />
      </Modal>
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
      >
        <EditCategoryForm
          onSubmit={handleEditCategorySubmit}
          onCancel={() => setShowEditModal(false)}
          initialData={editCategory}
        />
      </Modal>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Category Management
        </h1>
        <p className="text-gray-600">Manage your product categories</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        <select
          value={selectedParent}
          onChange={(e) => {
            setSelectedParent(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {parentCategories.map((parent) => (
            <option key={parent} value={parent}>
              {parent}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Products
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.length > 0 ? (
                currentCategories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstCategory + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category.parent}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.productCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category.id)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredCategories.length > categoriesPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing{" "}
                  <span className="font-medium">
                    {indexOfFirstCategory + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastCategory, filteredCategories.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredCategories.length}
                  </span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (number) => (
                      <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                          currentPage === number
                            ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                            : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
