import  { useState } from "react";
import { Search, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const ProductTabs = ({ selectedCompany }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  // Sample data - expanded to have more than 10 products
  const sampleProducts = [
    { id: 1, name: "Coffee", price: 4.99, category: "Beverages", stock: 50, sku: "BEV001" },
    { id: 2, name: "Sandwich", price: 8.99, category: "Food", stock: 25, sku: "FD001" },
    { id: 3, name: "Tea", price: 3.99, category: "Beverages", stock: 30, sku: "BEV002" },
    { id: 4, name: "Burger", price: 12.99, category: "Food", stock: 15, sku: "FD002" },
    { id: 5, name: "Juice", price: 5.99, category: "Beverages", stock: 40, sku: "BEV003" },
    { id: 6, name: "Pizza", price: 14.99, category: "Food", stock: 20, sku: "FD003" },
    { id: 7, name: "Soda", price: 2.99, category: "Beverages", stock: 60, sku: "BEV004" },
    { id: 8, name: "Salad", price: 9.99, category: "Food", stock: 18, sku: "FD004" },
    { id: 9, name: "Water", price: 1.99, category: "Beverages", stock: 100, sku: "BEV005" },
    { id: 10, name: "Pasta", price: 11.99, category: "Food", stock: 12, sku: "FD005" },
    { id: 11, name: "Cake", price: 7.99, category: "Dessert", stock: 8, sku: "DS001" },
    { id: 12, name: "Ice Cream", price: 4.99, category: "Dessert", stock: 22, sku: "DS002" },
    { id: 13, name: "Cookie", price: 1.49, category: "Dessert", stock: 35, sku: "DS003" },
    { id: 14, name: "Muffin", price: 2.99, category: "Dessert", stock: 15, sku: "DS004" },
    { id: 15, name: "Donut", price: 2.49, category: "Dessert", stock: 30, sku: "DS005" },
  ];

  // Get unique categories for filter
  const categories = ["All", ...new Set(sampleProducts.map(product => product.category))];

  const filterProducts = () => {
    let filteredProducts = sampleProducts;
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(item => item.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredProducts;
  };

  // Get current products
  const filteredProducts = filterProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleView = (productId) => {
    console.log(`View product ${productId}`);
  };

  const handleEdit = (productId) => {
    console.log(`Edit product ${productId}`);
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
  };

  const handleAddProduct = () => {
    console.log("Add new product");
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className=" flex flex-col">
      {/* Header with company info */}
      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
          {selectedCompany} - Products
        </h1>
        <p className="text-sm sm:text-base text-gray-600">
          Manage your product inventory
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
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
            <option key={category} value={category}>{category}</option>
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
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full bg-white border border-gray-200 rounded-lg min-w-full">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">
                      {product.sku}
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900 font-medium">
                          {product.name}
                        </div>
                        <div className="sm:hidden text-xs text-gray-500">
                          {product.category}
                        </div>
                      </div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-xs sm:text-sm text-gray-900 font-medium">
                          ${product.price.toFixed(2)}
                        </div>
                        <div className="md:hidden text-xs">
                          <span
                            className={`inline-flex px-1 py-0.5 text-xs font-semibold rounded ${
                              product.stock > 20
                                ? "bg-green-100 text-green-800"
                                : product.stock > 10
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock} in stock
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.stock > 20
                            ? "bg-green-100 text-green-800"
                            : product.stock > 10
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleView(product.id)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(product.id)}
                          className="p-1.5 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
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
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredProducts.length > productsPerPage && (
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, filteredProducts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                        currentPage === number
                          ? 'bg-blue-600 text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                          : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
                      currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
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