import React, { useEffect, useState } from "react";

import {motion} from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

import SageDashboard from "../components/common/dashboard-main/SageDashboard.jsx";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const HomePage = () => {
  const navigate = useNavigate();
  // loadingStep: 0 = not loading, 1 = checking connection, 2 = pulling data
  const [loadingStep, setLoadingStep] = useState(1);

  useEffect(() => {
    // Step 1: Checking connection (2.5s)
    const t1 = setTimeout(() => {
      setLoadingStep(2);
      // Step 2: Pulling data (2s)
      const t2 = setTimeout(() => setLoadingStep(0), 2000);
      return () => clearTimeout(t2);
    }, 2500);
    return () => clearTimeout(t1);
  }, []);

  // Sample data
  const analyticsData = {
    sales: {
      current: 12540,
      previous: 9820,
      change: 27.7,
      trend: "up",
    },
    revenue: {
      current: 85420,
      previous: 72350,
      change: 18.1,
      trend: "up",
    },
    customers: {
      current: 324,
      previous: 287,
      change: 12.9,
      trend: "up",
    },
    expenses: {
      current: 28750,
      previous: 31200,
      change: 7.8,
      trend: "down",
    },
  };

  const recentTransactions = [
    {
      id: 1,
      customer: "John Smith",
      amount: 125.5,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: 2,
      customer: "Sarah Johnson",
      amount: 89.99,
      date: "2023-06-15",
      status: "completed",
    },
    {
      id: 3,
      customer: "Michael Brown",
      amount: 245.75,
      date: "2023-06-14",
      status: "pending",
    },
    {
      id: 4,
      customer: "Emily Davis",
      amount: 62.3,
      date: "2023-06-14",
      status: "completed",
    },
    {
      id: 5,
      customer: "Robert Wilson",
      amount: 179.99,
      date: "2023-06-13",
      status: "completed",
    },
  ];

  // Chart data
  const salesTrendData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [6500, 5900, 8000, 8100, 9600, 12540],
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const revenueSourcesData = {
    labels: ["Electronics", "Clothing", "Home Goods", "Accessories"],
    datasets: [
      {
        data: [45, 25, 20, 10],
        backgroundColor: [
          "rgba(99, 102, 241, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(6, 182, 212, 0.7)",
          "rgba(245, 158, 11, 0.7)",
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(6, 182, 212, 1)",
          "rgba(245, 158, 11, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const weeklyPerformanceData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "This Week",
        data: [3200, 2900, 4100, 3800, 5200, 4500, 4800],
        borderColor: "rgba(59, 130, 246, 1)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Last Week",
        data: [2800, 3100, 3500, 2900, 3800, 4200, 3900],
        borderColor: "rgba(156, 163, 175, 1)",
        backgroundColor: "rgba(156, 163, 175, 0.1)",
        tension: 0.4,
        borderDash: [5, 5],
      },
    ],
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  if (loadingStep !== 0) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-white/60 backdrop-blur-md">
          <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-6 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-gray-200"
          >
            {/* Animated Loader Ring */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-[#00DC82]/30 border-t-[#00DC82] animate-spin"></div>
              <span className="absolute w-3 h-3 rounded-full bg-[#00DC82] animate-ping"></span>
            </div>

            {/* Status Text */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                {/*<Loader2 className="w-5 h-5 animate-spin text-[#00DC82]" />*/}
                {loadingStep === 1
                    ? "Checking Sage panel connection..."
                    : "Syncing companies, customers & items..."}
              </div>
              <p className="text-sm text-gray-500">
                Please wait, this may take a few seconds.
              </p>
            </div>
          </motion.div>
        </div>
    );
  }

  return (<>
        <SageDashboard/>
    </>
  );
};

export default HomePage;
