import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { NonspecificCombatInfo, LocationVitality, BonfireDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size, SystemInfoArray } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import calculateRollUnderTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/calculateRollUnderTrauma"
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import getBonfireDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import { BeastInfo } from "../../../../../interfaces/viewInterfaces"
import { getGeneralInfo } from "../../getGeneralInfo"
import { getSelectedRoleIndex } from "../../getRoleInfo"
import { getSpells } from "../../getWeirdingInfo"
import { createCombatInfoObject, CombatInfoObject } from "../getCombatInfo"
import adjustAttackInfo from "./adjustAttackInfo"
import adjustMovementInfo from "./adjustMovementInfo"
import adjustBonfireDefenseInfo from "./bonfireSpecific/bonfireDefenses"
import { populateVitalityInfo } from "./populateVitality"

export function getRawCombatInfoByRole(beastInfo: BeastInfo, roleId: string | null): NonspecificCombatInfo {
    const index = getSelectedRoleIndex(beastInfo, roleId)
    const roleID: string = beastInfo.roleInfo.roles[index]?.id
    const selectedRole = beastInfo.roleInfo.roles[index]

    const combatInfoObject = createCombatInfoObject(beastInfo.combatInfo, beastInfo.system)
    const size = getGeneralInfo(beastInfo, roleId).size

    return formatRawCombatInfoByRole(combatInfoObject, size, roleID, selectedRole, getSpells(beastInfo, roleId))
}

export function formatRawCombatInfoByRole(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, spells: Spell[]): NonspecificCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const skulls = (selectedRole ? selectedRole.combatInfo.combatSkulls : combatSkulls)
    const skullIndex = (selectedRole ? selectedRole.combatInfo.skullIndex : combatSkullIndex)

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let roleDefenseInfo: SystemInfoArray | undefined;
    let roleAttackInfo: SystemInfoArray | undefined;

    if (selectedRole) {
        const { defenseInfo: roleDefense, attackInfo: roleAttack } = selectedRole.combatInfo
        if (roleAttack) { roleAttackInfo = roleAttack }
        if (roleDefense) { roleDefenseInfo = roleDefense }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        combatRole, combatSecondary,
        combatSkulls: skulls,
        attackInfo: combatInfoObject.entryCombatInfo.attackInfo,
        roleAttackInfo,
        defenseInfo: combatInfoObject.entryCombatInfo.defenseInfo,
        roleDefenseInfo,
        skullIndex,
        initiative: getInitiative(combatRole, skullIndex, 'Bonfire'),
        vitalityInfo: {
            ...vitalityInfo,
            rollUnderTrauma: calculateRollUnderTrauma(skullIndex, 'Bonfire'),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, skullIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, vitalityInfo.hasNoVitality, 'Bonfire'),
            locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
            defenseNFleeDice: getBonfireDefenseNFlee(combatRole, skullIndex)
        },
        attacks: attacks.reduce(adjustAttackInfo(skullIndex, roleID, combatRole, size, spells, 'Bonfire'), []),
        defenses: (defenses as BonfireDefenseInfo[]).reduce(adjustBonfireDefenseInfo(skullIndex, roleID, combatRole, size), [] as BonfireDefenseInfo[]),
        movements: movements.reduce(adjustMovementInfo(skullIndex, roleID, combatRole), [])
    }
}