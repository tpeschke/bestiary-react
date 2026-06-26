import { BeastInfo } from '../../interfaces/viewInterfaces'

import CastingClass from '../../pages/view/gmView/components/weirdshaping/models/CastingClass'

import { NonspecificSocialInfo, SpecificSocialInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/socialInfoInterfaces'
import { NonspecificSkillInfo, SpecificSkillInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces'
import { NonspecificGeneralInfo, SaveObject, SpecificGeneralInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces'
import { Spell } from '@bestiary/common/interfaces/beast/infoInterfaces/castingInfo'
import { NonspecificCombatInfo, SpecificCombatInfo } from '@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces'
import { SystemOption } from '@bestiary/common/interfaces/beast/beast'
import { getSelfDoubtDie } from './utilities/bonfireSpecific/getSelfDoubtDie'
import { getCombatInfo, getRawCombatInfoByRole, getCombatRoleType } from './utilities/getCombatInfo'
import { getGeneralInfo, getRawGeneralInfo } from './utilities/getGeneralInfo'
import { getMaxPoints } from './utilities/getMaxPoints'
import { getSelectedRoleIndex, getSelectedRoleID, getRoleName } from './utilities/getRoleInfo'
import { getSkillInfo, getRawSkillInfo } from './utilities/getSkillInfo'
import { getSocialInfo } from './utilities/getSocialInfo'
import { getCastingInfo, getSpells } from './utilities/getWeirdingInfo'
import { getSaves } from './utilities/hackMasterSpecific/getSaves'

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

export const selectGmView = (beastInfo: BeastInfo | undefined, roleId: string | null): GmViewModel | undefined => {
    if (!beastInfo) { return undefined }

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

export const selectEditView = (beastInfo: BeastInfo | undefined, roleId: string | null): EditViewModel | undefined => {
    if (!beastInfo) { return undefined }

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