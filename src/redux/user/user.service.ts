import { createApi } from '@reduxjs/toolkit/query/react'
import customFetchBase from '../customFetchBase'
import { UserType } from './user.type'
import { setUser } from './user.slice'
import { endpoints } from '../endpoints'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customFetchBase,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getMe: builder.query<UserType, null>({
      query() {
        return {
          url: endpoints.getMe,
          credentials: 'include',
        }
      },
      transformResponse: (result: { data: { user: UserType } }) =>
        result.data.user,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          dispatch(setUser(data))
        } catch (error) {}
      },
    }),
  }),
})

export const {useGetMeQuery} = userApi