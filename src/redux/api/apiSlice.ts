import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://smart-coach-api.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken")
      // console.log(token)
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Player', 'Team', 'Event'],
  endpoints: () => ({}),
});
