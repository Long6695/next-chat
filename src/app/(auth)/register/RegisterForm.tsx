'use client'
import FormInput from '@/components/FormInput'
import { useRegisterMutation } from '@/redux/auth/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { MdLockOutline, MdOutlineAlternateEmail } from 'react-icons/md'
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
  const [register, { isLoading }] = useRegisterMutation()

  const handleRegistration: SubmitHandler<RegisterInput> = (value) => {
    register(value)
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
          <Link
            href="/login"
            className="label-text-alt link link-hover text-primary"
          >
            Joined us before? <b>Sign in</b>
          </Link>
        </label>
      </form>
    </FormProvider>
  )
}

export default RegisterForm
