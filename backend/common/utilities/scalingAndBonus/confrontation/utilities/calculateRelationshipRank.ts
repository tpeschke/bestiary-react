import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateRelationshipRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [-4, -3, -2, -1, -1, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Striker':
            return 0
        case 'Defender':
            return 3
        case 'Support':
            return 2
        case 'Corruptor':
            return -2
        case 'Gaslighter':
            return 2
        case 'Enabler':
            return 0
        case 'Opportunist':
            return 0
        case 'Know-it-All':
            return 0
        case 'Dialectician':
            return -4
        default:
            return 0
    }
}