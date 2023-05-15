'use client'
import { UserType } from '@/types/user'
import { createContext, useContext, useReducer } from 'react'
import { AUTH_TYPE } from '@/constant/auth'

interface State {
  user: UserType | null
}

type Action = {
  type: string
  payload: UserType | null
}

type Dispatch = (action: Action) => void

type AuthContextProviderProps = { children: React.ReactNode }

const initialState: State = {
  user: null,
}

const AuthContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined)

const stateReducer = (state: State, action: Action) => {
  switch (action.type) {
    case AUTH_TYPE.SET_USER: {
      return {
        ...state,
        user: action.payload,
      }
    }
    default: {
      throw new Error(`Unhandled action type`)
    }
  }
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(stateReducer, initialState)
  const value = { state, dispatch }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (context) {
    return context
  }

  throw new Error(`useAuthContext must be used within a AuthContextProvider`)
}

export { AuthContextProvider, useAuthContext }
