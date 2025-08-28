import { useCallback } from "react";
import {
  useGetSageAuthUrlQuery,
  useGetSageStatusQuery,
  useGetSageCompaniesQuery,
  useDisconnectSageMutation,
  useRefreshSageTokenMutation,
  useSwitchActiveCompanyMutation,
} from "../store/api/sageApi";

export const useSageAuth = () => {
  const {
    data: authResponse,
    isLoading: isLoadingAuthUrl,
    error: authUrlError,
  } = useGetSageAuthUrlQuery();

  const redirectToSage = useCallback(() => {
    console.log("redirectToSage called", { authResponse });
    if (authResponse?.authUrl) {
      console.log("Redirecting to:", authResponse.authUrl);
      window.location.href = authResponse.authUrl;
    } else {
      console.error("No authUrl available for redirect");
    }
  }, [authResponse]);

  return {
    authUrl: authResponse?.authUrl,
    isLoadingAuthUrl,
    authUrlError,
    redirectToSage,
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
    tokenExpiry: status?.tokenExpires,
    isTokenExpired: status?.isTokenExpired || false,
    // Add backward compatibility properties
    companyName: status?.activeCompany?.name,
    companyId: status?.activeCompanyId,
    connectionDate: status?.createdAt,
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
  const [refreshToken, { isLoading: isRefreshing }] =
    useRefreshSageTokenMutation();
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

  const handleRefreshToken = useCallback(async () => {
    try {
      const result = await refreshToken().unwrap();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || "Failed to refresh Sage token",
      };
    }
  }, [refreshToken]);

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
    refreshToken: handleRefreshToken,
    switchCompany: handleSwitchCompany,
    isDisconnecting,
    isRefreshing,
    isSwitchingCompany,
  };
};

// Combined hook for convenience
export const useSage = () => {
  const auth = useSageAuth();
  const status = useSageStatus();
  const companies = useSageCompanies();
  const actions = useSageActions();

  return {
    ...auth,
    ...status,
    ...companies,
    ...actions,
  };
};
