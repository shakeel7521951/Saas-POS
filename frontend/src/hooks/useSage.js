import { useCallback } from "react";
import {
  useConnectSageWithApiKeyMutation,
  useGetSageStatusQuery,
  useGetSageCompaniesQuery,
  useDisconnectSageMutation,
  useSwitchActiveCompanyMutation,
  useGetSageItemsQuery,
  useGetSageCustomersQuery,
  useGetSageSalesMutation,
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

export const useSageItems = () => {
  const {
    data: itemsResponse,
    isLoading,
    error,
    refetch,
  } = useGetSageItemsQuery();

  return {
    items: itemsResponse?.items || [],
    totalItems: itemsResponse?.totalResults || 0,
    returnedItems: itemsResponse?.returnedResults || 0,
    itemsLoading: isLoading,
    itemsError: error,
    refetchItems: refetch,
  };
};

export const useSageCustomers = () => {
  const {
    data: customersResponse,
    isLoading,
    error,
    refetch,
  } = useGetSageCustomersQuery();

  return {
    customers: customersResponse?.customers || [],
    totalCustomers: customersResponse?.totalResults || 0,
    returnedCustomers: customersResponse?.returnedResults || 0,
    customersLoading: isLoading,
    customersError: error,
    refetchCustomers: refetch,
  };
};

export const useSageSales = () => {
  const [getSales, { data: salesResponse, isLoading, error }] =
    useGetSageSalesMutation();

  const fetchTodaysSales = useCallback(async () => {
    try {
      // Fetch today's sales (no date range = defaults to today)
      const result = await getSales({}).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error: error.data?.message || "Failed to fetch sales data",
      };
    }
  }, [getSales]);

  const fetchSalesForDateRange = useCallback(
    async (fromDate, toDate) => {
      try {
        const result = await getSales({
          FromDate: fromDate,
          ToDate: toDate,
        }).unwrap();
        return { success: true, data: result };
      } catch (error) {
        return {
          success: false,
          error: error.data?.message || "Failed to fetch sales data",
        };
      }
    },
    [getSales]
  );

  const fetchMonthlySales = useCallback(
    async (months = 6) => {
      try {
        const monthlyData = [];
        const currentDate = new Date();

        // Generate date ranges for the last 'months' months
        for (let i = months - 1; i >= 0; i--) {
          const startDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i,
            1
          );
          const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - i + 1,
            0
          );

          const fromDate = startDate.toISOString().split("T")[0];
          const toDate = endDate.toISOString().split("T")[0];

          const result = await getSales({
            FromDate: fromDate,
            ToDate: toDate,
          }).unwrap();

          monthlyData.push({
            month: startDate.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            }),
            monthNumber: startDate.getMonth() + 1,
            year: startDate.getFullYear(),
            sales: result?.totalSales || 0,
            itemsSold: result?.salesItems?.length || 0,
            fromDate,
            toDate,
          });
        }

        return { success: true, data: monthlyData };
      } catch (error) {
        return {
          success: false,
          error: error.data?.message || "Failed to fetch monthly sales data",
        };
      }
    },
    [getSales]
  );

  return {
    salesData: salesResponse,
    totalSales: salesResponse?.totalSales || 0,
    salesItems: salesResponse?.salesItems || [],
    salesLoading: isLoading,
    salesError: error,
    fetchTodaysSales,
    fetchSalesForDateRange,
    fetchMonthlySales,
  };
};

// Combined hook for convenience
export const useSage = () => {
  const connection = useSageConnection();
  const status = useSageStatus();
  const companies = useSageCompanies();
  const actions = useSageActions();
  const items = useSageItems();
  const customers = useSageCustomers();
  const sales = useSageSales();

  // Sync function to refresh all data
  const syncAll = useCallback(async () => {
    try {
      // Refetch all data in parallel
      await Promise.all([
        status.refetch(),
        companies.refetch(),
        items.refetchItems(),
        customers.refetchCustomers(),
        sales.fetchTodaysSales(),
      ]);
      return { success: true };
    } catch {
      return {
        success: false,
        error: "Failed to sync data",
      };
    }
  }, [status, companies, items, customers, sales]);

  return {
    ...connection,
    ...status,
    ...companies,
    ...actions,
    ...items,
    ...customers,
    ...sales,
    syncAll,
  };
};
