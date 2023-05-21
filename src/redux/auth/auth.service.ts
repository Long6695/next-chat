import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  LoginResponse,
  LoginType,
  RegisterResponse,
  RegisterType,
} from './auth.type'
import customFetchBase from '../customFetchBase'
import { userApi } from '../user/user.service'
import { endpoints } from '../endpoints'
import { logout } from '../user/user.slice'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: customFetchBase,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginType>({
      query: (body) => ({
        url: endpoints.login,
        method: 'POST',
        body,
        credentials: 'include'
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled
          await dispatch(userApi.endpoints.getMe.initiate(null))
        } catch (error) {}
      },
    }),
    register: builder.mutation<RegisterResponse, RegisterType>({
      query: (body) => ({
        url: endpoints.register,
        method: 'POST',
        body,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
          url: endpoints.logout,
          credentials: 'include',
      }),
      async onQueryStarted(arg, {dispatch, queryFulfilled}) {
          try {
            await queryFulfilled
            dispatch(logout())
          } catch (error) {

          }
      },
    })
  }),
})

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi
