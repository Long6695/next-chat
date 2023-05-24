'use client'
import Loader from '@/components/Loader'
import Navbar from '@/components/navbar'
import { useGetMeQuery } from '@/redux/user/user.service'
import React from 'react'
import { useCookies } from 'react-cookie'

const Home = () => {
  const [cookies] = useCookies(['loggedIn'])
  const { isLoading, isFetching } = useGetMeQuery(null, {
    skip: !cookies.loggedIn,
  })
  const loading = isLoading && isFetching
  if (loading) {
    return <Loader />
  }

  return (
    <div>
      <Navbar isNotRenderMenuIcon />
    </div>
  )
}

export default Home
