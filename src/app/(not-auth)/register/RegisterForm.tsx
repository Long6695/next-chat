'use client'
import { signUpUserFn } from '@/api/authApi'
import FormInput from '@/components/FormInput'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
import { toast } from 'react-toastify'
import { object, string, TypeOf } from 'zod'

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

const RegisterForm = () => {
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleRegistration)}>
        <FormInput
          name="name"
          type="text"
          placeholder="Your Name"
          Icon={AiOutlineUser}
        />
        <FormInput
          name="email"
          placeholder="Email ID"
          type="email"
          Icon={MdOutlineAlternateEmail}
        />
        <FormInput
          name="password"
          Icon={MdLockOutline}
          placeholder="Password"
          type="password"
        />
        <FormInput
          name="confirmPassword"
          Icon={MdLockOutline}
          placeholder="Confirm Password"
          type="password"
        />
        <button className="btn btn-primary w-full mt-5 gap-2" type="submit">
          <AiOutlineLogout size={20} />
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
        <label className="label flex justify-end">
          <a
            className="label-text-alt link link-hover text-primary"
            onClick={() => router.push('/login')}
          >
            Joined us before? <b>Sign in</b>
          </a>
        </label>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
