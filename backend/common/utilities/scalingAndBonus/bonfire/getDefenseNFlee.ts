import { DiceOptions } from "@bestiary/common/interfaces/beast/beast"
import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"

export default function getBonfireDefenseNFlee(role: string, skullIndex: number): {
    defense: DiceOptions,
    flee: DiceOptions
} {
    const defenseDictionary: DiceOptions[] = [null, 'd4', 'd4', 'd4', 'd4', 'd6', 'd6', 'd8', 'd8', 'd8', 'd10', 'd10', 'd10', 'd12', 'd12', 'd12', 'd20', 'd20', 'd20', null, null, null, null]
    const fleeDictionary: DiceOptions[] = ['d4', 'd6', 'd6', 'd6', 'd6', 'd8', 'd8', 'd10', 'd10', 'd10', 'd12', 'd12', 'd12', 'd20', 'd20', 'd20', null, null, null, null, null, null, null]

    const roleIndexModifier = getRoleIndexModifier(role)

    const defense = getModBySkullIndex<DiceOptions>(skullIndex, roleIndexModifier, defenseDictionary)
    const flee = getModBySkullIndex<DiceOptions>(skullIndex, roleIndexModifier, fleeDictionary)

    return {
        flee,
        defense
    }
}

export function getHackMasterDefenseNFlee(role: string, skullIndex: number): {
    defense: number | null,
    flee: number | null
} {
    const defenseDictionary: number[] = [0.00, 0.05, 0.07, 0.10, 0.12, 0.15, 0.17, 0.20, 0.22, 0.24, 0.27, 0.29, 0.32, 0.34, 0.37, 0.39, 0.41, 0.44, 0.46, 0.49, 0.51, 0.54, 0.56, 0.59, 0.61, 0.63, 0.66, 0.68, 0.71, 0.73, 0.76, 0.78, 0.80, 0.83, 0.85, 0.88, 0.90, 0.93, 0.95, 0.98, 1]
    const fleeDictionary: number[] = [0, 0.07, 0.10, 0.13, 0.17, 0.20, 0.23, 0.27, 0.30, 0.33, 0.37, 0.40, 0.43, 0.47, 0.50, 0.53, 0.57, 0.60, 0.63, 0.67, 0.70, 0.73, 0.77, 0.80, 0.83, 0.87, 0.90, 0.93, 0.97, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

    const roleIndexModifier = getRoleIndexModifier(role)

    const defense = getModBySkullIndex(skullIndex, roleIndexModifier, defenseDictionary)
    const flee = getModBySkullIndex(skullIndex, roleIndexModifier, fleeDictionary)

    return {
        flee,
        defense
    }
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return 0
        case 'Brute':
            return 0
        case 'Defender':
            return 0
        case 'Duelist':
            return 0
        case 'Shock':
            return 0
        case 'Skirmisher':
            return 0
        default:
            return 0
    }
}