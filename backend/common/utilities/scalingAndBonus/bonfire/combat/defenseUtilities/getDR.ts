import getModBySkullIndex, { getItemBySkullIndex } from "../../../getModBySkullIndex"
import formatDRString from "./formatDRString"

export function calculateDR(role: string, skullIndex: number): string {
    const staticDR = getStaticDR(role, skullIndex)
    const slashDR = getSlashDR(role, skullIndex)

    return formatDRString(staticDR, slashDR)
}

export function calculateHackMasterDR(role: string, skullIndex: number): number {
    const drDictionary = [0, 0, 0, 0, 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 35, 36, 37, 38, 39, 40, 42]
    const roleIndexModifier = getRoleIndexModifierStaticDR(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, drDictionary)
}

function getStaticDR(role: string, skullIndex: number): number {
    const drDictionary = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 14, 14, 14, 14]
    const roleIndexModifier = getRoleIndexModifierStaticDR(role)

    return getModBySkullIndex(skullIndex, roleIndexModifier, drDictionary)
}

function getRoleIndexModifierStaticDR(role: string): number {
    switch (role) {
        case 'Artillery':
            return 2
        case 'Brute':
            return 0
        case 'Defender':
            return 2
        case 'Duelist':
            return 0
        case 'Shock':
            return 0
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}

function getSlashDR(role: string, skullIndex: number): string {
    const drDictionary = [
        '0', '0', '0', '0', '0', '0', '1/d', '1/d', '1/d', '2/d', '2/d', '3/d', '3/d', '4/d', '5/d', '6/d', '6/d', '7/d', '7/d', '8/d', '8/d', '9/d', '10/d'
    ]
    const roleIndexModifier = getRoleIndexModifierSlashDR(role)

    return getItemBySkullIndex(skullIndex, roleIndexModifier, drDictionary)
}

function getRoleIndexModifierSlashDR(role: string): number {
    switch (role) {
        case 'Artillery':
            return -2
        case 'Brute':
            return -2
        case 'Defender':
            return -2
        case 'Duelist':
            return -3
        case 'Shock':
            return -2
        case 'Skirmisher':
            return -4
        default:
            return -2
    }
}