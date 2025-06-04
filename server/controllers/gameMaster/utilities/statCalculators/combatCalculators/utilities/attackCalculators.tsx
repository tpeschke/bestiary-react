import { Strength } from "../../../../../../interfaces/beastInterfaces/beastInterfaces";
import { DamageType, IsSpecial, Type } from "../../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { ProcessedWeapon } from "../../../../../gear/interfaces/weaponInterfaces";
import { calculateStat, calculateStatWithFormatting } from "../combatScaling/combatCalculator";
import { calculateDamageAndRecovery } from "../combatScaling/damageAndRecoveryCalculator";
import { formatNameWithComma } from "./formatting";

export default function calculateAndFormatAttackInfo(
    totalPoints: number,
    role: string,
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
    weaponInfo?: ProcessedWeapon
) {
    if (weaponInfo) {
        const { measure, name, type, bonus } = weaponInfo

        return {
            measure, type, bonus,
            name: getWeaponName(weaponName, name),
            attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
            rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
            ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, type)
        }
    }

    return {
        name: weaponName,
        type: damageType,
        measure: calculateStat(measure, 'measure', role, totalPoints),
        attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
        rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
        ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recoveryStrength, role, totalPoints, isSpecial, damageType)
    }
}

function getWeaponName(chosenName: string, weapon: string): string {
    if (chosenName) {
        return chosenName
    } else if (weapon) {
        return weapon
    }

    return '';
}