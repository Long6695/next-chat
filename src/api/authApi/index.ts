import { LoginInput } from '@/app/(not-auth)/login/page'
import { RegisterInput } from '@/app/(not-auth)/register/page'
import { GenericResponse, LoginOutputType, LoginResponse } from '@/types/auth'
import axios from 'axios'

const authApi = axios.create({
  baseURL: 'http://localhost:8000/api/v1/',
  withCredentials: true,
})
authApi.defaults.headers.common['Content-Type'] = 'application/json'

// Add a request interceptor
authApi.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
authApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    const errMessage = error.response.data.message as string
    if (
      (error?.response?.status === 401 ||
        errMessage.includes('not logged in')) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      await refreshAccessTokenFn()
      return authApi(originalRequest)
    }
    if (Array.isArray((error as any).response.data.error)) {
      ;(error as any).response.data.error.forEach((el: any) =>
        Promise.reject(el.message),
      )
    }
    return Promise.reject(error?.response?.data || error)
  },
)

export const signUpUserFn = async (user: RegisterInput) => {
  const response = await authApi.post<GenericResponse>('auth/register', user)
  return response.data
}

export const loginUserFn = async (user: LoginInput) => {
  const response = await authApi.post<LoginOutputType>('auth/login', user)
  return response.data
}

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verify-email/${verificationCode}`,
  )
  return response.data
}

export const logoutUserFn = async () => {
  const response = await authApi.get<GenericResponse>('auth/logout')
  return response.data
}

export const getMeFn = async () => {
  const response = await authApi.get('user/me')
  return response.data
}

export const refreshAccessTokenFn = async () => {
  const response = await authApi.get<LoginResponse>('auth/refresh-token')
  return response.data
}
