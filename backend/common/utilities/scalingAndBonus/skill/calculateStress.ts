export default function calculateStress(role: string, secondaryRole: string, skullIndex: number): number | string {
    return modifiedCapacity(getBaseStress(skullIndex, role), secondaryRole)
}

function getBaseStress(skullIndex: number, role: string): number {
    const stressDictionary = [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57]
    const roleIndexModifier = getRoleIndexModifier(role)

    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return stressDictionary[0]
    }
    if (modifiedIndex > stressDictionary.length) {
        return stressDictionary[stressDictionary.length - 1]
    }
    return stressDictionary[modifiedIndex]
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Hunter':
            return 2
        case 'Prey':
            return 0
        case 'Controller':
            return -2
        case 'Lock':
            return -3
        case 'Antagonist':
            return -2
        case 'Trap':
            return -3
        case 'Hazard':
            return -3
        default:
            return 0
    }
}

function modifiedCapacity(baseCapacity: number, secondaryRole: string | null) {
    switch (secondaryRole) {
        case 'Lesser':
            return baseCapacity * 0.5
        case 'Veteran':
        case 'Officer':
            return baseCapacity * 2.5
        case 'Solo':
            return baseCapacity * 3.5
        default:
            return baseCapacity
    }
}