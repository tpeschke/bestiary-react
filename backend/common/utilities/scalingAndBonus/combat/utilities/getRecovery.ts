import getModBySkullIndex from "../../getModBySkullIndex"

export default function getRecovery(isRanged: boolean, role: string, skullIndex: number) {
    const recoveryDictionary = [18, 16, 14, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 1, 1, 1, 1]
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