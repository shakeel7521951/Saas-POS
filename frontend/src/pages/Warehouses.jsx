import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, MoreVertical, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productCountFilter, setProductCountFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [showFilters, setShowFilters] = useState(false);
  const warehousesPerPage = 10;

  // Sample data with status and capacity properties
  const sampleWarehouses = [
    {
      id: 1,
      name: 'Main Warehouse',
      phone: '(555) 123-4567',
      email: 'main@example.com',
      address: '123 Industrial Park, New York, NY 10001',
      productCount: 1250,
      status: 'active',
      capacity: 1500,
      lastUpdated: '2023-06-15'
    },
    {
      id: 2,
      name: 'West Coast Storage',
      phone: '(555) 987-6543',
      email: 'west@example.com',
      address: '456 Commerce St, Los Angeles, CA 90012',
      productCount: 875,
      status: 'active',
      capacity: 1000,
      lastUpdated: '2023-06-14'
    },
    {
      id: 3,
      name: 'Southern Distribution',
      phone: '(555) 456-7890',
      email: 'south@example.com',
      address: '789 Logistics Blvd, Houston, TX 77001',
      productCount: 620,
      status: 'active',
      capacity: 800,
      lastUpdated: '2023-06-13'
    },
    {
      id: 4,
      name: 'Midwest Hub',
      phone: '(555) 234-5678',
      email: 'midwest@example.com',
      address: '321 Supply Chain Ave, Chicago, IL 60601',
      productCount: 980,
      status: 'active',
      capacity: 1200,
      lastUpdated: '2023-06-12'
    },
    {
      id: 5,
      name: 'North East Storage',
      phone: '(555) 345-6789',
      email: 'northeast@example.com',
      address: '654 Fulfillment Rd, Boston, MA 02108',
      productCount: 420,
      status: 'maintenance',
      capacity: 600,
      lastUpdated: '2023-06-11'
    },
    {
      id: 6,
      name: 'Central Distribution',
      phone: '(555) 567-8901',
      email: 'central@example.com',
      address: '987 Inventory Way, Dallas, TX 75201',
      productCount: 750,
      status: 'active',
      capacity: 900,
      lastUpdated: '2023-06-10'
    },
    {
      id: 7,
      name: 'Pacific Warehouse',
      phone: '(555) 678-9012',
      email: 'pacific@example.com',
      address: '159 Shipping Ln, Seattle, WA 98101',
      productCount: 530,
      status: 'active',
      capacity: 700,
      lastUpdated: '2023-06-09'
    },
    {
      id: 8,
      name: 'Atlantic Storage',
      phone: '(555) 789-0123',
      email: 'atlantic@example.com',
      address: '753 Receiving Dr, Miami, FL 33101',
      productCount: 680,
      status: 'active',
      capacity: 850,
      lastUpdated: '2023-06-08'
    },
    {
      id: 9,
      name: 'Rocky Mountain Depot',
      phone: '(555) 890-1234',
      email: 'rocky@example.com',
      address: '852 Storage St, Denver, CO 80202',
      productCount: 390,
      status: 'inactive',
      capacity: 500,
      lastUpdated: '2023-06-07'
    },
    {
      id: 10,
      name: 'Great Lakes Warehouse',
      phone: '(555) 901-2345',
      email: 'lakes@example.com',
      address: '951 Distribution Ave, Detroit, MI 48201',
      productCount: 570,
      status: 'active',
      capacity: 750,
      lastUpdated: '2023-06-06'
    }
  ];

  // Filter options
  const productCountOptions = [
    { value: 'All', label: 'All Warehouses' },
    { value: '0-500', label: '0-500 Products' },
    { value: '501-1000', label: '501-1000 Products' },
    { value: '1000+', label: '1000+ Products' }
  ];

  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedWarehouses = [...sampleWarehouses].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filterWarehouses = () => {
    let filtered = sortedWarehouses;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(warehouse =>
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.address.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply product count filter
    if (productCountFilter !== 'All') {
      const [min, max] = productCountFilter === '1000+' ? [1000, Infinity] : 
                         productCountFilter.split('-').map(Number);
      filtered = filtered.filter(warehouse => 
        warehouse.productCount >= min && warehouse.productCount <= max);
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(warehouse => warehouse.status === statusFilter);
    }
    
    return filtered;
  };

  // Get current warehouses
  const filteredWarehouses = filterWarehouses();
  const indexOfLastWarehouse = currentPage * warehousesPerPage;
  const indexOfFirstWarehouse = indexOfLastWarehouse - warehousesPerPage;
  const currentWarehouses = filteredWarehouses.slice(indexOfFirstWarehouse, indexOfLastWarehouse);
  const totalPages = Math.ceil(filteredWarehouses.length / warehousesPerPage);

  const handleAddWarehouse = () => {
    console.log('Add new warehouse');
  };

  const handleEdit = (warehouseId) => {
    console.log(`Edit warehouse ${warehouseId}`);
  };

  const handleDelete = (warehouseId) => {
    console.log(`Delete warehouse ${warehouseId}`);
  };

  const handleView = (warehouseId) => {
    console.log(`View warehouse ${warehouseId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getProductCountColor = (count) => {
    if (count > 1000) return 'bg-purple-100 text-purple-800';
    if (count > 500) return 'bg-blue-100 text-blue-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCapacityPercentage = (productCount, capacity) => {
    return Math.min(100, Math.round((productCount / capacity) * 100));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Warehouse Management</h1>
          <p className="text-gray-600 mt-1">
            {filteredWarehouses.length} warehouses in inventory
          </p>
        </div>
        
        <button
          onClick={handleAddWarehouse}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          <span>Add Warehouse</span>
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by warehouse name or address..."
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
              <select
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option>All Capacities</option>
                <option>Under 50%</option>
                <option>50-75%</option>
                <option>Over 75%</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Warehouses Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex-1 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("name")}
                >
                  <div className="flex items-center">
                    Warehouse
                    {sortConfig.key === "name" && (
                      <span className="ml-1">
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("productCount")}
                >
                  <div className="flex items-center">
                    Inventory
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
              {currentWarehouses.length > 0 ? (
                currentWarehouses.map((warehouse, index) => (
                  <tr key={warehouse.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstWarehouse + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {warehouse.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Updated: {formatDate(warehouse.lastUpdated)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{warehouse.phone}</div>
                      <a 
                        href={`mailto:${warehouse.email}`} 
                        className="text-xs text-blue-600 hover:underline"
                      >
                        {warehouse.email}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 line-clamp-2">
                        {warehouse.address}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-24 mr-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${
                                getCapacityPercentage(warehouse.productCount, warehouse.capacity) > 75 
                                  ? 'bg-red-500' 
                                  : getCapacityPercentage(warehouse.productCount, warehouse.capacity) > 50 
                                  ? 'bg-yellow-500' 
                                  : 'bg-green-500'
                              }`}
                              style={{ width: `${getCapacityPercentage(warehouse.productCount, warehouse.capacity)}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getProductCountColor(warehouse.productCount)}`}>
                          {warehouse.productCount.toLocaleString()}/{warehouse.capacity.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(warehouse.status)}`}>
                        {warehouse.status.charAt(0).toUpperCase() + warehouse.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleView(warehouse.id)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(warehouse.id)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(warehouse.id)}
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
                      <h3 className="text-sm font-medium text-gray-900">No warehouses found</h3>
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
        {filteredWarehouses.length > warehousesPerPage && (
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
                  Showing <span className="font-medium">{indexOfFirstWarehouse + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastWarehouse, filteredWarehouses.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredWarehouses.length}</span> results
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

export default Warehouses;