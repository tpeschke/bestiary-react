import { SystemOption } from "../../../../../interfaces/beast/beast"
import { Size } from "../../../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import getModBySkullIndex from "../../../getModBySkullIndex"

const bonfireDefenseDictionary = [-8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36]
const hackMasterDefenseDictionary = [-6, -5, -5, -4, -3, -3, -2, -2, -1, -1, 0, 1, 1, 2, 2, 3, 4, 4, 5, 5, 6, 6, 7, 8, 8, 9, 9, 10, 10, 11, 12, 12, 13, 13, 14, 14, 15, 16, 16, 17]

export default function getDefense(addSizeMod: boolean, size: Size = 'Medium', role: string, skullIndex: number, system: SystemOption): number {
    const defenseDictionary = system === 'Bonfire' ? bonfireDefenseDictionary : hackMasterDefenseDictionary
    const roleIndexModifier = getRoleIndexModifier(role)

    const defenseMod = getModBySkullIndex(skullIndex, roleIndexModifier, defenseDictionary)

    if (!addSizeMod || (typeof defenseMod === 'string')) {
        return defenseMod
    }

    const defenseSizeModDictionary = {
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

    return defenseMod + defenseSizeModDictionary[size]
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