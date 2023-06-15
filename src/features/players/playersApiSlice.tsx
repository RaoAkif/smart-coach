import { apiSlice } from "../../redux/api/apiSlice";

export const playersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlayers: builder.query({
      query: (params) => ({
        url: '/players',
        method: 'GET',
        params,
      }),
    }),
  }),
});

export const {
  useGetPlayersQuery,
} = playersApiSlice;
