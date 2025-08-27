import React from "react";
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
    Warehouse,
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

/**
 * Sage-Style Dashboard
 * - Dummy data only (replace with live data later)
 * - Production-grade structure
 * - Recharts for charts, Framer Motion for micro-animations
 * - Tailwind for styling in a Sage-like palette
 * - Single-file, self-contained demo component
 */

// Utility formatters
const formatCurrency = (n) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
const formatNumber = (n) => new Intl.NumberFormat("en-US").format(n);
const formatDate = (iso) => new Date(iso).toLocaleDateString();

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

// Dummy data
const username = "Logic Town";
const connectedCompanies = [
    { id: 1, name: "Sage Demo Ltd." },
    { id: 2, name: "GreenLeaf Trading" },
];
const lastSyncTime = new Date(Date.now() - 1000 * 60 * 42).toISOString(); // 42 minutes ago

const stats = {
    companies: connectedCompanies.length,
    customers: 1280,
    items: 5460,
    warehouses: 7,
    todaySales: 18420,
    pendingInvoices: 14,
};

const salesTrend = [
    { month: "Jan", sales: 12000 },
    { month: "Feb", sales: 14500 },
    { month: "Mar", sales: 13800 },
    { month: "Apr", sales: 16000 },
    { month: "May", sales: 15200 },
    { month: "Jun", sales: 17500 },
    { month: "Jul", sales: 19000 },
    { month: "Aug", sales: 21000 },
    { month: "Sep", sales: 20500 },
    { month: "Oct", sales: 21800 },
    { month: "Nov", sales: 23000 },
    { month: "Dec", sales: 24500 },
];

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
        Paid: { bg: "bg-green-50", text: "text-green-700", icon: <CircleCheck className="h-4 w-4" /> },
        Pending: { bg: "bg-yellow-50", text: "text-yellow-700", icon: <CircleDashed className="h-4 w-4" /> },
        Cancelled: { bg: "bg-red-50", text: "text-red-700", icon: <CircleX className="h-4 w-4" /> },
    };
    const s = map[status] || map.Pending;
    return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      {s.icon}
            {status}
    </span>
    );
};

