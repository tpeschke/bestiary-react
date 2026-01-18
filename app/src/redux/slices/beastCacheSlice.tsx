import GMBeastClass from '../../pages/bestiary/beast/models/gmBeastClass/GMBeastClass'

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface sliceState {
  cache: BeastCache
}

interface BeastCache {
  [key: string]: BeastCacheObject
}

interface BeastCacheObject {
    id: number,
    beastInfo: Promise<GMBeastClass>
  }

const initialState: sliceState = {
  cache: {}
}

export const beastCacheSlice = createSlice({
  name: 'beastCacheSlice',
  initialState,
  reducers: {
    cacheMonster: (state: any, { payload }: PayloadAction<BeastCacheObject>) => {
      state.cache[`${payload.id}`] = payload
    },
    removeMonsterFromCache: (state: any, { payload }: PayloadAction<number>) => {
      delete state.cache[`${payload}`]
    }
  },
})

export const { cacheMonster, removeMonsterFromCache } = beastCacheSlice.actions

export default beastCacheSlice.reducer