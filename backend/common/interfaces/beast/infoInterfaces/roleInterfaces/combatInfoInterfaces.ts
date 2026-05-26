import { BonfireVitalityInfo, HackMasterVitalityInfo } from "../combatInfoInterfaces";
import { SystemInfoValue } from "../generalInfoInterfaces";

export interface BasicRoleCombatInfo {
    combatRole: string,
    combatSecondary: string,
    combatSkulls: number,
    skullIndex: number,
    combatEpValue: number,
    combatRawEpValue: number,
    epValueIndex: number,
    initiative: string,
    vitalityInfo: BonfireVitalityInfo | HackMasterVitalityInfo
}

export type AllRoleCombatInfo = NonspecificRoleCombatInfo

export interface NonspecificRoleCombatInfo extends BasicRoleCombatInfo {
    attackInfo: SystemInfoValue,
    defenseInfo: SystemInfoValue
}

// export interface SpecificRoleCombatInfo extends BasicRoleCombatInfo {
//     attackInfo: string,
//     defenseInfo: string,
// }

export interface BonfireRoleCombatInfo extends NonspecificRoleCombatInfo {
    vitalityInfo: BonfireVitalityInfo,
}

export interface HackMasterRoleCombatInfo extends NonspecificRoleCombatInfo {
    vitalityInfo: HackMasterVitalityInfo,
}