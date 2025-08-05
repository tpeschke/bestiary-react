import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    catalogItems: [],
    templates: [],
    freeBeasts: [],
    updatingCatalogItems: [],
    favorites: []
};
export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        saveCatalog: (state, action) => {
            const { templates, freeBeasts, catalogItems, favorites } = action.payload;
            state.templates = templates;
            state.freeBeasts = freeBeasts;
            state.catalogItems = catalogItems;
            state.favorites = favorites;
            state.updatingCatalogItems = catalogItems.map(row => {
                return row.filter(item => !item.notupdating);
            });
        },
        removeFromFavorites: (state, action) => {
            const { beastID } = action.payload;
            state.favorites = state.favorites.filter((favorite) => favorite.id !== beastID);
        },
        addToFavorites: (state, action) => {
            const newFavorites = [...state.favorites, action.payload];
            state.favorites = newFavorites.sort((a, b) => a.name.localeCompare(b.name));
        }
    },
});
export const { saveCatalog, addToFavorites, removeFromFavorites } = catalogSlice.actions;
export default catalogSlice.reducer;
