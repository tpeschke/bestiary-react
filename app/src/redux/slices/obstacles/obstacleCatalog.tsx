import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { Challenge, Obstacle, ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'

interface InitialState {
    catalog: ObstacleTile[][],
    obstacleCache: {[key: number]: Obstacle},
    challengeCache: {[key: number]: Challenge}
}

const initialState: InitialState = {
    catalog: [],
    obstacleCache: {},
    challengeCache: {}
}

export const obstacleCatalogSlice = createSlice({
  name: 'ObstacleCatalog',
  initialState,
  reducers: {
    saveObstacleCatalog: (state: InitialState, action: PayloadAction<ObstacleTile[][]>) => {
      state.catalog = [...action.payload]
    },
    cacheObstacle: (state: InitialState, action: PayloadAction<Obstacle>) => {
      state.obstacleCache[action.payload.id] = action.payload
    },
    cacheChallenge: (state: InitialState, action: PayloadAction<Challenge>) => {
      state.challengeCache[action.payload.id] = action.payload
    },
  },
})

export const { saveObstacleCatalog, cacheObstacle, cacheChallenge } = obstacleCatalogSlice.actions

export default obstacleCatalogSlice.reducer