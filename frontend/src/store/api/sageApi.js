import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

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
    // Get Sage OAuth URL
    getSageAuthUrl: builder.query({
      query: () => ({
        url: "/auth-url",
        method: "GET",
      }),
      transformResponse: (response) => response,
      keepUnusedDataFor: 0, // Don't cache this query
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
      query: () => ({
        url: "/companies",
        method: "GET",
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

    // Refresh Sage token
    refreshSageToken: builder.mutation({
      query: () => ({
        url: "/refresh-token",
        method: "POST",
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["SageConnection"],
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
  useGetSageAuthUrlQuery,
  useGetSageStatusQuery,
  useGetSageCompaniesQuery,
  useDisconnectSageMutation,
  useRefreshSageTokenMutation,
  useSwitchActiveCompanyMutation,
} = sageApi;
