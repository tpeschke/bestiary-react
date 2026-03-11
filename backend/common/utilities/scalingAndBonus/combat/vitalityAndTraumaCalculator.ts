import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"

interface VitalityAndTrauma {
    vitality: string | number,
    trauma: number | boolean
}

export default function calculateVitalityAndTrauma(
    role: string,
    secondaryRole: string,
    skullIndex: number,
    weaponBreakageVitality: boolean,
    singleDieVitality: boolean
): VitalityAndTrauma {
    if (singleDieVitality) {
        return {
            vitality: 1,
            trauma: 2
        }
    }

    const vitality = calculateSecondaryRoleEffect(getBaseVitality(skullIndex, role, weaponBreakageVitality), secondaryRole)

    return {
        vitality,
        trauma: vitality * 2
    }
}

function getBaseVitality(skullIndex: number, role: string, weaponBreakageVitality: boolean): number {
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