import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Eye,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
} from "lucide-react";

const BillingPayments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  // Sample transaction data
  const transactions = [
    {
      id: "TXN-001",
      company: "TechStart Solutions",
      email: "admin@techstart.com",
      amount: 299,
      plan: "Professional",
      status: "completed",
      date: "2024-03-15",
      paymentMethod: "Visa •••• 4567",
      invoice: "INV-2024-001",
      type: "subscription",
    },
    {
      id: "TXN-002",
      company: "Metro Retail Group",
      email: "it@metroretail.com",
      amount: 1149,
      plan: "Enterprise",
      status: "completed",
      date: "2024-03-14",
      paymentMethod: "MasterCard •••• 8901",
      invoice: "INV-2024-002",
      type: "subscription",
    },
    {
      id: "TXN-003",
      company: "Cafe Corner",
      email: "owner@cafecorner.com",
      amount: 99,
      plan: "Basic",
      status: "pending",
      date: "2024-03-13",
      paymentMethod: "PayPal",
      invoice: "INV-2024-003",
      type: "subscription",
    },
    {
      id: "TXN-004",
      company: "Fashion Hub Ltd",
      email: "admin@fashionhub.com",
      amount: 50,
      plan: "Professional",
      status: "failed",
      date: "2024-03-12",
      paymentMethod: "Visa •••• 1234",
      invoice: "INV-2024-004",
      type: "overage",
    },
  ];

  const revenueData = [
    { month: "Jan", revenue: 78500, transactions: 245 },
    { month: "Feb", revenue: 82100, transactions: 267 },
    { month: "Mar", revenue: 84250, transactions: 289 },
  ];

  const paymentMethods = [
    { type: "Credit Card", count: 187, percentage: 75.7 },
    { type: "PayPal", count: 43, percentage: 17.4 },
    { type: "Bank Transfer", count: 17, percentage: 6.9 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      case "refunded":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "subscription":
        return "bg-blue-100 text-blue-700";
      case "overage":
        return "bg-orange-100 text-orange-700";
      case "refund":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoice.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || transaction.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = transactions.reduce(
    (sum, t) => (t.status === "completed" ? sum + t.amount : sum),
    0
  );
  const pendingRevenue = transactions.reduce(
    (sum, t) => (t.status === "pending" ? sum + t.amount : sum),
    0
  );
  const failedRevenue = transactions.reduce(
    (sum, t) => (t.status === "failed" ? sum + t.amount : sum),
    0
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Billing & Payments
          </h1>
          <p className="text-gray-600 font-normal">
            Transaction history and revenue analytics
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Export</span>
          </button>
        </div>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+23.5%",
            trend: "up",
            icon: DollarSign,
            color: "emerald",
          },
          {
            title: "Pending Payments",
            value: `$${pendingRevenue.toLocaleString()}`,
            change: "+12",
            trend: "up",
            icon: Clock,
            color: "yellow",
          },
          {
            title: "Failed Payments",
            value: `$${failedRevenue.toLocaleString()}`,
            change: "-8%",
            trend: "down",
            icon: XCircle,
            color: "red",
          },
          {
            title: "Success Rate",
            value: "94.2%",
            change: "+2.1%",
            trend: "up",
            icon: TrendingUp,
            color: "green",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-gray-600" />
                </div>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                    stat.trend === "up"
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs font-light text-gray-600">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Revenue Trend</h2>
              <p className="text-sm text-gray-600 mt-1">
                Monthly revenue and transaction volume
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Revenue</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-xs text-gray-600">Transactions</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {revenueData.map((data, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                    {data.month}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      ${data.revenue.toLocaleString()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {data.transactions} transactions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${(data.revenue / 100000) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500">Revenue growth</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
            <p className="text-sm text-gray-600 mt-1">
              Distribution by payment type
            </p>
          </div>

          <div className="space-y-4">
            {paymentMethods.map((method, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-gray-700">
                    {method.type}
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {method.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{method.percentage}% of total</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700">
                Total Payment Methods
              </span>
              <span className="text-base font-medium text-gray-900">
                {paymentMethods.reduce((sum, method) => sum + method.count, 0)}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Showing {filteredTransactions.length} of {transactions.length}{" "}
              transactions
            </span>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Transaction
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Company
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Amount
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Payment Method
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Date
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {transaction.id}
                      </h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span
                          className={`inline-flex px-2 py-1 rounded-md text-xs font-semibold ${getTypeColor(
                            transaction.type
                          )}`}
                        >
                          {transaction.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {transaction.invoice}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {transaction.company}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {transaction.plan}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-base font-medium text-gray-900">
                      ${transaction.amount}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {getStatusIcon(transaction.status)}
                      <span className="capitalize">{transaction.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      {transaction.paymentMethod}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPayments;
