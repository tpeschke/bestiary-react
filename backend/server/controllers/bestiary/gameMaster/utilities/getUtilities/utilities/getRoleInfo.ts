import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/combat/knockBackCalculator"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/combat/vitalityAndTraumaCalculator"
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/skill/calculateStress"
import { sortTemplateRoles } from "../../../../../../utilities/sorts"
import query from "../../../../../../db/database"
import { getMonsterRoleInfo } from "../../../../../../db/beast/role"
import getSkullNumber from "./getSkulls"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/confrontation/getCapacity"
import getGenericSkillSuites from "./skillInfo/utilities/getSkillSuites"

export interface UnsortedRole {
    id: string,
    beastid: number,
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
    combatskulls: number,
    fatigue: Strength,
    largeweapons: Strength,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    panicstrength: Strength,
    mental: Strength,
    skillpoints: number,
    skillskulls: number,
    skillrole: string,
    attack_skill: string,
    defense_skill: string,
    skillsecondary: string,
    socialpoints: number,
    socialskulls: number,
    socialrole: string,
    socialsecondary: string,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    capacity: Strength,
    everythingelsestrength: Strength
}

export async function getRoles(beastId: number, beastName: string): Promise<Role[]> {
    const roles: UnsortedRole[] = await query(getMonsterRoleInfo, beastId)

    if (beastName.includes('Template')) {
        return Promise.all(roles.sort(sortTemplateRoles).map(formatUnsortedRoles))
    }

    return Promise.all(roles.map(formatUnsortedRoles))
}

async function formatUnsortedRoles(unsortedRole: UnsortedRole): Promise<Role> {
    const {
        id, beastid, name, role: combatRole, combatpoints: combatPoints, size, hash, attack, defense, secondaryrole: combatSecondary,
        knockback, singledievitality: singleDieVitality, noknockback: noKnockback, rollundertrauma: rollUnderTrauma,
        isincorporeal: isIncorporeal, weaponbreakagevitality: weaponBreakageVitality, skillpoints: skillPoints, skillrole: skillRole,
        attack_skill, defense_skill, skillsecondary: skillSecondary, socialpoints: socialPoints, socialrole: socialRole,
        socialsecondary: socialSecondary, attack_conf: attackInfo, defense_conf: defenseInfo, hasarchetypes, hasmonsterarchetypes,
        notrauma: noTrauma, socialskulls, combatskulls, skillskulls, capacity: capacityStrength, mental: stressThresholdStrength,
        everythingelsestrength: everythingElseStrength
    } = unsortedRole

    const combatSkulls = combatskulls ?? getSkullNumber(combatPoints)
    const combatSkullIndex = getSkullIndex(combatSkulls)

    const socialSkulls = socialskulls ?? getSkullNumber(socialPoints)
    const socialSkullIndex = getSkullIndex(socialSkulls)

    const skillSkulls = skillskulls ?? getSkullNumber(skillPoints)
    const skillSkullIndex = getSkullIndex(skillSkulls)

    return {
        id,
        generalInfo: {
            name, size, hash
        },
        combatInfo: {
            attack, defense, combatRole, combatSecondary,
            combatSkulls,
            skullIndex: combatSkullIndex,
            vitalityInfo: {
                noTrauma, singleDieVitality, noKnockback, rollUnderTrauma, isIncorporeal, weaponBreakageVitality,
                knockback: calculateKnockBack(knockback, size),
                ...calculateVitalityAndTrauma(combatRole, combatSecondary, combatSkulls),
                locationalVitalities: [],
                defenseNFleeDice: {
                    defense: null,
                    flee: null
                },
            },
            initiative: '+20'
        },
        skillInfo: {
            skillRole, skillSecondary, skillSkulls,
            attackInfo: attack_skill,
            defenseInfo: defense_skill,
            skullIndex: skillSkullIndex,
            stress: {
                threshold: calculateStress(skillSecondary, skillSkullIndex, stressThresholdStrength),
                strength: stressThresholdStrength
            },
            skills: await getGenericSkillSuites(beastid, id, skillRole, skillSkullIndex, everythingElseStrength)
        },
        socialInfo: {
            socialSkulls, socialRole, socialSecondary, attackInfo, defenseInfo,
            skullIndex: socialSkullIndex,
            capacity: {
                threshold: getCapacity(socialSkullIndex, socialRole, socialSecondary, capacityStrength),
                strength: capacityStrength
            },
            hasarchetypes, hasmonsterarchetypes
        }
    }
}