import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import POS from "./pages/POS";
import Sidebar from "./components/pos/Sidebar";
import ProductTabs from "./components/pos/ProductTabs";
import Category from "./pages/Category";
import Brands from "./pages/Brands";
import Warehouses from "./pages/Warehouses";
import Accounts from "./pages/Accounts";
import MoneyTransfer from "./pages/MoneyTransfer";
import BalanceSheet from "./pages/BalanceSheet";
import HomePage from "./pages/Homepage";
import Sales from "./pages/Sales";
import Users from "./pages/Users";
import Customers from "./pages/Customers";
import Suppliers from "./pages/Suppliers";
import POSTransaction from "./pages/POSTransaction";

const MainFunction = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden">
      <div className="w-full lg:w-64 flex-shrink-0 border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto bg-gray-50 p-4">
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
      { path: "/products", element: <ProductTabs /> },
      { path: "/categories", element: <Category /> },
      { path: "/brands", element: <Brands /> },
      { path: "/warehouses", element: <Warehouses /> },
      { path: "/accounting/accounts", element: <Accounts /> },
      { path: "/accounting/money-transfer", element: <MoneyTransfer /> },
      { path: "/accounting/balance-sheet", element: <BalanceSheet /> },
      { path: "/sales", element: <Sales /> },
      { path: "/users", element: <Users /> },
      { path: "/customers", element: <Customers /> },
      { path: "/suppliers", element: <Suppliers /> },
      { path: "/pos-transaction", element: <POSTransaction /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;