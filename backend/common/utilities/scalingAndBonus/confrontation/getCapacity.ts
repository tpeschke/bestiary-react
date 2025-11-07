import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"

export default function getCapacity(skullIndex: number = 0, role: string, secondaryRole: string | null): number[] {
    const baseCapacity = calculateSecondaryRoleEffect(getBaseCapacity(skullIndex, role), secondaryRole)

    const no = Math.floor(baseCapacity * 0.1)
    const noBut = Math.ceil(baseCapacity * 0.5)
    const yesBut = baseCapacity
    const yes = Math.ceil(baseCapacity * 1.5)

    return [
        no,
        noBut,
        yesBut,
        yes
    ]
}

function getBaseCapacity(skullIndex: number, role: string): number {
    const capacityDictionary = [3, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14]
    const roleIndexModifier = getRoleIndexModifier(role)

    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return capacityDictionary[0]
    }
    if (modifiedIndex > capacityDictionary.length) {
        return capacityDictionary[capacityDictionary.length - 1]
    }
    return capacityDictionary[modifiedIndex]
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Striker':
            return -2
        case 'Defender':
            return 0
        case 'Support':
            return 1
        case 'Corruptor':
            return -1
        case 'Gaslighter':
            return -2
        case 'Enabler':
            return -1
        case 'Opportunist':
            return 0
        case 'Know-it-All':
            return -2
        case 'Dialectician':
            return -4
        default:
            return 0
    }
}