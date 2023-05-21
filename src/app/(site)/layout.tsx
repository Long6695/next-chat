'use client'
import isAuth from '@/guard/isAuth'
import React from 'react'

const ProtectedLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>{children}</>
  )
}

export default isAuth(ProtectedLayout)