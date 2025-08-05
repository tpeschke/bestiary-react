import { Strength } from "../../calculationInterfaces";
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
    panic: number | boolean,
    stress: number | string,
    stressStrength: Strength,
    panicStrength: Strength,
    skillpoints: number,
    skillrole: string,
    skillsecondary: string
    attack_skill: string,
    defense_skill: string,
}

export interface RoleSocialInfo {
    socialpoints: number,
    socialrole: string,
    socialsecondary: string,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}