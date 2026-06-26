import { SystemOption } from "@bestiary/common/interfaces/beast/beast"
import { Conflict, SpecificSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces"
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import { CharacteristicWithRanks, calculateRankForCharacteristic } from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/calculateRankForCharacteristic"
import getCapacity from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity"
import getSocialSkillSuites from "@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/utilities/getSocialSkillSuites"
import { BeastInfo } from "../../../interfaces/viewInterfaces"
import { getCombatInfo } from "../activeBeastSelectors"
import { getSelectedRoleIndex } from "./getRoleInfo"
import { getSpecialModifier } from "./getSpecialModifier"

function adjustCharacteristicRank(type: CharacteristicWithRanks, skullIndex: number, roleID: string, role: string, system: SystemOption) {
    return (characteristics: Conflict[], characteristic: Conflict): Conflict[] => {
        if (!characteristic.socialRoleID || characteristic.socialRoleID === roleID || characteristic.allRoles) {
            characteristics.push({
                ...characteristic,
                rank: calculateRankForCharacteristic(type, skullIndex, role, system)
            })
        }
        return characteristics
    }
}

export function getSocialInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSocialInfo {
    if (beastInfo.system === 'HackMaster') {
        return getHackMasterSocialInfo(beastInfo, roleId)
    }

    return getBonfireSocialInfo(beastInfo, roleId)
}

function getBonfireSocialInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSocialInfo {
    const entrySocialInfo = beastInfo.socialInfo
    const entryRoleInfo = beastInfo.roleInfo
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const specialModifier = getSpecialModifier(beastInfo)

    const { conflicts, socialRole: role, socialSecondary: secondary, socialSkulls: skulls, skullIndex: mainSkullIndex, capacity: mainCapacity } = entrySocialInfo

    if (conflicts) {
        const { descriptions, relationships, flaws, burdens } = conflicts
        const roleID = entryRoleInfo.roles[index]?.id

        const roleSelected = index >= 0

        const socialRole = roleSelected ? entryRoleInfo.roles[index].socialInfo.socialRole : role
        const socialSecondary = roleSelected ? entryRoleInfo.roles[index].socialInfo.socialSecondary : secondary

        const capacity = roleSelected ? entryRoleInfo.roles[index].socialInfo.capacity : mainCapacity

        const socialSkulls = (roleSelected ? entryRoleInfo.roles[index].socialInfo.socialSkulls : skulls) + specialModifier
        const skullIndex = (roleSelected ? entryRoleInfo.roles[index].socialInfo.skullIndex : mainSkullIndex) + specialModifier

        let attackInfo = entrySocialInfo.attackInfo[BONFIRE]
        let defenseInfo = entrySocialInfo.defenseInfo[BONFIRE]

        if (roleSelected) {
            const { attackInfo: attack, defenseInfo: defense } = entryRoleInfo.roles[index].socialInfo
            if (attack) { attackInfo += attack[BONFIRE] }
            if (defense) { defenseInfo += defense[BONFIRE] }
        }

        return {
            ...entrySocialInfo,
            type: 'Bonfire',
            socialRole, socialSecondary, attackInfo, defenseInfo, socialSkulls,
            isSwarm: !!getCombatInfo(beastInfo, roleId).attacks.find(attackInfo => {
                return attackInfo.infoType === 'swarm'
            }),
            capacity: {
                threshold: getCapacity(skullIndex, socialRole, socialSecondary, capacity.strength, 'Bonfire'),
                strength: capacity.strength
            },
            baseDescriptionRank: calculateRankForCharacteristic('Descriptions', skullIndex, socialRole, 'Bonfire'),
            conflicts: {
                socialSkillSuites: getSocialSkillSuites(socialRole, skullIndex),
                descriptions: descriptions.reduce(adjustCharacteristicRank('Descriptions', skullIndex, roleID, socialRole, 'Bonfire'), []),
                relationships: relationships.reduce(adjustCharacteristicRank('Relationships', skullIndex, roleID, socialRole, 'Bonfire'), []),
                flaws: flaws.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles),
                burdens: burdens.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles)
            }
        }
    }

    return getSocialInfo(beastInfo, roleId)
}

function getHackMasterSocialInfo(beastInfo: BeastInfo, roleId: string | null): SpecificSocialInfo {
    const entrySocialInfo = beastInfo.socialInfo
    const entryRoleInfo = beastInfo.roleInfo
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const specialModifier = getSpecialModifier(beastInfo)

    const { conflicts, socialRole: role, socialSecondary: secondary, socialEpValue: mainEpValue, socialRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex, capacity: mainCapacity } = entrySocialInfo

    if (conflicts) {
        const { descriptions, relationships, flaws, burdens } = conflicts
        const roleID = entryRoleInfo.roles[index]?.id

        const roleSelected = index >= 0

        const socialRole = roleSelected ? entryRoleInfo.roles[index].socialInfo.socialRole : role
        const socialSecondary = roleSelected ? entryRoleInfo.roles[index].socialInfo.socialSecondary : secondary

        const capacity = roleSelected ? entryRoleInfo.roles[index].socialInfo.capacity : mainCapacity

        const epPercentIncrease = (specialModifier / 10) + 1

        const epValue = +((roleSelected ? entryRoleInfo.roles[index].socialInfo.socialEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
        const rawEpValue = (roleSelected ? entryRoleInfo.roles[index].socialInfo.socialRawEpValue : mainRawEpValue)
        const epValueIndex = (roleSelected ? entryRoleInfo.roles[index].socialInfo.epValueIndex : mainEpValueIndex) + specialModifier

        let attackInfo = entrySocialInfo.attackInfo[HACKMASTER]
        let defenseInfo = entrySocialInfo.defenseInfo[HACKMASTER]

        if (roleSelected) {
            const { attackInfo: attack, defenseInfo: defense } = entryRoleInfo.roles[index].socialInfo
            if (attack) { attackInfo += attack[HACKMASTER] }
            if (defense) { defenseInfo += defense[HACKMASTER] }
        }

        return {
            ...entrySocialInfo,
            type: 'HackMaster',
            attackInfo,
            defenseInfo,
            socialRole, socialSecondary,
            socialEpValue: epValue,
            socialRawEpValue: rawEpValue,
            epValueIndex,
            capacity: {
                threshold: getCapacity(epValueIndex, socialRole, socialSecondary, capacity.strength, 'HackMaster'),
                strength: capacity.strength
            },
            baseDescriptionRank: 0,
            conflicts: {
                socialSkillSuites: getSocialSkillSuites(socialRole, epValueIndex, 'HackMaster'),
                descriptions: descriptions.reduce(adjustCharacteristicRank('Descriptions', epValueIndex, roleID, socialRole, 'HackMaster'), []),
                relationships: relationships.reduce(adjustCharacteristicRank('Relationships', epValueIndex, roleID, socialRole, 'HackMaster'), []),
                flaws: flaws.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles),
                burdens: burdens.filter((info: Conflict) => !info.socialRoleID || info.socialRoleID === roleID || info.allRoles)
            }
        }
    }

    return getSocialInfo(beastInfo, roleId)
}