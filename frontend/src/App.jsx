import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import "./hide-scrollbar.css";
import Login from "./pages/Login";
import ManagerLogin from "./pages/ManagerLogin";
import AdminLogin from "./pages/AdminLogin";
import Signup from "./pages/Signup";
import Sidebar from "./components/pos/Sidebar";
import HomePage from "./pages/Homepage";

import POSTransaction from "./pages/POSTransaction";
import { useEffect, useState } from "react";
import {
  OrdersPage,
  QuotationsPage,
  ReturnsPage,
  SalesInvoicesPage,
} from "./components/common/dashboard-main/TransactionPages.jsx";
import TopBar from "./components/common/dashboard-main/TopBar.jsx";
import {
  CustomersPage,
  ItemsPage,
  WarehousesPage,
} from "./components/common/dashboard-main/DataPages.jsx";
import MyAccountPage from "./components/common/dashboard-main/MyAccount.jsx";
import BillingSubscriptionPage from "./components/common/dashboard-main/BillingPage.jsx";

// Admin Components
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminTopBar from "./components/admin/AdminTopBar";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Companies from "./pages/admin/Companies";
import SubscriptionsPlans from "./pages/admin/SubscriptionsPlans";
import BillingPayments from "./pages/admin/BillingPayments";
import SageIntegrations from "./pages/admin/SageIntegrations";
import Reports from "./pages/admin/Reports";

const AdminFunction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Optional: Auto-close sidebar on mobile, open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 overflow-auto">
        <AdminTopBar toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
    </div>
  );
};

const MainFunction = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Optional: Auto-close sidebar on mobile, open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="w-full lg:w-64 flex-shrink-0 border-r border-gray-200">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex-1 overflow-auto bg-gray-50">
        <TopBar />
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <MainFunction />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "dashboard", element: <HomePage /> },
      { path: "/transactions/sales-invoices", element: <SalesInvoicesPage /> },
      { path: "/transactions/quotations", element: <QuotationsPage /> },
      { path: "/transactions/orders", element: <OrdersPage /> },
      { path: "/transactions/returns", element: <ReturnsPage /> },
      { path: "/data/customers", element: <CustomersPage /> },
      { path: "/data/warehouses", element: <WarehousesPage /> },
      { path: "/data/items", element: <ItemsPage /> },
      { path: "/account/my-account", element: <MyAccountPage /> },
      {
        path: "/account/billing-subscription",
        element: <BillingSubscriptionPage />,
      },
      { path: "/pos-transaction", element: <POSTransaction /> },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: <AdminFunction />,
    children: [
      { path: "", element: <AdminDashboard /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "companies", element: <Companies /> },
      { path: "subscriptions", element: <SubscriptionsPlans /> },
      { path: "subscriptions/plans", element: <SubscriptionsPlans /> },
      { path: "subscriptions/companies", element: <SubscriptionsPlans /> },
      { path: "billing", element: <BillingPayments /> },
      { path: "sage", element: <SageIntegrations /> },
      { path: "reports", element: <Reports /> },
    ],
  },

  { path: "/login", element: <Login /> },
  { path: "/manager/login", element: <ManagerLogin /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
