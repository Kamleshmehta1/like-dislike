import { api } from '../apiInterceptor';

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    signUp: build.mutation({
      query: (body) => {
        return { url: '/signup', method: 'POST', body };
      },
    }),
    signIn: build.mutation({
      query: (body) => {
        return { url: '/signin', method: 'POST', body };
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useProfileQuery } =
  authApi;
