import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
    prepareHeaders(headers) {
      const token = `Bearer ${Cookies.get("access_token")}`;
      if (token) {
        headers.set("authorization", token);
      }
      return headers;
    },
  }),
  tagTypes: ["crud"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<TheUsers[], void>({
      query: () => "users",
      providesTags: ["crud"],
    }),
  }),
});

export const { useGetAllUsersQuery } = apiUsers;
