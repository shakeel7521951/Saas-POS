import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  PieChart,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Users,
  DollarSign,
  Activity,
  Building2,
  CreditCard,
  Database,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState("usage");
  const [dateRange, setDateRange] = useState("30");
  const [reportFormat, setReportFormat] = useState("pdf");

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  const reportTypes = [
    {
      id: "usage",
      name: "Usage Reports",
      description: "User activity and system utilization",
      icon: Activity,
      color: "blue",
    },
    {
      id: "financial",
      name: "Financial Reports",
      description: "Revenue, billing, and payment analytics",
      icon: DollarSign,
      color: "green",
    },
    {
      id: "analytics",
      name: "System Analytics",
      description: "Performance metrics and trends",
      icon: BarChart3,
      color: "purple",
    },
  ];

  const usageMetrics = [
    {
      title: "Active Users",
      value: "1,847",
      change: "+12.5%",
      trend: "up",
      period: "vs last month",
      data: [65, 70, 68, 75, 80, 85, 90],
    },
    {
      title: "Session Duration",
      value: "2h 45m",
      change: "+8.2%",
      trend: "up",
      period: "average",
      data: [120, 135, 140, 155, 165, 160, 165],
    },
    {
      title: "Feature Usage",
      value: "89.2%",
      change: "+5.1%",
      trend: "up",
      period: "adoption rate",
      data: [75, 78, 82, 85, 87, 88, 89],
    },
    {
      title: "Storage Used",
      value: "645 GB",
      change: "+15.3%",
      trend: "up",
      period: "total usage",
      data: [450, 480, 520, 560, 590, 620, 645],
    },
  ];

  const financialMetrics = [
    {
      title: "Monthly Revenue",
      value: "$84,250",
      change: "+23.5%",
      trend: "up",
      period: "vs last month",
      data: [65000, 68000, 72000, 75000, 78000, 81000, 84250],
    },
    {
      title: "ARPU",
      value: "$341",
      change: "+8.7%",
      trend: "up",
      period: "per user/month",
      data: [280, 295, 310, 320, 325, 335, 341],
    },
    {
      title: "Churn Rate",
      value: "2.3%",
      change: "-0.8%",
      trend: "down",
      period: "monthly",
      data: [3.5, 3.2, 2.9, 2.7, 2.5, 2.4, 2.3],
    },
    {
      title: "LTV",
      value: "$4,920",
      change: "+12.1%",
      trend: "up",
      period: "lifetime value",
      data: [4200, 4350, 4500, 4650, 4750, 4850, 4920],
    },
  ];

  const systemMetrics = [
    {
      title: "API Requests",
      value: "2.4M",
      change: "+18.2%",
      trend: "up",
      period: "this month",
      data: [1800, 1950, 2100, 2200, 2300, 2350, 2400],
    },
    {
      title: "Uptime",
      value: "99.98%",
      change: "+0.02%",
      trend: "up",
      period: "this month",
      data: [99.9, 99.92, 99.95, 99.97, 99.98, 99.98, 99.98],
    },
    {
      title: "Response Time",
      value: "145ms",
      change: "-12ms",
      trend: "down",
      period: "average",
      data: [180, 170, 165, 155, 150, 148, 145],
    },
    {
      title: "Error Rate",
      value: "0.02%",
      change: "-0.01%",
      trend: "down",
      period: "error rate",
      data: [0.05, 0.04, 0.03, 0.025, 0.022, 0.021, 0.02],
    },
  ];

  const getCurrentMetrics = () => {
    switch (selectedReport) {
      case "usage":
        return usageMetrics;
      case "financial":
        return financialMetrics;
      case "analytics":
        return systemMetrics;
      default:
        return usageMetrics;
    }
  };

  const companyBreakdown = [
    { name: "TechStart Solutions", users: 25, revenue: 299, growth: 15.2 },
    { name: "Metro Retail Group", users: 150, revenue: 1149, growth: 8.7 },
    { name: "Cafe Corner", users: 8, revenue: 99, growth: 22.1 },
    { name: "Fashion Hub Ltd", users: 35, revenue: 299, growth: -5.3 },
    { name: "Global Enterprises", users: 78, revenue: 1149, growth: 12.8 },
  ];

  const generateReport = () => {
    // Simulate report generation
    const reportName = `${
      reportTypes.find((r) => r.id === selectedReport)?.name
    }_${dateRange}days.${reportFormat}`;
    alert(`Generating ${reportName}...`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Reports & Analytics
          </h1>
          <p className="text-gray-600 font-normal">
            Generate detailed reports and analyze platform performance
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
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
          <button
            onClick={generateReport}
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: THEME.primary }}
          >
            <Download className="w-4 h-4" />
            <span className="text-xs font-normal">Export Report</span>
          </button>
        </div>
      </div>

      {/* Report Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          const isSelected = selectedReport === report.id;

          return (
            <motion.button
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedReport(report.id)}
              className={`p-6 rounded-2xl border-2 transition-all text-left ${
                isSelected
                  ? "border-emerald-200 bg-emerald-50"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    isSelected ? "bg-emerald-100" : "bg-gray-50"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      isSelected ? "text-emerald-600" : "text-gray-600"
                    }`}
                  />
                </div>
                <div>
                  <h3
                    className={`font-bold text-lg ${
                      isSelected ? "text-emerald-900" : "text-gray-900"
                    }`}
                  >
                    {report.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      isSelected ? "text-emerald-600" : "text-gray-600"
                    }`}
                  >
                    {report.description}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {reportTypes.find((r) => r.id === selectedReport)?.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Configure and generate detailed reports for the selected period
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={reportFormat}
              onChange={(e) => setReportFormat(e.target.value)}
              className="px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="pdf">PDF Report</option>
              <option value="excel">Excel Spreadsheet</option>
              <option value="csv">CSV Data</option>
              <option value="json">JSON Export</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getCurrentMetrics().map((metric, index) => {
          const TrendIcon =
            metric.trend === "up" ? ArrowUpRight : ArrowDownRight;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-medium text-gray-600">
                  {metric.title}
                </h3>
                <div
                  className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                    metric.trend === "up"
                      ? "text-green-700 bg-green-50"
                      : "text-red-700 bg-red-50"
                  }`}
                >
                  <TrendIcon className="w-3 h-3" />
                  <span>{metric.change}</span>
                </div>
              </div>
              <div className="text-2xl font-medium text-gray-900 mb-2">
                {metric.value}
              </div>
              <p className="text-xs text-gray-500 mb-4">{metric.period}</p>

              {/* Mini Chart */}
              <div className="h-12 flex items-end space-x-1">
                {metric.data.map((value, idx) => {
                  const maxValue = Math.max(...metric.data);
                  const height = (value / maxValue) * 100;
                  return (
                    <div
                      key={idx}
                      className="flex-1 bg-emerald-200 rounded-sm"
                      style={{ height: `${height}%` }}
                    />
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detailed Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Performance Trends
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Key metrics over time
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <BarChart3 className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <PieChart className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="h-64 bg-gray-50 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium">
                Interactive Chart Placeholder
              </p>
              <p className="text-sm text-gray-400">
                Chart data for{" "}
                {reportTypes.find((r) => r.id === selectedReport)?.name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Company Breakdown */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-2xl border border-gray-100 p-6"
        >
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">Top Companies</h2>
            <p className="text-sm text-gray-600 mt-1">Performance by company</p>
          </div>

          <div className="space-y-4">
            {companyBreakdown.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">
                      {company.name}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {company.users} users
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    ${company.revenue}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      company.growth > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {company.growth > 0 ? "+" : ""}
                    {company.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Report Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-2xl border border-gray-100 p-8"
      >
        <div className="text-center">
          <h2 className="text-lg font-medium text-gray-900 mb-2">
            Generate Detailed Report
          </h2>
          <p className="text-gray-600 mb-8">
            Create comprehensive reports with charts, tables, and insights
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">
                Visual Charts
              </h3>
              <p className="text-sm text-gray-600">
                Interactive graphs and visualizations
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Raw Data</h3>
              <p className="text-sm text-gray-600">
                Detailed tables and datasets
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Insights</h3>
              <p className="text-sm text-gray-600">
                AI-powered analysis and recommendations
              </p>
            </div>
          </div>

          <button
            onClick={generateReport}
            className="px-8 py-4 text-white rounded-xl hover:opacity-90 transition-opacity font-semibold text-lg"
            style={{ backgroundColor: THEME.primary }}
          >
            Generate {reportTypes.find((r) => r.id === selectedReport)?.name}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Reports;
