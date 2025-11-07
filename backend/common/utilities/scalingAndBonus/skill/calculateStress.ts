import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"
import getModBySkullIndex from "../getModBySkullIndex"

export default function calculateStress(role: string, secondaryRole: string, skullIndex: number): number | string {
    const stressDictionary = [2, 3, 4, 5, 6, 8, 10, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57]
    const roleIndexModifier = getRoleIndexModifier(role)

    return calculateSecondaryRoleEffect(getModBySkullIndex(skullIndex, roleIndexModifier, stressDictionary), secondaryRole)
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