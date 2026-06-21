import { BeastInfo } from "../../../../pages/bestiary/beast/interfaces/viewInterfaces"

export interface sliceState {
    cache: BeastCache
}

export interface BeastCache {
    [key: string]: BeastCacheObject
}

export interface BeastCacheObject {
    id: number,
    beastInfo: Promise<BeastInfo>
}