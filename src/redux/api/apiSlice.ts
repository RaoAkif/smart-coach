import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://smart-coach-api.vercel.app/api' }),
  tagTypes: ['Notes', 'User'],
  endpoints: (builder) => ({})
})
