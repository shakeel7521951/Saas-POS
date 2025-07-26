import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Sample data
  const sampleCustomers = [
    {
      id: 1,
      name: 'John Smith',
      phone: '(555) 123-4567',
      email: 'john@example.com',
      orders: 12,
      totalSpent: 2450.75,
      createdOn: '2023-01-15',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      phone: '(555) 987-6543',
      email: 'sarah@example.com',
      orders: 8,
      totalSpent: 1200.50,
      createdOn: '2023-02-20',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Michael Brown',
      phone: '(555) 456-7890',
      email: 'michael@example.com',
      orders: 3,
      totalSpent: 450.25,
      createdOn: '2023-03-10',
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'Emily Davis',
      phone: '(555) 789-0123',
      email: 'emily@example.com',
      orders: 15,
      totalSpent: 3200.00,
      createdOn: '2023-04-05',
      status: 'Active'
    },
    {
      id: 5,
      name: 'Robert Wilson',
      phone: '(555) 234-5678',
      email: 'robert@example.com',
      orders: 1,
      totalSpent: 99.99,
      createdOn: '2023-05-12',
      status: 'Inactive'
    },
    {
      id: 6,
      name: 'Lisa Miller',
      phone: '(555) 345-6789',
      email: 'lisa@example.com',
      orders: 7,
      totalSpent: 875.30,
      createdOn: '2023-06-18',
      status: 'Active'
    },
    {
      id: 7,
      name: 'David Taylor',
      phone: '(555) 567-8901',
      email: 'david@example.com',
      orders: 0,
      totalSpent: 0.00,
      createdOn: '2023-07-22',
      status: 'New'
    },
    {
      id: 8,
      name: 'Jennifer Anderson',
      phone: '(555) 678-9012',
      email: 'jennifer@example.com',
      orders: 22,
      totalSpent: 5400.75,
      createdOn: '2023-08-30',
      status: 'VIP'
    },
    {
      id: 9,
      name: 'Thomas White',
      phone: '(555) 890-1234',
      email: 'thomas@example.com',
      orders: 4,
      totalSpent: 600.40,
      createdOn: '2023-09-05',
      status: 'Active'
    },
    {
      id: 10,
      name: 'Jessica Harris',
      phone: '(555) 901-2345',
      email: 'jessica@example.com',
      orders: 9,
      totalSpent: 1500.20,
      createdOn: '2023-10-12',
      status: 'Active'
    },
    {
      id: 11,
      name: 'Daniel Martin',
      phone: '(555) 012-3456',
      email: 'daniel@example.com',
      orders: 2,
      totalSpent: 350.60,
      createdOn: '2023-11-19',
      status: 'Inactive'
    },
    {
      id: 12,
      name: 'Amanda Thompson',
      phone: '(555) 123-7890',
      email: 'amanda@example.com',
      orders: 18,
      totalSpent: 4200.90,
      createdOn: '2023-12-25',
      status: 'VIP'
    }
  ];

  // Status filter options
  const statusOptions = [
    { value: 'All', label: 'All Customers' },
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'VIP', label: 'VIP' },
    { value: 'New', label: 'New' }
  ];

  const filterCustomers = () => {
    let filtered = sampleCustomers;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }
    
    return filtered;
  };

  // Get current customers
  const filteredCustomers = filterCustomers();
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

  const handleAddCustomer = () => {
    console.log('Add new customer');
  };

  const handleEdit = (customerId) => {
    console.log(`Edit customer ${customerId}`);
  };

  const handleDelete = (customerId) => {
    console.log(`Delete customer ${customerId}`);
  };

  const handleView = (customerId) => {
    console.log(`View customer ${customerId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Customer Management</h1>
        <p className="text-gray-600 mt-2">Manage your customer records and interactions</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
        </div>
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm bg-white"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Add Customer Button */}
        <button
          onClick={handleAddCustomer}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Customer</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-xl shadow-lg">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SL</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Total Spent</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Created On</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer, index) => (
                  <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium text-gray-900">
                      {indexOfFirstCustomer + index + 1}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center shadow-inner">
                          <span className="text-indigo-800 text-sm font-medium">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{customer.name}</div>
                          <div className="text-sm text-gray-500">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700 font-medium">
                      <span className="text-green-600">${customer.totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm text-gray-700">
                      {new Date(customer.createdOn).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        customer.status === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                        customer.status === 'New' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(customer.id)}
                          className="p-2 text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(customer.id)}
                          className="p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors"
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
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No customers found</h3>
                      <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('All');
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
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
        {filteredCustomers.length > customersPerPage && (
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-xl">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstCustomer + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastCustomer, filteredCustomers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredCustomers.length}</span> customers
                </p>
              </div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-3 py-2 rounded-l-lg border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
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
                          ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                          : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
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
                  className={`relative inline-flex items-center px-3 py-2 rounded-r-lg border border-gray-300 bg-white text-sm font-medium ${
                    currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-50'
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

export default Customers;