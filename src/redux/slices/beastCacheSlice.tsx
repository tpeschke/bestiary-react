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
    cacheMonster: (state: any, action: PayloadAction<GMBeastClass>) => {
      const { payload } = action
      state.cache[`${payload.id}`] = payload
    }
  },
})

export const { cacheMonster } = beastCacheSlice.actions

export default beastCacheSlice.reducer