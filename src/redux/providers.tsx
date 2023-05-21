'use client'
import React from 'react'
import Toast from '@/utils/toast'
import { ThemeProvider } from 'next-themes'
import { Provider } from 'react-redux'
import { store } from './store'
import { CookiesProvider } from 'react-cookie'

function Providers({ children }: React.PropsWithChildren) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <ThemeProvider>
          <Toast />
          {children}
        </ThemeProvider>
      </CookiesProvider>
    </Provider>
  )
}

export default Providers
