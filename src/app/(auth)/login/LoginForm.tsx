'use client'
import FormInput from '@/components/FormInput'
import { useLoginMutation } from '@/redux/auth/auth.service'
import { useAppSelector } from '@/redux/hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form'
import { AiOutlineLogin } from 'react-icons/ai'
import { MdOutlineAlternateEmail, MdLockOutline } from 'react-icons/md'
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
  const [login, { isLoading }] = useLoginMutation()
  const handleLogin: SubmitHandler<LoginInput> = async (value) => {
    await login(value).unwrap()
    router.push('/')
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
          <Link
            href="/register"
            className="label-text-alt link link-hover text-primary"
          >
            New to Chat? <b>Register</b>
          </Link>
        </label>
      </form>
    </FormProvider>
  )
}

export default LoginForm
