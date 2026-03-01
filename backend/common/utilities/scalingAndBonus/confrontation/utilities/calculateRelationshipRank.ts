import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateRelationshipRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [-4, -3, -2, -1, -1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
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