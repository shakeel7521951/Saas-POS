import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

export const sageApi = createApi({
  reducerPath: "sageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/sage`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["SageConnection", "SageCompanies"],
  endpoints: (builder) => ({
    // Connect Sage with Account Credentials
    connectSageWithApiKey: builder.mutation({
      query: (credentials) => ({
        url: "/connect",
        method: "POST",
        body: credentials, // { email, password, apiKey }
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["SageConnection", "SageCompanies"],
    }),

    // Get Sage connection status
    getSageStatus: builder.query({
      query: () => ({
        url: "/status",
        method: "GET",
      }),
      transformResponse: (response) => response,
      providesTags: ["SageConnection"],
    }),

    // Get Sage companies
    getSageCompanies: builder.query({
      query: (refresh = false) => ({
        url: "/companies",
        method: "GET",
        params: refresh ? { refresh: "true" } : {},
      }),
      transformResponse: (response) => response,
      providesTags: ["SageCompanies"],
    }),

    // Disconnect from Sage
    disconnectSage: builder.mutation({
      query: () => ({
        url: "/disconnect",
        method: "DELETE",
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["SageConnection", "SageCompanies"],
    }),

    // Switch active company
    switchActiveCompany: builder.mutation({
      query: (companyId) => ({
        url: "/switch-company",
        method: "POST",
        body: { companyId },
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["SageConnection", "SageCompanies"],
    }),
  }),
});

export const {
  useConnectSageWithApiKeyMutation,
  useGetSageStatusQuery,
  useGetSageCompaniesQuery,
  useDisconnectSageMutation,
  useSwitchActiveCompanyMutation,
} = sageApi;
