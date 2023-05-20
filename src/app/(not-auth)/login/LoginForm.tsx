'use client'
import { getMeFn, loginUserFn } from '@/api/authApi'
import FormInput from '@/components/FormInput'
import { AUTH_TYPE } from '@/constant/auth'
import { useAuthContext } from '@/context/authContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { AiOutlineLogin } from 'react-icons/ai'
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md'
import { toast } from 'react-toastify'
import { object, string, TypeOf } from 'zod'

const loginSchema = object({
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})
export type LoginInput = TypeOf<typeof loginSchema>

const LoginForm = () => {
  const router = useRouter()
  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods
  const authContext = useAuthContext()
  const [cookies] = useCookies(['loggedIn'])

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: !!cookies.loggedIn,
    select: (data) => data.data.user,
    retry: 1,
    onSuccess: (data) => {
      authContext.dispatch({ type: AUTH_TYPE.SET_USER, payload: data })
    },
  })

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: () => {
        query.refetch()
        toast.success('You successfully logged in')
        router.push('/')
      },
    },
  )

  const handleLogin: SubmitHandler<LoginInput> = (value) => {
    loginUser(value)
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <FormInput
          Icon={MdOutlineAlternateEmail}
          name="email"
          type="email"
          placeholder="Email ID"
        />
        <FormInput
          Icon={MdLockOutline}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button className="btn btn-primary w-full mt-5 gap-2" type="submit">
          <AiOutlineLogin size={20} />
          {isLoading ? 'Loading...' : 'Sign In'}
        </button>
        <label className="label flex justify-end">
          <a
            className="label-text-alt link link-hover text-primary"
            onClick={() => router.push('/register')}
          >
            New to Chat? <b>Register</b>
          </a>
        </label>
      </form>
    </FormProvider>
  )
}

export default LoginForm
