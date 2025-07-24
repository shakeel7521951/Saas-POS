import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';

const Warehouses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productCountFilter, setProductCountFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const warehousesPerPage = 10;

  // Sample data
  const sampleWarehouses = [
    {
      id: 1,
      name: 'Main Warehouse',
      phone: '(555) 123-4567',
      email: 'main@example.com',
      address: '123 Industrial Park, New York, NY',
      productCount: 1250
    },
    {
      id: 2,
      name: 'West Coast Storage',
      phone: '(555) 987-6543',
      email: 'west@example.com',
      address: '456 Commerce St, Los Angeles, CA',
      productCount: 875
    },
    {
      id: 3,
      name: 'Southern Distribution',
      phone: '(555) 456-7890',
      email: 'south@example.com',
      address: '789 Logistics Blvd, Houston, TX',
      productCount: 620
    },
    {
      id: 4,
      name: 'Midwest Hub',
      phone: '(555) 234-5678',
      email: 'midwest@example.com',
      address: '321 Supply Chain Ave, Chicago, IL',
      productCount: 980
    },
    {
      id: 5,
      name: 'North East Storage',
      phone: '(555) 345-6789',
      email: 'northeast@example.com',
      address: '654 Fulfillment Rd, Boston, MA',
      productCount: 420
    },
    {
      id: 6,
      name: 'Central Distribution',
      phone: '(555) 567-8901',
      email: 'central@example.com',
      address: '987 Inventory Way, Dallas, TX',
      productCount: 750
    },
    {
      id: 7,
      name: 'Pacific Warehouse',
      phone: '(555) 678-9012',
      email: 'pacific@example.com',
      address: '159 Shipping Ln, Seattle, WA',
      productCount: 530
    },
    {
      id: 8,
      name: 'Atlantic Storage',
      phone: '(555) 789-0123',
      email: 'atlantic@example.com',
      address: '753 Receiving Dr, Miami, FL',
      productCount: 680
    },
    {
      id: 9,
      name: 'Rocky Mountain Depot',
      phone: '(555) 890-1234',
      email: 'rocky@example.com',
      address: '852 Storage St, Denver, CO',
      productCount: 390
    },
    {
      id: 10,
      name: 'Great Lakes Warehouse',
      phone: '(555) 901-2345',
      email: 'lakes@example.com',
      address: '951 Distribution Ave, Detroit, MI',
      productCount: 570
    },
    {
      id: 11,
      name: 'Sunbelt Storage',
      phone: '(555) 012-3456',
      email: 'sunbelt@example.com',
      address: '357 Fulfillment Blvd, Phoenix, AZ',
      productCount: 310
    },
    {
      id: 12,
      name: 'Northern Logistics',
      phone: '(555) 123-7890',
      email: 'northern@example.com',
      address: '753 Shipping Way, Minneapolis, MN',
      productCount: 480
    }
  ];

  // Product count filter options
  const productCountOptions = [
    { value: 'All', label: 'All Warehouses' },
    { value: '0-500', label: '0-500 Products' },
    { value: '501-1000', label: '501-1000 Products' },
    { value: '1000+', label: '1000+ Products' }
  ];

  const filterWarehouses = () => {
    let filtered = sampleWarehouses;
    
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

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Warehouse Management</h1>
        <p className="text-gray-600">Manage your warehouse locations and inventory</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search warehouses..."
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
        
        {/* Product Count Filter */}
        <select
          value={productCountFilter}
          onChange={(e) => {
            setProductCountFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {productCountOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Add Warehouse Button */}
        <button
          onClick={handleAddWarehouse}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Warehouse</span>
        </button>
      </div>

      {/* Warehouses Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentWarehouses.length > 0 ? (
                currentWarehouses.map((warehouse, index) => (
                  <tr key={warehouse.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstWarehouse + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{warehouse.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {warehouse.phone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`mailto:${warehouse.email}`} className="text-blue-600 hover:underline">
                        {warehouse.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="line-clamp-2">{warehouse.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        warehouse.productCount > 1000 ? 'bg-purple-100 text-purple-800' :
                        warehouse.productCount > 500 ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {warehouse.productCount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(warehouse.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(warehouse.id)}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(warehouse.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">No warehouses match your search criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setProductCountFilter('All');
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
        {filteredWarehouses.length > warehousesPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstWarehouse + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastWarehouse, filteredWarehouses.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredWarehouses.length}</span> results
                </p>
              </div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
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
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {pageNumber}
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
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:bg-gray-50'
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

export default Warehouses;