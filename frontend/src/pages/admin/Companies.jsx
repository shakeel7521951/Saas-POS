import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Users,
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit3,
  Trash2,
  Download,
  Upload,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Activity,
} from "lucide-react";

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const THEME = {
    primary: "#007a5a",
    primaryDark: "#006249",
    success: "#10b981",
  };

  // Sample data - replace with real API data
  const companies = [
    {
      id: 1,
      name: "TechStart Solutions",
      email: "admin@techstart.com",
      phone: "+1 (555) 123-4567",
      address: "123 Tech Street, SF, CA 94105",
      website: "www.techstart.com",
      plan: "Professional",
      status: "active",
      users: 25,
      storage: "15.2 GB",
      lastActivity: "2 hours ago",
      joinDate: "2024-01-15",
      monthlyRevenue: 299,
      avatar: "TS",
    },
    {
      id: 2,
      name: "Metro Retail Group",
      email: "it@metroretail.com",
      phone: "+1 (555) 987-6543",
      address: "456 Retail Ave, NY, NY 10001",
      website: "www.metroretail.com",
      plan: "Enterprise",
      status: "trial",
      users: 150,
      storage: "45.8 GB",
      lastActivity: "5 hours ago",
      joinDate: "2024-02-20",
      monthlyRevenue: 1149,
      avatar: "MR",
    },
    {
      id: 3,
      name: "Cafe Corner",
      email: "owner@cafecorner.com",
      phone: "+1 (555) 456-7890",
      address: "789 Main St, Austin, TX 78701",
      website: "www.cafecorner.com",
      plan: "Basic",
      status: "active",
      users: 8,
      storage: "2.1 GB",
      lastActivity: "1 day ago",
      joinDate: "2024-03-01",
      monthlyRevenue: 99,
      avatar: "CC",
    },
    {
      id: 4,
      name: "Fashion Hub Ltd",
      email: "admin@fashionhub.com",
      phone: "+1 (555) 234-5678",
      address: "321 Fashion Blvd, LA, CA 90210",
      website: "www.fashionhub.com",
      plan: "Professional",
      status: "suspended",
      users: 35,
      storage: "22.4 GB",
      lastActivity: "1 week ago",
      joinDate: "2024-01-08",
      monthlyRevenue: 299,
      avatar: "FH",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "trial":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "suspended":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
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
      case "suspended":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPlanColor = (plan) => {
    switch (plan) {
      case "Basic":
        return "bg-gray-100 text-gray-700";
      case "Professional":
        return "bg-emerald-100 text-emerald-700";
      case "Enterprise":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || company.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-medium text-gray-900 tracking-tight mb-2">
            Companies Management
          </h1>
          <p className="text-gray-600 font-normal">
            Manage all registered companies and their settings
          </p>
        </div>

        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Export</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 text-gray-600" />
            <span className="text-xs font-normal text-gray-700">Import</span>
          </button>
          <button
            className="flex items-center space-x-2 px-4 py-2 text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ backgroundColor: THEME.primary }}
          >
            <Plus className="w-4 h-4" />
            <span className="text-xs font-normal">Add Company</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Companies",
            value: "247",
            change: "+18",
            trend: "up",
            icon: Building2,
            color: "emerald",
          },
          {
            label: "Active Users",
            value: "1,847",
            change: "+156",
            trend: "up",
            icon: Users,
            color: "blue",
          },
          {
            label: "Monthly Revenue",
            value: "$84,250",
            change: "+23.5%",
            trend: "up",
            icon: CreditCard,
            color: "green",
          },
          {
            label: "Active Now",
            value: "89",
            change: "+12",
            trend: "up",
            icon: Activity,
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
                <span className="text-xs font-medium text-green-600">
                  +{stat.change}
                </span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {stat.value}
              </h3>
              <p className="text-xs font-light text-gray-600">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search companies..."
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
              <option value="active">Active</option>
              <option value="trial">Trial</option>
              <option value="suspended">Suspended</option>
              <option value="pending">Pending</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-gray-50 border-0 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Date</option>
              <option value="revenue">Sort by Revenue</option>
              <option value="users">Sort by Users</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Showing {filteredCompanies.length} of {companies.length} companies
            </span>
          </div>
        </div>
      </div>

      {/* Companies Table */}
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
                  Contact
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Plan
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Users
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Revenue
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-900">
                  Last Activity
                </th>
                <th className="text-right py-4 px-6 text-xs font-medium text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompanies.map((company, index) => (
                <motion.tr
                  key={company.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-sm">
                        {company.avatar}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {company.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {company.website}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {company.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {company.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-3 py-1 rounded-lg text-xs font-medium ${getPlanColor(
                        company.plan
                      )}`}
                    >
                      {company.plan}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                        company.status
                      )}`}
                    >
                      {getStatusIcon(company.status)}
                      <span className="capitalize">{company.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-900 font-medium">
                      {company.users} users
                    </div>
                    <div className="text-xs text-gray-500">
                      {company.storage} storage
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-xs font-medium text-gray-900">
                      ${company.monthlyRevenue}/mo
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm text-gray-600">
                      {company.lastActivity}
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
                      <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
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

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing 1 to {filteredCompanies.length} of {companies.length}{" "}
              entries
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Previous
              </button>
              <button
                className="px-3 py-2 text-sm text-white rounded-lg"
                style={{ backgroundColor: THEME.primary }}
              >
                1
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                2
              </button>
              <button className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Companies;
