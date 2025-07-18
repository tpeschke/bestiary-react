import { IsSpecial, DamageType } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Strength } from "../../../interfaces/calculationInterfaces"
import { getWeaponName } from "../../formatting/formatting"
import { calculateStatWithFormatting, calculateStat } from "./combatCalculation"
import { calculateDamageAndRecovery } from "./damageAndRecoveryCalculator"

import { getWeaponByName } from '../../../../server/controllers/gear/gear'

export default function calculateAndFormatAttackInfo(
    totalPoints: number,
    role: string,
    chosenName: string,
    weaponName: string,
    measure: Strength,
    attack: Strength,
    rangeIncrement: Strength,
    slashingDamage: Strength,
    crushingDamage: Strength,
    piercingDamage: Strength,
    recoveryStrength: Strength,
    isSpecial: IsSpecial,
    damageType: DamageType,
) {
    const weaponInfo = getWeaponByName(weaponName)

    if (weaponInfo) {
        const { measure, type, name, bonus } = weaponInfo

        return {
            measure, type, bonus,
            name: getWeaponName(chosenName, name),
            attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
            rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
            ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, type)
        }
    }

    return {
        name: chosenName,
        type: damageType,
        measure: calculateStat(measure, 'measure', role, totalPoints),
        attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
        rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
        ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, damageType)
    }
}