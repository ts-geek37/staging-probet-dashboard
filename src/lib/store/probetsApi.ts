import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const probetsApi = createApi({
  reducerPath: "probetsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
    credentials: "include",
  }),

  tagTypes: ["Leagues", "Matches", "Predictions", "Prices", "News"],

  endpoints: () => ({}),
});

export default probetsApi;
