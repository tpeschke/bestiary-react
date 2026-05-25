import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { NonspecificRoleInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces"
import { Strength } from "@bestiary/common/interfaces/calculationInterfaces"
import calculateKnockBack from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/knockBackCalculator"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress"
import { sortTemplateRoles } from "../../../../../../utilities/sorts"
import query from "../../../../../../db/database"
import { getMonsterRoleInfo } from "../../../../../../db/beast/role"
import getSkullNumber from "./getSkulls"
import getSkullIndex from "@bestiary/common/utilities/scalingAndBonus/getSkullIndex"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity"
import getGenericSkillSuites from "./skillInfo/utilities/getSkillSuites"
import getEPIndex from "@bestiary/common/utilities/scalingAndBonus/getEPIndex"
import getBaseEPValue from "@bestiary/common/utilities/scalingAndBonus/hackMaster/getEPValue"
import calculateSecondaryRoleEffect from "@bestiary/common/utilities/scalingAndBonus/calculateSecondaryRoleEffect"
import { buildSystemSpecificInfo } from "../../formatUtilities/getSystemSpecificTerminologies"

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
    combatepvalue: number,
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
    skillepvalue: number,
    skillrole: string,
    attack_skill: string,
    defense_skill: string,
    skillsecondary: string,
    socialpoints: number,
    socialskulls: number,
    socialepvalue: number,
    socialrole: string,
    socialsecondary: string,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    capacity: Strength,
    everythingelsestrength: Strength
}

export async function getRoles(beastId: number, beastName: string): Promise<NonspecificRoleInfo[]> {
    const roles: UnsortedRole[] = await query(getMonsterRoleInfo, beastId)

    if (beastName.includes('Template')) {
        return Promise.all(roles.sort(sortTemplateRoles).map(formatUnsortedRoles))
    }

    return Promise.all(roles.map(formatUnsortedRoles))
}

async function formatUnsortedRoles(unsortedRole: UnsortedRole): Promise<NonspecificRoleInfo> {
    const {
        id, beastid, name, role: combatRole, combatpoints: combatPoints, size, hash, attack, defense, secondaryrole: combatSecondary,
        knockback, singledievitality: singleDieVitality, noknockback: noKnockback, rollundertrauma: rollUnderTrauma,
        isincorporeal: isIncorporeal, weaponbreakagevitality: weaponBreakageVitality, skillpoints: skillPoints, skillrole: skillRole,
        attack_skill, defense_skill, skillsecondary: skillSecondary, socialpoints: socialPoints, socialrole: socialRole,
        socialsecondary: socialSecondary, attack_conf: attackInfo, defense_conf: defenseInfo, hasarchetypes, hasmonsterarchetypes,
        notrauma: noTrauma, socialskulls, combatskulls, skillskulls, capacity: capacityStrength, mental: stressThresholdStrength,
        everythingelsestrength: everythingElseStrength, socialepvalue, combatepvalue, skillepvalue
    } = unsortedRole

    const socialSkulls = socialskulls ?? getSkullNumber(socialPoints)
    const socialSkullIndex = getSkullIndex(socialSkulls)

    const baseSocialEpValue = socialepvalue ?? getBaseEPValue(socialSkulls)
    const socialEpValueIndex = getEPIndex(baseSocialEpValue)

    const combatSkulls = combatskulls ?? getSkullNumber(combatPoints)
    const combatSkullIndex = getSkullIndex(combatSkulls)

    const baseCombatEpValue = combatepvalue ?? getBaseEPValue(combatSkulls)
    const combatEpValueIndex = getEPIndex(baseCombatEpValue)

    const skillSkulls = skillskulls ?? getSkullNumber(skillPoints)
    const skillSkullIndex = getSkullIndex(skillSkulls)

    const baseSkillEpValue = skillepvalue ?? getBaseEPValue(skillSkulls)
    const skillEpValueIndex = getEPIndex(baseSkillEpValue)

    return {
        id,
        generalInfo: {
            name, size, hash
        },
        combatInfo: {
            attackInfo: buildSystemSpecificInfo(attack), 
            defenseInfo: buildSystemSpecificInfo(defense), 
            combatRole, combatSecondary,
            combatSkulls,
            skullIndex: combatSkullIndex,
            combatEpValue: calculateSecondaryRoleEffect(baseCombatEpValue, combatSecondary),
            combatRawEpValue: baseCombatEpValue,
            epValueIndex: combatEpValueIndex,
            vitalityInfo: {
                noTrauma, singleDieVitality, noKnockback, rollUnderTrauma, isIncorporeal, weaponBreakageVitality,
                knockback: calculateKnockBack(knockback, size),
                ...calculateVitalityAndTrauma(combatRole, combatSecondary, combatSkulls, weaponBreakageVitality, singleDieVitality, size, 'Bonfire'),
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
            skillEpValue: calculateSecondaryRoleEffect(baseSkillEpValue, skillSecondary),
            skillRawEpValue: baseSkillEpValue,
            epValueIndex: skillEpValueIndex,
            stress: {
                threshold: calculateStress(skillSecondary, skillSkullIndex, stressThresholdStrength),
                strength: stressThresholdStrength
            },
            skills: await getGenericSkillSuites(beastid, id, skillRole, skillSkullIndex, everythingElseStrength)
        },
        socialInfo: {
            socialRole, socialSecondary, attackInfo, defenseInfo,
            socialSkulls,
            skullIndex: socialSkullIndex,
            socialEpValue: calculateSecondaryRoleEffect(baseSocialEpValue, socialSecondary),
            socialRawEpValue: baseSocialEpValue,
            epValueIndex: socialEpValueIndex,
            capacity: {
                threshold: getCapacity(socialSkullIndex, socialRole, socialSecondary, capacityStrength),
                strength: capacityStrength
            },
            hasarchetypes, hasmonsterarchetypes
        }
    }
}