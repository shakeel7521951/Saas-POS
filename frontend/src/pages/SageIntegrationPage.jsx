import React from "react";
import { Shield, ArrowLeft, Building, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SageIntegration from "../components/common/SageIntegration";

const SageIntegrationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Sage Integration
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connect Your Sage Account
            </h2>
            <p className="text-gray-600 text-lg">
              Integrate with Sage to automatically sync your business data,
              manage multiple companies, and streamline your POS operations.
            </p>
          </div>

          <SageIntegration />

          {/* Features Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Secure Integration
              </h3>
              <p className="text-gray-600">
                OAuth 2.0 secure connection ensures your data is protected and
                access is controlled.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Multiple Companies
              </h3>
              <p className="text-gray-600">
                Manage multiple Sage companies from one dashboard and switch
                between them seamlessly.
              </p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Real-time Sync
              </h3>
              <p className="text-gray-600">
                Keep your POS and Sage data in sync with automatic background
                synchronization.
              </p>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Need Help?
            </h3>
            <p className="text-gray-600 mb-4">
              If you're having trouble connecting to Sage or need assistance
              with the integration, check out our documentation or contact
              support.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View Documentation
              </a>
              <span className="text-gray-300">•</span>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SageIntegrationPage;
