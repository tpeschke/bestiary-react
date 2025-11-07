import getModBySkullIndex, { getItemBySkullIndex } from "../../getModBySkullIndex"
import formatDRString from "./formatDRString"

export function calculateParryDR(role: string, skullIndex: number, eua: boolean): string {
    if (eua) {
        return 'EUA'
    }

    const staticDR = getParryStaticDR(role, skullIndex)
    const slashDR = getParrySlashDR(role, skullIndex)

    return formatDRString(staticDR, slashDR)
}


function getParryStaticDR(role: string, skullIndex: number): number {
    const attackDictionary = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const roleIndexModifier = getRoleIndexModifierParryStaticDR(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, attackDictionary)
}

function getRoleIndexModifierParryStaticDR(role: string): number {
    switch (role) {
        case 'Artillery':
            return -1
        case 'Brute':
            return -1
        case 'Defender':
            return -2
        case 'Duelist':
            return 0
        case 'Shock':
            return -2
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}

function getParrySlashDR(role: string, skullIndex: number): string {
    const attackDictionary = [
        '2/d', '2/d', '2/d', '2/d', '2/d', '2/d', '2/d', '2/d', '2/d', '3/d', '3/d', '3/d', '4/d', '4/d', '5/d', '6/d', '7/d', '8/d', '9/d', '10/d', '11/d', '12/d', '13/d'
    ]
    const roleIndexModifier = getRoleIndexModifierParrySlashDR(role)

    return getItemBySkullIndex(skullIndex, roleIndexModifier, attackDictionary)
}

function getRoleIndexModifierParrySlashDR(role: string): number {
    switch (role) {
        case 'Artillery':
            return 0
        case 'Brute':
            return -1
        case 'Defender':
            return 4
        case 'Duelist':
            return -2
        case 'Shock':
            return -2
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}