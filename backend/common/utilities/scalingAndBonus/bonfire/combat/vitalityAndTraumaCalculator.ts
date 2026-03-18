import { SystemOption } from "../../../../interfaces/beast/beast"
import calculateSecondaryRoleEffect from "../../calculateSecondaryRoleEffect"

interface VitalityAndTrauma {
    vitality: string | number,
    trauma: number | boolean
}

export default function calculateVitalityAndTrauma(
    role: string,
    secondaryRole: string,
    skullIndex: number,
    weaponBreakageVitality: boolean,
    singleDieVitality: boolean,
    system: SystemOption
): VitalityAndTrauma {
    if (singleDieVitality && system === 'Bonfire') {
        return {
            vitality: 1,
            trauma: 2
        }
    } else if (singleDieVitality && system === 'HackMaster') {
        return {
            vitality: 5,
            trauma: 3
        }
    }

    if (system === 'HackMaster') {
        const vitality = calculateSecondaryRoleEffect(getHackMasterBaseVitality(skullIndex, role), secondaryRole)

        return {
            vitality,
            trauma: Math.ceil(vitality * .33)
        }
    }

    const vitality = calculateSecondaryRoleEffect(getBonfireBaseVitality(skullIndex, role, weaponBreakageVitality), secondaryRole)

    return {
        vitality,
        trauma: vitality * 2
    }
}

function getBonfireBaseVitality(skullIndex: number, role: string, weaponBreakageVitality: boolean): number {
    const normalVitalityDictionary = [1, 2, 4, 6, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152]
    const weaponBreakageVitalityDictionary = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 7, 8]

    const vitalityDictionary = weaponBreakageVitality ? weaponBreakageVitalityDictionary : normalVitalityDictionary
    const roleIndexModifier = getRoleIndexModifier(role)
    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return vitalityDictionary[0]
    }
    if (modifiedIndex > vitalityDictionary.length) {
        return vitalityDictionary[vitalityDictionary.length - 1]
    }
    return vitalityDictionary[modifiedIndex]
}

function getHackMasterBaseVitality(skullIndex: number, role: string): number {
    const vitalityDictionary = [1, 1, 2, 2, 3, 5, 10, 14, 19, 24, 29, 34, 38, 43, 48, 53, 58, 63, 67, 72, 77, 82, 87, 91, 96, 101, 106, 111, 115, 120, 125, 130, 135, 139, 144, 149, 154, 159, 163, 168, 173
]

    const roleIndexModifier = getRoleIndexModifier(role)
    const modifiedIndex = skullIndex + roleIndexModifier

    if (modifiedIndex < 0) {
        return vitalityDictionary[0]
    }
    if (modifiedIndex > vitalityDictionary.length) {
        return vitalityDictionary[vitalityDictionary.length - 1]
    }
    return vitalityDictionary[modifiedIndex]
}

function getRoleIndexModifier(role: string): number {
    switch (role) {
        case 'Artillery':
            return 0
        case 'Brute':
            return 2
        case 'Defender':
            return -3
        case 'Duelist':
            return -2
        case 'Shock':
            return 0
        case 'Skirmisher':
            return -2
        default:
            return 0
    }
}