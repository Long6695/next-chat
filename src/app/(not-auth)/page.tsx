'use client'
import { getMeFn } from '@/api/authApi'
import Navbar from '@/components/navbar'
import Loading from '@/components/Loader'
import { AUTH_TYPE } from '@/constant/auth'
import { useAuthContext } from '@/context/authContext'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies] = useCookies(['loggedIn'])
  const authContext = useAuthContext()
  const { isLoading, isFetching } = useQuery(['authUser'], getMeFn, {
    enabled: !!cookies.loggedIn,
    select: (data) => data.data.user,
    onSuccess: (data) => {
      authContext.dispatch({ type: AUTH_TYPE.SET_USER, payload: data })
    },
  })

  if (!!cookies.loggedIn && (isLoading || isFetching)) {
    return <Loading />
  }

  return (
    <div>
      <Navbar isHomePage />
    </div>
  )
}

export default Home
