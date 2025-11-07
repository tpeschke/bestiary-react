import getModBySkullIndex from "../../getModBySkullIndex"

export default function calculateDescriptionRank(skullIndex: number = 0, role: string): number {
    const rankDictionary = [ 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36 ]
    const roleIndexModifier = getRoleIndexModifier(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, rankDictionary)
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Striker':
            return 2
        case 'Defender':
            return -3
        case 'Support':
            return -3
        case 'Corruptor':
            return -1
        case 'Gaslighter':
            return 2
        case 'Enabler':
            return -2
        case 'Opportunist':
            return 4
        case 'Know-it-All':
            return -4
        case 'Dialectician':
            return -4
        default:
            return 0
    }
}