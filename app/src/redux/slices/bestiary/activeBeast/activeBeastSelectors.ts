import { createSelector } from '@reduxjs/toolkit'

import { BeastInfo } from '../../../../pages/bestiary/beast/interfaces/viewInterfaces'
import { ActiveBeastState } from './activeBeastInterfaces'

import CombatInfoClass from '../../../../pages/bestiary/beast/models/gmBeastClass/components/CombatInfoClass'
import CastingClass from '../../../../pages/bestiary/beast/pages/view/gmView/components/weirdshaping/models/CastingClass'

import { Conflict, NonspecificSocialInfo, SpecificSocialInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import { NonspecificSkillInfo, SpecificSkillInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import calculateStress from '@bestiary/common/utilities/scalingAndBonus/bonfire/skill/calculateStress'
import { calculateRankForCharacteristic, CharacteristicWithRanks } from '@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/calculateRankForCharacteristic'
import getSocialSkillSuites from '@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/utilities/getSocialSkillSuites'
import { NonspecificGeneralInfo, SaveObject, SpecificGeneralInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import getCapacity from '@bestiary/common/utilities/scalingAndBonus/bonfire/confrontation/getCapacity'
import getSkills, { filterDuplicateSkills } from '@bestiary/common/utilities/scalingAndBonus/bonfire/skill/getSkills'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'
import getDefenseNFlee from '@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee'
import { BONFIRE, HACKMASTER } from '@bestiary/common/utilities/get/getSystemString'
import getPhysicalSave from '@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getPhysicalSave'
import getMentalSave from '@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getMentalSave'
import getDodgeSave from '@bestiary/common/utilities/scalingAndBonus/hackMaster/saves/getDodgeSave'
import { getRarity } from '@bestiary/common/utilities/get/getRarity'
import { NonspecificCombatInfo, SpecificCombatInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import { Role } from '@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces'
import { SystemOption } from '@bestiary/common/interfaces/beast/beast'

/**
 * All of the data-transformation logic that used to live in `GMBeastClass`.
 *
 * Each function is a pure transformation of the raw `BeastInfo` (plus the
 * ephemeral `roleId` coming from the URL). The memoized selectors at the bottom
 * read the active beast out of the redux store and produce the view models that
 * the GM view and the edit view consume.
 */

function getRoleIndex(roles: Role[], defaultRole: string, roleId: string | null): number {
    if (roleId) {
        return roles.findIndex(role => roleId === role.id)
    }

    return roles.findIndex(role => defaultRole === role.id)
}

export function getSelectedRoleIndex(beastInfo: BeastInfo, roleId: string | null): number {
    return getRoleIndex(beastInfo.roleInfo.roles, beastInfo.roleInfo.defaultrole, roleId)
}

function isRoleSelected(beastInfo: BeastInfo, roleId: string | null): boolean {
    return getSelectedRoleIndex(beastInfo, roleId) >= 0
}

export function getSelectedRole(beastInfo: BeastInfo, roleId: string | null): Role | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index]
    }

    return null
}

export function getSelectedRoleID(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].id
    }

    return null
}

function getSpecialModifier(beastInfo: BeastInfo): number {
    if (beastInfo.system === 'HackMaster') {
        return beastInfo.roleModifier * 3
    }

    return beastInfo.roleModifier
}

function getRoleName(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].generalInfo.name
    }

    return null
}

function filterSpells(roleID: string | null) {
    return (spells: Spell[], spell: Spell) => {
        if (spell.allroles || spell.roleid === roleID) {
            spells.push(spell)
        }
        return spells
    }
}

export function getSpells(beastInfo: BeastInfo, roleId: string | null): Spell[] {
    const entrySpells = beastInfo.castingInfo?.spells ?? []
    return entrySpells.reduce(filterSpells(getSelectedRoleID(beastInfo, roleId)), [])
}

export function getCastingInfo(beastInfo: BeastInfo): CastingClass {
    return new CastingClass(beastInfo.castingInfo?.casting)
}

