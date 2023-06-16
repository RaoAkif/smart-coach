import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://smart-coach-api.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2FjaEluZm8iOnsiY29hY2hJZCI6MX0sImlhdCI6MTY4NjgxMTM3OCwiZXhwIjoxNjg3NDE2MTc4fQ.8erhupn7NVfkJtwzd26P87ZfopyA1jtsgviCSrbTjrw';
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Player', 'Team', 'Event'],
  endpoints: () => ({}),
});
