import GMBeastClass from '../../pages/beast/models/gmBeastClass/GMBeastClass'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface sliceState {
  cache: beastCache
}

interface beastCache {
    [key: string]: GMBeastClass
} 

const initialState: sliceState = {
  cache: {}
}

export const beastCacheSlice = createSlice({
  name: 'beastCacheSlice',
  initialState,
  reducers: {
    cacheMonster: (state: any, {payload}: PayloadAction<GMBeastClass>) => {
      state.cache[`${payload.id}`] = payload
    },
    removeMonsterFromCache: (state: any, { payload }: PayloadAction<number>) => {
      delete state.cache[`${payload}`]
    }
  },
})

export const { cacheMonster, removeMonsterFromCache } = beastCacheSlice.actions

export default beastCacheSlice.reducer