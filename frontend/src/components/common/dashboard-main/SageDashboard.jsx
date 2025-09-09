import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  FilePlus,
  ShoppingBag,
  RotateCcw,
  RefreshCw,
  Building2,
  Users,
  Boxes,
  CreditCard,
  TrendingUp,
  CircleCheck,
  CircleDashed,
  CircleX,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import { useAuth } from "../../../hooks/useAuth";
import { useSage } from "../../../hooks/useSage";

// Utility formatters
const formatCurrency = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n
  );
const formatNumber = (n) => new Intl.NumberFormat("en-US").format(n);
const formatDate = (iso) => {
  const date = new Date(iso);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Theme tokens (Sage-like)
const COLORS = {
  primary: "#007a5a", // Sage green
  primaryDark: "#006249",
  bg: "#f6f7f8", // soft panel background
  border: "#e5e7eb",
  text: "#111827",
  subtext: "#6b7280",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  blue: "#3b82f6",
  teal50: "#dff5ec",
};

// Dummy data (keeping only what's still used for other charts)
const revenueSources = [
  { name: "Invoices", value: 48 },
  { name: "Orders", value: 28 },
  { name: "Quotations", value: 14 },
  { name: "Returns", value: 10 },
];

const weeklyPerformance = [
  { day: "Mon", current: 2400, prev: 2000 },
  { day: "Tue", current: 2800, prev: 2400 },
  { day: "Wed", current: 2600, prev: 2200 },
  { day: "Thu", current: 3200, prev: 2700 },
  { day: "Fri", current: 3000, prev: 2900 },
  { day: "Sat", current: 2200, prev: 2100 },
  { day: "Sun", current: 1500, prev: 1600 },
];

const recentTransactions = [
  {
    id: 1001,
    type: "Invoice",
    customer: "Ayesha Traders",
    date: "2025-08-19",
    amount: 1240,
    status: "Paid",
  },
  {
    id: 1002,
    type: "Quotation",
    customer: "Hammad & Co.",
    date: "2025-08-19",
    amount: 980,
    status: "Pending",
  },
  {
    id: 1003,
    type: "Order",
    customer: "BlueSky Electronics",
    date: "2025-08-18",
    amount: 3420,
    status: "Paid",
  },
  {
    id: 1004,
    type: "Invoice",
    customer: "Sadaf Stores",
    date: "2025-08-18",
    amount: 760,
    status: "Cancelled",
  },
  {
    id: 1005,
    type: "Return",
    customer: "Noor Enterprises",
    date: "2025-08-17",
    amount: 210,
    status: "Pending",
  },
];

const plan = {
  name: "Growth",
  usedCustomers: 120,
  maxCustomers: 200,
  usedCompanies: 2,
  maxCompanies: 3,
};

// Tiny components
const Card = ({ children, className = "" }) => (
  <div
    className={
      "bg-white border border-gray-200 rounded-2xl shadow-sm " + className
    }
  >
    {children}
  </div>
);

const Shimmer = ({ className = "" }) => (
  <div
    className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded ${className}`}
    style={{
      backgroundImage:
        "linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)",
      animation: "shimmer 2s infinite",
    }}
  >
    <style jsx>{`
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
    `}</style>
  </div>
);

const MetricCardShimmer = () => (
  <Card className="p-4">
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1">
        <Shimmer className="h-3 w-20 mb-2" />
        <Shimmer className="h-8 w-16" />
      </div>
      <div className="p-2">
        <Shimmer className="w-10 h-10 rounded-lg" />
      </div>
    </div>
  </Card>
);

const SectionTitle = ({ title, subtitle, right }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
    {right}
  </div>
);

const StatusPill = ({ status }) => {
  const map = {
    Paid: {
      bg: "bg-green-50",
      text: "text-green-700",
      icon: <CircleCheck className="h-4 w-4" />,
    },
    Pending: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      icon: <CircleDashed className="h-4 w-4" />,
    },
    Cancelled: {
      bg: "bg-red-50",
      text: "text-red-700",
      icon: <CircleX className="h-4 w-4" />,
    },
  };
  const s = map[status] || map.Pending;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}
    >
      {s.icon}
      {status}
    </span>
  );
};

export default function SageDashboard() {
  // Get real data from hooks
  const { user } = useAuth();

  // Add syncing state
  const [isSyncing, setIsSyncing] = useState(false);
  const [monthlySalesData, setMonthlySalesData] = useState([]);
  const [salesTrendLoading, setSalesTrendLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const {
    isConnected,
    activeCompany,
    connectedAt,
    companies,
    totalItems,
    itemsLoading,
    totalCustomers,
    customersLoading,
    customers,
    totalSales,
    salesLoading,
    fetchTodaysSales,
    fetchMonthlySales,
    syncAll,
  } = useSage();

  // Fetch today's sales when connected
  useEffect(() => {
    if (isConnected && fetchTodaysSales) {
      fetchTodaysSales();
    }
  }, [isConnected, fetchTodaysSales]);

  // Fetch monthly sales trend when connected or period changes
  useEffect(() => {
    const loadMonthlySales = async () => {
      if (isConnected && fetchMonthlySales) {
        setSalesTrendLoading(true);
        try {
          const months =
            selectedPeriod === "3months"
              ? 3
              : selectedPeriod === "12months"
              ? 12
              : 6;
          const result = await fetchMonthlySales(months);
          if (result.success) {
            setMonthlySalesData(result.data);
          }
        } catch (error) {
          console.error("Failed to load monthly sales:", error);
        } finally {
          setSalesTrendLoading(false);
        }
      }
    };

    loadMonthlySales();
  }, [isConnected, fetchMonthlySales, selectedPeriod]);

  // Handle sync all data
  const handleSyncNow = async () => {
    if (isConnected && syncAll) {
      setIsSyncing(true);
      try {
        await syncAll();
        // Also refresh monthly sales data
        if (fetchMonthlySales) {
          setSalesTrendLoading(true);
          const months =
            selectedPeriod === "3months"
              ? 3
              : selectedPeriod === "12months"
              ? 12
              : 6;
          const result = await fetchMonthlySales(months);
          if (result.success) {
            setMonthlySalesData(result.data);
          }
          setSalesTrendLoading(false);
        }
      } catch (error) {
        console.error("Sync failed:", error);
        setSalesTrendLoading(false);
      } finally {
        setIsSyncing(false);
      }
    }
  };

  // Format the user's name for welcome message
  const getUserDisplayName = () => {
    if (!user) return "User";
    return (
      user.fullName ||
      `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
      user.email ||
      "User"
    );
  };

  // Get connected company names
  const getConnectedCompanies = () => {
    if (activeCompany) {
      return [activeCompany.companyName];
    }
    return companies?.map((c) => c.companyName) || [];
  };

  // Calculate total pending invoices from customer balances
  const calculatePendingInvoices = () => {
    if (
      !isConnected ||
      customersLoading ||
      !customers ||
      customers.length === 0
    ) {
      return 0;
    }
    return customers.reduce((total, customer) => {
      return total + (customer.balance || 0);
    }, 0);
  };

  // Get stats data
  const getStats = () => ({
    companies: companies?.length || 0,
    customers: isConnected && !customersLoading ? totalCustomers : 0, // Use real customers count from Sage
    items: isConnected && !itemsLoading ? totalItems : 0, // Use real items count from Sage
    todaySales: isConnected && !salesLoading ? totalSales : 0, // Use real sales from Sage
    pendingInvoices: calculatePendingInvoices(), // Use real customer balances
  });

  // Format last sync time
  const getLastSyncTime = () => {
    if (connectedAt) {
      return new Date(connectedAt).toISOString();
    }
    return new Date(Date.now() - 1000 * 60 * 42).toISOString(); // fallback
  };

  const stats = getStats();

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Welcome & Connection Info */}
        <Card className="p-5 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Welcome, {getUserDisplayName()}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeCompany ? (
                  <>
                    Connected to: {activeCompany.companyName} · Last Sync:{" "}
                    {formatDate(getLastSyncTime())}
                  </>
                ) : (
                  <>
                    {isConnected ? (
                      <>
                        Companies: {getConnectedCompanies().join(", ")} · Last
                        Sync: {formatDate(getLastSyncTime())}
                      </>
                    ) : (
                      "Not connected to Sage"
                    )}
                  </>
                )}
              </p>
            </div>
            <button
              onClick={handleSyncNow}
              disabled={isSyncing}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: COLORS.primary }}
            >
              <RefreshCw
                className={`h-4 w-4 ${isSyncing ? "animate-spin" : ""}`}
              />
              {isSyncing ? "Syncing..." : "Sync Now"}
            </button>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Create Invoice", icon: <FileText className="h-5 w-5" /> },
            {
              label: "Create Quotation",
              icon: <FilePlus className="h-5 w-5" />,
            },
            {
              label: "Create Order",
              icon: <ShoppingBag className="h-5 w-5" />,
            },
            {
              label: "Process Return",
              icon: <RotateCcw className="h-5 w-5" />,
            },
          ].map((a, i) => (
            <motion.button
              key={i}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100"
            >
              {a.icon}
              <span className="text-sm font-medium text-gray-700">
                {a.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Key Stats / Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-1 mb-8">
          <MetricCard
            icon={<Building2 className="h-5 w-5" />}
            label="Total Companies"
            value={stats.companies}
          />

          {/* Customers Metric with Shimmer */}
          {customersLoading ? (
            <MetricCardShimmer />
          ) : (
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              label="Total Customers"
              value={formatNumber(stats.customers)}
            />
          )}

          {/* Items Metric with Shimmer */}
          {itemsLoading ? (
            <MetricCardShimmer />
          ) : (
            <MetricCard
              icon={<Boxes className="h-5 w-5" />}
              label="Total Items"
              value={formatNumber(stats.items)}
            />
          )}

          {/* Today's Sales Metric with Shimmer */}
          {salesLoading ? (
            <MetricCardShimmer />
          ) : (
            <MetricCard
              icon={<CreditCard className="h-5 w-5" />}
              label="Today's Sales"
              value={formatCurrency(stats.todaySales)}
              accent
            />
          )}

          {/* Pending Invoices Metric with Shimmer */}
          {customersLoading ? (
            <MetricCardShimmer />
          ) : (
            <MetricCard
              icon={<FileText className="h-5 w-5" />}
              label="Pending Invoices"
              value={formatCurrency(stats.pendingInvoices)}
            />
          )}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {/* Sales Trend (Area) */}
          <Card className="p-5 lg:col-span-2">
            <SectionTitle
              title="Sales Trend"
              subtitle="Monthly performance metrics"
              right={
                <div className="flex gap-2">
                  {[
                    { label: "3M", value: "3months" },
                    { label: "6M", value: "6months" },
                    { label: "1Y", value: "12months" },
                  ].map((period) => (
                    <button
                      key={period.value}
                      onClick={() => setSelectedPeriod(period.value)}
                      className={`px-3 py-1 text-sm rounded-lg border transition-colors ${
                        selectedPeriod === period.value
                          ? "bg-green-50 border-green-200 text-green-700"
                          : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {period.label}
                    </button>
                  ))}
                </div>
              }
            />
            <div className="h-64">
              {salesTrendLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={monthlySalesData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="salesColor"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor={COLORS.primary}
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="100%"
                          stopColor={COLORS.primary}
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      tickLine={false}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                      tickLine={false}
                      axisLine={{ stroke: COLORS.border }}
                    />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-3">
                              <p className="font-medium text-gray-900 mb-1">
                                {label}
                              </p>
                              <p className="text-sm">
                                <span className="text-gray-600">Sales: </span>
                                <span
                                  className="font-medium"
                                  style={{ color: COLORS.primary }}
                                >
                                  {formatCurrency(payload[0].value)}
                                </span>
                              </p>
                              {payload[0].payload.itemsSold && (
                                <p className="text-sm">
                                  <span className="text-gray-600">
                                    Items Sold:{" "}
                                  </span>
                                  <span className="font-medium">
                                    {payload[0].payload.itemsSold}
                                  </span>
                                </p>
                              )}
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stroke={COLORS.primary}
                      fill="url(#salesColor)"
                      strokeWidth={2}
                      dot={{ fill: COLORS.primary, r: 4 }}
                      activeDot={{ r: 6, fill: COLORS.primary }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Revenue Sources (Pie) */}
          <Card className="p-5">
            <SectionTitle
              title="Revenue Sources"
              subtitle="By document type"
              right={
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                  <option>This Month</option>
                  <option>Last Month</option>
                </select>
              }
            />
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={revenueSources}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={95}
                    paddingAngle={4}
                  >
                    {revenueSources.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [COLORS.primary, COLORS.blue, "#14b8a6", "#94a3b8"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    wrapperStyle={{ fontSize: 12 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Weekly Performance (Line) */}
        <Card className="p-5 mb-8">
          <SectionTitle
            title="Weekly Performance"
            subtitle="Comparison with previous week"
            right={
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">
                  Week
                </button>
                <button className="px-3 py-1 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-50">
                  Month
                </button>
              </div>
            }
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={weeklyPerformance}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: COLORS.border }}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
                  tickLine={false}
                  axisLine={{ stroke: COLORS.border }}
                />
                <Tooltip
                  formatter={(v, n) => [
                    formatCurrency(v),
                    n === "current" ? "Current" : "Previous",
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke={COLORS.primary}
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="prev"
                  stroke="#9ca3af"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-5 mb-8">
          <SectionTitle
            title="Recent Activity / Transactions"
            right={
              <button className="text-sm" style={{ color: COLORS.primary }}>
                View All
              </button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b border-gray-200">
                  <th className="pb-2">#</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Date</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="py-3">#{String(t.id).padStart(4, "0")}</td>
                    <td className="py-3">{t.type}</td>
                    <td className="py-3">{t.customer}</td>
                    <td className="py-3">{formatDate(t.date)}</td>
                    <td className="py-3 font-medium">
                      {formatCurrency(t.amount)}
                    </td>
                    <td className="py-3">
                      <StatusPill status={t.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Billing Reminder */}
        <Card className="p-5">
          <SectionTitle
            title="Billing Reminder"
            subtitle="Your current plan & usage"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
            <div>
              <p className="text-sm text-gray-600">
                Plan: <span className="font-medium">{plan.name}</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Customers:{" "}
                <span className="font-medium">
                  {plan.usedCustomers}/{plan.maxCustomers}
                </span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Companies:{" "}
                <span className="font-medium">
                  {plan.usedCompanies}/{plan.maxCompanies}
                </span>
              </p>
            </div>
            <div className="md:col-span-2">
              {/* usage bars */}
              <UsageBar
                label="Customers"
                used={plan.usedCustomers}
                max={plan.maxCustomers}
              />
              <div className="h-3" />
              <UsageBar
                label="Companies"
                used={plan.usedCompanies}
                max={plan.maxCompanies}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Get more capacity and features on higher plans.
            </p>
            <motion.button
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow"
              style={{ backgroundColor: COLORS.primary }}
            >
              Upgrade Plan <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, accent }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`p-4 ${accent ? "ring-1 ring-green-100" : ""}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-gray-500">{label}</p>
            <div className="text-2xl font-semibold text-gray-800 mt-1">
              {value}
            </div>
          </div>
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: COLORS.teal50, color: COLORS.primary }}
          >
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function UsageBar({ label, used, max }) {
  const pct = Math.min(100, Math.round((used / max) * 100));
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-600 mb-1">
        <span>{label}</span>
        <span>
          {used}/{max} ({pct}%)
        </span>
      </div>
      <div className="w-full h-2 rounded-full bg-gray-100 border border-gray-200 overflow-hidden">
        <motion.div
          className="h-full"
          style={{ backgroundColor: COLORS.primary }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        />
      </div>
    </div>
  );
}
