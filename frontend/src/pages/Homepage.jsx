import React from 'react';
import { 
  ShoppingBag, 
  DollarSign, 
  Users, 
  TrendingUp, 
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Calendar,
  BarChart2,
  PieChart,
  CreditCard
} from 'lucide-react';

const HomePage = () => {
  // Sample data
  const analyticsData = {
    sales: {
      current: 12540,
      previous: 9820,
      change: 27.7,
      trend: 'up'
    },
    revenue: {
      current: 85420,
      previous: 72350,
      change: 18.1,
      trend: 'up'
    },
    customers: {
      current: 324,
      previous: 287,
      change: 12.9,
      trend: 'up'
    },
    expenses: {
      current: 28750,
      previous: 31200,
      change: 7.8,
      trend: 'down'
    }
  };

  const recentTransactions = [
    { id: 1, customer: 'John Smith', amount: 125.50, date: '2023-06-15', status: 'completed' },
    { id: 2, customer: 'Sarah Johnson', amount: 89.99, date: '2023-06-15', status: 'completed' },
    { id: 3, customer: 'Michael Brown', amount: 245.75, date: '2023-06-14', status: 'pending' },
    { id: 4, customer: 'Emily Davis', amount: 62.30, date: '2023-06-14', status: 'completed' },
    { id: 5, customer: 'Robert Wilson', amount: 179.99, date: '2023-06-13', status: 'completed' }
  ];

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
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your business today.</p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200">
          <Calendar className="h-5 w-5 text-gray-400" />
          <span className="text-sm font-medium">June 15, 2023</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Sales Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(analyticsData.sales.current)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm font-medium ${
            analyticsData.sales.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {analyticsData.sales.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {analyticsData.sales.change}% vs last period
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(analyticsData.revenue.current)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm font-medium ${
            analyticsData.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {analyticsData.revenue.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {analyticsData.revenue.change}% vs last period
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">New Customers</p>
              <h3 className="text-2xl font-bold mt-1">{analyticsData.customers.current}</h3>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm font-medium ${
            analyticsData.customers.trend === 'up' ? 'text-green-600' : 'text-red-600'
          }`}>
            {analyticsData.customers.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {analyticsData.customers.change}% vs last period
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <h3 className="text-2xl font-bold mt-1">{formatCurrency(analyticsData.expenses.current)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-red-50 text-red-600">
              <CreditCard className="h-5 w-5" />
            </div>
          </div>
          <div className={`mt-4 flex items-center text-sm font-medium ${
            analyticsData.expenses.trend === 'up' ? 'text-red-600' : 'text-green-600'
          }`}>
            {analyticsData.expenses.trend === 'up' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            {analyticsData.expenses.change}% vs last period
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Sales Trend</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <BarChart2 className="h-16 w-16 text-gray-300" />
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Revenue Breakdown</h3>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <PieChart className="h-16 w-16 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                <th className="pb-3">Transaction ID</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 text-sm font-medium">#{transaction.id.toString().padStart(4, '0')}</td>
                  <td className="py-4 text-sm">{transaction.customer}</td>
                  <td className="py-4 text-sm text-gray-500">{formatDate(transaction.date)}</td>
                  <td className="py-4 text-sm font-medium">{formatCurrency(transaction.amount)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Wireless Headphones</span>
              <span className="text-sm font-medium">42 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Smart Watch</span>
              <span className="text-sm font-medium">35 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bluetooth Speaker</span>
              <span className="text-sm font-medium">28 sold</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Customer Activity</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">New Customers</span>
              <span className="text-sm font-medium">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Returning Customers</span>
              <span className="text-sm font-medium">56</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg. Order Value</span>
              <span className="text-sm font-medium">{formatCurrency(89.99)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Low Stock Items</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Wireless Earbuds</span>
              <span className="text-sm font-medium">3 left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Phone Case</span>
              <span className="text-sm font-medium">5 left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Screen Protector</span>
              <span className="text-sm font-medium">2 left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;