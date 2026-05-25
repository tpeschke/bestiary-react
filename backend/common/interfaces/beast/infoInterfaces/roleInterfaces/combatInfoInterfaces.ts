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
}

export type AllRoleCombatInfo = NonspecificRoleCombatInfo | SpecificRoleCombatInfo

export interface NonspecificRoleCombatInfo extends BasicRoleCombatInfo {
    attackInfo: SystemInfoValue,
    defenseInfo: SystemInfoValue,
    vitalityInfo: BonfireVitalityInfo
}

export interface SpecificRoleCombatInfo extends BasicRoleCombatInfo {
    attackInfo: string,
    defenseInfo: string,
}

export interface BonfireRoleCombatInfo extends SpecificRoleCombatInfo {
    vitalityInfo: BonfireVitalityInfo,
}

export interface HackMasterRoleCombatInfo extends SpecificRoleCombatInfo {
    vitalityInfo: HackMasterVitalityInfo,
}