import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { CatalogState, CatalogTile } from '../../pages/catalog/catalogInterfaces'

const initialState: CatalogState = {
  catalogItems: [],
  templates: [],
  freeBeasts: [],
  updatingCatalogItems: [],
  favorites: []
}

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    saveCatalog: (state: CatalogState, action: PayloadAction<CatalogState>) => {
      const { templates, freeBeasts, catalogItems, favorites } = action.payload
      state.templates = templates
      state.freeBeasts = freeBeasts
      state.catalogItems = catalogItems
      state.favorites = favorites
      state.updatingCatalogItems = catalogItems.map(row => {
        return row.filter(item => !item.notupdating)
      })
    },
    removeFromFavorites: (state: CatalogState, action: PayloadAction<any>) => {
      const { beastID } = action.payload
      state.favorites = state.favorites.filter((favorite: CatalogTile) => favorite.id !== beastID)
    },
    addToFavorites: (state: CatalogState, action: PayloadAction<CatalogTile>) => {
      const newFavorites = [...state.favorites, action.payload]
      state.favorites = newFavorites.sort((a: CatalogTile, b: CatalogTile) => a.name.localeCompare(b.name))
    }
  },
})

export const { saveCatalog, addToFavorites, removeFromFavorites } = catalogSlice.actions

export default catalogSlice.reducer