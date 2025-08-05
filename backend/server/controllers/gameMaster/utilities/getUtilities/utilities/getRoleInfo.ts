import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/combat/knockBackCalculator"
import { calculateVitalityFatigueAndTrauma } from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityFatigueAndTraumaCalculator"
import { calculateStressAndPanic } from "@bestiary/common/utilities/scalingAndBonus/skill/stressAndPanicCalculator"
import { sortTemplateRoles } from "../../../../../utilities/sorts"

export interface UnsortedRole {
    id: string,
    name: string,
    role: string,
    size: Size,
    hash: string,
    vitality: string,
    attack: string,
    defense: string,
    notrauma: boolean,
    secondaryrole: string,
    combatpoints: number,
    fatigue: Strength,
    largeweapons: Strength,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    panicstrength: Strength,
    stressstrength: Strength,
    skillpoints: number,
    skillrole: string,
    attack_skill: string,
    defense_skill: string,
    skillsecondary: string,
    socialpoints: number,
    socialrole: string,
    socialsecondary: string,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}

export async function getRoles(databaseConnection: any, beastId: number, beastName: string): Promise<Role[]> {
    const roles: UnsortedRole[] = await databaseConnection.beast.role.get(beastId)

    if (beastName.includes('Template')) {
        return roles.sort(sortTemplateRoles).map(formatUnsortedRoles)
    }

    return roles.map(formatUnsortedRoles)
}

function formatUnsortedRoles(unsortedRole: UnsortedRole): Role {
    const { id, name, role: combatrole, size, hash, attack, defense, secondaryrole: combatsecondary, combatpoints, fatigue: fatigueStrength, largeweapons: vitalityStrength, knockback, singledievitality, noknockback, rollundertrauma,
        isincorporeal, weaponbreakagevitality, panicstrength, stressstrength, skillpoints, skillrole, attack_skill, defense_skill, skillsecondary, socialpoints, socialrole,
        socialsecondary, attack_conf, defense_conf, hasarchetypes, hasmonsterarchetypes, notrauma } = unsortedRole

    return {
        id,
        generalInfo: {
            name, size, hash
        },
        combatInfo: {
            attack, defense, combatrole, combatsecondary, combatpoints,
            vitalityInfo: {
                notrauma, singledievitality, noknockback, rollundertrauma, isincorporeal, weaponbreakagevitality,
                vitalityStrength, fatigueStrength,
                knockback: calculateKnockBack(knockback, size),
                ...calculateVitalityFatigueAndTrauma(combatrole, combatsecondary, combatpoints, vitalityStrength, fatigueStrength),
                locationalVitalities: []
            },
            initiative: '+20'
        },
        skillInfo: {
            skillpoints, skillrole, attack_skill, defense_skill, skillsecondary,
            stressStrength: stressstrength,
            panicStrength: panicstrength,
            ...calculateStressAndPanic(skillrole, skillsecondary, skillpoints, stressstrength, panicstrength)
        },
        socialInfo: {
            socialpoints, socialrole, socialsecondary, attack_conf, defense_conf,
            hasarchetypes, hasmonsterarchetypes
        }
    }
}