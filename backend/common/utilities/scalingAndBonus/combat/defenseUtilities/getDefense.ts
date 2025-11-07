import { Size } from "../../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import getModBySkullIndex from "../../getModBySkullIndex"

export default function getDefense(addSizeMod: boolean, size: Size = 'Medium', role: string, skullIndex: number): number {
    const attackDictionary = [-8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
    const roleIndexModifier = getRoleIndexModifier(role)

    const defenseMod = getModBySkullIndex(skullIndex, roleIndexModifier, attackDictionary)

    if (!addSizeMod || (typeof defenseMod === 'string')) {
        return defenseMod
    }

    const defenseModDictionary = {
        Fine: 12,
        Diminutive: 9,
        Tiny: 6,
        Small: 3,
        Medium: 0,
        Large: -3,
        Huge: -6,
        Giant: -9,
        Enormous: -12,
        Colossal: -15
    }

    return defenseMod + defenseModDictionary[size]
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return -2
        case 'Brute':
            return -2
        case 'Defender':
            return -4
        case 'Duelist':
            return -2
        case 'Shock':
            return -2
        case 'Skirmisher':
            return 2
        default:
            return 0
    }
}