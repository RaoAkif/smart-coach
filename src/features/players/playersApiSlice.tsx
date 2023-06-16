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
    addPlayer: builder.mutation({
      query: (player) => ({
        url: "/players",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: player,
      }),
    }),
  }),
});

export const {
  useGetPlayersQuery,
  useAddPlayerMutation
} = playersApiSlice;
