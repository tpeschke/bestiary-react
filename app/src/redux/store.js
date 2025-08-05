import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/catalogSlice';
import userReducer from './slices/userSlice';
import beastCacheReducer from './slices/beastCacheSlice';
export const store = configureStore({
    reducer: {
        catalog: catalogReducer,
        user: userReducer,
        beastCache: beastCacheReducer
    },
});
