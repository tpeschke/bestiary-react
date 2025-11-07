import getModBySkullIndex from "../../getModBySkullIndex"

export default function getParry(role: string, skullIndex: number): number {
    const attackDictionary = [0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
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
            return 4
        case 'Duelist':
            return 4
        case 'Shock':
            return 0
        case 'Skirmisher':
            return 0
        default:
            return 0
    }
}