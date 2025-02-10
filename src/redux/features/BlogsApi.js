import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../utils/getBaseUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            Headers.set("Authorization", `Bearer ${token}`);
        }
        return Headers;
    }
});

const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery,
    tagTypes: ['Post'], // Simplified to use single tag type
    endpoints: (builder) => ({
        fetchAllPosts: builder.query({
            query: () => '/posts',
            providesTags: (result) => 
                result
                    ? [
                        ...result.map(({ _id }) => ({ type: 'Post', id: _id })),
                        { type: 'Post', id: 'LIST' }
                      ]
                    : [{ type: 'Post', id: 'LIST' }]
        }),
        fetchPostById: builder.query({
            query: (id) => `/posts/${id}`,
            providesTags: (result, error, id) => [{ type: 'Post', id }]
        }),
        createPost: builder.mutation({
            query: (formData) => ({
                url: '/posts/create',
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Post', id },
                { type: 'Post', id: 'LIST' }
            ]
        }),
        addComment: builder.mutation({
            query: ({ postId, content, userId, authorName, userDisplayName }) => ({
              url: `/posts/${postId}/comments`,
              method: 'POST',
              body: { content, userId, authorName, userDisplayName },
            }),
            // Add error handling
            transformErrorResponse: (response) => {
              console.log('API Error Response:', response);
              return response;
            },
            invalidatesTags: (result, error, { postId }) => [
              { type: 'Post', id: postId },
              { type: 'Post', id: 'LIST' }
            ]
          }),
        getComments: builder.query({
            query: (postId) => `/posts/${postId}/comments`,
            providesTags: (result, error, postId) => [{ type: 'Post', id: postId }]
        }),
        addLike: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `/posts/${postId}/like`,
                method: 'POST',
                body: { userId },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: 'Post', id: postId },
                { type: 'Post', id: 'LIST' }
            ]
        }),
        removeLike: builder.mutation({
            query: ({ postId, userId }) => ({
                url: `/posts/${postId}/unlike`,
                method: 'DELETE',
                body: { userId },
                headers: { "Content-Type": "application/json" },
            }),
            invalidatesTags: (result, error, { postId }) => [
                { type: 'Post', id: postId },
                { type: 'Post', id: 'LIST' }
            ]
        }),
        getLikes: builder.query({
            query: (postId) => `/posts/${postId}/likes`,
            providesTags: (result, error, postId) => [{ type: 'Post', id: postId }]
        }),
    }),
});

export const {
    useFetchAllPostsQuery,
    useFetchPostByIdQuery,
    useCreatePostMutation,
    useAddCommentMutation,
    useGetCommentsQuery,
    useAddLikeMutation,
    useRemoveLikeMutation,
    useGetLikesQuery,
    useDeletePostMutation
} = postApi;

export default postApi;