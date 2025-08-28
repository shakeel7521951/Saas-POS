import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    headers.set("content-type", "application/json");
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const { logout } = await import("../slices/authSlice");
    api.dispatch(logout());
  }
  return result;
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Registration failed",
        errors: response.data?.errors || null,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Login failed",
        errors: response.data?.errors || null,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: (response) => response,
    }),

    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
      transformResponse: (response) => response.user,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Failed to get user",
      }),
    }),

    getMeDetailed: builder.query({
      query: () => "/auth/me-detailed",
      providesTags: ["User"],
      transformResponse: (response) => response.user,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Failed to get detailed user info",
      }),
    }),

    getAccountActivity: builder.query({
      query: () => "/auth/activity",
      transformResponse: (response) => response.activity,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Failed to get account activity",
      }),
    }),

    verifyToken: builder.query({
      query: () => "/auth/verify",
      transformResponse: (response) => response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Token verification failed",
      }),
    }),

    updateProfile: builder.mutation({
      query: (profileData) => ({
        url: "/auth/updateprofile",
        method: "PUT",
        body: profileData,
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response.user,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Profile update failed",
        errors: response.data?.errors || null,
      }),
    }),

    updatePassword: builder.mutation({
      query: (passwordData) => ({
        url: "/auth/updatepassword",
        method: "PUT",
        body: passwordData,
      }),
      transformResponse: (response) => response,
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.message || "Password update failed",
        errors: response.data?.errors || null,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetMeQuery,
  useGetMeDetailedQuery,
  useGetAccountActivityQuery,
  useVerifyTokenQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = authApi;
