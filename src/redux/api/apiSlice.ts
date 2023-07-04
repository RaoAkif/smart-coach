import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://smart-coach-api.vercel.app/api',
    prepareHeaders: (headers) => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDb2FjaEluZm8iOnsiY29hY2hJZCI6MSwidXNlcm5hbWUiOiJjb2FjaDAxIn0sImlhdCI6MTY4ODQ1NDQ2NCwiZXhwIjoxNjg5MDU5MjY0fQ.yHASUXhNPMtM-9a7WeBxDuu5fW7_U17K18gVIdI7a2g';
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Player', 'Team', 'Event'],
  endpoints: () => ({}),
});
