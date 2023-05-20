'use client'
import React from 'react'
import { getMeFn } from '@/api/authApi'
import { AUTH_TYPE } from '@/constant/auth'
import { useAuthContext } from '@/context/authContext'
import { useQuery } from '@tanstack/react-query'
import { redirect, useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [cookies] = useCookies(['loggedIn'])
  const router = useRouter()
  const stateContext = useAuthContext()
  const {
    isLoading,
    isFetching,
    data: user,
  } = useQuery(['authUser'], getMeFn, {
    enabled: !!cookies.loggedIn,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      stateContext.dispatch({ type: AUTH_TYPE.SET_USER, payload: data })
    },
  })
  if (!(cookies.loggedIn || user)) {
    toast.error('Please login')
    router.push('/')
  }

  return <>{children}</>
}

export default ProtectedRoute
