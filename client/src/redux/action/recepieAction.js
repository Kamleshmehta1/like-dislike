import { api } from '../apiInterceptor';

export const recepieApi = api.injectEndpoints({
  endpoints: (build) => ({
    getRecepie: build.query({
      query: (params) => ({
        url: '/recepie',
        method: 'GET',
        params,
      }),
      providesTags: ['getRecepie'],
    }),
    addRecepie: build.mutation({
      query: (body) => {
        return { url: '/recepie', method: 'POST', body };
      },
      invalidatesTags: ['getRecepie'],
    }),
    deleteRecepie: build.mutation({
      query: (body) => {
        return { url: '/recepie', method: 'DELETE', body };
      },
      invalidatesTags: ['getRecepie'],
    }),
    updateRecepie: build.mutation({
      query: (body) => {
        return { url: '/recepie', method: 'PUT', body };
      },
      invalidatesTags: ['getRecepie'],
    }),
    updateRecepieForLikes: build.mutation({
      query: (body) => {
        return { url: '/recepie/like', method: 'PUT', body };
      },
      invalidatesTags: ['getRecepie'],
    }),
    updateRecepieForDisLike: build.mutation({
      query: (body) => {
        return { url: '/recepie/unlike', method: 'PUT', body };
      },
      invalidatesTags: ['getRecepie'],
    }),
  }),
});
export const {
  useGetRecepieQuery,
  useAddRecepieMutation,
  useDeleteRecepieMutation,
  useUpdateRecepieMutation,
  useUpdateRecepieForLikesMutation,
  useUpdateRecepieForDisLikeMutation,
} = recepieApi;
