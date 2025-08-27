import React, { useState } from "react";
import {
    Bell,
    User,
    LogOut,
    CheckCircle,
    XCircle,
    ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const navigate = useNavigate();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [companyOpen, setCompanyOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState("ABC Motors");

    const companies = ["ABC Motors", "XYZ Traders", "Global Supplies", "Tech Hub"];

    const isConnected = true; // Replace with real connection state

    return (
        <div className="w-full bg-white border-b border-gray-200 px-4 py-3.5 flex items-center justify-between shadow-sm">
            {/* Company Selector */}
            <div className="relative">
                <button
                    onClick={() => setCompanyOpen((prev) => !prev)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition text-sm font-medium text-gray-700"
                >
                    <span>Company: {selectedCompany}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                </button>
                <AnimatePresence>
                    {companyOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                        >
                            <ul className="max-h-60 overflow-y-auto text-sm">
                                {companies.map((company) => (
                                    <li
                                        key={company}
                                        onClick={() => {
                                            setSelectedCompany(company);
                                            setCompanyOpen(false);
                                        }}
                                        className={`px-4 py-2 cursor-pointer hover:bg-gray-50 ${
                                            company === selectedCompany
                                                ? "bg-blue-50 text-blue-600 font-medium"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {company}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-4">
                {/* Connection Status */}
                <div
                    className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full ${
                        isConnected
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {isConnected ? (
                        <CheckCircle size={14} />
                    ) : (
                        <XCircle size={14} />
                    )}
                    <span>{isConnected ? "Connected" : "Disconnected"}</span>
                </div>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setNotifOpen((prev) => !prev)}
                        className="relative p-2 rounded-full hover:bg-gray-100 transition"
                    >
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <AnimatePresence>
                        {notifOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                            >
                                <div className="p-3 text-sm text-gray-700 font-medium border-b">
                                    Notifications
                                </div>
                                <ul className="max-h-60 overflow-y-auto text-sm">
                                    <li className="p-3 hover:bg-gray-50 cursor-pointer">
                                        🔔 Billing alert: Your subscription is due in 3 days
                                    </li>
                                    <li className="p-3 hover:bg-gray-50 cursor-pointer">
                                        ⚠️ Sync issue: Last sync failed
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                    <button
                        onClick={() => setUserMenuOpen((prev) => !prev)}
                        className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-gray-100 transition"
                    >
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                            <User size={18} />
                        </div>
                        <ChevronDown size={16} className="text-gray-500" />
                    </button>
                    <AnimatePresence>
                        {userMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                            >
                                <button
                                    onClick={() => navigate("/profile")}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                                >
                                    <User size={16} /> Profile
                                </button>
                                <button
                                    onClick={() => alert("Logging out…")}
                                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 text-sm text-gray-700"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
