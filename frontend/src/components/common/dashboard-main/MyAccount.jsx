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
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  useGetMeDetailedQuery,
  useGetAccountActivityQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useLogoutMutation,
} from "../../../store/api/authApi";
import { useGetSageStatusQuery } from "../../../store/api/sageApi";
import { toast } from "react-hot-toast";

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
  const [formData, setFormData] = useState({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  // API Hooks
  const {
    data: userDetails,
    isLoading: userLoading,
    error: userError,
  } = useGetMeDetailedQuery();
  const { data: activityData, isLoading: activityLoading } =
    useGetAccountActivityQuery();
  const { data: sageStatus } = useGetSageStatusQuery();
  const [updateProfile, { isLoading: updateLoading }] =
    useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [logout] = useLogoutMutation();

  // Initialize form data when user data loads
  React.useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails.firstName || "",
        lastName: userDetails.lastName || "",
        email: userDetails.email || "",
        phone: userDetails.phone || "",
      });
    }
  }, [userDetails]);

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      await updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmNewPassword: passwordData.confirmNewPassword,
      }).unwrap();
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toast.success("Password updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update password");
    }
  };

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (userLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading account details...</p>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <Card className="p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Error Loading Account
          </h2>
          <p className="text-gray-600">
            Failed to load account details. Please try again.
          </p>
        </Card>
      </div>
    );
  }

  const accountData = userDetails || {};
  const activeCompany = accountData.activeCompany;

  const securitySettings = [
    // {
    //   name: "Two-Factor Authentication",
    //   enabled: true,
    //   description: "Add extra security to your account",
    // },
    // {
    //   name: "Email Notifications",
    //   enabled: true,
    //   description: "Get notified about account activity",
    // },
    // {
    //   name: "Login Alerts",
    //   enabled: false,
    //   description: "Get alerts for new device logins",
    // },
    // {
    //   name: "Session Management",
    //   enabled: true,
    //   description: "Automatically log out inactive sessions",
    // },
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
            {/* <Button kind="ghost">
              <Activity className="w-4 h-4" />
              Activity Log
            </Button> */}
            <Button kind="danger" onClick={handleLogout}>
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
              kind={isEditing ? "primary" : "ghost"}
              onClick={isEditing ? handleSave : () => setIsEditing(!isEditing)}
              disabled={updateLoading}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  {updateLoading ? "Saving..." : "Save Changes"}
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
                {accountData.fullName ||
                  `${accountData.firstName} ${accountData.lastName}`}
              </h3>
              <p className="text-gray-600">{accountData.email}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge tone="emerald">
                  <Shield className="w-3 h-3 mr-1" />
                  {accountData.role || "User"}
                </Badge>
                {activeCompany && (
                  <Badge tone="blue">
                    <Building2 className="w-3 h-3 mr-1" />
                    {activeCompany.companyName}
                  </Badge>
                )}
                {!activeCompany && accountData.sageConnected === false && (
                  <Badge tone="yellow">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    No Company Connected
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                label: "First Name",
                value: accountData.firstName,
                field: "firstName",
                icon: User,
                editable: true,
              },
              {
                label: "Last Name",
                value: accountData.lastName,
                field: "lastName",
                icon: User,
                editable: true,
              },
              {
                label: "Email Address",
                value: accountData.email,
                field: "email",
                icon: Mail,
                editable: true,
              },
              {
                label: "Phone Number",
                value: accountData.phone,
                field: "phone",
                icon: Phone,
                editable: true,
              },
              {
                label: "Role",
                value: accountData.role,
                icon: Shield,
                editable: false,
              },
              {
                label: "Active Company",
                value: activeCompany?.companyName || "No company connected",
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
                      value={formData[field.field] || ""}
                      onChange={(e) =>
                        handleInputChange(field.field, e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    />
                  ) : (
                    <p className="text-gray-800 font-medium">
                      {field.value || "Not set"}
                    </p>
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
            <div
              className={`p-4 rounded-lg border ${
                accountData.isEmailVerified
                  ? "bg-green-50 border-green-200"
                  : "bg-yellow-50 border-yellow-200"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    accountData.isEmailVerified
                      ? "bg-green-600"
                      : "bg-yellow-600"
                  }`}
                >
                  {accountData.isEmailVerified ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-white" />
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    accountData.isEmailVerified
                      ? "text-green-800"
                      : "text-yellow-800"
                  }`}
                >
                  {accountData.isEmailVerified
                    ? "Account Verified"
                    : "Email Not Verified"}
                </span>
              </div>
              <p
                className={`text-xs ${
                  accountData.isEmailVerified
                    ? "text-green-700"
                    : "text-yellow-700"
                }`}
              >
                {accountData.isEmailVerified
                  ? "Your account is fully verified and active"
                  : "Please verify your email address"}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Member Since
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {accountData.createdAt
                  ? new Date(accountData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "Unknown"}
              </p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Last Login
                </span>
              </div>
              <p className="text-xs text-gray-600">
                {accountData.lastLogin
                  ? new Date(accountData.lastLogin).toLocaleString()
                  : "Never"}
              </p>
            </div>

            {accountData.sageConnected && (
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">
                    Sage Connected
                  </span>
                </div>
                <p className="text-xs text-blue-700">
                  {accountData.sageCompanies?.length || 0} companies available
                </p>
              </div>
            )}
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
                  Last updated:{" "}
                  {accountData.updatedAt
                    ? new Date(accountData.updatedAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>
            </div>
            <Button onClick={() => setShowPasswordModal(true)}>
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

      {/* Password Update Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Update Password
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmNewPassword}
                  onChange={(e) =>
                    setPasswordData((prev) => ({
                      ...prev,
                      confirmNewPassword: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button
                kind="subtle"
                className="flex-1"
                onClick={() => {
                  setShowPasswordModal(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmNewPassword: "",
                  });
                }}
              >
                Cancel
              </Button>
              <Button
                kind="primary"
                className="flex-1"
                onClick={handlePasswordUpdate}
                disabled={
                  !passwordData.currentPassword ||
                  !passwordData.newPassword ||
                  !passwordData.confirmNewPassword
                }
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
