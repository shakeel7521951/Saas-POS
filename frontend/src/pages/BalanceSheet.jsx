import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, Download, Printer, FileText } from 'lucide-react';

const BalanceSheet = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [balanceFilter, setBalanceFilter] = useState('All');
  const itemsPerPage = 10;

  // Sample data
  const sampleAccounts = [
    {
      id: 1,
      name: 'Abdullahi',
      accountNo: '00000001',
      credit: 0,
      debit: 117,
      balance: 10000000000,
      type: 'Asset'
    },
    {
      id: 2,
      name: 'Main Business Account',
      accountNo: 'ACC-1001',
      credit: 250000,
      debit: 125000,
      balance: 125000,
      type: 'Asset'
    },
    {
      id: 3,
      name: 'Payroll Account',
      accountNo: 'ACC-1004',
      credit: 75000,
      debit: 0,
      balance: -75000,
      type: 'Liability'
    },
    {
      id: 4,
      name: 'Tax Account',
      accountNo: 'ACC-1005',
      credit: 45000,
      debit: 0,
      balance: -45000,
      type: 'Liability'
    },
    {
      id: 5,
      name: 'Investment Account',
      accountNo: 'ACC-1006',
      credit: 0,
      debit: 350000,
      balance: 350000,
      type: 'Asset'
    },
    {
      id: 6,
      name: 'Credit Card',
      accountNo: 'ACC-1007',
      credit: 12500,
      debit: 0,
      balance: -12500,
      type: 'Liability'
    },
    {
      id: 7,
      name: 'Loan Account',
      accountNo: 'ACC-1008',
      credit: 250000,
      debit: 0,
      balance: -250000,
      type: 'Liability'
    },
    {
      id: 8,
      name: 'Client Escrow',
      accountNo: 'ACC-1009',
      credit: 0,
      debit: 85000,
      balance: 85000,
      type: 'Asset'
    },
    {
      id: 9,
      name: 'Marketing Budget',
      accountNo: 'ACC-1010',
      credit: 0,
      debit: 30000,
      balance: 30000,
      type: 'Asset'
    },
    {
      id: 10,
      name: 'Equipment Fund',
      accountNo: 'ACC-1011',
      credit: 0,
      debit: 60000,
      balance: 60000,
      type: 'Asset'
    },
    {
      id: 11,
      name: 'Travel Account',
      accountNo: 'ACC-1012',
      credit: 0,
      debit: 15000,
      balance: 15000,
      type: 'Asset'
    },
    {
      id: 12,
      name: 'Retained Earnings',
      accountNo: 'ACC-1013',
      credit: 0,
      debit: 500000,
      balance: 500000,
      type: 'Equity'
    },
  ];

  // Balance filter options
  const balanceOptions = [
    { value: 'All', label: 'All Balances' },
    { value: 'asset', label: 'Assets' },
    { value: 'liability', label: 'Liabilities' },
    { value: 'equity', label: 'Equity' },
    { value: 'positive', label: 'Positive Balances' },
    { value: 'negative', label: 'Negative Balances' }
  ];

  const filterAccounts = () => {
    let filtered = sampleAccounts;
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNo.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Apply balance filter
    if (balanceFilter !== 'All') {
      switch(balanceFilter) {
        case 'asset':
          filtered = filtered.filter(account => account.type === 'Asset');
          break;
        case 'liability':
          filtered = filtered.filter(account => account.type === 'Liability');
          break;
        case 'equity':
          filtered = filtered.filter(account => account.type === 'Equity');
          break;
        case 'positive':
          filtered = filtered.filter(account => account.balance >= 0);
          break;
        case 'negative':
          filtered = filtered.filter(account => account.balance < 0);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  };

  // Get current accounts
  const filteredAccounts = filterAccounts();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAccounts.length / itemsPerPage);

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

  // Calculate totals
  const totalAssets = sampleAccounts
    .filter(account => account.type === 'Asset')
    .reduce((sum, account) => sum + account.balance, 0);

  const totalLiabilities = sampleAccounts
    .filter(account => account.type === 'Liability')
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);

  const totalEquity = sampleAccounts
    .filter(account => account.type === 'Equity')
    .reduce((sum, account) => sum + account.balance, 0);

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Balance Sheet</h1>
          <p className="text-gray-600">Financial position snapshot</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50">
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search accounts..."
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
        
        {/* Balance Filter */}
        <select
          value={balanceFilter}
          onChange={(e) => {
            setBalanceFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {balanceOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Period Selector */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>As of May 31, 2023</option>
          <option>As of April 30, 2023</option>
          <option>As of March 31, 2023</option>
        </select>
      </div>

      {/* Accounts Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow mb-6">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((account, index) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstItem + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <FileText className={`h-4 w-4 ${
                          account.type === 'Asset' ? 'text-green-500' : 
                          account.type === 'Liability' ? 'text-red-500' : 'text-blue-500'
                        }`} />
                        <span className="text-sm font-medium text-gray-900">{account.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.accountNo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(account.credit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(account.debit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        account.balance >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatCurrency(account.balance)}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Search className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">No accounts match your search criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setBalanceFilter('All');
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
        {filteredAccounts.length > itemsPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastItem, filteredAccounts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredAccounts.length}</span> results
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

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Assets */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-green-600 mb-2">Assets</h3>
          <div className="text-2xl font-bold">{formatCurrency(totalAssets)}</div>
          <div className="mt-4 space-y-2">
            {sampleAccounts
              .filter(account => account.type === 'Asset' && account.balance > 0)
              .slice(0, 3)
              .map(account => (
                <div key={account.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{account.name}</span>
                  <span className="font-medium text-green-600">{formatCurrency(account.balance)}</span>
                </div>
              ))}
          </div>
        </div>
        
        {/* Liabilities */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-red-600 mb-2">Liabilities</h3>
          <div className="text-2xl font-bold">{formatCurrency(totalLiabilities)}</div>
          <div className="mt-4 space-y-2">
            {sampleAccounts
              .filter(account => account.type === 'Liability')
              .slice(0, 3)
              .map(account => (
                <div key={account.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{account.name}</span>
                  <span className="font-medium text-red-600">{formatCurrency(Math.abs(account.balance))}</span>
                </div>
              ))}
          </div>
        </div>
        
        {/* Equity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-blue-600 mb-2">Equity</h3>
          <div className="text-2xl font-bold">{formatCurrency(totalEquity)}</div>
          <div className="mt-4 space-y-2">
            {sampleAccounts
              .filter(account => account.type === 'Equity')
              .slice(0, 3)
              .map(account => (
                <div key={account.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{account.name}</span>
                  <span className="font-medium text-blue-600">{formatCurrency(account.balance)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Net Worth */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800">Net Worth</h3>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalAssets - totalLiabilities + totalEquity)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceSheet;