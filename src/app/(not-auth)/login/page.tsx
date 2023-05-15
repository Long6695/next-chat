'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { TypeOf, object, string } from 'zod'
import FormInput from '@/components/shares/FormInput'
import { getMeFn, loginUserFn } from '@/api/authApi'
import { useQuery, useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useAuthContext } from '@/context/authContext'
import { AUTH_TYPE } from '@/constant/auth'

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

const LoginPage = () => {
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

  // API Get Current Logged-in user
  const query = useQuery(['authUser'], getMeFn, {
    enabled: false,
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
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left basis-1/2">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="flex-1 card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleLogin)}>
                <FormInput name="email" label="Email Address" type="email" />
                <FormInput name="password" label="Password" type="password" />
                <button className="btn btn-primary w-full" type="submit">
                  {isLoading ? 'Loading...' : 'Sign In'}
                </button>
                <label className="label flex justify-end">
                  <a
                    className="label-text-alt link link-hover text-primary"
                    onClick={() => router.push('/register')}
                  >
                    Register a new account ?
                  </a>
                </label>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
