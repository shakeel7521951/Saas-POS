// App.js
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import POS from "./pages/POS";
import Sidebar from "./components/pos/Sidebar";
import ProductTabs from "./components/pos/ProductTabs";

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
      { path: "", element: <Home /> },
      { path: "/pos", element: <ProductTabs /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;