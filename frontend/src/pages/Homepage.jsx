import React from "react";
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
  CreditCard,
  ChevronRight,
  ChevronDown,
  MoreHorizontal,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const HomePage = () => {
  // Sample data
  const analyticsData = {
    sales: {
      current: 12540,
      previous: 9820,
      change: 27.7,
      trend: "up",
    },
    revenue: {
      current: 85420,
      previous: 72350,
      change: 18.1,
      trend: "up",
    },
    customers: {
      current: 324,
      previous: 287,
      change: 12.9,
      trend: "up",
    },
    expenses: {
      current: 28750,
      previous: 31200,
      change: 7.8,
      trend: "down",
    },
  };

  const recentTransactions = [
    {
      id: 1,
      customer: "John Smith",
      amount: 125.5,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      amount: 89.99,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: 3,
      customer: "Michael Brown",
      amount: 245.75,
      date: "2023-06-14",
      status: "pending",
    },
    {
      id: 4,
      customer: "Emily Davis",
      amount: 62.3,
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: 5,
      customer: "Robert Wilson",
      amount: 179.99,
      date: "2023-06-13",
      status: "completed",
    },
  ];

  // Chart data
  const salesTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Sales',
        data: [6500, 5900, 8000, 8100, 9600, 12540],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const revenueSourcesData = {
    labels: ['Electronics', 'Clothing', 'Home Goods', 'Accessories'],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          'rgba(99, 102, 241, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(6, 182, 212, 0.7)',
          'rgba(245, 158, 11, 0.7)'
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(6, 182, 212, 1)',
          'rgba(245, 158, 11, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const weeklyPerformanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'This Week',
        data: [3200, 2900, 4100, 3800, 5200, 4500, 4800],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Last Week',
        data: [2800, 3100, 3500, 2900, 3800, 4200, 3900],
        borderColor: 'rgba(156, 163, 175, 1)',
        backgroundColor: 'rgba(156, 163, 175, 0.1)',
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your business performance summary
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">June 15, 2023</span>
          </div>
          <button className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-50 transition-colors">
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Sales Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <ShoppingBag className="h-4 w-4" /> Total Sales
              </p>
              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {formatCurrency(analyticsData.sales.current)}
              </h3>
            </div>
            <div
              className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                analyticsData.sales.trend === "up"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {analyticsData.sales.trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {analyticsData.sales.change}%
            </div>
          </div>
          <div className="mt-4">
            <Line 
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [{
                  data: [5, 10, 8, 15, 12, 20],
                  borderColor: analyticsData.sales.trend === "up" ? '#10B981' : '#EF4444',
                  borderWidth: 2,
                  tension: 0.4,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    display: false
                  },
                  y: {
                    display: false
                  }
                }
              }}
              height={40}
            />
          </div>
        </div>

        {/* Revenue Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <DollarSign className="h-4 w-4" /> Total Revenue
              </p>
              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {formatCurrency(analyticsData.revenue.current)}
              </h3>
            </div>
            <div
              className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                analyticsData.revenue.trend === "up"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {analyticsData.revenue.trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {analyticsData.revenue.change}%
            </div>
          </div>
          <div className="mt-4">
            <Line 
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [{
                  data: [12, 15, 10, 18, 14, 22],
                  borderColor: analyticsData.revenue.trend === "up" ? '#10B981' : '#EF4444',
                  borderWidth: 2,
                  tension: 0.4,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    display: false
                  },
                  y: {
                    display: false
                  }
                }
              }}
              height={40}
            />
          </div>
        </div>

        {/* Customers Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Users className="h-4 w-4" /> New Customers
              </p>
              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {analyticsData.customers.current}
              </h3>
            </div>
            <div
              className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                analyticsData.customers.trend === "up"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {analyticsData.customers.trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {analyticsData.customers.change}%
            </div>
          </div>
          <div className="mt-4">
            <Line 
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [{
                  data: [150, 180, 200, 220, 250, 300],
                  borderColor: analyticsData.customers.trend === "up" ? '#10B981' : '#EF4444',
                  borderWidth: 2,
                  tension: 0.4,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    display: false
                  },
                  y: {
                    display: false
                  }
                }
              }}
              height={40}
            />
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <CreditCard className="h-4 w-4" /> Total Expenses
              </p>
              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {formatCurrency(analyticsData.expenses.current)}
              </h3>
            </div>
            <div
              className={`flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                analyticsData.expenses.trend === "up"
                  ? "bg-red-50 text-red-600"
                  : "bg-green-50 text-green-600"
              }`}
            >
              {analyticsData.expenses.trend === "up" ? (
                <ArrowUp className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDown className="h-3 w-3 mr-1" />
              )}
              {analyticsData.expenses.change}%
            </div>
          </div>
          <div className="mt-4">
            <Line 
              data={{
                labels: ['', '', '', '', '', ''],
                datasets: [{
                  data: [35, 30, 28, 25, 22, 20],
                  borderColor: analyticsData.expenses.trend === "up" ? '#EF4444' : '#10B981',
                  borderWidth: 2,
                  tension: 0.4,
                  pointRadius: 0
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  x: {
                    display: false
                  },
                  y: {
                    display: false
                  }
                }
              }}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Sales Trend Chart */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Sales Trend</h3>
              <p className="text-sm text-gray-500">Monthly performance metrics</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg font-medium">
                Month
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-lg font-medium">
                Quarter
              </button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-lg font-medium">
                Year
              </button>
            </div>
          </div>
          <div className="h-64">
            <Bar
              data={salesTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return formatCurrency(context.raw);
                      }
                    }
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: function(value) {
                        return formatCurrency(value);
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Revenue Sources</h3>
              <p className="text-sm text-gray-500">Revenue by product category</p>
            </div>
            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
              <option>This Month</option>
              <option>Last Month</option>
            </select>
          </div>
          <div className="h-64">
            <Pie
              data={revenueSourcesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      padding: 20
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        return `${context.label}: ${context.raw}%`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Weekly Performance</h3>
            <p className="text-sm text-gray-500">Comparison with previous week</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg font-medium">
              Week
            </button>
            <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-lg font-medium">
              Month
            </button>
          </div>
        </div>
        <div className="h-64">
          <Line
            data={weeklyPerformanceData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      return `${context.dataset.label}: ${formatCurrency(context.raw)}`;
                    }
                  }
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function(value) {
                      return formatCurrency(value);
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <p className="text-sm text-gray-500">Latest customer payments</p>
          </div>
          <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
            View All
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200">
                <th className="pb-3 pl-2">Transaction</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3 pr-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 pl-2">
                    <div className="flex items-center">
                      <div className="bg-blue-50 p-2 rounded-lg mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-blue-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        #{transaction.id.toString().padStart(4, "0")}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        <span className="text-xs font-medium text-gray-600">
                          {transaction.customer
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm text-gray-800">
                        {transaction.customer}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-sm text-gray-600">
                      {formatDate(transaction.date)}
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="text-sm font-semibold text-gray-800">
                      {formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="py-3 pr-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        transaction.status === "completed"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {transaction.status === "completed" ? (
                        <CheckCircle className="mr-1.5 h-3 w-3" />
                      ) : (
                        <Clock className="mr-1.5 h-3 w-3" />
                      )}
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-center">
          <button className="text-xs text-gray-500 hover:text-gray-700 flex items-center">
            Show more
            <ChevronDown className="h-3 w-3 ml-1" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Top Products</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Wireless Headphones</span>
              <span className="text-sm font-medium text-gray-800">42 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Smart Watch</span>
              <span className="text-sm font-medium text-gray-800">35 sold</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Bluetooth Speaker</span>
              <span className="text-sm font-medium text-gray-800">28 sold</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Customer Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">New Customers</span>
              <span className="text-sm font-medium text-gray-800">24</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Returning Customers</span>
              <span className="text-sm font-medium text-gray-800">56</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Avg. Order Value</span>
              <span className="text-sm font-medium text-gray-800">
                {formatCurrency(89.99)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-red-50 text-red-600">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Low Stock</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Wireless Earbuds</span>
              <span className="text-sm font-medium text-gray-800">3 left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Phone Case</span>
              <span className="text-sm font-medium text-gray-800">5 left</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">Screen Protector</span>
              <span className="text-sm font-medium text-gray-800">2 left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;