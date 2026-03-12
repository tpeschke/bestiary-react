import getAccessLevel, { Access } from '@bestiary/common/utilities/get/getAccessLevel'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface User {
  isUserLoggedIn?: boolean,
  patreon?: number,
  koFi?: number,
  isOwner?: boolean,
  system?: 0 | 1 | 2,
  infoHasBeenFetched: boolean
}

const initialState: User = {
  infoHasBeenFetched: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state: any, action: PayloadAction<User>) => {
      const { isUserLoggedIn, patreon, koFi, isOwner, system } = action.payload
      state.isUserLoggedIn = isUserLoggedIn
      state.patreon = patreon
      state.koFi = koFi
      state.isOwner = isOwner
      state.system = system
      state.infoHasBeenFetched = true
    },
    updateSystemPreference: (state: any, action: PayloadAction<0 | 1 | 2>) => {
      state.system = action.payload
    }
  },
})

export const { setUser, updateSystemPreference } = userSlice.actions
export const isUserLoggedOn = (state: any): boolean => state.user.isUserLoggedIn
export const getUserPatreon = (state: any): Access => getAccessLevel(state.user)
export const getSystemPreference = (state: any): number => state.user.system
export const isOwner = (state: any): boolean => state.user.isOwner
export const infoHasBeenFetched = (state: any): boolean => state.user.infoHasBeenFetched

export default userSlice.reducer