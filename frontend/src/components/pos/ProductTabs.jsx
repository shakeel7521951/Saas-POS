import { useState } from "react";
import Modal from "../../components/common/Modal";
import AddProductForm from "../../components/common/AddProductForm";
import EditProductForm from "../../components/common/EditProductForm";
import { FaTimes } from "react-icons/fa";
import {
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ProductTabs = ({ selectedCompany }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 10;

  // Sample data - expanded to have more than 10 products
  const sampleProducts = [
    {
      id: 1,
      name: "Coffee",
      price: 4.99,
      category: "Beverages",
      stock: 50,
      sku: "BEV001",
    },
    {
      id: 2,
      name: "Sandwich",
      price: 8.99,
      category: "Food",
      stock: 25,
      sku: "FD001",
    },
    {
      id: 3,
      name: "Tea",
      price: 3.99,
      category: "Beverages",
      stock: 30,
      sku: "BEV002",
    },
    {
      id: 4,
      name: "Burger",
      price: 12.99,
      category: "Food",
      stock: 15,
      sku: "FD002",
    },
    {
      id: 5,
      name: "Juice",
      price: 5.99,
      category: "Beverages",
      stock: 40,
      sku: "BEV003",
    },
    {
      id: 6,
      name: "Pizza",
      price: 14.99,
      category: "Food",
      stock: 20,
      sku: "FD003",
    },
    {
      id: 7,
      name: "Soda",
      price: 2.99,
      category: "Beverages",
      stock: 60,
      sku: "BEV004",
    },
    {
      id: 8,
      name: "Salad",
      price: 9.99,
      category: "Food",
      stock: 18,
      sku: "FD004",
    },
    {
      id: 9,
      name: "Water",
      price: 1.99,
      category: "Beverages",
      stock: 100,
      sku: "BEV005",
    },
    {
      id: 10,
      name: "Pasta",
      price: 11.99,
      category: "Food",
      stock: 12,
      sku: "FD005",
    },
    {
      id: 11,
      name: "Cake",
      price: 7.99,
      category: "Dessert",
      stock: 8,
      sku: "DS001",
    },
    {
      id: 12,
      name: "Ice Cream",
      price: 4.99,
      category: "Dessert",
      stock: 22,
      sku: "DS002",
    },
    {
      id: 13,
      name: "Cookie",
      price: 1.49,
      category: "Dessert",
      stock: 35,
      sku: "DS003",
    },
    {
      id: 14,
      name: "Muffin",
      price: 2.99,
      category: "Dessert",
      stock: 15,
      sku: "DS004",
    },
    {
      id: 15,
      name: "Donut",
      price: 2.49,
      category: "Dessert",
      stock: 30,
      sku: "DS005",
    },
  ];

  // Get unique categories for filter
  const categories = [
    "All",
    ...new Set(sampleProducts.map((product) => product.category)),
  ];

  const filterProducts = () => {
    let filteredProducts = sampleProducts;

    // Apply category filter
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (item) => item.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredProducts;
  };

  // Get current products
  const filteredProducts = filterProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleView = (productId) => {
    console.log(`View product ${productId}`);
  };

  const handleEdit = (productId) => {
    const product = sampleProducts.find((p) => p.id === productId);
    setEditProduct(product);
    setShowEditModal(true);
  };

  const handleEditProductSubmit = (data) => {
    console.log("Edited Product:", data);
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
  };

  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddProduct = () => {
    setShowAddModal(true);
  };

  const handleAddProductSubmit = (data) => {
    console.log("New Product:", data);
    setShowAddModal(false);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStockStatus = (stock) => {
    if (stock > 20) return "In Stock";
    if (stock > 10) return "Low Stock";
    return "Critical";
  };

  const getStockColor = (stock) => {
    if (stock > 20) return "bg-green-100 text-green-800";
    if (stock > 10) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className=" flex flex-col">
      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Product"
      >
        <AddProductForm
          onSubmit={handleAddProductSubmit}
          onCancel={() => setShowAddModal(false)}
          categoryOptions={categories}
        />
      </Modal>
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-xl p-6 relative border border-white/30 animate-fadeIn">
            {/* Close Icon */}
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-xl"
              onClick={() => setShowEditModal(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Product
            </h2>

            <EditProductForm
              onSubmit={handleEditProductSubmit}
              onCancel={() => setShowEditModal(false)}
              categoryOptions={categories}
              initialData={editProduct}
            />
          </div>
        </div>
      )}
      {/* Header with company info */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedCompany} Products
          </h1>
          <p className="text-gray-600 mt-1">
            {filteredProducts.length} products in inventory
          </p>
        </div>
        
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by name or SKU..."
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

        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page when category changes
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm sm:text-base"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Products Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("sku")}
                >
                  <div className="flex items-center">
                    SKU
                    {sortConfig.key === "sku" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Product Name
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    {sortConfig.key === "category" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    {sortConfig.key === "price" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("stock")}
                >
                  <div className="flex items-center">
                    Stock Status
                    {sortConfig.key === "stock" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 font-mono">
                        {product.sku}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center text-gray-500">
                          {product.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500 sm:hidden">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="sm:hidden text-xs mt-1">
                        <span className={`px-1.5 py-0.5 rounded-full ${getStockColor(product.stock)}`}>
                          {getStockStatus(product.stock)}
                        </span>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 mr-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getStockColor(product.stock).replace('text', 'bg').split(' ')[0]}`} 
                              style={{ width: `${Math.min(100, (product.stock / 100) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStockColor(product.stock)}`}>
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(product.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="text-green-600 hover:text-green-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
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
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
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
                  <span className="font-medium">{indexOfFirstProduct + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, filteredProducts.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredProducts.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
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
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === number
                            ? "bg-blue-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        }`}
                      >
                        {number}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
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

export default ProductTabs;
