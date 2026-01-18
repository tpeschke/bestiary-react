import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { ObstacleTile } from '@bestiary/common/interfaces/obstacles/obstacleCatalog'

interface InitialState {
    catalog: ObstacleTile[][]
}

const initialState: InitialState = {
    catalog: []
}

export const obstacleCatalogSlice = createSlice({
  name: 'ObstacleCatalog',
  initialState,
  reducers: {
    saveObstacleCatalog: (state: InitialState, action: PayloadAction<ObstacleTile[][]>) => {
      state.catalog = [...action.payload]
    }
  },
})

export const { saveObstacleCatalog } = obstacleCatalogSlice.actions

export default obstacleCatalogSlice.reducer