import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateDescriptionRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [ 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]
    const roleIndexModifier = getRoleIndexModifier(role)
// TODO Replace
    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Advocate':
            return 0
        case 'Bully':
            return 0
        case 'Charmer':
            return 0
        case 'Empath':
            return 0
        case 'Enabler':
            return 0
        case 'Instructor':
            return 0
        case 'Obdurate':
            return 0
        case 'Zealot':
            return 0
        default:
            return 0
    }
}