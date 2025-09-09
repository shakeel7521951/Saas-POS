import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Key,
  CheckCircle,
  AlertCircle,
  Building,
  Calendar,
  Shield,
  Loader,
  Unlink,
} from "lucide-react";
import { useSage } from "../../hooks/useSage";
import SageCredentialsModal from "./SageCredentialsModal";

const SageIntegration = () => {
  const {
    isConnected,
    companyName,
    companyId,
    connectedAt,
    isLoading: isLoadingStatus,
    companies,
    isLoading: isLoadingCompanies,
    disconnect,
    isDisconnecting,
    refetch,
    connectToSage,
    isConnecting,
  } = useSage();

  const [showConfirmDisconnect, setShowConfirmDisconnect] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Auto-refresh status when component mounts
  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleConnect = () => {
    setIsApiKeyModalOpen(true);
  };

  const handleApiKeyConnect = async (apiKey) => {
    await connectToSage(apiKey);
    setIsApiKeyModalOpen(false);
  };

  const handleCloseApiKeyModal = () => {
    setIsApiKeyModalOpen(false);
  };

  const handleDisconnect = async () => {
    const result = await disconnect();
    if (result.success) {
      setShowConfirmDisconnect(false);
      refetch();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoadingStatus) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center space-x-3">
          <Loader className="w-6 h-6 animate-spin text-emerald-600" />
          <span className="text-gray-600">
            Loading Sage integration status...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Sage Integration
                </h3>
                <p className="text-sm text-gray-600">
                  Connect to your Sage account to sync data
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {isConnected ? (
                <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                  <AlertCircle className="w-4 h-4" />
                  <span>Not Connected</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {!isConnected ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Key className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  Connect to Sage
                </h4>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Enter your Sage API key to automatically sync your company
                  data and enable advanced features.
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConnect}
                  disabled={isConnecting}
                  className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConnecting ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4 mr-2" />
                      Connect with API Key
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Connection Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Company
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {companyName || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">
                    ID: {companyId || "N/A"}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">
                      Connected
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium">
                    {formatDate(connectedAt)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end pt-4 border-t border-gray-100">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowConfirmDisconnect(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  <Unlink className="w-4 h-4 mr-2" />
                  Disconnect
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Companies List */}
      {isConnected && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            Available Companies
          </h4>
          {isLoadingCompanies ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-emerald-600" />
              <span className="ml-2 text-gray-600">Loading companies...</span>
            </div>
          ) : companies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h5 className="font-medium text-gray-900">{company.name}</h5>
                  <p className="text-sm text-gray-600">ID: {company.id}</p>
                  {company.id === companyId && (
                    <span className="inline-block mt-2 px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                      Selected
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No companies found</p>
          )}
        </div>
      )}

      {/* Credentials Modal */}
      <SageCredentialsModal
        isOpen={isApiKeyModalOpen}
        onClose={handleCloseApiKeyModal}
        onConnect={handleApiKeyConnect}
        isLoading={isConnecting}
      />

      {/* Disconnect Confirmation Modal */}
      <AnimatePresence>
        {showConfirmDisconnect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowConfirmDisconnect(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Disconnect from Sage
                  </h3>
                  <p className="text-sm text-gray-600">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to disconnect from Sage? You'll lose
                access to synchronized data and will need to reconnect to
                restore the integration.
              </p>
              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmDisconnect(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleDisconnect}
                  disabled={isDisconnecting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDisconnecting ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Disconnecting...
                    </>
                  ) : (
                    "Disconnect"
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SageIntegration;
