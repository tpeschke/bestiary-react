import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    isUserLoggedIn?: boolean,
    patreon?: number
}

const initialState: User = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<User>) => {
      const { isUserLoggedIn, patreon } = action.payload
      state.isUserLoggedIn = isUserLoggedIn
      state.patreon = patreon
    }
  },
})

export const { setUser } = userSlice.actions
export const isUserLoggedOn = (state: any): boolean => state.user.isUserLoggedIn
export const getUserPatreon = (state: any): number => state.user.patreon

export default userSlice.reducer