import { createSlice } from '@reduxjs/toolkit'
import cacheUtilities from './beastCacheUtilities/cacheUtilities'
import { sliceState } from './beastCacheInterfaces'

const initialState: sliceState = {
  cache: {}
}

export const beastCacheSlice = createSlice({
  name: 'beastCacheSlice',
  initialState,
  reducers: {
    ...cacheUtilities
  },
})

export const { 
  cacheMonster, removeMonsterFromCache,
 } = beastCacheSlice.actions

export default beastCacheSlice.reducer