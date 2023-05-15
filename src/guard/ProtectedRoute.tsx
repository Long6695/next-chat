'use client'
import React from 'react'
import withAuth from './withAuth'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default withAuth(ProtectedRoute)
