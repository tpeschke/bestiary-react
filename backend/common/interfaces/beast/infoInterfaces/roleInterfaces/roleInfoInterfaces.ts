import { Size } from "../generalInfoInterfaces";
import { BonfireRoleCombatInfo, HackMasterRoleCombatInfo, NonspecificRoleCombatInfo } from "./combatInfoInterfaces";
import { NonspecificRoleSkillInfo, SpecificRoleSkillInfo } from "./skillInfoInterfaces";
import { NonspecificRoleSocialInfo, SpecificRoleSocialInfo } from "./socialInfoInterfaces";

export type RoleNameOrderOptions = '1' | '2' | '3' | null

export default interface GeneralRoleInfo {
    id: string,
    rolenameorder: RoleNameOrderOptions,
    defaultrole: string,
    roles: Role[],
}

export type AllSpecificRoleInfo = BonfireRole | HackMasterRole

export type Role = AllSpecificRoleInfo | NonspecificRoleInfo

export interface BasicRoleInfo {
    id: string,
    generalInfo: RoleGeneralInfo,
}

export interface NonspecificRoleInfo extends BasicRoleInfo {
    combatInfo: NonspecificRoleCombatInfo,
    skillInfo: NonspecificRoleSkillInfo,
    socialInfo: NonspecificRoleSocialInfo
}

export interface SpecificRoleInfo extends BasicRoleInfo {
    skillInfo: SpecificRoleSkillInfo,
    socialInfo: SpecificRoleSocialInfo
}

export interface BonfireRole extends SpecificRoleInfo {
    combatInfo: BonfireRoleCombatInfo,
}

export interface HackMasterRole extends SpecificRoleInfo {
    combatInfo: HackMasterRoleCombatInfo,
}

export interface RoleGeneralInfo {
    name: string,
    size: Size,
    hash: string,
}