import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
    isLoggedIn?: boolean
}

const initialState: User = {}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<User>) => {
      const { isLoggedIn } = action.payload
      state.isLoggedIn = isLoggedIn
    }
  },
})

export const { setUser } = userSlice.actions
export const isUserLoggedOn = (state: any): boolean => state.user.isLoggedIn

export default userSlice.reducer