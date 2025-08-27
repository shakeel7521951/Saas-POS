import React, { useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { motion } from "framer-motion";
import { Search, Users, Package, Warehouse } from "lucide-react";

const SageTable = ({ columns, data, title, icon: Icon, searchPlaceholder }) => {
    const [globalFilter, setGlobalFilter] = useState("");

    const tableInstance = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 8 },
        },
        useGlobalFilter,
        usePagination
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        setGlobalFilter: setFilter,
    } = tableInstance;

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
                        value={globalFilter || ""}
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);
                            setFilter(e.target.value);
                        }}
                        className="pl-9 pr-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#405E98]/50 text-sm"
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table {...getTableProps()} className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                    {headerGroups.map((headerGroup, i) => (
                        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
                            {headerGroup.headers.map((column, j) => (
                                <th
                                    {...column.getHeaderProps()}
                                    key={j}
                                    className="px-4 py-3 text-left font-medium text-gray-600"
                                >
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className="divide-y divide-gray-100">
                    {page.length > 0 ? (
                        page.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr
                                    {...row.getRowProps()}
                                    key={i}
                                    className="hover:bg-gray-50 transition"
                                >
                                    {row.cells.map((cell, j) => (
                                        <td
                                            {...cell.getCellProps()}
                                            key={j}
                                            className="px-4 py-3 text-gray-700"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })
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
            { Header: "Customer Name", accessor: "name" },
            { Header: "Email", accessor: "email" },
            { Header: "Phone", accessor: "phone" },
            { Header: "Company", accessor: "company" },
            { Header: "Balance", accessor: "balance" },
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
            { Header: "Item Name", accessor: "name" },
            { Header: "SKU", accessor: "sku" },
            { Header: "Price", accessor: "price" },
            { Header: "Quantity in Stock", accessor: "quantity" },
            { Header: "Warehouse", accessor: "warehouse" },
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
            { Header: "Warehouse Name", accessor: "name" },
            { Header: "Location", accessor: "location" },
            { Header: "Total Items", accessor: "totalItems" },
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
