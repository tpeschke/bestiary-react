import getModBySkullIndex from "../../getModBySkullIndex"

export default function getAttackMod(isRanged: boolean, role: string, skullIndex: number) {
    const attackDictionary = [-8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
    const roleIndexModifier = getRoleIndexModifier(isRanged, role)
    return getModBySkullIndex(skullIndex, roleIndexModifier, attackDictionary)
}

function getRoleIndexModifier(isRanged: boolean, role: string): number {
    if (isRanged) {
        switch (role) {
            case 'Artillery':
                return 4
            case 'Brute':
                return -1
            case 'Defender':
                return 0
            case 'Duelist':
                return 0
            case 'Shock':
                return -3
            case 'Skirmisher':
                return 0
            default:
                return 0
        }
    }

    switch (role) {
        case 'Artillery':
            return -1
        case 'Brute':
            return 2
        case 'Defender':
            return 2
        case 'Duelist':
            return 1
        case 'Shock':
            return 2
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}