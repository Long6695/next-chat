import PublicRoute from '@/guard/PublicRoute'
import React, { Suspense } from 'react'
import AuthLoading from './loading'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <PublicRoute>
      <Suspense fallback={<AuthLoading />}>{children}</Suspense>
    </PublicRoute>
  )
}

export default AuthLayout
