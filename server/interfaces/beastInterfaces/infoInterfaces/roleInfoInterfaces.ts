import { Size } from "./generalInfoInterfaces";

export default interface RoleInfo {
    rolenameorder: number,
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
    fatigue: number,
    largeweapons: number,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
}

export interface RoleSkillInfo {
    panic: number,
    stress: number,
    mental: number,
    skillpoints: number,
    skillrole: number,
    attack_skill: string,
    defense_skill: string,
    skillsecondary: string
}

export interface RoleSocialInfo {
    socialpoints: number,
    socialrole: number,
    socialsecondary: number,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}

export interface UnsortedRole {
    id: string,
    name: string,
    role: string,
    size: Size,
    hash: string,
    vitality: string,
    attack: string,
    defense: string,
    secondaryrole: string,
    combatpoints: number,
    fatigue: number,
    largeweapons: number,
    knockback: number,
    singledievitality: boolean,
    noknockback: boolean,
    rollundertrauma: number,
    isincorporeal: boolean,
    weaponbreakagevitality: boolean,
    panic: number,
    stress: number,
    mental: number,
    skillpoints,
    skillrole: number,
    attack_skill: string,
    defense_skill: string,
    skillsecondary: string,
    socialpoints: number,
    socialrole: number,
    socialsecondary: number,
    attack_conf: string,
    defense_conf: string,
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}