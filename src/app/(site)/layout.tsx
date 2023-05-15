import ProtectedRoute from '@/guard/ProtectedRoute'
import React, { Suspense } from 'react'
import SiteLoading from './loading'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      <Suspense fallback={<SiteLoading />}>{children}</Suspense>
    </ProtectedRoute>
  )
}

export default SiteLayout
