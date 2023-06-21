import { apiSlice } from "../../redux/api/apiSlice";

export const teamsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeams: builder.query({
      query: (params) => ({
        url: '/teams',
        method: 'GET',
        params,
      }),
    }),
    addTeam: builder.mutation({
      query: (team) => ({
        url: "/teams",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: team,
      }),
    }),
    editTeam: builder.mutation({
      query: ({ id, ...team }) => ({
        url: `/teams/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: team,
      }),
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/teams/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useAddTeamMutation,
  useEditTeamMutation,
  useDeleteTeamMutation
} = teamsApiSlice;
