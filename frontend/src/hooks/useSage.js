import { useCallback } from "react";
import {
  useConnectSageWithApiKeyMutation,
  useGetSageStatusQuery,
  useGetSageCompaniesQuery,
  useDisconnectSageMutation,
  useSwitchActiveCompanyMutation,
} from "../store/api/sageApi";

export const useSageConnection = () => {
  const [connectSage, { isLoading: isConnecting }] =
    useConnectSageWithApiKeyMutation();

  const handleConnect = useCallback(
    async (credentials) => {
      try {
        const result = await connectSage(credentials).unwrap();
        return { success: true, data: result };
      } catch (error) {
        throw new Error(error.data?.message || "Failed to connect to Sage");
      }
    },
    [connectSage]
  );

  return {
    connectToSage: handleConnect,
    isConnecting,
  };
};

export const useSageStatus = () => {
  const {
    data: statusResponse,
    isLoading,
    error,
    refetch,
  } = useGetSageStatusQuery();

  const status = statusResponse; // Since we removed transformResponse

  return {
    isConnected: status?.sageConnected || false,
    activeCompanyId: status?.activeCompanyId,
    activeCompany: status?.activeCompany,
    companiesCount: status?.companiesCount || 0,
    connectedAt: status?.connectedAt,
    // Add backward compatibility properties
    companyName: status?.activeCompany?.name,
    companyId: status?.activeCompanyId,
    connectionDate: status?.connectedAt,
    isLoading,
    error,
    refetch,
  };
};

export const useSageCompanies = () => {
  const {
    data: companiesResponse,
    isLoading,
    error,
    refetch,
  } = useGetSageCompaniesQuery();

  return {
    companies: companiesResponse?.companies || [],
    activeCompany: companiesResponse?.activeCompany,
    totalCompanies: companiesResponse?.totalCompanies || 0,
    isLoading,
    error,
    refetch,
  };
};

export const useSageActions = () => {
  const [disconnectSage, { isLoading: isDisconnecting }] =
    useDisconnectSageMutation();
  const [switchCompany, { isLoading: isSwitchingCompany }] =
    useSwitchActiveCompanyMutation();

  const handleDisconnect = useCallback(async () => {
    try {
      const result = await disconnectSage().unwrap();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || "Failed to disconnect from Sage",
      };
    }
  }, [disconnectSage]);

  const handleSwitchCompany = useCallback(
    async (companyId) => {
      try {
        const result = await switchCompany(companyId).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return {
          success: false,
          error: error.data?.message || "Failed to switch company",
        };
      }
    },
    [switchCompany]
  );

  return {
    disconnect: handleDisconnect,
    switchCompany: handleSwitchCompany,
    isDisconnecting,
    isSwitchingCompany,
  };
};

// Combined hook for convenience
export const useSage = () => {
  const connection = useSageConnection();
  const status = useSageStatus();
  const companies = useSageCompanies();
  const actions = useSageActions();

  return {
    ...connection,
    ...status,
    ...companies,
    ...actions,
  };
};
