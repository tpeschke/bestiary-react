import getModBySkullIndex from "../../../getModBySkullIndex"

export default function calculateRelationshipRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Advocate':
            return 2
        case 'Bully':
            return 0
        case 'Charmer':
            return 0
        case 'Empath':
            return 2
        case 'Enabler':
            return 0
        case 'Instructor':
            return 1
        case 'Obdurate':
            return -1
        case 'Zealot':
            return 3
        default:
            return 0
    }
}