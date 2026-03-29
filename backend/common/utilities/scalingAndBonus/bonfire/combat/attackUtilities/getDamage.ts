import { SystemOption } from "../../../../../interfaces/beast/beast"
import { DamageType, IsSpecial } from "../../../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { getItemBySkullIndex } from "../../../getModBySkullIndex"

export default function getDamage(isSpecial: IsSpecial, isRanged: boolean, damageType: DamageType, role: string, skullIndex: number, system: SystemOption = 'Bonfire') {
    if (isSpecial === 'yes') { return '*' }

    const roleIndexModifier = getRoleIndexModifier(isRanged, role)

    if (system === 'HackMaster') {
        return getHackMasterDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
    }

    switch (damageType) {
        case 'C':
            return getCrushingDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
        case 'P':
        case 'Ps':
            return getPiercingStabbyDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
        case 'Pg':
            return getPiercingGougeyDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
        case 'Pp':
            return getPiercingPokeyDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
        case 'S':
            return getSlashingDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
        default:
            return getCrushingDamage(roleIndexModifier, skullIndex) + (isSpecial === 'kinda' ? '*' : '')
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

function getPiercingStabbyDamage(roleIndexModifier: number, skullIndex: number) {
    const piercingDictionary = [
        '1d6!', '1d6!+1d2!', '1d8!', '1d8!+1d2!', '1d8!+1d4!', '1d8!+1d6!', '2d8!', '2d8!+1d4!', '2d8!+1d6!', '3d8!', '3d8!+1d4!', '3d8!+1d6!', '3d8!', '4d8!', '4d8!+1d4!', '4d8!+1d6!', '5d8!', '5d8!+1d4!', '5d8!+1d6!', '6d8!', '6d8!+1d4!', '6d8!+1d6!', '7d8!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, piercingDictionary)
}

function getPiercingPokeyDamage(roleIndexModifier: number, skullIndex: number) {
    const piercingDictionary = [
        '1d4!', '1d4!', '1d6!', '1d6!+1d4!', '2d6!', '2d6!+1d4!', '3d6!', '3d6!+1d4!', '4d6!', '4d6!+1d4!', '5d6!', '5d6!+1d4!', '6d6!', '7d6!', '7d6!+1d4!', '8d6!', '8d6!+1d4!', '9d6!', '9d6!+1d4!', '10d6!', '10d6!+1d4!', '11d6!', '11d6!+1d4!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, piercingDictionary)
}

function getPiercingGougeyDamage(roleIndexModifier: number, skullIndex: number) {
    const piercingDictionary = [
        'd8!', 'd8!', '1d10!', '1d10!', '1d12!', '1d12!+1d4!', '1d12!+1d6!', '1d12!+1d8!', '1d12!+1d10!', '2d12!', '2d12!+1d4!', '2d12!+1d6!', '2d12!+1d8!', '2d12!+1d10!', '3d12!', '3d12!+1d4!', '3d12!+1d6!', '3d12!+1d8!', '3d12!+1d10!', '4d12!', '4d12!+1d4!', '4d12!+1d6!', '4d12!+1d8!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, piercingDictionary)
}

function getSlashingDamage(roleIndexModifier: number, skullIndex: number) {
    const slashingDictionary = [
        '2d4!', '2d4!+1d2!', '3d4!', '3d4!+1d2!', '4d4!', '4d4!+1d2!', '5d4!', '5d4!+1d2!', '6d4!', '6d4!+1d2!', '7d4!', '7d4!+1d2!', '8d4!', '9d4!', '9d4!+1d2!', '10d4!', '10d4!+1d2!', '11d4!', '11d4!+1d2!', '12d4!', '12d4!+1d2!', '13d4!', '13d4!+1d2!'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, slashingDictionary)
}

function getHackMasterDamage(roleIndexModifier: number, skullIndex: number) {
    const damageDictionary = [
        '1', '1d4p', '1d4p', '1d4p', '1d4p', '2d4p', '2d6p', '2d8p', '2d8p+1', '2d8p+3', '2d10p+3', '2d12p+3', '2d12p+5', '2d12p+7', '2d12p+8', '2d12p+9', '2d12p+12', '2d12p+15', '2d12p+17', '2d12p+18', '2d12p+21', '2d12p+22', '2d12p+23', '2d12p+25', '2d12p+27', '2d12p+29', '2d12p+31', '2d12p+32', '2d12p+34', '2d12p+36', '2d12p+38', '2d12p+40', '2d12p+42', '2d12p+44', '2d12p+45', '2d12p+47', '2d12p+49', '2d12p+51', '2d12p+53', '2d12p+55', '2d12p+56'
    ]

    return getItemBySkullIndex(skullIndex, roleIndexModifier, damageDictionary)
}