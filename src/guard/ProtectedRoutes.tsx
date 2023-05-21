'use client'
import isAuth from '@/guard/isAuth'
import React from 'react'

const ProtectedRoutes = ({children}: {children: React.ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default isAuth(ProtectedRoutes)