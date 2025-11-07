import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"

export default function getInitiative(role: string, skullIndex: number): string {
    const initiativeDictionary = [9, 8, 7, 6, 5, 4, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12]
    const roleIndexModifier = getRoleIndexModifier(role)

    const baseInitiative = getModBySkullIndex(skullIndex, roleIndexModifier, initiativeDictionary)

    if (baseInitiative >= 0) {
        return `+${baseInitiative}`
    }
    return `${baseInitiative}`
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return -1
        case 'Brute':
            return 0
        case 'Defender':
            return 0
        case 'Duelist':
            return 2
        case 'Shock':
            return 4
        case 'Skirmisher':
            return 2
        default:
            return 0
    }
}