import { PayloadAction } from "@reduxjs/toolkit"
import { BeastCacheObject } from "../beastCacheInterfaces"

export default {
    cacheMonster: (state: any, { payload }: PayloadAction<BeastCacheObject>) => {
        state.cache[`${payload.id}`] = payload
    },
    removeMonsterFromCache: (state: any, { payload }: PayloadAction<number>) => {
        delete state.cache[`${payload}`]
    }
}