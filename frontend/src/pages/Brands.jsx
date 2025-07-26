import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Edit2, Trash2, MoreVertical, Eye, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const Brands = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productCountFilter, setProductCountFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const brandsPerPage = 10;

  // Sample data with status and featured properties
  const sampleBrands = [
    { id: 1, name: 'Nike', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 125, status: 'active', featured: true },
    { id: 2, name: 'Adidas', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 98, status: 'active', featured: true },
    { id: 3, name: 'Apple', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 75, status: 'active', featured: false },
    { id: 4, name: 'Samsung', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 112, status: 'active', featured: true },
    { id: 5, name: 'Sony', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 64, status: 'active', featured: false },
    { id: 6, name: 'Dell', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 53, status: 'active', featured: false },
    { id: 7, name: 'HP', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 87, status: 'active', featured: false },
    { id: 8, name: 'Lenovo', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 42, status: 'inactive', featured: false },
    { id: 9, name: 'Microsoft', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 68, status: 'active', featured: false },
    { id: 10, name: 'Canon', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 39, status: 'active', featured: false },
    { id: 11, name: 'Nikon', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 31, status: 'inactive', featured: false },
    { id: 12, name: 'LG', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 58, status: 'active', featured: false },
    { id: 13, name: 'Panasonic', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 47, status: 'active', featured: false },
    { id: 14, name: 'Philips', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 36, status: 'active', featured: false },
    { id: 15, name: 'Bose', image: 'https://i.imgur.com/4ZQZQ9u.png', productCount: 29, status: 'active', featured: false }
  ];

  // Filter options
  const productCountOptions = [
    { value: 'All', label: 'All Products' },
    { value: '0-50', label: '0-50 Products' },
    { value: '51-100', label: '51-100 Products' },
    { value: '100+', label: '100+ Products' }
  ];

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBrands = [...sampleBrands].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filterBrands = () => {
    let filtered = sortedBrands;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply product count filter
    if (productCountFilter !== 'All') {
      const [min, max] = productCountFilter === '100+' ? [100, Infinity] : 
                         productCountFilter.split('-').map(Number);
      filtered = filtered.filter(brand => 
        brand.productCount >= min && brand.productCount <= max);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(brand => brand.status === statusFilter);
    }
    
    return filtered;
  };

  // Get current brands
  const filteredBrands = filterBrands();
  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = filteredBrands.slice(indexOfFirstBrand, indexOfLastBrand);
  const totalPages = Math.ceil(filteredBrands.length / brandsPerPage);

  const handleAddBrand = () => {
    console.log('Add new brand');
  };

  const handleEdit = (brandId) => {
    console.log(`Edit brand ${brandId}`);
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
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
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
        </div>
      </div>

      {/* Expanded Filters */}
      {showFilters && (
        <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Products Range</label>
              <select
                value={productCountFilter}
                onChange={(e) => {
                  setProductCountFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {productCountOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option>All Brands</option>
                <option>Featured Only</option>
                <option>Non-Featured</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Brands Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Brand Name
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
              {currentBrands.length > 0 ? (
                currentBrands.map((brand, index) => (
                  <tr key={brand.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstBrand + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center border border-gray-200">
                        <img 
                          src={brand.image} 
                          alt={brand.name} 
                          className="h-full w-full object-contain p-1"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">
                            {brand.name}
                          </div>
                          {brand.featured && (
                            <span className="text-xs text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-20 mr-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getProductCountColor(brand.productCount).replace('text', 'bg').split(' ')[0]}`} 
                              style={{ width: `${Math.min(100, (brand.productCount / 125) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getProductCountColor(brand.productCount)}`}>
                          {brand.productCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(brand.status)}`}>
                        {brand.status === 'active' ? 'Active' : 'Inactive'}
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
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-sm font-medium text-gray-900">No brands found</h3>
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
                  Showing <span className="font-medium">{indexOfFirstBrand + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastBrand, filteredBrands.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredBrands.length}</span> results
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

export default Brands;