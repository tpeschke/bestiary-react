import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CatalogState } from '../../components/catalog/catalogInterfaces'

const initialState: CatalogState = {
  catalogItems: [],
  templates: [],
  freeBeasts: []
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    saveCatalog: (state: any, action: PayloadAction<CatalogState>) => {
      const { templates, freeBeasts, catalogItems } = action.payload
      state.templates = templates
      state.freeBeasts = freeBeasts
      state.catalogItems = catalogItems
    }
  },
})

export const { saveCatalog } = catalogSlice.actions

export default catalogSlice.reducer