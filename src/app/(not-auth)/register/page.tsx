'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { TypeOf, object, string } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import FormInput from '@/components/shares/FormInput'
import { signUpUserFn } from '@/api/authApi'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const registerSchema = object({
  name: string().min(1, 'Name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Passwords do not match',
})

export type RegisterInput = TypeOf<typeof registerSchema>

const RegisterPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods
  const router = useRouter()

  // ? Calling the Register Mutation
  const { mutate, isLoading } = useMutation(
    (userData: RegisterInput) => signUpUserFn(userData),
    {
      onSuccess(data) {
        toast.success(data?.message)
        router.push('/login')
        // router.push('/verify-email')
      },
    },
  )

  const handleRegistration: SubmitHandler<RegisterInput> = (value) => {
    mutate(value)
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
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="flex-1 card w-full shadow-2xl bg-base-100">
          <div className="card-body">
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(handleRegistration)}>
                <FormInput name="name" label="Full Name" />
                <FormInput name="email" label="Email Address" type="email" />
                <FormInput name="password" label="Password" type="password" />
                <FormInput
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                />
                <button className="btn btn-primary w-full" type="submit">
                  {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
                <label className="label flex justify-end">
                  <a
                    className="label-text-alt link link-hover text-primary"
                    onClick={() => router.push('/login')}
                  >
                    Have you got an account? Login now!
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

export default RegisterPage
