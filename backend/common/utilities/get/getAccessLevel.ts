import { User } from "../../interfaces/userInterfaces"

export type Access = 'Player' | 'GM' | 'Early Access'

export const PLAYER: Access = 'Player'
export const GM: Access = 'GM'
export const EARLY_ACCESS: Access = 'Early Access'

export default function getAccessLevel(user: User | null | undefined): Access {
    if (user) {
        return getAccessString(user.patreon, user.koFi)
    }

    return PLAYER
}

function getAccessString(patreon: number = 0, koFi: number = 0): Access {
    if (patreon >= 10 || koFi >= 7.99) {
        return EARLY_ACCESS
    } else if (patreon >= 5 || koFi >= 2.99) {
        return GM
    }

    return PLAYER
}

export function getEntryAccessLevel(patreonNumber: number): Access {
    if (patreonNumber === 20) {
        return EARLY_ACCESS
    } else if (patreonNumber === 3) {
        return GM
    }

    return PLAYER
}