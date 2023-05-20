import ProtectedRoute from '@/guard/ProtectedRoute'
import React from 'react'

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  )
}

export default SiteLayout
