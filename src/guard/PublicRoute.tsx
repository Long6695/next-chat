'use client'
import React from 'react'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(['loggedIn'])
  const router = useRouter()
  if (cookies['loggedIn']) {
    router.push('/')
  }
  return <>{children}</>
}

export default PublicRoute
