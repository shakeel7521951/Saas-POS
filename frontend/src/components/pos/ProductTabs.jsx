import { useState } from "react";
import { Search, Eye, Edit, Trash2, Plus, ChevronLeft, ChevronRight, Filter, MoreVertical } from "lucide-react";

const ProductTabs = ({ selectedCompany }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const productsPerPage = 10;

  // Sample data - expanded to have more than 10 products
  const sampleProducts = [
    { id: 1, name: "Premium Coffee", price: 4.99, category: "Beverages", stock: 50, sku: "BEV001", status: "active" },
    { id: 2, name: "Gourmet Sandwich", price: 8.99, category: "Food", stock: 25, sku: "FD001", status: "active" },
    { id: 3, name: "Herbal Tea", price: 3.99, category: "Beverages", stock: 30, sku: "BEV002", status: "active" },
    { id: 4, name: "Cheeseburger", price: 12.99, category: "Food", stock: 15, sku: "FD002", status: "low-stock" },
    { id: 5, name: "Fresh Juice", price: 5.99, category: "Beverages", stock: 40, sku: "BEV003", status: "active" },
    { id: 6, name: "Margherita Pizza", price: 14.99, category: "Food", stock: 20, sku: "FD003", status: "active" },
    { id: 7, name: "Sparkling Soda", price: 2.99, category: "Beverages", stock: 60, sku: "BEV004", status: "active" },
    { id: 8, name: "Caesar Salad", price: 9.99, category: "Food", stock: 18, sku: "FD004", status: "active" },
    { id: 9, name: "Mineral Water", price: 1.99, category: "Beverages", stock: 100, sku: "BEV005", status: "active" },
    { id: 10, name: "Pasta Carbonara", price: 11.99, category: "Food", stock: 12, sku: "FD005", status: "low-stock" },
    { id: 11, name: "Chocolate Cake", price: 7.99, category: "Dessert", stock: 8, sku: "DS001", status: "low-stock" },
    { id: 12, name: "Vanilla Ice Cream", price: 4.99, category: "Dessert", stock: 22, sku: "DS002", status: "active" },
    { id: 13, name: "Chocolate Chip Cookie", price: 1.49, category: "Dessert", stock: 35, sku: "DS003", status: "active" },
    { id: 14, name: "Blueberry Muffin", price: 2.99, category: "Dessert", stock: 15, sku: "DS004", status: "active" },
    { id: 15, name: "Glazed Donut", price: 2.49, category: "Dessert", stock: 30, sku: "DS005", status: "active" },
  ];

  // Get unique categories for filter
  const categories = ["All", ...new Set(sampleProducts.map(product => product.category))];
  const statuses = ["All", "active", "low-stock"];

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...sampleProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filterProducts = () => {
    let filteredProducts = sortedProducts;
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filteredProducts = filteredProducts.filter(item => item.category === selectedCategory);
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
    <div className="flex flex-col bg-gray-50 rounded-xl p-4 sm:p-6 shadow-sm">
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
        
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status === "active" ? "In Stock" : "Low Stock"}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option>All Prices</option>
                <option>Under $5</option>
                <option>$5 - $10</option>
                <option>Over $10</option>
              </select>
            </div>
          </div>
        </div>
      )}

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
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-sm font-medium text-gray-900">No products found</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Try adjusting your search or filter to find what you're looking for.
                      </p>
                    </div>
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
                  Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastProduct, filteredProducts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredProducts.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium ${
                        currentPage === number
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                      currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
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