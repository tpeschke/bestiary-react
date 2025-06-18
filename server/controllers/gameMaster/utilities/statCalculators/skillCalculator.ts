import { Skill, Strength } from "../../../../interfaces/beastInterfaces/beastInterfaces"

import { primarySkillRoles } from "./roleInfo/skillRoleInfo"

export function formatSkills(mainSkillPoints: number, skillInfo: Skill): Skill {
    const { id, beastid, skill, skillroleid, allroles, strength, adjustment, skillpoints, skillrole } = skillInfo

    const skillPointsToUse = skillpoints ? skillpoints : mainSkillPoints

    return {
        id, beastid, skill, skillroleid, allroles, skillrole,
        rank: calculateRankForSkill(skillPointsToUse, strength, adjustment)
    }
}

function calculateRankForSkill(points: number, strength: Strength = 'minWk', adjustment: number = 0): number {
    const scaling = {
        majSt: 1.25,
        minSt: 1,
        minWk: .75,
        majWk: .5
    }

    const base = {
        majSt: 7,
        minSt: 5,
        minWk: 3,
        majWk: 1
    }

    if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        return 5
    } else if (strength === 'noneWk') {
        return 0
    } else if (strength === 'none' || !strength) {
        return 3
    } else {
        return Math.ceil(base[strength] + (scaling[strength] * (points + adjustment)))
    }
}

export function calculateStressAndPanic(role: string, secondaryrole: string, points: number, stressStrength: Strength, panicStrength: Strength) {
    if (role) {
        if (!stressStrength) { stressStrength = primarySkillRoles[role].mental }
        if (!panicStrength) { panicStrength = primarySkillRoles[role].panic }
    
        const stress = calculateStress(secondaryrole, points, stressStrength)
        return {
            stress, 
            panic: calculatePanic(stress, points, panicStrength)
        }
    }

    return {
        stress: 'N/A', 
        panic: false
    }
}

function calculateStress(secondaryrole: string, points: number, strength: Strength): number | string {
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

    if (strength === 'x') {
        return 'N'
    } else if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        return scaling.majSt
    } else if (strength === 'noneWk') {
        return scaling.majWk
    } else if (strength === 'none' || !strength) {
        return scaling.none
    } else {
        if (secondaryrole === 'Fodder') {
            return Math.ceil((scaling[strength] + (bonus[strength] * points) / 2))
        }
        return scaling[strength] + (bonus[strength] * points)
    }
}

function calculatePanic(stress: number | string, points: number, strength: Strength): number | boolean {
    if (typeof stress === 'string') {  return false }

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

    let panicPercentage: number;
    if (strength === 'x') {
        return false
    } else if (strength === 'one') {
        return 1
    } else if (strength === 'noneStr') {
        panicPercentage = scaling.majSt
    } else if (strength === 'noneWk') {
        panicPercentage = scaling.majWk
    } else if (strength === 'none' || !strength) {
        panicPercentage = scaling.none
    } else {
        panicPercentage = scaling[strength] + (bonus[strength] * points)
    }

    if (panicPercentage > 1) {
        return stress;
    }

    return Math.floor(panicPercentage * stress)
}