import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryFn,
} from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

interface TheUsers {
  _id: any;
  name: string;
  email: string;
  role: string;
}

export const apiUsers = createApi({
  reducerPath: "apiUsers",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL as string,
    prepareHeaders: async (headers) => {
      try {
        const token = `Bearer ${Cookies.get("access_token")}`;
        if (token) {
          headers.set("authorization", token);
        }
        return headers;
      } catch (error) {
        console.error("Error in prepareHeaders:", error);
        return headers;
      }
    },
  }),
  tagTypes: ["crud"],
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),
    getAllUsers: builder.query<TheUsers[], void>({
      query: (page: any = 1) => `users?page=${page}&limit=15`,
      providesTags: ["crud"],
    }),
    getOneUsers: builder.query({
      query: (id: string) => ({
        url: `users/${id}`,
      }),
      // invalidatesTags: ["crud"],
    }),
    addUsers: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["crud"],
    }),
    updateUsers: builder.mutation({
      query: (data) => ({
        url: `/users`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["crud"],
    }),
    deleteUsers: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["crud"],
    }),
  }),
}) as any;

export const {
  useGetAllUsersQuery,
  useAddUsersMutation,
  useDeleteUsersMutation,
  useRefreshTokenMutation,
  useGetOneUsersQuery,
  useUpdateUsersMutation,
} = apiUsers;
