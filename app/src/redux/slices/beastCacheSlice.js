import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    cache: {}
};
export const beastCacheSlice = createSlice({
    name: 'beastCacheSlice',
    initialState,
    reducers: {
        cacheMonster: (state, { payload }) => {
            state.cache[`${payload.id}`] = payload;
        },
        removeMonsterFromCache: (state, { payload }) => {
            delete state.cache[`${payload}`];
        }
    },
});
export const { cacheMonster, removeMonsterFromCache } = beastCacheSlice.actions;
export default beastCacheSlice.reducer;
