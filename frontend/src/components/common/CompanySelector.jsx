import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import {
  Building,
  ChevronDown,
  CheckCircle,
  Loader,
  AlertCircle,
  ExternalLink,
  Settings,
} from "lucide-react";
import { useSage } from "../../hooks/useSage";

const CompanySelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isConnected,
    companies,
    activeCompany,
    switchCompany,
    isSwitchingCompany,
    redirectToSage,
    isLoadingAuthUrl,
  } = useSage();

  const handleCompanySwitch = async (companyId) => {
    if (companyId === activeCompany?.companyId) {
      setIsOpen(false);
      return;
    }

    const result = await switchCompany(companyId);
    if (result.success) {
      setIsOpen(false);
    }
  };

  const handleConnectSage = () => {
    redirectToSage();
  };

  if (!isConnected) {
    return (
      <div className="relative">
        <button
          onClick={handleConnectSage}
          disabled={isLoadingAuthUrl}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoadingAuthUrl ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <ExternalLink className="w-4 h-4" />
          )}
          <span>Connect Sage</span>
        </button>
      </div>
    );
  }

  if (!companies || companies.length === 0) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-500">
        <AlertCircle className="w-4 h-4" />
        <span>No companies</span>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitchingCompany}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
      >
        <div className="flex items-center space-x-2 flex-1">
          <Building className="w-4 h-4 text-emerald-600" />
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900 truncate">
              {activeCompany?.companyName || "Select Company"}
            </div>
            <div className="text-xs text-gray-500">
              {companies.length} company{companies.length !== 1 ? "ies" : ""}{" "}
              available
            </div>
          </div>
        </div>
        {isSwitchingCompany ? (
          <Loader className="w-4 h-4 animate-spin text-gray-400" />
        ) : (
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <div
              initial={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 animate-in slide-in-from-top-2 duration-200"
            >
              <div className="py-2">
                <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Select Company
                </div>

                <div className="max-h-64 overflow-y-auto">
                  {companies.map((company) => (
                    <button
                      key={company.companyId}
                      onClick={() => handleCompanySwitch(company.companyId)}
                      disabled={isSwitchingCompany}
                      className={`w-full flex items-center justify-between px-3 py-3 text-left hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        company.companyId === activeCompany?.companyId
                          ? "bg-emerald-50 border-l-2 border-l-emerald-500"
                          : ""
                      }`}
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">
                          {company.companyName}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {company.companyId}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              company.syncEnabled
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {company.syncEnabled ? "Sync On" : "Sync Off"}
                          </span>
                          {company.lastSyncAt && (
                            <span className="text-xs text-gray-500">
                              Last sync:{" "}
                              {new Date(
                                company.lastSyncAt
                              ).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {company.companyId === activeCompany?.companyId && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-gray-100 px-3 py-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      // You can add navigation to Sage settings page here
                    }}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Manage Integration</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CompanySelector;
