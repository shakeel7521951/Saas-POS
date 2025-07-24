import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, MoreVertical, ArrowLeftRight } from 'lucide-react';

const MoneyTransfer = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All');
  const [amountFilter, setAmountFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const transfersPerPage = 10;

  // Sample data
  const sampleTransfers = [
    {
      id: 1,
      date: '2023-05-15',
      referenceNo: 'TRF-1001',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Payroll (ACC-1004)',
      amount: 50000,
      note: 'Monthly payroll transfer'
    },
    {
      id: 2,
      date: '2023-05-10',
      referenceNo: 'TRF-1002',
      fromAccount: 'Savings (ACC-1003)',
      toAccount: 'Investment (ACC-1006)',
      amount: 25000,
      note: 'Quarterly investment'
    },
    {
      id: 3,
      date: '2023-05-05',
      referenceNo: 'TRF-1003',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Tax (ACC-1005)',
      amount: 15000,
      note: 'Tax payment'
    },
    {
      id: 4,
      date: '2023-04-28',
      referenceNo: 'TRF-1004',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Marketing (ACC-1010)',
      amount: 10000,
      note: 'Marketing budget'
    },
    {
      id: 5,
      date: '2023-04-20',
      referenceNo: 'TRF-1005',
      fromAccount: 'Investment (ACC-1006)',
      toAccount: 'Main Business (ACC-1001)',
      amount: 30000,
      note: 'Investment return'
    },
    {
      id: 6,
      date: '2023-04-15',
      referenceNo: 'TRF-1006',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Equipment (ACC-1011)',
      amount: 20000,
      note: 'New computers'
    },
    {
      id: 7,
      date: '2023-04-10',
      referenceNo: 'TRF-1007',
      fromAccount: 'Client Escrow (ACC-1009)',
      toAccount: 'Main Business (ACC-1001)',
      amount: 40000,
      note: 'Project completion'
    },
    {
      id: 8,
      date: '2023-04-05',
      referenceNo: 'TRF-1008',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Travel (ACC-1012)',
      amount: 5000,
      note: 'Business trip'
    },
    {
      id: 9,
      date: '2023-03-28',
      referenceNo: 'TRF-1009',
      fromAccount: 'Savings (ACC-1003)',
      toAccount: 'Loan (ACC-1008)',
      amount: 15000,
      note: 'Loan payment'
    },
    {
      id: 10,
      date: '2023-03-20',
      referenceNo: 'TRF-1010',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Petty Cash (ACC-1002)',
      amount: 3000,
      note: 'Office supplies'
    },
    {
      id: 11,
      date: '2023-03-15',
      referenceNo: 'TRF-1011',
      fromAccount: 'Investment (ACC-1006)',
      toAccount: 'Savings (ACC-1003)',
      amount: 10000,
      note: 'Fund reallocation'
    },
    {
      id: 12,
      date: '2023-03-10',
      referenceNo: 'TRF-1012',
      fromAccount: 'Main Business (ACC-1001)',
      toAccount: 'Credit Card (ACC-1007)',
      amount: 8000,
      note: 'Card payment'
    },
  ];

  // Date filter options
  const dateOptions = [
    { value: 'All', label: 'All Dates' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  // Amount filter options
  const amountOptions = [
    { value: 'All', label: 'All Amounts' },
    { value: '0-5000', label: '0 - 5,000' },
    { value: '5000-20000', label: '5,000 - 20,000' },
    { value: '20000-50000', label: '20,000 - 50,000' },
    { value: '50000+', label: '50,000+' }
  ];

  const filterTransfers = () => {
    let filtered = sampleTransfers;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(transfer =>
        transfer.referenceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.fromAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.toAccount.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transfer.note.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply date filter (simplified for demo)
    if (dateFilter !== 'All') {
      // In a real app, you would implement actual date filtering
      filtered = filtered.filter(transfer => {
        const transferDate = new Date(transfer.date);
        const today = new Date();
        
        switch(dateFilter) {
          case 'today':
            return transferDate.toDateString() === today.toDateString();
          case 'week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            return transferDate >= weekStart;
          case 'month':
            return transferDate.getMonth() === today.getMonth() && 
                   transferDate.getFullYear() === today.getFullYear();
          case 'quarter':
            const quarterStartMonth = Math.floor(today.getMonth() / 3) * 3;
            const quarterStart = new Date(today.getFullYear(), quarterStartMonth, 1);
            return transferDate >= quarterStart;
          case 'year':
            return transferDate.getFullYear() === today.getFullYear();
          default:
            return true;
        }
      });
    }
    
    // Apply amount filter
    if (amountFilter !== 'All') {
      const [min, max] = amountFilter === '50000+' ? [50000, Infinity] : 
                         amountFilter.split('-').map(Number);
      filtered = filtered.filter(transfer => 
        transfer.amount >= min && transfer.amount <= max);
    }
    
    return filtered;
  };

  // Get current transfers
  const filteredTransfers = filterTransfers();
  const indexOfLastTransfer = currentPage * transfersPerPage;
  const indexOfFirstTransfer = indexOfLastTransfer - transfersPerPage;
  const currentTransfers = filteredTransfers.slice(indexOfFirstTransfer, indexOfLastTransfer);
  const totalPages = Math.ceil(filteredTransfers.length / transfersPerPage);

  const handleAddTransfer = () => {
    console.log('Add new transfer');
  };

  const handleEdit = (transferId) => {
    console.log(`Edit transfer ${transferId}`);
  };

  const handleDelete = (transferId) => {
    console.log(`Delete transfer ${transferId}`);
  };

  const handleView = (transferId) => {
    console.log(`View transfer ${transferId}`);
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
        <h1 className="text-2xl font-bold text-gray-800">Money Transfers</h1>
        <p className="text-gray-600">Manage your fund transfers between accounts</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search transfers..."
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
        
        {/* Date Filter */}
        <select
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {dateOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Amount Filter */}
        <select
          value={amountFilter}
          onChange={(e) => {
            setAmountFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {amountOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Add Transfer Button */}
        <button
          onClick={handleAddTransfer}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ArrowLeftRight className="h-4 w-4" />
          <span>New Transfer</span>
        </button>
      </div>

      {/* Transfers Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Account</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentTransfers.length > 0 ? (
                currentTransfers.map((transfer, index) => (
                  <tr key={transfer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstTransfer + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transfer.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-blue-600">{transfer.referenceNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transfer.fromAccount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transfer.toAccount}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">
                        {formatCurrency(transfer.amount)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(transfer.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(transfer.id)}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(transfer.id)}
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
                      <p className="text-sm">No transfers match your search criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setDateFilter('All');
                          setAmountFilter('All');
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
        {filteredTransfers.length > transfersPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstTransfer + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastTransfer, filteredTransfers.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredTransfers.length}</span> results
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

export default MoneyTransfer;