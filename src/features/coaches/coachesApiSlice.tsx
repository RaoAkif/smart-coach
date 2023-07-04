import { apiSlice } from "../../redux/api/apiSlice";

export const coachesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoaches: builder.query({
      query: (params) => ({
        url: '/coaches',
        method: 'GET',
        params,
      }),
    }),
    addCoach: builder.mutation({
      query: (coach) => ({
        url: '/auth/coach/login',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: coach,
      }),
    }),
    registerCoach: builder.mutation({
      query: (coach) => ({
        url: '/coaches/register',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: coach,
      })
    }),
    editCoach: builder.mutation({
      query: ({ id, ...coach }) => ({
        url: `/coaches/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: coach,
      }),
    }),
    deleteCoach: builder.mutation({
      query: (id) => ({
        url: `/coaches/${id}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const {
  useGetCoachesQuery,
  useAddCoachMutation,
  useRegisterCoachMutation,
  useEditCoachMutation,
  useDeleteCoachMutation
} = coachesApiSlice;
