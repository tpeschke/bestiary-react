import { SpecificSkillInfo, NonspecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import getDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import calculateStress from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress"
import getSkills, { filterDuplicateSkills } from "@bestiary/common/utilities/scalingAndBonus/bonfire/skill/getSkills"
import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { getSelectedRoleIndex } from "./getRoleInfo"
import { getSpecialModifier } from "./getSpecialModifier"

export function getSkillInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSkillInfo {
    if (beastInfo.system === 'HackMaster') {
        return getHackMasterSkillInfo(beastInfo, roleId)
    }

    return getBonfireSkillInfo(beastInfo, roleId)
}

export function getRawSkillInfo(beastInfo: BeastInfo, roleId: string | null): NonspecificSkillInfo {
    const entrySkillInfo = beastInfo.skillInfo
    const entryRoleInfo = beastInfo.roleInfo
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const specialModifier = getSpecialModifier(beastInfo)

    const { skillRole: role, skillSecondary: secondary, skillSkulls: skulls, skullIndex: skullIndexValue, stress, skills: mainSkills } = entrySkillInfo

    const roleSelected = index >= 0

    const skillRole = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillRole : role
    const skillSecondary = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillSecondary : secondary

    const skillSkulls = (roleSelected ? entryRoleInfo.roles[index].skillInfo.skillSkulls : skulls) + specialModifier
    const skullIndex = (roleSelected ? entryRoleInfo.roles[index].skillInfo.skullIndex : skullIndexValue) + specialModifier

    const skills = roleSelected ? entryRoleInfo.roles[index].skillInfo.skills : mainSkills

    return {
        ...entrySkillInfo,
        stress: {
            threshold: calculateStress(skillSecondary, skullIndex, stress.strength),
            strength: stress.strength,
            defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex)
        },
        skillRole, skillSecondary, skillSkulls, skullIndex,
        skills: getSkills(skillRole, skullIndex, skills?.everythingElseStrength, skills)
    }
}

function getBonfireSkillInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSkillInfo {
    const entrySkillInfo = beastInfo.skillInfo
    const entryRoleInfo = beastInfo.roleInfo
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const specialModifier = getSpecialModifier(beastInfo)

    const { skillRole: role, skillSecondary: secondary, skillSkulls: skulls, skullIndex: skullIndexValue, stress, skills: mainSkills } = entrySkillInfo

    const roleSelected = index >= 0

    const skillRole = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillRole : role
    const skillSecondary = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillSecondary : secondary

    const skillSkulls = (roleSelected ? entryRoleInfo.roles[index].skillInfo.skillSkulls : skulls) + specialModifier
    const skullIndex = (roleSelected ? entryRoleInfo.roles[index].skillInfo.skullIndex : skullIndexValue) + specialModifier

    const skills = roleSelected ? entryRoleInfo.roles[index].skillInfo.skills : mainSkills

    let attackInfo = entrySkillInfo.attackInfo[BONFIRE]
    let defenseInfo = entrySkillInfo.defenseInfo[BONFIRE]

    if (roleSelected) {
        const { attackInfo: attack, defenseInfo: defense } = entryRoleInfo.roles[index].skillInfo
        if (attack) { attackInfo += attack[BONFIRE] }
        if (defense) { defenseInfo += defense[BONFIRE] }
    }

    return {
        ...entrySkillInfo,
        type: 'Bonfire',
        attackInfo,
        defenseInfo,
        stress: {
            threshold: calculateStress(skillSecondary, skullIndex, stress.strength),
            strength: stress.strength,
            defenseNFleeDice: getDefenseNFlee(skillRole, skullIndex)
        },
        skillRole, skillSecondary, skillSkulls, skullIndex,
        skills: getSkills(skillRole, skullIndex, skills?.everythingElseStrength, skills)
    }
}

function getHackMasterSkillInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSkillInfo {
    const entrySkillInfo = beastInfo.skillInfo
    const entryRoleInfo = beastInfo.roleInfo
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const specialModifier = getSpecialModifier(beastInfo)

    const { skillRole: role, skillSecondary: secondary, stress, skills: mainSkills, skillEpValue: mainEpValue, skillRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex } = entrySkillInfo

    const roleSelected = index >= 0

    const skillRole = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillRole : role
    const skillSecondary = roleSelected ? entryRoleInfo.roles[index].skillInfo.skillSecondary : secondary

    const epPercentIncrease = (specialModifier / 10) + 1

    const epValue = +((roleSelected ? entryRoleInfo.roles[index].skillInfo.skillEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
    const rawEpValue = (roleSelected ? entryRoleInfo.roles[index].skillInfo.skillRawEpValue : mainRawEpValue)
    const epValueIndex = (roleSelected ? entryRoleInfo.roles[index].skillInfo.epValueIndex : mainEpValueIndex) + specialModifier

    const skills = roleSelected ? entryRoleInfo.roles[index].skillInfo.skills : mainSkills

    let attackInfo = entrySkillInfo.attackInfo[HACKMASTER]
    let defenseInfo = entrySkillInfo.defenseInfo[HACKMASTER]

    if (roleSelected) {
        const { attackInfo: attack, defenseInfo: defense } = entryRoleInfo.roles[index].skillInfo
        if (attack) { attackInfo += attack[HACKMASTER] }
        if (defense) { defenseInfo += defense[HACKMASTER] }
    }

    return {
        ...entrySkillInfo,
        type: 'HackMaster',
        attackInfo,
        defenseInfo,
        stress: {
            threshold: calculateStress(skillSecondary, epValueIndex, stress.strength),
            strength: stress.strength,
            defenseNFleeDice: getDefenseNFlee(skillRole, epValueIndex)
        },
        skillRole, skillSecondary,
        skillEpValue: epValue,
        skillRawEpValue: rawEpValue, epValueIndex,
        skills: filterDuplicateSkills(getSkills(skillRole, epValueIndex, skills?.everythingElseStrength, skills, 'HackMaster'))
    }
}