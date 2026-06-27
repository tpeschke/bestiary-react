import { Spell } from "@bestiary/common/interfaces/beast/infoInterfaces/castingInfo"
import { HackMasterCombatInfo, LocationVitality, HackMasterDefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { Role } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/roleInfoInterfaces"
import { HACKMASTER } from "@bestiary/common/utilities/get/getSystemString"
import calculateRollUnderTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/calculateRollUnderTrauma"
import getInitiative from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/getInitiative"
import calculateVitalityAndTrauma from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/vitalityAndTraumaCalculator"
import { getHackMasterDefenseNFlee } from "@bestiary/common/utilities/scalingAndBonus/bonfire/getDefenseNFlee"
import { CombatInfoObject } from "../../getCombatInfo"
import adjustAttackInfo from "../adjustAttackInfo"
import adjustMovementInfo from "../adjustMovementInfo"
import { populateVitalityInfo } from "../populateVitality"
import adjustHackMasterDefenseInfo from "./hackMasterDefenses"

export default function getHackMasterCombatInfo(combatInfoObject: CombatInfoObject, size: Size, roleID: string | null, selectedRole: Role | null, specialModifier: number, spells: Spell[]): HackMasterCombatInfo {
    const { attacks, defenses, movements, combatRole: role, combatSecondary: secondary, combatEpValue: mainEpValue, combatRawEpValue: mainRawEpValue, epValueIndex: mainEpValueIndex, vitalityInfo: mainVitalityInfo } = combatInfoObject.entryCombatInfo

    const combatRole = selectedRole ? selectedRole.combatInfo.combatRole : role
    const combatSecondary = selectedRole ? selectedRole.combatInfo.combatSecondary : secondary

    const epPercentIncrease = (specialModifier / 10) + 1

    const epValue = +((selectedRole ? selectedRole.combatInfo.combatEpValue : mainEpValue) * epPercentIncrease).toFixed(0)
    const rawEpValue = (selectedRole ? selectedRole.combatInfo.combatRawEpValue : mainRawEpValue)
    const epValueIndex = (selectedRole ? selectedRole.combatInfo.epValueIndex : mainEpValueIndex) + specialModifier

    const vitalityInfo = selectedRole ? populateVitalityInfo(mainVitalityInfo, selectedRole.combatInfo.vitalityInfo) : mainVitalityInfo

    let attackInfo = combatInfoObject.entryCombatInfo.attackInfo[HACKMASTER]
    let defenseInfo = combatInfoObject.entryCombatInfo.defenseInfo[HACKMASTER]

    if (selectedRole) {
        const { attackInfo: roleAttack, defenseInfo: roleDefense } = selectedRole.combatInfo
        if (roleAttack) { attackInfo += roleAttack[HACKMASTER] }
        if (roleDefense) { defenseInfo += roleDefense[HACKMASTER] }
    }

    return {
        ...combatInfoObject.entryCombatInfo,
        type: 'HackMaster',
        combatRole, combatSecondary,
        combatEpValue: epValue,
        combatRawEpValue: rawEpValue,
        epValueIndex: epValueIndex,
        attackInfo,
        defenseInfo,
        initiative: getInitiative(combatRole, epValueIndex, 'HackMaster'),
        vitalityInfo: {
            ...vitalityInfo,
            rollUnderTrauma: calculateRollUnderTrauma(epValueIndex, 'HackMaster'),
            ...calculateVitalityAndTrauma(combatRole, combatSecondary, epValueIndex, vitalityInfo.weaponBreakageVitality, vitalityInfo.singleDieVitality, size, vitalityInfo.hasNoVitality, 'HackMaster'),
            locationalVitalities: vitalityInfo.locationalVitalities.filter((info: LocationVitality) => !info.roleid || info.roleid === roleID || info.allroles),
            defenseNFleeDice: getHackMasterDefenseNFlee(combatRole, epValueIndex)
        },
        attacks: attacks.reduce(adjustAttackInfo(epValueIndex, roleID, combatRole, size, spells, 'HackMaster'), []),
        defenses: (defenses as HackMasterDefenseInfo[]).reduce(adjustHackMasterDefenseInfo(epValueIndex, roleID, combatRole, size), [] as HackMasterDefenseInfo[]),
        movements: movements.reduce(adjustMovementInfo(epValueIndex, roleID, combatRole), [])
    }
}