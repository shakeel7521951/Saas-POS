import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  CreditCard,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Database,
  Zap,
  Shield,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
} from "lucide-react";

const SubscriptionsPlans = () => {
  const [activeTab, setActiveTab] = useState("plans");
  const [searchTerm, setSearchTerm] = useState("");

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  const plans = [
    {
      id: 1,
      name: "Basic",
      description: "Perfect for small businesses getting started",
      price: 99,
      billing: "monthly",
      features: [
        "Up to 10 users",
        "5GB storage",
        "Basic reporting",
        "Email support",
        "Standard integrations",
      ],
      limits: {
        users: 10,
        storage: "5GB",
        transactions: "1,000/month",
        support: "Email",
      },
      subscribers: 89,
      revenue: 8910,
      status: "active",
      popular: false,
    },
    {
      id: 2,
      name: "Professional",
      description: "Advanced features for growing businesses",
      price: 299,
      billing: "monthly",
      features: [
        "Up to 50 users",
        "50GB storage",
        "Advanced reporting",
        "Priority support",
        "All integrations",
        "Custom branding",
      ],
      limits: {
        users: 50,
        storage: "50GB",
        transactions: "10,000/month",
        support: "Priority",
      },
      subscribers: 125,
      revenue: 37375,
      status: "active",
      popular: true,
    },
    {
      id: 3,
      name: "Enterprise",
      description: "Complete solution for large organizations",
      price: 1149,
      billing: "monthly",
      features: [
        "Unlimited users",
        "500GB storage",
        "Real-time analytics",
        "24/7 phone support",
        "Custom integrations",
        "White-label solution",
        "Dedicated account manager",
      ],
      limits: {
        users: "Unlimited",
        storage: "500GB",
        transactions: "Unlimited",
        support: "24/7 Phone",
      },
      subscribers: 33,
      revenue: 37917,
      status: "active",
      popular: false,
    },
  ];

  const subscriptions = [
    {
      id: 1,
      company: "TechStart Solutions",
      email: "admin@techstart.com",
      plan: "Professional",
      status: "active",
      startDate: "2024-01-15",
      nextBilling: "2024-12-15",
      amount: 299,
      users: 25,
      usage: 68,
      autoRenew: true,
    },
    {
      id: 2,
      company: "Metro Retail Group",
      email: "it@metroretail.com",
      plan: "Enterprise",
      status: "trial",
      startDate: "2024-02-20",
      nextBilling: "2024-03-20",
      amount: 1149,
      users: 150,
      usage: 45,
      autoRenew: false,
    },
    {
      id: 3,
      company: "Cafe Corner",
      email: "owner@cafecorner.com",
      plan: "Basic",
      status: "active",
      startDate: "2024-03-01",
      nextBilling: "2024-04-01",
      amount: 99,
      users: 8,
      usage: 34,
      autoRenew: true,
    },
    {
      id: 4,
      company: "Fashion Hub Ltd",
      email: "admin@fashionhub.com",
      plan: "Professional",
      status: "cancelled",
      startDate: "2024-01-08",
      nextBilling: null,
      amount: 299,
      users: 35,
      usage: 89,
      autoRenew: false,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "trial":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "expired":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />;
      case "trial":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredSubscriptions = subscriptions.filter(
    (sub) =>
      sub.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Subscriptions & Plans
          </h1>
          <p className="text-gray-600 font-normal">
            Manage billing plans and company subscriptions
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: THEME.primary }}
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-normal">Create Plan</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("plans")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "plans"
                ? "text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor:
                activeTab === "plans" ? THEME.primary : "transparent",
            }}
          >
            <Package className="w-4 h-4" />
            <span>Plans Management</span>
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "subscriptions"
                ? "text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor:
                activeTab === "subscriptions" ? THEME.primary : "transparent",
            }}
          >
            <CreditCard className="w-4 h-4" />
            <span>Company Subscriptions</span>
          </button>
        </div>
      </div>

      {activeTab === "plans" && (
        <>
          {/* Plans Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                label: "Total Plans",
                value: "3",
                icon: Package,
                color: "blue",
              },
              {
                label: "Total Subscribers",
                value: "247",
                icon: Users,
                color: "green",
              },
              {
                label: "Monthly Revenue",
                value: "$84,202",
                icon: DollarSign,
                color: "emerald",
              },
              {
                label: "Growth Rate",
                value: "+23.5%",
                icon: TrendingUp,
                color: "purple",
              },
            ].map((stat, index) => {
              const Icon = stat.icon;
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
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-light text-gray-600">
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white rounded-2xl border-2 p-8 relative ${
                  plan.popular
                    ? "border-emerald-200 shadow-sm"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-4xl font-medium text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600">/{plan.billing}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Plan Metrics */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900">
                        {plan.subscribers}
                      </div>
                      <div className="text-xs text-gray-600">Subscribers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-gray-900">
                        ${plan.revenue.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-600">
                        Monthly Revenue
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    className="flex-1 py-3 px-4 text-white rounded-xl font-medium hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: THEME.primary }}
                  >
                    Edit Plan
                  </button>
                  <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {activeTab === "subscriptions" && (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search subscriptions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
                  />
                </div>

                <select className="px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all">
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="trial">Trial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Showing {filteredSubscriptions.length} of{" "}
                  {subscriptions.length} subscriptions
                </span>
              </div>
            </div>
          </div>

          {/* Subscriptions Table */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Company
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Plan
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Usage
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Next Billing
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Amount
                    </th>
                    <th className="text-right py-4 px-6 text-xs font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredSubscriptions.map((subscription, index) => (
                    <motion.tr
                      key={subscription.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {subscription.company}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {subscription.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex px-3 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700">
                          {subscription.plan}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                            subscription.status
                          )}`}
                        >
                          {getStatusIcon(subscription.status)}
                          <span className="capitalize">
                            {subscription.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-900">
                            {subscription.users} users
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full"
                              style={{ width: `${subscription.usage}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500">
                            {subscription.usage}% used
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">
                          {subscription.nextBilling
                            ? new Date(
                                subscription.nextBilling
                              ).toLocaleDateString()
                            : "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {subscription.autoRenew ? "Auto-renew" : "Manual"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs font-medium text-gray-900">
                          ${subscription.amount}/mo
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit3 className="w-4 h-4" />
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
        </>
      )}
    </div>
  );
};

export default SubscriptionsPlans;
