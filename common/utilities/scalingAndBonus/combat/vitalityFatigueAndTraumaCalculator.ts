import { Strength } from "../../../interfaces/calculationInterfaces"
import { primaryCombatRoles } from "../../roleInfo/combatRoleInfo"

interface VitalityReturn {
    vitality: string | number,
    trauma: number | boolean,
    fatigue: string | number | boolean
}

export function calculateVitalityFatigueAndTrauma(role: string, secondaryrole: string, points: number, vitalityStrength: Strength, fatigueStrength: Strength): VitalityReturn {
    if (role) {
        if (!vitalityStrength) { vitalityStrength = primaryCombatRoles[role].rangedCombatStats.vitality }
        if (!fatigueStrength) { fatigueStrength = primaryCombatRoles[role].rangedCombatStats.fatigue }
    
        const vitality = calculateVitality(secondaryrole, points, vitalityStrength)
    
        let trauma: number | boolean = false
        if (typeof vitality === 'number') {
            trauma = Math.floor(vitality / 2)
        }
    
        return {
            vitality, trauma,
            fatigue: calculateFatigue(vitality, points, fatigueStrength),
        }
    }

    return {
        vitality: 'N/A', 
        trauma: false,
        fatigue: false
    }
}

function calculateVitality(secondaryrole: string, points: number, strength: Strength): number | string {
    const scaling = {
        majSt: 50,
        minSt: 35,
        none: 25,
        minWk: 20,
        majWk: 15
    }
    const bonus = {
        majSt: 15,
        minSt: 10,
        none: 0,
        minWk: 5,
        majWk: 1
    }

    let baseVitality: number = 0
    if (strength === 'x') {
        return 'N'
    } else if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        baseVitality = scaling.majSt
    } else if (strength === 'noneWk') {
        baseVitality = scaling.majWk
    } else if (strength === 'none' || !strength) {
        baseVitality = scaling.none
    } else {
        baseVitality = scaling[strength] + (bonus[strength] * points)
    }

    if (secondaryrole === 'Fodder') {
        return Math.ceil(baseVitality / 2)
    } else if (secondaryrole === 'Elite') {
        return baseVitality * 2.5
    } else if (secondaryrole === 'Solo') {
        return baseVitality * 3.5
    }

    return baseVitality
}

function calculateFatigue(vitality: number | string, points: number, strength: Strength): number | boolean {
    if (typeof vitality === 'string') {  return false }

    const scaling = {
        majSt: .5,
        minSt: .35,
        none: .25,
        minWk: .1,
        majWk: 0
    }
    const bonus = {
        majSt: .15,
        minSt: .1,
        none: 0,
        minWk: .05,
        majWk: .01
    }

    let fatiguePercentage: number;
    if (strength === 'x') {
        return false
    } else if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        fatiguePercentage = scaling.majSt
    } else if (strength === 'noneWk') {
        fatiguePercentage = scaling.majWk
    } else if (strength === 'none' || !strength) {
        fatiguePercentage = scaling.none
    } else {
        fatiguePercentage = scaling[strength] + (bonus[strength] * points)
    }

    if (fatiguePercentage >= 1) {
        return vitality;
    }

    return Math.ceil(fatiguePercentage * vitality)
}
