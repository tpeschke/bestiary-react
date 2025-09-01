import { IsSpecial, DamageType, Type } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Strength } from "../../../interfaces/calculationInterfaces"
import { getWeaponName } from "../../formatting/formatting"
import { calculateStatWithFormatting, calculateStat } from "./combatCalculation"
import { calculateDamageAndRecovery } from "./damageAndRecoveryCalculator"

import { getWeaponByName } from '../../../../server/controllers/gear/gear'
import { ProcessedWeapon } from "../../../../server/controllers/gear/interfaces/weaponInterfaces"

export default async function calculateAndFormatAttackInfo(
    totalPoints: number,
    role: string,
    chosenName: string,
    weaponName: string,
    measure: Strength,
    attack: Strength,
    weapontype: Type,
    rangeIncrement: Strength,
    slashingDamage: Strength,
    crushingDamage: Strength,
    piercingDamage: Strength,
    recoveryStrength: Strength,
    isSpecial: IsSpecial,
    damageType: DamageType,
    weaponInfo: ProcessedWeapon
) {

    const weaponInfoObject = await getWeaponInfo(weaponInfo, weaponName)

    if (weaponInfoObject) {
        const { measure, type, name, bonus, range } = weaponInfoObject

        return {
            measure, type, bonus, weaponInfo: weaponInfoObject,
            name: getWeaponName(chosenName, name),
            weaponName: name,
            attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
            rangeIncrement: range ? calculateStat(rangeIncrement, 'rangeIncrement', role, totalPoints) : null,
            ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, type)
        }
    }

    return {
        name: chosenName,
        type: damageType,
        measure: calculateStat(measure, 'measure', role, totalPoints),
        attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
        rangeIncrement: weapontype === 'r' ? calculateStat(rangeIncrement, 'rangeIncrement', role, totalPoints) : null,
        ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, damageType)
    }
}

async function getWeaponInfo(weaponInfo: ProcessedWeapon, weaponName: string) {
    if (weaponInfo) { return weaponInfo }
    return await getWeaponByName(weaponName)
}