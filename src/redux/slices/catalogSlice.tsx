import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CatalogState } from '../../pages/catalog/catalogInterfaces'

const initialState: CatalogState = {
  catalogItems: [],
  templates: [],
  freeBeasts: [],
  updatingCatalogItems: []
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
      state.updatingCatalogItems = catalogItems.map(row => {
        return row.filter(item => !item.notupdating)
      })
    }
  },
})

export const { saveCatalog } = catalogSlice.actions

export default catalogSlice.reducer