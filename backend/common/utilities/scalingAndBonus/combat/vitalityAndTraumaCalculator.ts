import calculateSecondaryRoleEffect from "../calculateSecondaryRoleEffect"

interface VitalityAndTrauma {
    vitality: string | number,
    trauma: number | boolean
}

export default function calculateVitalityAndTrauma(role: string, secondaryRole: string, skullIndex: number): VitalityAndTrauma {
    const vitality = calculateSecondaryRoleEffect(getBaseVitality(skullIndex, role), secondaryRole) 

    return {
        vitality,
        trauma: vitality * 2
    }
}

function getBaseVitality(skullIndex: number, role: string): number {
    const vitalityDictionary = [1, 2, 4, 6, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120, 128, 136, 144, 152]
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