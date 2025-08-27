import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Building2,
  Lock,
  Globe,
  Camera,
  Save,
  Edit3,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Activity,
  LogOut,
} from "lucide-react";

// SAGE THEME (matching other pages)
const THEME = {
  primary: "#007a5a",
  primaryDark: "#006249",
  panel: "#ffffff",
  panelAlt: "#f6f7f8",
  border: "#e5e7eb",
  text: "#111827",
  sub: "#6b7280",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
};

// UI PRIMITIVES
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const Badge = ({ tone = "gray", children }) => {
  const map = {
    green: "bg-green-50 text-green-700 border border-green-200",
    yellow: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    red: "bg-red-50 text-red-700 border border-red-200",
    gray: "bg-gray-100 text-gray-700 border border-gray-200",
    blue: "bg-blue-50 text-blue-700 border border-blue-200",
    emerald: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  };
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
};

const Button = ({ children, kind = "primary", className = "", ...rest }) => {
  const styles = {
    primary: "text-white hover:opacity-90 shadow-sm",
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-50 border border-gray-200",
    subtle: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg font-medium transition-all duration-200 ${styles[kind]} ${className}`}
      style={kind === "primary" ? { backgroundColor: THEME.primary } : {}}
      {...rest}
    >
      {children}
    </button>
  );
};

export default function MyAccountPage() {
  const [isEditing, setIsEditing] = useState(false);

  const accountData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    role: "Administrator",
    company: "Sage Co. Ltd",
    location: "New York, USA",
    joinDate: "March 2024",
    lastLogin: "Today at 2:30 PM",
    avatar: null,
  };

  const securitySettings = [
    {
      name: "Two-Factor Authentication",
      enabled: true,
      description: "Add extra security to your account",
    },
    {
      name: "Email Notifications",
      enabled: true,
      description: "Get notified about account activity",
    },
    {
      name: "Login Alerts",
      enabled: false,
      description: "Get alerts for new device logins",
    },
    {
      name: "Session Management",
      enabled: true,
      description: "Automatically log out inactive sessions",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">My Account</h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your profile, security settings, and preferences
            </p>
          </div>
          <div className="flex gap-3">
            <Button kind="ghost">
              <Activity className="w-4 h-4" />
              Activity Log
            </Button>
            <Button kind="danger">
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information - Enhanced */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Profile Information
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal details and preferences
              </p>
            </div>
            <Button
              kind={isEditing ? "ghost" : "primary"}
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Profile Avatar Section */}
          <div className="flex items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                {accountData.name}
              </h3>
              <p className="text-gray-600">{accountData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge tone="emerald">
                  <Shield className="w-3 h-3 mr-1" />
                  {accountData.role}
                </Badge>
                <Badge tone="blue">
                  <Building2 className="w-3 h-3 mr-1" />
                  {accountData.company}
                </Badge>
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "Full Name",
                value: accountData.name,
                icon: User,
                editable: true,
              },
              {
                label: "Email Address",
                value: accountData.email,
                icon: Mail,
                editable: true,
              },
              {
                label: "Phone Number",
                value: accountData.phone,
                icon: Phone,
                editable: true,
              },
              {
                label: "Location",
                value: accountData.location,
                icon: MapPin,
                editable: true,
              },
              {
                label: "Role",
                value: accountData.role,
                icon: Shield,
                editable: false,
              },
              {
                label: "Company",
                value: accountData.company,
                icon: Building2,
                editable: false,
              },
            ].map((field, idx) => {
              const IconComponent = field.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-gray-50 border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <IconComponent className="w-4 h-4 text-gray-500" />
                    <label className="text-sm font-medium text-gray-600">
                      {field.label}
                    </label>
                  </div>
                  {isEditing && field.editable ? (
                    <input
                      type="text"
                      defaultValue={field.value}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">{field.value}</p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Account Status & Quick Info */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Status
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-green-800">
                  Account Verified
                </span>
              </div>
              <p className="text-xs text-green-700">
                Your account is fully verified and active
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Member Since
                </span>
              </div>
              <p className="text-xs text-gray-600">{accountData.joinDate}</p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Last Login
                </span>
              </div>
              <p className="text-xs text-gray-600">{accountData.lastLogin}</p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Globe className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">
                  Session Active
                </span>
              </div>
              <p className="text-xs text-blue-700">
                3 active sessions across devices
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Security Settings - Enhanced */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Security & Privacy
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your account security and privacy settings
            </p>
          </div>
          <Button kind="ghost">
            <Settings className="w-4 h-4" />
            Advanced Settings
          </Button>
        </div>

        {/* Password Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-600 rounded-xl flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-amber-800">
                  Password Security
                </h3>
                <p className="text-sm text-amber-700">
                  Keep your account secure with a strong password
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Last updated: 2 weeks ago
                </p>
              </div>
            </div>
            <Button>
              <Lock className="w-4 h-4" />
              Update Password
            </Button>
          </div>
        </div>

        {/* Security Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securitySettings.map((setting, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-800">{setting.name}</h4>
                <div
                  className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                    setting.enabled ? "bg-emerald-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      setting.enabled ? "translate-x-6" : "translate-x-0.5"
                    }`}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">{setting.description}</p>
              <div className="mt-3">
                <Badge tone={setting.enabled ? "green" : "gray"}>
                  {setting.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
