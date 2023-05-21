import { configureStore } from '@reduxjs/toolkit'
import auth from '@/redux/auth/auth.slice'
import { authApi } from './auth/auth.service'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import user from './user/user.slice'
import { userApi } from './user/user.service'

export const store = configureStore({
  reducer: {
    [auth.name]: auth.reducer,
    [user.name]: user.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
