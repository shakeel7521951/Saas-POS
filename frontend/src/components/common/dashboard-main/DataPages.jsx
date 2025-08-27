import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { motion } from "framer-motion";
import { Search, Users, Package, Warehouse } from "lucide-react";

const SageTable = ({ columns, data, title, icon: Icon, searchPlaceholder }) => {
  const [globalFilter, setGlobalFilter] = useState("");

  // ✅ tanstack react-table setup
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <motion.div
      className="bg-white shadow-md rounded-2xl p-6 w-full h-full flex flex-col"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-[#405E98]" />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-9 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#405E98]/50 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium text-gray-600"
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-gray-700"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

/* ------------------ Pages ------------------ */

// Customers Page
export const CustomersPage = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Customer Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "company", header: "Company" },
      { accessorKey: "balance", header: "Balance" },
    ],
    []
  );

  const data = useMemo(
    () => [
      { name: "John Doe", email: "john@example.com", phone: "123-456-7890", company: "ABC Corp", balance: "$500" },
      { name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", company: "XYZ Ltd", balance: "$250" },
    ],
    []
  );

  return (
    <SageTable
      columns={columns}
      data={data}
      title="Customers"
      icon={Users}
      searchPlaceholder="Search by name or company..."
    />
  );
};

// Items Page
export const ItemsPage = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Item Name" },
      { accessorKey: "sku", header: "SKU" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "quantity", header: "Quantity in Stock" },
      { accessorKey: "warehouse", header: "Warehouse" },
    ],
    []
  );

  const data = useMemo(
    () => [
      { name: "Laptop", sku: "ITM-001", price: "$1200", quantity: 15, warehouse: "Central" },
      { name: "Printer", sku: "ITM-002", price: "$250", quantity: 30, warehouse: "East" },
    ],
    []
  );

  return (
    <SageTable
      columns={columns}
      data={data}
      title="Items"
      icon={Package}
      searchPlaceholder="Search by name or SKU..."
    />
  );
};

// Warehouses Page
export const WarehousesPage = () => {
  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Warehouse Name" },
      { accessorKey: "location", header: "Location" },
      { accessorKey: "totalItems", header: "Total Items" },
    ],
    []
  );

  const data = useMemo(
    () => [
      { name: "Central", location: "Karachi", totalItems: 300 },
      { name: "East", location: "Lahore", totalItems: 150 },
    ],
    []
  );

  return (
    <SageTable
      columns={columns}
      data={data}
      title="Warehouses"
      icon={Warehouse}
      searchPlaceholder="Search by location..."
    />
  );
};
