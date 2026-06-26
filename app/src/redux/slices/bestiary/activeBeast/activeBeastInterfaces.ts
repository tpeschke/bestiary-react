import { BeastInfo } from "../../../../pages/bestiary/beast/interfaces/viewInterfaces"

export interface ActiveBeastState {
    beastInfo: BeastInfo | null,
    roleId: string | null
}

export interface SetActiveBeastPayload {
    beastInfo: BeastInfo,
    roleId: string | null
}
