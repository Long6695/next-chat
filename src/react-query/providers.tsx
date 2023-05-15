'use client'
import React from 'react'
import {
  QueryClientProvider,
  QueryClient,
  QueryCache,
  MutationCache,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { toast } from 'react-toastify'
import Toast from '@/utils/toast'
import { AuthContextProvider } from '@/context/authContext'
import { ThemeProvider } from 'next-themes'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: { queries: { retry: false } },
      queryCache: new QueryCache({
        onError: (error: any, query) => {
          // 🎉 only show error toasts if we already have data in the cache
          // which indicates a failed background update
          return toast.error(`${error.message}`)
        },
      }),
      mutationCache: new MutationCache({
        onError: (error: any, query) => {
          // 🎉 only show error toasts if we already have data in the cache
          // which indicates a failed background update
          return toast.error(`${error.message}`)
        },
      }),
    }),
  )

  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <ThemeProvider>
          <Toast />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default Providers
