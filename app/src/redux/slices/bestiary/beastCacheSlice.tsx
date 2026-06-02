import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { BeastInfo } from '../../../pages/bestiary/beast/interfaces/viewInterfaces'

interface sliceState {
  cache: BeastCache
}

interface BeastCache {
  [key: string]: BeastCacheObject
}

interface BeastCacheObject {
    id: number,
    beastInfo: Promise<BeastInfo>
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