export default function SageDashboard() {
    return (
        <div className="min-h-screen" style={{ backgroundColor: COLORS.bg }}>
            <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
                {/* Welcome & Connection Info */}
                <Card className="p-5 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                Welcome, {username}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Connected to: {connectedCompanies.map((c) => c.name).join(", ")} · Last Sync: {formatDate(lastSyncTime)}
                            </p>
                        </div>
                        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white shadow transition-colors"
                                style={{ backgroundColor: COLORS.primary }}
                        >
                            <RefreshCw className="h-4 w-4" />
                            Sync Now
                        </button>
                    </div>
                </Card>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Create Invoice", icon: <FileText className="h-5 w-5" /> },
                        { label: "Create Quotation", icon: <FilePlus className="h-5 w-5" /> },
                        { label: "Create Order", icon: <ShoppingBag className="h-5 w-5" /> },
                        { label: "Process Return", icon: <RotateCcw className="h-5 w-5" /> },
                    ].map((a, i) => (
                        <motion.button
                            key={i}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100"
                        >
                            {a.icon}
                            <span className="text-sm font-medium text-gray-700">{a.label}</span>
                        </motion.button>
                    ))}
                </div>

                {/* Key Stats / Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 mb-8">
                    <MetricCard icon={<Building2 className="h-5 w-5" />} label="Total Companies" value={stats.companies} />
                    <MetricCard icon={<Users className="h-5 w-5" />} label="Total Customers" value={formatNumber(stats.customers)} />
                    <MetricCard icon={<Boxes className="h-5 w-5" />} label="Total Items" value={formatNumber(stats.items)} />
                    <MetricCard icon={<Warehouse className="h-5 w-5" />} label="Total Warehouses" value={formatNumber(stats.warehouses)} />
                    <MetricCard icon={<CreditCard className="h-5 w-5" />} label="Today’s Sales" value={formatCurrency(stats.todaySales)} accent />
                    <MetricCard icon={<FileText className="h-5 w-5" />} label="Pending Invoices" value={formatNumber(stats.pendingInvoices)} />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
                    {/* Sales Trend (Area) */}
                    <Card className="p-5 lg:col-span-2">
                        <SectionTitle title="Sales Trend" subtitle="Monthly performance metrics" right={
                            <div className="flex gap-2">
                                {['Month','Quarter','Year'].map((t) => (
                                    <button key={t} className="px-3 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">{t}</button>
                                ))}
                            </div>
                        } />
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesTrend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="salesColor" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={COLORS.primary} stopOpacity={0.35} />
                                            <stop offset="100%" stopColor={COLORS.primary} stopOpacity={0.05} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: COLORS.border }} />
                                    <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => (v >= 1000 ? `${v/1000}k` : v)} tickLine={false} axisLine={{ stroke: COLORS.border }} />
                                    <Tooltip formatter={(v) => [formatCurrency(v), "Sales"]} cursor={{ stroke: COLORS.primary, strokeOpacity: 0.15 }} />
                                    <Area type="monotone" dataKey="sales" stroke={COLORS.primary} fill="url(#salesColor)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Revenue Sources (Pie) */}
                    <Card className="p-5">
                        <SectionTitle title="Revenue Sources" subtitle="By document type" right={
                            <select className="text-sm border border-gray-200 rounded-lg px-3 py-1 bg-white">
                                <option>This Month</option>
                                <option>Last Month</option>
                            </select>
                        } />
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie data={revenueSources} dataKey="value" nameKey="name" innerRadius={55} outerRadius={95} paddingAngle={4}>
                                        {revenueSources.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={[COLORS.primary, COLORS.blue, "#14b8a6", "#94a3b8"][index % 4]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(v, n) => [`${v}%`, n]} />
                                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>

                {/* Weekly Performance (Line) */}
                <Card className="p-5 mb-8">
                    <SectionTitle title="Weekly Performance" subtitle="Comparison with previous week" right={
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100">Week</button>
                            <button className="px-3 py-1 text-sm rounded-lg border border-transparent text-gray-500 hover:bg-gray-50">Month</button>
                        </div>
                    } />
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weeklyPerformance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: COLORS.border }} />
                                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => (v >= 1000 ? `${v/1000}k` : v)} tickLine={false} axisLine={{ stroke: COLORS.border }} />
                                <Tooltip formatter={(v, n) => [formatCurrency(v), n === "current" ? "Current" : "Previous"]} />
                                <Legend wrapperStyle={{ fontSize: 12 }} />
                                <Line type="monotone" dataKey="current" stroke={COLORS.primary} strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="prev" stroke="#9ca3af" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* Recent Transactions */}
                <Card className="p-5 mb-8">
                    <SectionTitle title="Recent Activity / Transactions" right={
                        <button className="text-sm" style={{ color: COLORS.primary }}>View All</button>
                    } />
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
                                    <td className="py-3 font-medium">{formatCurrency(t.amount)}</td>
                                    <td className="py-3"><StatusPill status={t.status} /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Billing Reminder */}
                <Card className="p-5">
                    <SectionTitle title="Billing Reminder" subtitle="Your current plan & usage" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
                        <div>
                            <p className="text-sm text-gray-600">
                                Plan: <span className="font-medium">{plan.name}</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Customers: <span className="font-medium">{plan.usedCustomers}/{plan.maxCustomers}</span>
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                Companies: <span className="font-medium">{plan.usedCompanies}/{plan.maxCompanies}</span>
                            </p>
                        </div>
                        <div className="md:col-span-2">
                            {/* usage bars */}
                            <UsageBar label="Customers" used={plan.usedCustomers} max={plan.maxCustomers} />
                            <div className="h-3" />
                            <UsageBar label="Companies" used={plan.usedCompanies} max={plan.maxCompanies} />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-xs text-gray-500">Get more capacity and features on higher plans.</p>
                        <motion.button whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white shadow" style={{ backgroundColor: COLORS.primary }}>
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
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card className={`p-4 ${accent ? 'ring-1 ring-green-100' : ''}`}>
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <p className="text-xs font-medium text-gray-500">{label}</p>
                        <div className="text-2xl font-semibold text-gray-800 mt-1">{value}</div>
                    </div>
                    <div className="p-2 rounded-lg" style={{ backgroundColor: COLORS.teal50, color: COLORS.primary }}>
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
