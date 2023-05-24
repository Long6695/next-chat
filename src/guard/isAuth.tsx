import Loader from '@/components/Loader'
import { useGetMeQuery } from '@/redux/user/user.service'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { toast } from 'react-toastify'

function IsAuth<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const [cookies] = useCookies(['loggedIn'])
    const router = useRouter()
    // make a api call to check if user is authenticated
    const {
      data: user,
      isLoading,
      isFetching,
    } = useGetMeQuery(null, {
      skip: !cookies.loggedIn,
    })
    const loading = isLoading || isFetching

    useEffect(() => {
      if (!loading) {
        if (!cookies.loggedIn || !user) {
          toast.warn('Please login for using this feature!')
          router.replace('/')
        }
      }
    }, [])

    if (loading) {
      return <Loader />
    }

    if (cookies.loggedIn && user)
      return (
        <>
          <Component {...props!} />
        </>
      )
  }
}

export default IsAuth
