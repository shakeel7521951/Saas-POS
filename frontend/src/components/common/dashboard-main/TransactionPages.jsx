import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

/**
 * Sage-Style Transactions Suite (Data Display Only)
 * - Display transaction data in tables
 * - Filter and search functionality
 * - Navigate to POS for creating new transactions
 */

// THEME (Sage-like)
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

// SMALL UI PRIMITIVES
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
  >
    {children}
  </div>
);
const Badge = ({ tone = "gray", children }) => {
  const map = {
    green: "bg-green-50 text-green-700",
    yellow: "bg-yellow-50 text-yellow-700",
    red: "bg-red-50 text-red-700",
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-50 text-blue-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
};
const Button = ({ children, kind = "primary", className = "", ...rest }) => {
  const styles = {
    primary: `bg-[${THEME.primary}] text-white hover:bg-[${THEME.primaryDark}]`,
    ghost:
      "bg-transparent text-gray-700 hover:bg-gray-50 border border-gray-200",
    subtle: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${styles[kind]} ${className}`}
      style={kind === "primary" ? { backgroundColor: THEME.primary } : {}}
      {...rest}
    >
      {children}
    </button>
  );
};

// GENERIC, ELEGANT DATA TABLE
function DataTable({ columns, data }) {
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 8,
      },
    },
  });

  return (
    <Card>
      <div className="p-4 pb-0 flex items-center justify-between gap-3">
        <input
          className="px-3 py-2 border border-gray-200 rounded-lg w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-emerald-200"
          placeholder="Search by customer, #, amount…"
          value={globalFilter || ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>
      <div className="overflow-auto mt-3">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-gray-50/90 backdrop-blur border-b border-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="text-left font-semibold text-gray-600 px-4 py-2 whitespace-nowrap"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-100">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount() || 1}
        </div>
        <div className="flex gap-2">
          <Button
            kind="ghost"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="disabled:opacity-50"
          >
            Prev
          </Button>
          <Button
            kind="ghost"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="disabled:opacity-50"
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}

// BASE PAGE LAYOUT
function TransactionPage({ title, columns, data, onNavigateToPOS }) {
  const [rows] = useState(data);

  const cols = useMemo(() => columns, [columns]);

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <Card className="p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              {title}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Filter and search transaction records. Use POS to create new
              transactions.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="date"
              className="px-3 py-2 border border-gray-200 rounded-lg"
            />
            <input
              type="date"
              className="px-3 py-2 border border-gray-200 rounded-lg"
            />
            <select className="px-3 py-2 border border-gray-200 rounded-lg text-gray-700">
              <option>All Status</option>
              <option>Pending</option>
              <option>Paid</option>
              <option>Approved</option>
              <option>Open</option>
              <option>Closed</option>
              <option>Cancelled</option>
            </select>
            <Button onClick={onNavigateToPOS}>
              <FaShoppingCart className="inline mr-1" /> POS
            </Button>
          </div>
        </div>
      </Card>

      {/* TABLE */}
      <DataTable columns={cols} data={rows} />
    </div>
  );
}

// PAGE CONFIGS
export function SalesInvoicesPage() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { header: "Invoice #", accessorKey: "id" },
      { header: "Customer", accessorKey: "customer" },
      { header: "Date", accessorKey: "date" },
      { header: "Amount", accessorKey: "amount" },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <Badge tone={getValue() === "Paid" ? "green" : "yellow"}>
            {getValue()}
          </Badge>
        ),
      },
    ],
    []
  );
  const data = [
    {
      id: "INV-001",
      customer: "Acme Corp",
      date: "2025-08-01",
      amount: money(1200),
      status: "Paid",
    },
    {
      id: "INV-002",
      customer: "GlobalTech",
      date: "2025-08-10",
      amount: money(800),
      status: "Pending",
    },
  ];

  const handleNavigateToPOS = () => {
    navigate("/pos-transaction");
  };

  return (
    <TransactionPage
      title="Sales Invoices"
      columns={columns}
      data={data}
      onNavigateToPOS={handleNavigateToPOS}
    />
  );
}

export function QuotationsPage() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { header: "Quotation #", accessorKey: "id" },
      { header: "Customer", accessorKey: "customer" },
      { header: "Date", accessorKey: "date" },
      { header: "Amount", accessorKey: "amount" },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <Badge tone={getValue() === "Approved" ? "green" : "yellow"}>
            {getValue()}
          </Badge>
        ),
      },
    ],
    []
  );
  const data = [
    {
      id: "Q-101",
      customer: "Innova Ltd",
      date: "2025-07-12",
      amount: money(500),
      status: "Pending",
    },
    {
      id: "Q-102",
      customer: "Acme Corp",
      date: "2025-07-18",
      amount: money(900),
      status: "Approved",
    },
  ];

  const handleNavigateToPOS = () => {
    navigate("/pos-transaction");
  };

  return (
    <TransactionPage
      title="Quotations"
      columns={columns}
      data={data}
      onNavigateToPOS={handleNavigateToPOS}
    />
  );
}

export function OrdersPage() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { header: "Order #", accessorKey: "id" },
      { header: "Customer", accessorKey: "customer" },
      { header: "Warehouse", accessorKey: "warehouse" },
      { header: "Date", accessorKey: "date" },
      { header: "Total", accessorKey: "total" },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <Badge tone={getValue() === "Closed" ? "green" : "blue"}>
            {getValue()}
          </Badge>
        ),
      },
    ],
    []
  );
  const data = [
    {
      id: "ORD-201",
      customer: "GlobalTech",
      warehouse: "Main Warehouse",
      date: "2025-08-05",
      total: money(1500),
      status: "Open",
    },
    {
      id: "ORD-202",
      customer: "Innova Ltd",
      warehouse: "Secondary Warehouse",
      date: "2025-08-09",
      total: money(700),
      status: "Closed",
    },
  ];

  const handleNavigateToPOS = () => {
    navigate("/pos-transaction");
  };

  return (
    <TransactionPage
      title="Orders"
      columns={columns}
      data={data}
      onNavigateToPOS={handleNavigateToPOS}
    />
  );
}

export function ReturnsPage() {
  const navigate = useNavigate();

  const columns = useMemo(
    () => [
      { header: "Return #", accessorKey: "id" },
      { header: "Invoice/Order", accessorKey: "ref" },
      { header: "Customer", accessorKey: "customer" },
      { header: "Date", accessorKey: "date" },
      { header: "Amount", accessorKey: "amount" },
    ],
    []
  );
  const data = [
    {
      id: "RET-001",
      ref: "INV-001",
      customer: "Acme Corp",
      date: "2025-08-12",
      amount: money(200),
    },
    {
      id: "RET-002",
      ref: "ORD-201",
      customer: "GlobalTech",
      date: "2025-08-15",
      amount: money(300),
    },
  ];

  const handleNavigateToPOS = () => {
    navigate("/pos-transaction");
  };

  return (
    <TransactionPage
      title="Returns"
      columns={columns}
      data={data}
      onNavigateToPOS={handleNavigateToPOS}
    />
  );
}