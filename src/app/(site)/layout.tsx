'use client'
import Navbar from '@/components/navbar'
import isAuth from '@/guard/isAuth'
import React from 'react'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar isNotRenderMenuIcon />
      {children}
    </>
  )
}

export default isAuth(ProtectedLayout)
