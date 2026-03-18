import { Strength } from "../../calculationInterfaces";
import { BonfireVitalityInfo, HackMasterVitalityInfo } from "./combatInfoInterfaces";
import { Size } from "./generalInfoInterfaces";
import { SkillObject } from "./skillInfoInterfaces";

export type RoleNameOrderOptions = '1' | '2' | '3' | null

export default interface RoleInfo {
    rolenameorder: RoleNameOrderOptions,
    defaultrole: string,
    roles: Role[],
}

export interface Role {
    id: string,
    generalInfo: RoleGeneralInfo,
    skillInfo: RoleSkillInfo,
    socialInfo: RoleSocialInfo
}

export interface BonfireRole extends Role {
    combatInfo: BonfireRoleCombatInfo,
}

export interface HackMasterRole extends Role {
    combatInfo: HackMasterRoleCombatInfo,
}

export interface RoleGeneralInfo {
    name: string,
    size: Size,
    hash: string,
}

export type RoleCombatInfo = {
    combatRole: string,
    combatSecondary: string,
    combatSkulls: number,
    skullIndex: number,
    combatEpValue: number,
    combatEpValueIndex: number,
    attack: string,
    defense: string,
    initiative: string,
}

export interface BonfireRoleCombatInfo extends RoleCombatInfo {
    vitalityInfo: BonfireVitalityInfo
}

export interface HackMasterRoleCombatInfo extends RoleCombatInfo {
    vitalityInfo: HackMasterVitalityInfo
}

export interface RoleSkillInfo {
    stress: {
        threshold: number | string | null,
        strength: Strength
    },
    skillSkulls: number,
    skullIndex: number,
    skillRole: string,
    skillSecondary: string
    attackInfo: string,
    defenseInfo: string,
    skills: SkillObject,
}

export interface RoleSocialInfo {
    socialSkulls: number,
    skullIndex: number,
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