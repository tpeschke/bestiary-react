import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateRelationshipRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [ 1, 2, 3, 4, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44 ]
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