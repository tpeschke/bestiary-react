import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateConvictionRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [ 0, 0, 1, 1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Striker':
            return -2
        case 'Defender':
            return 1
        case 'Support':
            return 2
        case 'Corruptor':
            return 4
        case 'Gaslighter':
            return 0
        case 'Enabler':
            return 3
        case 'Opportunist':
            return -4
        case 'Know-it-All':
            return 2
        case 'Dialectician':
            return -4
        default:
            return 0
    }
}