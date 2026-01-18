import { configureStore } from '@reduxjs/toolkit'
import catalogReducer from './slices/bestiary/catalogSlice'
import userReducer from './slices/userSlice'
import beastCacheReducer from './slices/bestiary/beastCacheSlice'
import ObstacleCatalogReducer from './slices/obstacles/obstacleCatalog'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    user: userReducer,
    beastCache: beastCacheReducer,
    obstacleCatalog: ObstacleCatalogReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['beastCacheSlice/cacheMonster', 'beastCacheSlice/removeMonsterFromCache'],
        ignoredPaths: ['beastCache']
      },
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch