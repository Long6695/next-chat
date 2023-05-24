import { UserType } from '@/types/user'

export interface InitialState {
  accessToken: string | null
}

export interface LoginType {
  email: string
  password: string
}

export interface LoginResponse {
  status: string
  accessToken: string
}

export interface RegisterType {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface RegisterResponse extends UserType {}
