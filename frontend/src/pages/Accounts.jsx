import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, MoreVertical, Landmark } from 'lucide-react';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [balanceFilter, setBalanceFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 10;

  // Sample data
  const sampleAccounts = [
    {
      id: 1,
      accountNo: 'ACC-1001',
      name: 'Main Business Account',
      balance: 125000,
      note: 'Primary operating account',
      type: 'Bank'
    },
    {
      id: 2,
      accountNo: 'ACC-1002',
      name: 'Petty Cash',
      balance: 5000,
      note: 'Office expenses',
      type: 'Cash'
    },
    {
      id: 3,
      accountNo: 'ACC-1003',
      name: 'Savings Account',
      balance: 250000,
      note: 'Emergency funds',
      type: 'Bank'
    },
    {
      id: 4,
      accountNo: 'ACC-1004',
      name: 'Payroll Account',
      balance: 75000,
      note: 'Employee salaries',
      type: 'Bank'
    },
    {
      id: 5,
      accountNo: 'ACC-1005',
      name: 'Tax Account',
      balance: 45000,
      note: 'Tax withholdings',
      type: 'Bank'
    },
    {
      id: 6,
      accountNo: 'ACC-1006',
      name: 'Investment Account',
      balance: 350000,
      note: 'Long-term investments',
      type: 'Investment'
    },
    {
      id: 7,
      accountNo: 'ACC-1007',
      name: 'Credit Card',
      balance: -12500,
      note: 'Business expenses',
      type: 'Credit'
    },
    {
      id: 8,
      accountNo: 'ACC-1008',
      name: 'Loan Account',
      balance: -250000,
      note: 'Business loan',
      type: 'Loan'
    },
    {
      id: 9,
      accountNo: 'ACC-1009',
      name: 'Client Escrow',
      balance: 85000,
      note: 'Client deposits',
      type: 'Trust'
    },
    {
      id: 10,
      accountNo: 'ACC-1010',
      name: 'Marketing Budget',
      balance: 30000,
      note: 'Promotional expenses',
      type: 'Bank'
    },
    {
      id: 11,
      accountNo: 'ACC-1011',
      name: 'Equipment Fund',
      balance: 60000,
      note: 'Office equipment',
      type: 'Bank'
    },
    {
      id: 12,
      accountNo: 'ACC-1012',
      name: 'Travel Account',
      balance: 15000,
      note: 'Business travel',
      type: 'Bank'
    },
  ];

  // Balance filter options
  const balanceOptions = [
    { value: 'All', label: 'All Balances' },
    { value: 'negative', label: 'Negative Balances' },
    { value: '0-10000', label: '0 - 10,000' },
    { value: '10000-50000', label: '10,000 - 50,000' },
    { value: '50000+', label: '50,000+' }
  ];

  // Account type options
  const accountTypeOptions = [
    { value: 'All', label: 'All Types' },
    { value: 'Bank', label: 'Bank Accounts' },
    { value: 'Cash', label: 'Cash Accounts' },
    { value: 'Credit', label: 'Credit Cards' },
    { value: 'Loan', label: 'Loans' },
    { value: 'Investment', label: 'Investments' },
    { value: 'Trust', label: 'Trust Accounts' }
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
      if (balanceFilter === 'negative') {
        filtered = filtered.filter(account => account.balance < 0);
      } else {
        const [min, max] = balanceFilter === '50000+' ? [50000, Infinity] : 
                           balanceFilter.split('-').map(Number);
        filtered = filtered.filter(account => 
          account.balance >= min && account.balance <= max);
      }
    }
    
    return filtered;
  };

  // Get current accounts
  const filteredAccounts = filterAccounts();
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  const handleAddAccount = () => {
    console.log('Add new account');
  };

  const handleEdit = (accountId) => {
    console.log(`Edit account ${accountId}`);
  };

  const handleDelete = (accountId) => {
    console.log(`Delete account ${accountId}`);
  };

  const handleView = (accountId) => {
    console.log(`View account ${accountId}`);
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

  return (
    <div className="flex flex-col p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Management</h1>
        <p className="text-gray-600">Manage your financial accounts</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
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
        
        {/* Account Type Filter */}
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {accountTypeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Add Account Button */}
        <button
          onClick={handleAddAccount}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Add Account</span>
        </button>
      </div>

      {/* Accounts Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-lg shadow">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAccounts.length > 0 ? (
                currentAccounts.map((account, index) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {indexOfFirstAccount + index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{account.accountNo}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Landmark className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900">{account.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        account.balance < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(account.balance)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                      <div className="line-clamp-2">{account.note}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleView(account.id)}
                          className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(account.id)}
                          className="p-1.5 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(account.id)}
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
        {filteredAccounts.length > accountsPerPage && (
          <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between sm:px-6">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstAccount + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastAccount, filteredAccounts.length)}
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
    </div>
  );
};

export default Accounts;