export function getGeneralInfo(beastInfo: BeastInfo, roleId: string | null): SpecificGeneralInfo {
    const entryGeneralInfo = beastInfo.generalInfo
    const { size: mainSize, rarity: baseRarity, appearance } = entryGeneralInfo

    const roleSelected = isRoleSelected(beastInfo, roleId)
    const index = getSelectedRoleIndex(beastInfo, roleId)

    const size = roleSelected ? beastInfo.roleInfo.roles[index].generalInfo.size : mainSize

    const rarity = getRarity(baseRarity.rarityId, beastInfo.system)

    return {
        ...entryGeneralInfo,
        rarity,
        appearance: beastInfo.system === 'Bonfire' ? appearance[BONFIRE] : appearance[HACKMASTER],
        // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
        size: size ?? mainSize
    }
}

export function getRawGeneralInfo(beastInfo: BeastInfo, roleId: string | null): NonspecificGeneralInfo {
    const entryGeneralInfo = beastInfo.generalInfo
    const { size: mainSize, rarity: baseRarity } = entryGeneralInfo

    const roleSelected = isRoleSelected(beastInfo, roleId)
    const index = getSelectedRoleIndex(beastInfo, roleId)

    const size = roleSelected ? beastInfo.roleInfo.roles[index].generalInfo.size : mainSize

    const rarity = getRarity(baseRarity.rarityId, beastInfo.system)

    return {
        ...entryGeneralInfo,
        rarity,
        // a Role's size can be null, in which case, it defaults to the default size, so this is what this is doing
        size: size ?? mainSize
    }
}

export function getMaxPoints(beastInfo: BeastInfo): number {
    const { combatSkulls } = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo
    const specialModifier = getSpecialModifier(beastInfo)

    return Math.max(combatSkulls + specialModifier, skillSkulls + specialModifier, socialSkulls + specialModifier)
}

export function getSelfDoubtDie(beastInfo: BeastInfo): string {
    const { combatSkulls } = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const { skillSkulls } = beastInfo.skillInfo
    const { socialSkulls } = beastInfo.socialInfo

    const average = Math.floor([combatSkulls, skillSkulls, socialSkulls].reduce((a, b) => a + b) / 3)

    const selfDoubtDieDictionary = ['d20', 'd12', 'd10', 'd8', 'd6', 'd4', 'd0']

    return selfDoubtDieDictionary[average]
}

export function getSaves(beastInfo: BeastInfo, roleId: string | null): [SaveObject, SaveObject, SaveObject] | null {
    if (beastInfo.system === 'HackMaster') {
        const { epValueIndex: mainSocialEpValueIndex } = beastInfo.socialInfo
        const { epValueIndex: mainSkillEpValueIndex } = beastInfo.skillInfo
        const { epValueIndex: mainCombatEpValueIndex } = beastInfo.combatInfo

        const roleSelected = isRoleSelected(beastInfo, roleId)
        const index = getSelectedRoleIndex(beastInfo, roleId)
        const selectedModifier = beastInfo.roleModifier

        const socialEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].socialInfo.epValueIndex : mainSocialEpValueIndex) + selectedModifier
        const skillEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].skillInfo.epValueIndex : mainSkillEpValueIndex) + selectedModifier
        const combatEpValueIndex = (roleSelected ? beastInfo.roleInfo.roles[index].combatInfo.epValueIndex : mainCombatEpValueIndex) + selectedModifier

        return [{
            label: 'Physical',
            rank: getPhysicalSave(combatEpValueIndex)
        }, {
            label: 'Mental',
            rank: getMentalSave(socialEpValueIndex)
        }, {
            label: 'Dodge',
            rank: getDodgeSave(skillEpValueIndex)
        }]
    }

    return null
}

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

export function getCombatInfo(beastInfo: BeastInfo, roleId: string | null): SpecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoClass = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    const combatInfo = combatInfoClass.combatInfo(size, roleID, selectedRole, getSpecialModifier(beastInfo), getSpells(beastInfo, roleId)) as unknown as NonspecificCombatInfo
    combatInfo.vitalityInfo.isSwarm = !!combatInfo.attacks.find(attackInfo => attackInfo.infoType === 'swarm')
    return combatInfo as unknown as SpecificCombatInfo
}

export function getRawCombatInfoByRole(beastInfo: BeastInfo, roleId: string | null): NonspecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoClass = new CombatInfoClass(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    return combatInfoClass.rawCombatInfoByRole(size, roleID, selectedRole, getSpells(beastInfo, roleId))
}

