import getModBySkullIndex from "../../getModBySkullIndex"

export default function getMeasure(isRanged: boolean, role: string, skullIndex: number) {
    const measureDictionary = [0, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21]
    const roleIndexModifier = getRoleIndexModifier(isRanged, role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, measureDictionary)
}

function getRoleIndexModifier(isRanged: boolean, role: string): number {
    if (isRanged) {
        switch (role) {
            case 'Artillery':
                return 4
            case 'Brute':
                return -2
            case 'Defender':
                return -4
            case 'Duelist':
                return -4
            case 'Shock':
                return 0
            case 'Skirmisher':
                return 0
            default:
                return 0
        }
    }

    switch (role) {
        case 'Artillery':
            return 0
        case 'Brute':
            return 4
        case 'Defender':
            return 0
        case 'Duelist':
            return 0
        case 'Shock':
            return 2
        case 'Skirmisher':
            return -3
        default:
            return 0
    }
}