'use client'
import { useCookies } from 'react-cookie'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/authContext'
import Loading from '@/components/shares/Loading'
import { getMeFn } from '@/api/authApi'
import { AUTH_TYPE } from '@/constant/auth'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const withRequireUser = (Component: any) => {
  const WrappedComponent = (props: any) => {
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

    useEffect(() => {
      if (!(cookies.loggedIn || user)) {
        toast.error('Please login')
        router.push('/')
      }
    }, [user])

    const loading = isLoading || isFetching

    if (loading) {
      return <Loading />
    }

    return <Component {...props} />
  }

  return WrappedComponent
}

export default withRequireUser
