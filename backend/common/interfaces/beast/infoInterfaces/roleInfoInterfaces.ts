import { Strength } from "../../calculationInterfaces";
import { BonfireVitalityInfo, HackMasterVitalityInfo } from "./combatInfoInterfaces";
import { Size, SystemInfoValue } from "./generalInfoInterfaces";
import { SkillObject } from "./skillInfoInterfaces";

export type RoleNameOrderOptions = '1' | '2' | '3' | null

export default interface GeneralRoleInfo {
    id: string,
    rolenameorder: RoleNameOrderOptions,
    defaultrole: string,
    roles: Role[],
}

export type SpecificRoleInfo = BonfireRole | HackMasterRole

export type Role = SpecificRoleInfo | NonspecificRoleInfo

export interface BasicRoleInfo {
    id: string,
    generalInfo: RoleGeneralInfo,
    skillInfo: RoleSkillInfo,
    socialInfo: RoleSocialInfo
}

export interface NonspecificRoleInfo extends BasicRoleInfo {
    combatInfo: NonspecificRoleCombatInfo
}

export interface BonfireRole extends BasicRoleInfo {
    combatInfo: BonfireRoleCombatInfo,
}

export interface HackMasterRole extends BasicRoleInfo {
    combatInfo: HackMasterRoleCombatInfo,
}

export interface RoleGeneralInfo {
    name: string,
    size: Size,
    hash: string,
}

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

export interface RoleSkillInfo {
    stress: {
        threshold: number | string | null,
        strength: Strength
    },
    skillSkulls: number,
    skullIndex: number,
    skillEpValue: number,
    skillRawEpValue: number,
    epValueIndex: number,
    skillRole: string,
    skillSecondary: string
    attackInfo: string,
    defenseInfo: string,
    skills: SkillObject,
}

export interface RoleSocialInfo {
    socialSkulls: number,
    skullIndex: number,
    socialEpValue: number,
    socialRawEpValue: number,
    epValueIndex: number,
    capacity: {
        threshold: number[] | null,
        strength: Strength
    },
    socialRole: string,
    socialSecondary: string,
    attackInfo: string,
    defenseInfo: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}