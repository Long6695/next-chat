import { ROLE } from '@/types/roles'

export interface InitialState {
  user: UserType | null
}

export interface UserType {
  id: string
  name: string
  created_at: string
  updated_at: string
  role: ROLE
  email: string
  photo: string
}
