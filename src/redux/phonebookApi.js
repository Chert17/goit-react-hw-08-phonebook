import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { selectToken } from './authSelectors';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://connections-api.herokuapp.com',
  prepareHeaders: (headers, { getState }) => {
    const token = selectToken(getState());

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const phonebookApi = createApi({
  reducerPath: 'phonebookApi',
  baseQuery: baseQuery,
  tagTypes: ['Contacts'],
  endpoints: build => ({
    register: build.mutation({
      query: credentials => {
        return {
          url: 'users/signup',
          method: 'POST',
          body: credentials,
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    login: build.mutation({
      query: credentials => ({
        url: 'users/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Contacts'],
    }),
    logout: build.mutation({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
    refresh: build.query({
      query: () => ({
        url: 'users/current',
      }),
    }),
    getContacts: build.query({
      query: () => ({ url: 'contacts' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Contacts', id })),
        { type: 'Contacts', id: 'LIST' },
      ],
    }),
    addContact: build.mutation({
      query: contact => {
        return {
          url: 'contacts',
          method: 'POST',
          body: contact,
        };
      },
      invalidatesTags: (_result, error) =>
        error?.status === 401 ? [] : [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: build.mutation({
      query: contactId => ({
        url: `contacts/${contactId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, error, id) =>
        error?.status === 401 ? [] : [{ type: 'Contacts', id }],
    }),
    updateContact: build.mutation({
      query: ({ id, ...contact }) => ({
        url: `contacts/${id}`,
        method: 'PATCH',
        body: contact,
      }),
      invalidatesTags: (_result, error, { id }) =>
        error?.status === 401 ? [] : [{ type: 'Contacts', id }],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshQuery,
  useLazyRefreshQuery,
} = phonebookApi;

export const {
  endpoints: { register, login, logout, refresh },
} = phonebookApi;

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
} = phonebookApi;

export const {
  endpoints: { getContacts, addContact, deleteContact, updateContact },
} = phonebookApi;
