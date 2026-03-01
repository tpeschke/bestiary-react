import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateConvictionRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [ 0, 0, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Advocate':
            return 1
        case 'Bully':
            return 2
        case 'Charmer':
            return -1
        case 'Empath':
            return -3
        case 'Enabler':
            return 2
        case 'Instructor':
            return 0
        case 'Obdurate':
            return 3
        case 'Zealot':
            return 1
        default:
            return 0
    }
}