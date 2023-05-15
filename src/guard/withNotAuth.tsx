'use client'
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/navigation'

const withNotAuth = (Component: any) => {
  const WrappedComponent = (props: any) => {
    const [cookies] = useCookies(['loggedIn'])
    const router = useRouter()
    if (cookies['loggedIn']) {
      router.push('/')
      return null
    }

    return <Component {...props} />
  }

  return WrappedComponent
}

export default withNotAuth
