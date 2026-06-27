import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { BonfireCombatInfo, LocationVitality, BonfireDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { BONFIRE } from "@bestiary/common/utilities/get/getSystemString"
import calculateRollUnderTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/calculateRollUnderTrauma"
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import getBonfireDefenseNFlee from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import { CombatInfoObject } from "../../getCombatInfo"
import adjustAttackInfo from "../adjustAttackInfo"
import adjustMovementInfo from "../adjustMovementInfo"
import { populateVitalityInfo } from "../populateVitality"
import adjustBonfireDefenseInfo from "./bonfireDefenses"

export default function getBonfireCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, selectedModifier: number, spells: Spell[]): BonfireCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatSkulls, skullIndex: combatSkullIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const skulls = (selectedRole ? selectedRole.combatInfo.combatSkulls : combatSkulls) + selectedModifier
    const skullIndex = (selectedRole ? selectedRole.combatInfo.skullIndex : combatSkullIndex) + selectedModifier

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let attackInfo = combatInfoObject.entryCombatInfo.attackInfo[BONFIRE]
    let defenseInfo = combatInfoObject.entryCombatInfo.defenseInfo[BONFIRE]

    if (selectedRole) {
        const { attackInfo: roleAttack, defenseInfo: roleDefense } = selectedRole.combatInfo
        if (roleAttack[BONFIRE]) { attackInfo += roleAttack[BONFIRE] }
        if (roleDefense[BONFIRE]) { defenseInfo += roleDefense[BONFIRE] }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        type: 'Bonfire',
        combatRole, combatSecondary,
        combatSkulls: skulls,
        skullIndex,
        attackInfo,
        defenseInfo,
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