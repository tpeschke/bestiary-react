import { Size } from "../../../interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { AttackInfo, DefenseInfo } from "../../../interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Strength } from "../../../interfaces/calculationInterfaces"
import { getDefenseName } from "../../formatting/formatting"
import { primaryCombatRoles, WeaponStatsKey } from "../../roleInfo/combatRoleInfo"
import calculateAndFormatAttackInfo from "./attackCalculator"
import allScalingAndBonuses, { ScalingObject } from "./combatScaling"

export interface CalculateCombatStatsReturn {
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export interface CalculateCombatStatsReturn {
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export function calculateDefenseInfo(defenseInfo: any, points: number, role: string, addsizemod: boolean, size: Size) {
    const { id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, name, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, info } = defenseInfo

    return {
        id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, info,
        name: getDefenseName(name, shield, armor),
        defense: calculateDefense(alldefense, role, points + adjustment, addsizemod, size),
        flanks: calculateStat(flanks, 'flanks', role, points + adjustment),
        parry: calculateStatWithFormatting(parry, 'parry', role, points + adjustment),
        cover: calculateCover(cover, role, points + adjustment),
        parryDR: calculateParryDR(parryStaticDR, parrySlashDR, role, points + adjustment, eua),
        dr: calculateDR(slashingDR, staticDR, role, points + adjustment)
    }
}

export function calculateAttackInfo(attackInfo: any, points: number, role: string) {
    const { name, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType, adjustment } = attackInfo
    return {
        ...attackInfo,
        ...calculateAndFormatAttackInfo(points + adjustment, role, name, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType)
    }
}

function calculateScalingAndBonus(scalingStrength: Strength, points: number, scaling: ScalingObject, bonus: ScalingObject): number {
    if (scalingStrength === 'one') {
        return 1
    } else if (scalingStrength === 'noneStr') {
        return scaling.majSt
    } else if (scalingStrength === 'noneWk') {
        return scaling.majWk
    } else if (scalingStrength === 'none' || !scalingStrength) {
        return scaling.none
    } else if (scalingStrength === 'x') {
        return 0
    } else {
        return Math.floor(scaling[scalingStrength] + (bonus[scalingStrength] * points))
    }
}

function formatBonus(stat: number | string): string {
    if (typeof stat === 'string') { return stat }

    if (stat < 0) {
        return `${stat}`
    }
    return `+${stat}`
}

export function calculateStat(scalingStrength: Strength, type: WeaponStatsKey, role: string, points: number): number {
    if (!scalingStrength) {
        scalingStrength = primaryCombatRoles[role].meleeCombatStats[type]
    }

    return calculateScalingAndBonus(scalingStrength, points, allScalingAndBonuses[type].scaling, allScalingAndBonuses[type].bonus)
}

export function calculateStatWithFormatting(scalingStrength: Strength, type: WeaponStatsKey, role: string, points: number): string {
    if (!scalingStrength) {
        scalingStrength = primaryCombatRoles[role].meleeCombatStats[type]
    }

    return formatBonus(calculateScalingAndBonus(scalingStrength, points, allScalingAndBonuses[type].scaling, allScalingAndBonuses[type].bonus))
}

export function calculateDefense(scalingStrength: Strength, role: string, points: number, addsizemod: boolean, size: Size = 'Medium'): string {
    const modifiedStat = calculateStat(scalingStrength, 'defense', role, points)

    if (!addsizemod) {
        return formatBonus(modifiedStat)
    } else if (typeof modifiedStat === 'string') {
        return modifiedStat
    }

    const defenseModDictionary = {
        Fine: 12,
        Diminutive: 9,
        Tiny: 6,
        Small: 3,
        Medium: 0,
        Large: -3,
        Huge: -6,
        Giant: -9,
        Enormous: -12,
        Colossal: -15
    }

    return formatBonus(modifiedStat + defenseModDictionary[size])
}

export function calculateCover(scalingStrength: Strength, role: string, points: number): string {
    const modifiedStat = calculateStat(scalingStrength, 'cover', role, points)

    if (modifiedStat > 20) {
        return '* (*)'
    } else if (modifiedStat > 10) {
        return `+${modifiedStat} (*)`
    } else if (modifiedStat <= 0) {
        return '+0'
    }

    return `+${modifiedStat} (+${modifiedStat * 2})`
}

export function calculateParryDR(staticScalingStrength: Strength, slashScalingStrength: Strength, role: string, points: number, eua: boolean): string {
    if (eua) {
        return 'EUA'
    }

    const modifiedStatic = calculateStat(staticScalingStrength, 'parryStaticDR', role, points)
    const modifitedSlash = calculateStat(slashScalingStrength, 'parrySlashDR', role, points)

    return formatDRString(modifiedStatic, modifitedSlash)
}

export function calculateDR(staticScalingStrength: Strength, slashScalingStrength: Strength, role: string, points: number) {
    const modifiedStatic = calculateStat(staticScalingStrength, 'staticDR', role, points)
    const modifitedSlash = calculateStat(slashScalingStrength, 'slashingDR', role, points)

    return formatDRString(modifiedStatic, modifitedSlash)
}

function formatDRString(staticDR: number, slashDR: number): string {
    let drString = '';

    if (staticDR > 0) {
        drString = `${staticDR}`
    }

    if (slashDR > 0) {
        if (drString !== '') {
            drString += ' +'
        }
        drString += `${slashDR}/d`
    }

    if (drString === '') { return '0' }
    return drString
}
