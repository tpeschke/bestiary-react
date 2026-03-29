import { SystemOption } from "../../../../../interfaces/beast/beast"
import getModBySkullIndex from "../../../getModBySkullIndex"

const bonfireRecoveryDictionary = [18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1]
const hackMasterRecoveryDictionary = [ 15, 14, 14, 13, 13, 13, 12, 12, 11, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

export default function getRecovery(isRanged: boolean, role: string, skullIndex: number, system: SystemOption = 'Bonfire') {
    const recoveryDictionary = system === 'Bonfire' ? bonfireRecoveryDictionary : hackMasterRecoveryDictionary
    const roleIndexModifier = getRoleIndexModifier(isRanged, role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, recoveryDictionary)
}

function getRoleIndexModifier(isRanged: boolean, role: string): number {
    if (isRanged) {
        switch (role) {
            case 'Artillery':
                return -4
            case 'Brute':
                return -4
            case 'Defender':
                return -4
            case 'Duelist':
                return 0
            case 'Shock':
                return -4
            case 'Skirmisher':
                return 4
            default:
                return 0
        }
    }

    switch (role) {
        case 'Artillery':
            return -4
        case 'Brute':
            return -3
        case 'Defender':
            return -2
        case 'Duelist':
            return 4
        case 'Shock':
            return -4
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}