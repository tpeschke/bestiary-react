import getModBySkullIndex from "../../getModBySkullIndex"

export default function getRangeIncrement(isRanged: boolean, role: string, skullIndex: number) {
    const rangeIncrementDictionary = [10, 15, 20, 25, 30, 35, 40, 50, 60, 70, 80, 100, 120, 140, 160, 180, 200, 220, 240, 280, 360, 520, 880]
    const roleIndexModifier = getRoleIndexModifier(isRanged, role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rangeIncrementDictionary)
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