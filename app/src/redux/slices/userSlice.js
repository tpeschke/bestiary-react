import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    infoHasBeenFetched: false
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { isUserLoggedIn, patreon, isOwner } = action.payload;
            state.isUserLoggedIn = isUserLoggedIn;
            state.patreon = patreon;
            state.isOwner = isOwner;
            state.infoHasBeenFetched = true;
        }
    },
});
export const { setUser } = userSlice.actions;
export const isUserLoggedOn = (state) => state.user.isUserLoggedIn;
export const getUserPatreon = (state) => state.user.patreon;
export const isOwner = (state) => state.user.isOwner;
export const infoHasBeenFetched = (state) => state.user.infoHasBeenFetched;
export default userSlice.reducer;
