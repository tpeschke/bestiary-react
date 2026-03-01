import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"
import getModBySkullIndex from "../getModBySkullIndex"

export default function getCapacity(skullIndex: number = 0, role: string, secondaryRole: string | null): number[] {
    const capacityDictionary = [3, 3, 4, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14]
    const roleIndexModifier = getRoleIndexModifier(role)

    const baseCapacity = calculateSecondaryRoleEffect(getModBySkullIndex(skullIndex, roleIndexModifier, capacityDictionary), secondaryRole)

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

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Advocate':
            return 0
        case 'Bully':
            return 1
        case 'Charmer':
            return 1
        case 'Empath':
            return -2
        case 'Enabler':
            return -3
        case 'Instructor':
            return 2
        case 'Obdurate':
            return 0
        case 'Zealot':
            return -3
        default:
            return 0
    }
}