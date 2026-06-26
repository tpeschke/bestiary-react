import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ActiveBeastState, SetActiveBeastPayload } from './activeBeastInterfaces'

const initialState: ActiveBeastState = {
    beastInfo: null,
    roleId: null
}

export const activeBeastSlice = createSlice({
    name: 'activeBeast',
    initialState,
    reducers: {
        setActiveBeast: (state, { payload }: PayloadAction<SetActiveBeastPayload>) => {
            state.beastInfo = payload.beastInfo
            state.roleId = payload.roleId
        },
        clearActiveBeast: (state) => {
            state.beastInfo = null
            state.roleId = null
        }
    },
})

export const { setActiveBeast, clearActiveBeast } = activeBeastSlice.actions

export default activeBeastSlice.reducer