export function getCombatRoleType(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].combatInfo.combatRole
    }

    return getCombatInfo(beastInfo, roleId).combatRole
}

const selectActiveBeastInfo = (state: { activeBeast: ActiveBeastState }): BeastInfo | null => state.activeBeast.beastInfo
const selectActiveRoleId = (state: { activeBeast: ActiveBeastState }): string | null => state.activeBeast.roleId

export interface GmViewModel {
    id: number,
    generalInfo: SpecificGeneralInfo,
    imageInfo: BeastInfo['imageInfo'],
    socialInfo: SpecificSocialInfo,
    skillInfo: SpecificSkillInfo,
    combatInfo: SpecificCombatInfo,
    linkedInfo: BeastInfo['linkedInfo'],
    lootInfo: BeastInfo['lootInfo'],
    castingInfo: CastingClass,
    spells: Spell[],
    maxPoints: number,
    roleInfo: BeastInfo['roleInfo'],
    selectedRoleIndex: number,
    modifierIndex: number,
    hasModifier: boolean,
    selectedRoleID: string | null,
    roleName: string | null,
    notes: BeastInfo['playerInfo']['notes'],
    favorite: boolean,
    selfDoubtDie: string,
    system: SystemOption,
    saves: [SaveObject, SaveObject, SaveObject] | null
}

export const selectGmView = createSelector(
    [selectActiveBeastInfo, selectActiveRoleId],
    (beastInfo, roleId): GmViewModel | null => {
        if (!beastInfo) { return null }

        return {
            id: beastInfo.id ?? 0,
            generalInfo: getGeneralInfo(beastInfo, roleId),
            imageInfo: beastInfo.imageInfo,
            socialInfo: getSocialInfo(beastInfo, roleId),
            skillInfo: getSkillInfo(beastInfo, roleId),
            combatInfo: getCombatInfo(beastInfo, roleId),
            linkedInfo: beastInfo.linkedInfo,
            lootInfo: beastInfo.lootInfo,
            castingInfo: getCastingInfo(beastInfo),
            spells: getSpells(beastInfo, roleId),
            maxPoints: getMaxPoints(beastInfo),
            roleInfo: beastInfo.roleInfo,
            selectedRoleIndex: getSelectedRoleIndex(beastInfo, roleId),
            modifierIndex: beastInfo.roleModifier,
            hasModifier: !!beastInfo.roleModifier,
            selectedRoleID: getSelectedRoleID(beastInfo, roleId),
            roleName: getRoleName(beastInfo, roleId),
            notes: beastInfo.playerInfo.notes,
            favorite: beastInfo.playerInfo.favorite,
            selfDoubtDie: getSelfDoubtDie(beastInfo),
            system: beastInfo.system,
            saves: getSaves(beastInfo, roleId)
        }
    }
)

export interface EditViewModel {
    id: number,
    rawGeneralInfo: NonspecificGeneralInfo,
    rawCombatInfoByRole: NonspecificCombatInfo,
    rawSkillInfo: NonspecificSkillInfo,
    rawSocialInfo: NonspecificSocialInfo,
    roleInfo: BeastInfo['roleInfo'],
    selectedRoleIndex: number,
    combatRoleType: string | null,
    spells: Spell[],
    linkedInfo: BeastInfo['linkedInfo'],
    imageInfo: BeastInfo['imageInfo']
}

export const selectEditView = createSelector(
    [selectActiveBeastInfo, selectActiveRoleId],
    (beastInfo, roleId): EditViewModel | null => {
        if (!beastInfo) { return null }

        return {
            id: beastInfo.id ?? 0,
            rawGeneralInfo: getRawGeneralInfo(beastInfo, roleId),
            rawCombatInfoByRole: getRawCombatInfoByRole(beastInfo, roleId),
            rawSkillInfo: getRawSkillInfo(beastInfo, roleId),
            rawSocialInfo: beastInfo.socialInfo,
            roleInfo: beastInfo.roleInfo,
            selectedRoleIndex: getSelectedRoleIndex(beastInfo, roleId),
            combatRoleType: getCombatRoleType(beastInfo, roleId),
            spells: getSpells(beastInfo, roleId),
            linkedInfo: beastInfo.linkedInfo,
            imageInfo: beastInfo.imageInfo
        }
    }
)
