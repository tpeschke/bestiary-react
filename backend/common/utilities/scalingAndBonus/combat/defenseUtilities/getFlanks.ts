import getModBySkullIndex from "../../getModBySkullIndex"

export default function getFlanks(role: string, skullIndex: number): number {
    const attackDictionary = [1, 1, 1, 1, 1, 1, 1, 2, 2, 3, 4, 4, 6, 6, 8, 8, 8, 8, 8, 8, 8, 8, 8]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, attackDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return 0
        case 'Brute':
            return -1
        case 'Defender':
            return 2
        case 'Duelist':
            return -2
        case 'Shock':
            return 0
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}