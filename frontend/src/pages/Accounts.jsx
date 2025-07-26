import React, { useState } from 'react';
import { Search, Plus, ChevronLeft, ChevronRight, Eye, Edit2, Trash2, Landmark } from 'lucide-react';

const Accounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [balanceFilter, setBalanceFilter] = useState('All');
  const [accountTypeFilter, setAccountTypeFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const accountsPerPage = 8;

  // Sample data
  const sampleAccounts = [
    {
      id: 1,
      accountNo: 'ACC-1001',
      name: 'Main Business Account',
      balance: 125000,
      note: 'Primary operating account for daily transactions and expenses',
      type: 'Bank'
    },
    {
      id: 2,
      accountNo: 'ACC-1002',
      name: 'Petty Cash',
      balance: 5000,
      note: 'Small office expenses and miscellaneous purchases',
      type: 'Cash'
    },
    {
      id: 3,
      accountNo: 'ACC-1003',
      name: 'Savings Account',
      balance: 250000,
      note: 'Emergency funds and financial reserves',
      type: 'Bank'
    },
    {
      id: 4,
      accountNo: 'ACC-1004',
      name: 'Payroll Account',
      balance: 75000,
      note: 'Dedicated account for employee salary payments',
      type: 'Bank'
    },
    {
      id: 5,
      accountNo: 'ACC-1005',
      name: 'Tax Account',
      balance: 45000,
      note: 'Tax withholdings and quarterly payments',
      type: 'Bank'
    },
    {
      id: 6,
      accountNo: 'ACC-1006',
      name: 'Investment Account',
      balance: 350000,
      note: 'Long-term investments and portfolio management',
      type: 'Investment'
    },
    {
      id: 7,
      accountNo: 'ACC-1007',
      name: 'Corporate Credit Card',
      balance: -12500,
      note: 'Business expenses and travel charges',
      type: 'Credit'
    },
    {
      id: 8,
      accountNo: 'ACC-1008',
      name: 'Business Loan',
      balance: -250000,
      note: 'Equipment financing at 5.2% APR',
      type: 'Loan'
    },
    {
      id: 9,
      accountNo: 'ACC-1009',
      name: 'Client Escrow',
      balance: 85000,
      note: 'Holds client deposits for services not yet rendered',
      type: 'Trust'
    },
    {
      id: 10,
      accountNo: 'ACC-1010',
      name: 'Marketing Budget',
      balance: 30000,
      note: 'Digital ads, promotions, and campaign expenses',
      type: 'Bank'
    },
    {
      id: 11,
      accountNo: 'ACC-1011',
      name: 'Equipment Fund',
      balance: 60000,
      note: 'Office equipment and technology upgrades',
      type: 'Bank'
    },
    {
      id: 12,
      accountNo: 'ACC-1012',
      name: 'Travel Account',
      balance: 15000,
      note: 'Business travel and conference expenses',
      type: 'Bank'
    },
  ];

  // Filter options
  const balanceOptions = [
    { value: 'All', label: 'All Balances' },
    { value: 'negative', label: 'Negative Balances' },
    { value: '0-10000', label: '$0 - $10,000' },
    { value: '10000-50000', label: '$10,000 - $50,000' },
    { value: '50000+', label: '$50,000+' }
  ];

  const accountTypeOptions = [
    { value: 'All', label: 'All Account Types' },
    { value: 'Bank', label: 'Bank Accounts' },
    { value: 'Cash', label: 'Cash Accounts' },
    { value: 'Credit', label: 'Credit Cards' },
    { value: 'Loan', label: 'Loans' },
    { value: 'Investment', label: 'Investments' },
    { value: 'Trust', label: 'Trust Accounts' }
  ];

  const filterAccounts = () => {
    let filtered = sampleAccounts;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(account =>
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.accountNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.note.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    // Balance filter
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
    
    // Account type filter
    if (accountTypeFilter !== 'All') {
      filtered = filtered.filter(account => account.type === accountTypeFilter);
    }
    
    return filtered;
  };

  // Pagination
  const filteredAccounts = filterAccounts();
  const indexOfLastAccount = currentPage * accountsPerPage;
  const indexOfFirstAccount = indexOfLastAccount - accountsPerPage;
  const currentAccounts = filteredAccounts.slice(indexOfFirstAccount, indexOfLastAccount);
  const totalPages = Math.ceil(filteredAccounts.length / accountsPerPage);

  // Handlers
  const handleAddAccount = () => console.log('Add new account');
  const handleEdit = (accountId) => console.log(`Edit account ${accountId}`);
  const handleDelete = (accountId) => console.log(`Delete account ${accountId}`);
  const handleView = (accountId) => console.log(`View account ${accountId}`);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getAccountTypeColor = (type) => {
    const colors = {
      'Bank': 'bg-blue-100 text-blue-800',
      'Cash': 'bg-green-100 text-green-800',
      'Credit': 'bg-red-100 text-red-800',
      'Loan': 'bg-purple-100 text-purple-800',
      'Investment': 'bg-yellow-100 text-yellow-800',
      'Trust': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex flex-col p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Financial Accounts</h1>
        <p className="text-gray-600 mt-2">Manage all your business accounts in one place</p>
      </div>

      {/* Filters and Actions */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 pl-10 pr-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
          />
        </div>
        
        {/* Balance Filter */}
        <select
          value={balanceFilter}
          onChange={(e) => {
            setBalanceFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
        >
          {balanceOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Account Type Filter */}
        <select
          value={accountTypeFilter}
          onChange={(e) => {
            setAccountTypeFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-white"
        >
          {accountTypeOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        
        {/* Add Account Button */}
        <button
          onClick={handleAddAccount}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">New Account</span>
        </button>
      </div>

      {/* Accounts Table */}
      <div className="flex-1 overflow-hidden min-h-0 flex flex-col bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Account</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Details</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Balance</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentAccounts.length > 0 ? (
                currentAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-5 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center shadow-inner">
                          <Landmark className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">{account.accountNo}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-sm text-gray-600 line-clamp-2">{account.note}</div>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`text-sm font-semibold ${
                        account.balance < 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {formatCurrency(account.balance)}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAccountTypeColor(account.type)}`}>
                        {account.type}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleView(account.id)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(account.id)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(account.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
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
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No accounts found</h3>
                      <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                      <button 
                        onClick={() => {
                          setSearchTerm('');
                          setBalanceFilter('All');
                          setAccountTypeFilter('All');
                          setCurrentPage(1);
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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
        {filteredAccounts.length > accountsPerPage && (
          <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-xl">
            <div className="flex-1 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstAccount + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastAccount, filteredAccounts.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredAccounts.length}</span> accounts
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
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
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

export default Accounts;