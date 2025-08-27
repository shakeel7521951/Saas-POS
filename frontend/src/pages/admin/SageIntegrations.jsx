import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Database,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Zap,
  Settings,
  Eye,
  Play,
  Pause,
  RotateCcw,
  Activity,
  TrendingUp,
  Users,
  Calendar,
  Search,
  Filter,
  Download,
  Upload,
} from "lucide-react";

const SageIntegrations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  // Sample integration data
  const integrations = [
    {
      id: 1,
      company: "TechStart Solutions",
      sageVersion: "Sage 50 Cloud",
      status: "connected",
      lastSync: "2024-03-15 14:30",
      nextSync: "2024-03-15 15:30",
      syncFrequency: "hourly",
      recordsSynced: 1250,
      errors: 0,
      dataTypes: ["Customers", "Products", "Invoices", "Payments"],
      apiKey: "sk_live_••••••••••••3456",
    },
    {
      id: 2,
      company: "Metro Retail Group",
      sageVersion: "Sage X3",
      status: "syncing",
      lastSync: "2024-03-15 14:15",
      nextSync: "2024-03-15 14:45",
      syncFrequency: "30min",
      recordsSynced: 5680,
      errors: 0,
      dataTypes: ["Customers", "Products", "Inventory", "Orders"],
      apiKey: "sk_live_••••••••••••7890",
    },
    {
      id: 3,
      company: "Cafe Corner",
      sageVersion: "Sage Business Cloud",
      status: "error",
      lastSync: "2024-03-15 12:00",
      nextSync: "2024-03-15 15:00",
      syncFrequency: "3hours",
      recordsSynced: 450,
      errors: 3,
      dataTypes: ["Products", "Sales"],
      apiKey: "sk_live_••••••••••••1234",
    },
    {
      id: 4,
      company: "Fashion Hub Ltd",
      sageVersion: "Sage 100",
      status: "disconnected",
      lastSync: "2024-03-10 09:15",
      nextSync: null,
      syncFrequency: "manual",
      recordsSynced: 0,
      errors: 0,
      dataTypes: [],
      apiKey: null,
    },
  ];

  const syncLogs = [
    {
      id: 1,
      company: "TechStart Solutions",
      operation: "Customer Sync",
      status: "success",
      records: 45,
      timestamp: "2024-03-15 14:30:15",
      duration: "2.3s",
      details: "45 customer records updated successfully",
    },
    {
      id: 2,
      company: "Metro Retail Group",
      operation: "Inventory Sync",
      status: "success",
      records: 234,
      timestamp: "2024-03-15 14:15:22",
      duration: "8.7s",
      details: "234 inventory items synchronized",
    },
    {
      id: 3,
      company: "Cafe Corner",
      operation: "Product Sync",
      status: "error",
      records: 0,
      timestamp: "2024-03-15 12:00:00",
      duration: "0.5s",
      details: "Authentication failed - invalid API key",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "connected":
        return "bg-green-100 text-green-700 border-green-200";
      case "syncing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "error":
        return "bg-red-100 text-red-700 border-red-200";
      case "disconnected":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4" />;
      case "syncing":
        return <RefreshCw className="w-4 h-4 animate-spin" />;
      case "error":
        return <XCircle className="w-4 h-4" />;
      case "disconnected":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getLogStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700";
      case "error":
        return "bg-red-100 text-red-700";
      case "warning":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch = integration.company
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || integration.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const connectedCount = integrations.filter(
    (i) => i.status === "connected"
  ).length;
  const errorCount = integrations.filter((i) => i.status === "error").length;
  const totalSynced = integrations.reduce((sum, i) => sum + i.recordsSynced, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Sage Integrations
          </h1>
          <p className="text-gray-600 font-normal">
            Monitor and manage Sage accounting integrations
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Sync All</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">
              Export Logs
            </span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: THEME.primary }}
          >
            <Settings className="w-4 h-4" />
            <span className="text-xs font-normal">API Settings</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Connected Integrations",
            value: connectedCount.toString(),
            change: "+2",
            icon: Database,
            color: "emerald",
          },
          {
            title: "Failed Syncs",
            value: errorCount.toString(),
            change: "-1",
            icon: XCircle,
            color: "red",
          },
          {
            title: "Records Synced",
            value: totalSynced.toLocaleString(),
            change: "+1.2k",
            icon: Activity,
            color: "blue",
          },
          {
            title: "Uptime",
            value: "99.8%",
            change: "+0.2%",
            icon: TrendingUp,
            color: "green",
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
                <span className="text-xs font-medium text-green-600">
                  +{stat.change}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs font-light text-gray-600">{stat.title}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-gray-100 p-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "overview"
                ? "text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor:
                activeTab === "overview" ? THEME.primary : "transparent",
            }}
          >
            <Database className="w-4 h-4" />
            <span>Integration Status</span>
          </button>
          <button
            onClick={() => setActiveTab("logs")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "logs"
                ? "text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor:
                activeTab === "logs" ? THEME.primary : "transparent",
            }}
          >
            <Activity className="w-4 h-4" />
            <span>Sync Logs</span>
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
              activeTab === "settings"
                ? "text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-50"
            }`}
            style={{
              backgroundColor:
                activeTab === "settings" ? THEME.primary : "transparent",
            }}
          >
            <Settings className="w-4 h-4" />
            <span>API Configuration</span>
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
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
                  <option value="connected">Connected</option>
                  <option value="syncing">Syncing</option>
                  <option value="error">Error</option>
                  <option value="disconnected">Disconnected</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  Showing {filteredIntegrations.length} of {integrations.length}{" "}
                  integrations
                </span>
              </div>
            </div>
          </div>

          {/* Integrations Table */}
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
                      Sage Version
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Last Sync
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Records
                    </th>
                    <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                      Data Types
                    </th>
                    <th className="text-right py-4 px-6 text-xs font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredIntegrations.map((integration, index) => (
                    <motion.tr
                      key={integration.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center">
                            <Database className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {integration.company}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Sync every {integration.syncFrequency}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs font-normal text-gray-900">
                          {integration.sageVersion}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                            integration.status
                          )}`}
                        >
                          {getStatusIcon(integration.status)}
                          <span className="capitalize">
                            {integration.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-900">
                          {integration.lastSync}
                        </div>
                        {integration.nextSync && (
                          <div className="text-xs text-gray-500">
                            Next: {integration.nextSync}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-xs font-medium text-gray-900">
                          {integration.recordsSynced.toLocaleString()}
                        </div>
                        {integration.errors > 0 && (
                          <div className="text-xs text-red-600">
                            {integration.errors} errors
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-wrap gap-1">
                          {integration.dataTypes
                            .slice(0, 2)
                            .map((type, idx) => (
                              <span
                                key={idx}
                                className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                              >
                                {type}
                              </span>
                            ))}
                          {integration.dataTypes.length > 2 && (
                            <span className="inline-flex px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                              +{integration.dataTypes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end space-x-2">
                          <button className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Settings className="w-4 h-4" />
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

      {activeTab === "logs" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">
              Sync Activity Log
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Recent synchronization operations and results
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Timestamp
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Company
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Operation
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Records
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Duration
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {syncLogs.map((log, index) => (
                  <tr
                    key={log.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {log.timestamp}
                    </td>
                    <td className="py-4 px-6 text-xs font-normal text-gray-900">
                      {log.company}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {log.operation}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${getLogStatusColor(
                          log.status
                        )}`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs font-normal text-gray-900">
                      {log.records}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">
                      {log.duration}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {activeTab === "settings" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-gray-100 p-8"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-6">
            API Configuration
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  Default Sync Frequency
                </label>
                <select className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option value="15min">Every 15 minutes</option>
                  <option value="30min">Every 30 minutes</option>
                  <option value="1hour">Every hour</option>
                  <option value="3hours">Every 3 hours</option>
                  <option value="daily">Daily</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  Timeout Settings
                </label>
                <input
                  type="number"
                  placeholder="60"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-1">Timeout in seconds</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  Retry Attempts
                </label>
                <input
                  type="number"
                  placeholder="3"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  Global API Endpoint
                </label>
                <input
                  type="url"
                  placeholder="https://api.sage.com/v1"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-900 mb-2">
                  Webhook URL
                </label>
                <input
                  type="url"
                  placeholder="https://yourapp.com/webhooks/sage"
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Enable Debug Logging
                  </h4>
                  <p className="text-sm text-gray-600">
                    Log detailed sync information
                  </p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium">
              Cancel
            </button>
            <button
              className="px-6 py-3 text-white rounded-xl hover:opacity-90 transition-opacity font-medium"
              style={{ backgroundColor: THEME.primary }}
            >
              Save Configuration
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SageIntegrations;
