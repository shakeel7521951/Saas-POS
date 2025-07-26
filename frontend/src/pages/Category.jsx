import { useState } from "react";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  Download,
  Printer,
  Filter,
  MoreVertical,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const Category = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedParent, setSelectedParent] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [showFilters, setShowFilters] = useState(false);
  const categoriesPerPage = 10;

  // Sample data with more realistic images
  const sampleCategories = [
    {
      id: 1,
      name: "Beverages",
      parent: "None",
      productCount: 24,
      image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?w=100",
      status: "active"
    },
    {
      id: 2,
      name: "Food",
      parent: "None",
      productCount: 32,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100",
      status: "active"
    },
    {
      id: 3,
      name: "Coffee",
      parent: "Beverages",
      productCount: 12,
      image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=100",
      status: "active"
    },
    {
      id: 4,
      name: "Tea",
      parent: "Beverages",
      productCount: 8,
      image: "https://images.unsplash.com/photo-1564894809619-95cbae1d9e5d?w=100",
      status: "active"
    },
    {
      id: 5,
      name: "Sandwiches",
      parent: "Food",
      productCount: 15,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100",
      status: "active"
    },
    {
      id: 6,
      name: "Burgers",
      parent: "Food",
      productCount: 10,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100",
      status: "active"
    },
    {
      id: 7,
      name: "Desserts",
      parent: "None",
      productCount: 18,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100",
      status: "active"
    },
    {
      id: 8,
      name: "Cakes",
      parent: "Desserts",
      productCount: 7,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=100",
      status: "inactive"
    },
    {
      id: 9,
      name: "Ice Cream",
      parent: "Desserts",
      productCount: 11,
      image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=100",
      status: "active"
    },
    {
      id: 10,
      name: "Juices",
      parent: "Beverages",
      productCount: 4,
      image: "https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=100",
      status: "active"
    },
    {
      id: 11,
      name: "Smoothies",
      parent: "Beverages",
      productCount: 6,
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=100",
      status: "active"
    },
    {
      id: 12,
      name: "Salads",
      parent: "Food",
      productCount: 7,
      image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=100",
      status: "active"
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

  const statusOptions = ["All", "active", "inactive"];

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCategories = [...sampleCategories].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filterCategories = () => {
    let filtered = sortedCategories;

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

  const handleAddCategory = () => {
    console.log("Add new category");
  };

  const handleEdit = (categoryId) => {
    console.log(`Edit category ${categoryId}`);
  };

  const handleDelete = (categoryId) => {
    console.log(`Delete category ${categoryId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getStatusColor = (status) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
          <p className="text-gray-600 mt-1">
            {filteredCategories.length} categories in inventory
          </p>
        </div>
        
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by category name..."
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
            {showFilters ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium shadow-sm">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Category</label>
              <select
                value={selectedParent}
                onChange={(e) => {
                  setSelectedParent(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {parentCategories.map((parent) => (
                  <option key={parent} value={parent}>{parent}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "All" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Products Range</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option>All Products</option>
                <option>0-10 Products</option>
                <option>10-20 Products</option>
                <option>20+ Products</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Category Name
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("parent")}
                >
                  <div className="flex items-center">
                    Parent Category
                    {sortConfig.key === "parent" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("productCount")}
                >
                  <div className="flex items-center">
                    Products
                    {sortConfig.key === "productCount" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCategories.length > 0 ? (
                currentCategories.map((category, index) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstCategory + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-10 w-10 rounded-full object-cover border border-gray-200"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.parent === "None" ? (
                        <span className="text-sm text-gray-500">-</span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {category.parent}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 mr-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                category.productCount > 20 
                                  ? "bg-green-500" 
                                  : category.productCount > 10 
                                  ? "bg-yellow-500" 
                                  : "bg-red-500"
                              }`} 
                              style={{ width: `${Math.min(100, (category.productCount / 32) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {category.productCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(category.status)}`}>
                        {category.status === "active" ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(category.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
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
                  <td colSpan="7" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-sm font-medium text-gray-900">No categories found</h3>
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
        {filteredCategories.length > categoriesPerPage && (
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
                  Showing <span className="font-medium">{indexOfFirstCategory + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCategory, filteredCategories.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCategories.length}</span> results
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

export default Category;