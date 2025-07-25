import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Edit2, 
  Trash2, 
  MoreVertical,
  User,
  Warehouse,
  CheckCircle,
  Clock,
  XCircle,
  CreditCard,
  DollarSign,
  Calendar,
  ArrowLeftRight
} from 'lucide-react';

const Sales = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const salesPerPage = 10;

  // Sample data
  const sampleSales = [
    {
      id: 1,
      reference: 'SALE-1001',
      user: 'John Doe',
      customer: 'ABC Corporation',
      warehouse: 'Main Warehouse',
      status: 'completed',
      grandTotal: 1250.50,
      paid: 1250.50,
      paymentStatus: 'paid',
      paymentType: 'credit card',
      createdAt: '2023-06-15'
    },
    {
      id: 2,
      reference: 'SALE-1002',
      user: 'Jane Smith',
      customer: 'XYZ Ltd',
      warehouse: 'West Coast Storage',
      status: 'completed',
      grandTotal: 875.99,
      paid: 875.99,
      paymentStatus: 'paid',
      paymentType: 'cash',
      createdAt: '2023-06-15'
    },
    {
      id: 3,
      reference: 'SALE-1003',
      user: 'Mike Johnson',
      customer: 'Acme Inc',
      warehouse: 'Southern Distribution',
      status: 'pending',
      grandTotal: 2450.75,
      paid: 0,
      paymentStatus: 'unpaid',
      paymentType: 'bank transfer',
      createdAt: '2023-06-14'
    },
    {
      id: 4,
      reference: 'SALE-1004',
      user: 'Sarah Williams',
      customer: 'Global Tech',
      warehouse: 'Midwest Hub',
      status: 'completed',
      grandTotal: 620.30,
      paid: 620.30,
      paymentStatus: 'paid',
      paymentType: 'credit card',
      createdAt: '2023-06-14'
    },
    {
      id: 5,
      reference: 'SALE-1005',
      user: 'Robert Brown',
      customer: 'Sunrise Enterprises',
      warehouse: 'North East Storage',
      status: 'completed',
      grandTotal: 1179.99,
      paid: 1179.99,
      paymentStatus: 'paid',
      paymentType: 'cash',
      createdAt: '2023-06-13'
    },
    {
      id: 6,
      reference: 'SALE-1006',
      user: 'Emily Davis',
      customer: 'Ocean View LLC',
      warehouse: 'Central Distribution',
      status: 'cancelled',
      grandTotal: 850.00,
      paid: 0,
      paymentStatus: 'unpaid',
      paymentType: 'credit card',
      createdAt: '2023-06-12'
    },
    {
      id: 7,
      reference: 'SALE-1007',
      user: 'David Wilson',
      customer: 'Mountain Tech',
      warehouse: 'Pacific Warehouse',
      status: 'completed',
      grandTotal: 3250.25,
      paid: 3250.25,
      paymentStatus: 'paid',
      paymentType: 'bank transfer',
      createdAt: '2023-06-11'
    },
    {
      id: 8,
      reference: 'SALE-1008',
      user: 'Lisa Taylor',
      customer: 'Valley Industries',
      warehouse: 'Atlantic Storage',
      status: 'completed',
      grandTotal: 540.75,
      paid: 540.75,
      paymentStatus: 'paid',
      paymentType: 'cash',
      createdAt: '2023-06-10'
    },
    {
      id: 9,
      reference: 'SALE-1009',
      user: 'James Anderson',
      customer: 'Peak Solutions',
      warehouse: 'Rocky Mountain Depot',
      status: 'pending',
      grandTotal: 1875.50,
      paid: 0,
      paymentStatus: 'partial',
      paymentType: 'credit card',
      createdAt: '2023-06-09'
    },
    {
      id: 10,
      reference: 'SALE-1010',
      user: 'Jennifer Martinez',
      customer: 'Summit Group',
      warehouse: 'Great Lakes Warehouse',
      status: 'completed',
      grandTotal: 960.40,
      paid: 960.40,
      paymentStatus: 'paid',
      paymentType: 'cash',
      createdAt: '2023-06-08'
    },
    {
      id: 11,
      reference: 'SALE-1011',
      user: 'Thomas Clark',
      customer: 'Horizon Corp',
      warehouse: 'Sunbelt Storage',
      status: 'completed',
      grandTotal: 1420.60,
      paid: 1420.60,
      paymentStatus: 'paid',
      paymentType: 'bank transfer',
      createdAt: '2023-06-07'
    },
    {
      id: 12,
      reference: 'SALE-1012',
      user: 'Jessica Lewis',
      customer: 'Pinnacle Ltd',
      warehouse: 'Northern Logistics',
      status: 'cancelled',
      grandTotal: 725.25,
      paid: 0,
      paymentStatus: 'unpaid',
      paymentType: 'credit card',
      createdAt: '2023-06-06'
    }
  ];

  // Filter options
  const statusOptions = [
    { value: 'All', label: 'All Statuses' },
    { value: 'completed', label: 'Completed' },
    { value: 'pending', label: 'Pending' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const paymentOptions = [
    { value: 'All', label: 'All Payments' },
    { value: 'paid', label: 'Paid' },
    { value: 'unpaid', label: 'Unpaid' },
    { value: 'partial', label: 'Partial' }
  ];

  const paymentTypeOptions = [
    { value: 'All', label: 'All Types' },
    { value: 'cash', label: 'Cash' },
    { value: 'credit card', label: 'Credit Card' },
    { value: 'bank transfer', label: 'Bank Transfer' }
  ];

  const filterSales = () => {
    let filtered = sampleSales;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(sale =>
        sale.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.user.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(sale => sale.status === statusFilter);
    }
    
    // Apply payment filter
    if (paymentFilter !== 'All') {
      filtered = filtered.filter(sale => sale.paymentStatus === paymentFilter);
    }
    
    return filtered;
  };

  // Get current sales
  const filteredSales = filterSales();
  const indexOfLastSale = currentPage * salesPerPage;
  const indexOfFirstSale = indexOfLastSale - salesPerPage;
  const currentSales = filteredSales.slice(indexOfFirstSale, indexOfLastSale);
  const totalPages = Math.ceil(filteredSales.length / salesPerPage);

  const handleCreateSale = () => {
    console.log('Create new sale');
  };

  const handleEdit = (saleId) => {
    console.log(`Edit sale ${saleId}`);
  };

  const handleDelete = (saleId) => {
    console.log(`Delete sale ${saleId}`);
  };

  const handleView = (saleId) => {
    console.log(`View sale ${saleId}`);
  };

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Management</h1>
        <p className="text-gray-600">View and manage your sales transactions</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search sales..."
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
        
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Payment Status Filter */}
        <select
          value={paymentFilter}
          onChange={(e) => {
            setPaymentFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {paymentOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Create Sale Button */}
        <button
          onClick={handleCreateSale}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Create Sale</span>
        </button>
      </div>

      {/* Sales Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warehouse</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grand Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created On</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentSales.length > 0 ? (
                currentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{sale.reference}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{sale.user}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Warehouse className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        <div className="text-sm text-gray-900">{sale.warehouse}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs items-center-safe leading-5 font-semibold rounded-full ${
                        sale.status === 'completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status === 'completed' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : sale.status === 'pending' ? (
                          <Clock className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(sale.grandTotal)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatCurrency(sale.paid)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {sale.paymentType === 'cash' ? (
                          <DollarSign className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        ) : sale.paymentType === 'credit card' ? (
                          <CreditCard className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        ) : (
                          <ArrowLeftRight    className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        )}
                        <span className={`text-xs font-medium ${
                          sale.paymentStatus === 'paid' ? 'text-green-600' :
                          sale.paymentStatus === 'unpaid' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {sale.paymentStatus.charAt(0).toUpperCase() + sale.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                        {formatDate(sale.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(sale.id)}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(sale.id)}
                          className="p-1.5 text-green-500 hover:text-green-700 hover:bg-green-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(sale.id)}
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
                  <td colSpan="10" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">No sales match your search criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('All');
                          setPaymentFilter('All');
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
        {filteredSales.length > salesPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstSale + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastSale, filteredSales.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredSales.length}</span> results
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

export default Sales;