import { DamageType, IsSpecial } from "../../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getItemBySkullIndex } from "../../getModBySkullIndex"

export default function getDamage(isSpecial: IsSpecial, isRanged: boolean, damageType: DamageType, role: string, skullIndex: number) {
    if (isSpecial === 'yes') { return '*' }
    
    const roleIndexModifier = getRoleIndexModifier(isRanged, role)

    switch (damageType) {
        case 'C':
            return getCrushingDamage(roleIndexModifier, skullIndex) + isSpecial === 'kinda' ? '*' : ''
        case 'P':
            return getPiercingDamage(roleIndexModifier, skullIndex) + isSpecial === 'kinda' ? '*' : ''
        case 'S':
            return getSlashingDamage(roleIndexModifier, skullIndex) + isSpecial === 'kinda' ? '*' : ''
        default:
            return getCrushingDamage(roleIndexModifier, skullIndex) + isSpecial === 'kinda' ? '*' : ''
    }
}

function getRoleIndexModifier(isRanged: boolean, role: string): number {
    if (isRanged) {
        switch (role) {
            case 'Artillery':
                return 4
            case 'Brute':
                return 0
            case 'Defender':
                return -4
            case 'Duelist':
                return -4
            case 'Shock':
                return 0
            case 'Skirmisher':
                return 0
            default:
                return 0
        }
    }

    switch (role) {
        case 'Artillery':
            return -2
        case 'Brute':
            return 4
        case 'Defender':
            return 0
        case 'Duelist':
            return 2
        case 'Shock':
            return 4
        case 'Skirmisher':
            return -4
        default:
            return 0
    }
}

function getCrushingDamage(roleIndexModifier: number, skullIndex: number) {
    const crushingDictionary = [
        '1d6!', 'd6!+1', 'd8!', 'd8!+1', '1d10!', '1d10!+1', '1d12!', '1d12!+1', 'd20!', 'd20!+1', 'd20!+2', 'd20!+3', 'd20!+4', 'd20!+5', 'd20!+6', 'd20!+7', 'd20!+8', 'd20!+9', 'd20!+9', 'd20!+10', 'd20!+11', 'd20!+12', 'd20!+13'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, crushingDictionary)
}

function getPiercingDamage(roleIndexModifier: number, skullIndex: number) {
    const PiercingDictionary = [
        '1d4!', '1d4!', '1d6!', '1d6!+1d4!', '2d6!', '2d6!+1d4!', '3d6!', '3d6!+1d4!', '4d6!', '4d6!+1d4!', '5d6!', '5d6!+1d4!', '6d6!', '7d6!', '7d6!+1d4!', '8d6!', '8d6!+1d4!', '9d6!', '9d6!+1d4!', '10d6!', '10d6!+1d4!', '11d6!', '11d6!+1d4!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, PiercingDictionary)
}

function getSlashingDamage(roleIndexModifier: number, skullIndex: number) {
    const slashingDictionary = [
        '2d4!', '2d4!+1d2!', '3d4!', '3d4!+1d2!', '4d4!', '4d4!+1d2!', '5d4!', '5d4!+1d2!', '6d4!', '6d4!+1d2!', '7d4!', '7d4!+1d2!', '8d4!', '9d4!', '9d4!+1d2!', '10d4!', '10d4!+1d2!', '11d4!', '11d4!+1d2!', '12d4!', '12d4!+1d2!', '13d4!', '13d4!+1d2!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, slashingDictionary)
}