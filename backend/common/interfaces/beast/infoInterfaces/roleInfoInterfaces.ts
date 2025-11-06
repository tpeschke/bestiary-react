import { VitalityInfo } from "./combatInfoInterfaces";
import { Size } from "./generalInfoInterfaces";

export type RoleNameOrderOptions = '1' | '2' | '3' | null

export default interface RoleInfo {
    rolenameorder: RoleNameOrderOptions,
    defaultrole: string,
    roles: Role[],
}

export interface Role {
    id: string,
    generalInfo: RoleGeneralInfo,
    combatInfo: RoleCombatInfo,
    skillInfo: RoleSkillInfo,
    socialInfo: RoleSocialInfo
}

export interface RoleGeneralInfo {
    name: string,
    size: Size,
    hash: string,
}

export interface RoleCombatInfo {
    attack: string,
    defense: string,
    initiative: string,
    combatrole: string,
    combatsecondary: string,
    combatpoints: number,
    vitalityInfo: VitalityInfo
}

export interface RoleSkillInfo {
    stress: number | string,
    skillSkulls: number,
    skullIndex: number,
    skillRole: string,
    skillSecondary: string
    attackInfo: string,
    defenseInfo: string,
}

export interface RoleSocialInfo {
    socialSkulls: number,
    skullIndex: number,
    capacity: number[],
    socialRole: string,
    socialSecondary: string,
    attackInfo: string,
    defenseInfo: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}