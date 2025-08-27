import React from "react";
import {
  Building2,
  Users,
  Package,
  Warehouse,
  CreditCard,
  Download,
  Crown,
  Shield,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

// SAGE THEME (matching TransactionPages)
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

// UTILITIES
const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const money = (n) => fmt.format(Number.isFinite(n) ? n : 0);

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

const ProgressBar = ({ value, max, color = THEME.primary }) => {
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500 ease-out"
        style={{
          width: `${percentage}%`,
          backgroundColor: percentage > 80 ? THEME.warning : color,
        }}
      />
    </div>
  );
};

export default function BillingSubscriptionPage() {
  const quotaData = [
    {
      name: "Companies",
      used: 3,
      limit: 5,
      icon: Building2,
      color: "text-blue-600",
    },
    {
      name: "Customers",
      used: 120,
      limit: 500,
      icon: Users,
      color: "text-green-600",
    },
    {
      name: "Items",
      used: 85,
      limit: 200,
      icon: Package,
      color: "text-purple-600",
    },
    {
      name: "Warehouses",
      used: 2,
      limit: 10,
      icon: Warehouse,
      color: "text-orange-600",
    },
  ];

  const paymentHistory = [
    {
      id: "#INV-1001",
      date: "Aug 15, 2025",
      amount: 29.99,
      status: "Paid",
      method: "Credit Card",
    },
    {
      id: "#INV-1002",
      date: "Sep 15, 2025",
      amount: 29.99,
      status: "Due",
      method: "Credit Card",
    },
    {
      id: "#INV-1003",
      date: "Jul 15, 2025",
      amount: 29.99,
      status: "Paid",
      method: "PayPal",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Page Header */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Billing & Subscription
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage your subscription, track usage, and view payment history
            </p>
          </div>
          <div className="flex gap-3">
            <Button kind="ghost">Download Invoice</Button>
            <Button>Manage Billing</Button>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Plan - Enhanced */}
        <Card className="lg:col-span-2 p-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Current Plan
              </h2>
              <p className="text-sm text-gray-500">
                Your active subscription details
              </p>
            </div>
            <Badge tone="green">Active</Badge>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-emerald-800">
                    Pro Plan
                  </h3>
                  <p className="text-emerald-600 font-medium">Billed Monthly</p>
                  <p className="text-sm text-emerald-700 mt-2">
                    Next billing: September 15, 2025
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-emerald-800">
                  {money(29.99)}
                </p>
                <p className="text-sm text-emerald-600">/month</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-1">Plan Features</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Up to 5 Companies</li>
                <li>✓ 500 Customers</li>
                <li>✓ 200 Items</li>
                <li>✓ Advanced Analytics</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <h4 className="font-medium text-gray-800 mb-1">Support</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Email Support</li>
                <li>✓ Phone Support</li>
                <li>✓ Priority Queue</li>
                <li>✓ Account Manager</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button>Upgrade Plan</Button>
            <Button kind="ghost">Change Plan</Button>
            <Button
              kind="ghost"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Cancel Subscription
            </Button>
          </div>
        </Card>

        {/* Account Summary */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Account Summary
          </h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">
                  Account Status
                </span>
              </div>
              <p className="text-xs text-gray-600">Active since March 2024</p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700">
                  Payment Method
                </span>
              </div>
              <p className="text-xs text-gray-600">•••• •••• •••• 1234</p>
            </div>

            <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700">
                  Total Spent
                </span>
              </div>
              <p className="text-lg font-bold text-gray-800">{money(179.94)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Quota Usage */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quota Usage
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Monitor your current usage against plan limits
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotaData.map((quota, idx) => {
            const percentage = (quota.used / quota.limit) * 100;
            const isNearLimit = percentage > 80;
            const IconComponent = quota.icon;

            return (
              <div
                key={idx}
                className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <IconComponent className={`w-5 h-5 ${quota.color}`} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {quota.name}
                    </span>
                  </div>
                  {isNearLimit && (
                    <Badge tone="yellow">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Near Limit
                    </Badge>
                  )}
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-800">
                      {quota.used}
                    </span>
                    <span className="text-sm text-gray-500">
                      / {quota.limit}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {(100 - percentage).toFixed(0)}% remaining
                  </p>
                </div>

                <ProgressBar value={quota.used} max={quota.limit} />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Enhanced Payment History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Payment History
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Your recent billing transactions
            </p>
          </div>
          <Button kind="ghost">View All</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Invoice
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Method
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentHistory.map((payment, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4">
                    <span className="font-mono text-sm text-gray-700">
                      {payment.id}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {payment.date}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-800">
                      {money(payment.amount)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {payment.method}
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      tone={payment.status === "Paid" ? "green" : "yellow"}
                    >
                      {payment.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <button className="inline-flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
