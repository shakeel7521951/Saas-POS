import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  CreditCard,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Activity,
  Zap,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const AdminDashboard = () => {
  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  // Sample data - replace with real API data
  const stats = [
    {
      title: "Total Companies",
      value: "247",
      change: "+18",
      trend: "up",
      period: "this month",
      icon: Building2,
      color: "emerald",
    },
    {
      title: "Active Subscriptions",
      value: "231",
      change: "+12",
      trend: "up",
      period: "vs last month",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Monthly Revenue",
      value: "$84,250",
      change: "+23.5%",
      trend: "up",
      period: "vs last month",
      icon: DollarSign,
      color: "blue",
    },
    {
      title: "Failed Sage Syncs",
      value: "7",
      change: "-3",
      trend: "down",
      period: "this week",
      icon: AlertTriangle,
      color: "red",
    },
  ];

  const recentSignups = [
    {
      company: "TechStart Solutions",
      email: "admin@techstart.com",
      plan: "Professional",
      date: "2 hours ago",
      status: "active",
    },
    {
      company: "Metro Retail Group",
      email: "it@metroretail.com",
      plan: "Enterprise",
      date: "5 hours ago",
      status: "trial",
    },
    {
      company: "Cafe Corner",
      email: "owner@cafecorner.com",
      plan: "Basic",
      date: "1 day ago",
      status: "active",
    },
    {
      company: "Fashion Hub Ltd",
      email: "admin@fashionhub.com",
      plan: "Professional",
      date: "2 days ago",
      status: "setup",
    },
  ];

  const subscriptionBreakdown = [
    { plan: "Basic", count: 89, revenue: 8900, color: "bg-gray-500" },
    {
      plan: "Professional",
      count: 125,
      revenue: 37500,
      color: "bg-emerald-500",
    },
    { plan: "Enterprise", count: 33, revenue: 37950, color: "bg-blue-500" },
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: "bg-emerald-50 text-emerald-600 border-emerald-100",
      green: "bg-green-50 text-green-600 border-green-100",
      blue: "bg-blue-50 text-blue-600 border-blue-100",
      red: "bg-red-50 text-red-600 border-red-100",
    };
    return colors[color] || colors.emerald;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "trial":
        return "bg-blue-100 text-blue-700";
      case "setup":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 font-normal">
            Monitor your SaaS platform performance
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Refresh</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">
              Last 30 days
            </span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${getColorClasses(
                    stat.color
                  )}`}
                >
                  <Icon className="w-6 h-6" />
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
              <p className="text-xs text-gray-500 mt-1 font-light">
                {stat.period}
              </p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Signups */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Recent Signups
              </h2>
              <p className="text-xs text-gray-600 mt-1 font-normal">
                New companies joining the platform
              </p>
            </div>
            <button
              className="text-xs font-medium text-white px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              style={{ backgroundColor: THEME.primary }}
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentSignups.map((signup, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {signup.company}
                    </h3>
                    <p className="text-sm text-gray-600">{signup.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-xs font-normal text-gray-700">
                      {signup.plan}
                    </span>
                    <span
                      className={`inline-flex px-2 py-1 rounded-lg text-xs font-semibold ${getStatusColor(
                        signup.status
                      )}`}
                    >
                      {signup.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{signup.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subscription Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              Active vs Inactive
            </h2>
            <p className="text-xs text-gray-600 mt-1 font-normal">
              Subscription breakdown
            </p>
          </div>

          <div className="space-y-4">
            {subscriptionBreakdown.map((plan, index) => {
              const total = subscriptionBreakdown.reduce(
                (sum, p) => sum + p.count,
                0
              );
              const percentage = (plan.count / total) * 100;

              return (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-medium text-gray-700">
                      {plan.plan}
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {plan.count}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ${plan.color}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{percentage.toFixed(1)}% of total</span>
                    <span>${plan.revenue.toLocaleString()}/mo</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700">
                Total Active
              </span>
              <span className="text-base font-medium text-gray-900">
                {subscriptionBreakdown.reduce(
                  (sum, plan) => sum + plan.count,
                  0
                )}
              </span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs font-medium text-gray-700">
                Monthly Revenue
              </span>
              <span
                className="text-base font-medium"
                style={{ color: THEME.primary }}
              >
                $
                {subscriptionBreakdown
                  .reduce((sum, plan) => sum + plan.revenue, 0)
                  .toLocaleString()}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Health */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-100 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">System Health</h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time platform status
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-600">
              All Systems Operational
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: "API Response",
              value: "145ms",
              status: "excellent",
              icon: Zap,
            },
            {
              label: "Uptime",
              value: "99.98%",
              status: "excellent",
              icon: Activity,
            },
            {
              label: "Active Sessions",
              value: "1,247",
              status: "normal",
              icon: Users,
            },
            {
              label: "Data Sync",
              value: "Real-time",
              status: "excellent",
              icon: RefreshCw,
            },
          ].map((metric, index) => {
            const Icon = metric.icon;
            const statusColor =
              metric.status === "excellent"
                ? "text-green-600"
                : "text-yellow-600";

            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-2xl flex items-center justify-center">
                  <Icon className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {metric.label}
                </h4>
                <p className={`text-xl font-medium mb-1 ${statusColor}`}>
                  {metric.value}
                </p>
                <p className={`text-xs font-medium capitalize ${statusColor}`}>
                  {metric.status}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
