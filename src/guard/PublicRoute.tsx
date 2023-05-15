'use client'
import React from 'react'
import withNotAuth from './withNotAuth'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export default withNotAuth(PublicRoute)
