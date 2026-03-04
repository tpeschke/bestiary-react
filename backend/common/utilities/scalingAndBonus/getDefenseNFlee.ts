import { DiceOptions } from "@bestiary/common/interfaces/beast/beast"
import getModBySkullIndex from "@bestiary/common/utilities/scalingAndBonus/getModBySkullIndex"

export default function getDefenseNFlee(role: string, skullIndex: number): {
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