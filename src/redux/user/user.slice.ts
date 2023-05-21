import { createSlice } from '@reduxjs/toolkit'
import { InitialState } from './user.type'

const initialState: InitialState = {
  user: null,
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    setUser: (state, { payload }) => {
      state.user = payload
    },
  },
})

export const { setUser, logout } = user.actions

export default user
