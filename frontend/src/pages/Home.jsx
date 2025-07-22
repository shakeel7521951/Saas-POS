import { Link } from "react-router-dom";
import { Store, BarChart3, Package, Users, Settings } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 text-center">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
            SaaS POS System
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Manage your business efficiently
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/pos"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Store size={18} />
            Open POS System
          </Link>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
              <div className="mb-2 flex justify-center text-blue-600">
                <BarChart3 size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                Analytics
              </div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
              <div className="mb-2 flex justify-center text-blue-600">
                <Package size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                Inventory
              </div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
              <div className="mb-2 flex justify-center text-blue-600">
                <Users size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                Customers
              </div>
            </div>
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
              <div className="mb-2 flex justify-center text-blue-600">
                <Settings size={24} className="sm:w-8 sm:h-8" />
              </div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">
                Settings
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
