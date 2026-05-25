import { Strength } from "../../../calculationInterfaces"
import { SystemInfoValue } from "../generalInfoInterfaces"
import { SkillObject } from "../skillInfoInterfaces"

export interface BasicRoleSkillInfo {
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
    skillSecondary: string,
    skills: SkillObject,
}

export interface NonspecificRoleSkillInfo extends BasicRoleSkillInfo {
    attackInfo: SystemInfoValue,
    defenseInfo: SystemInfoValue,
}

export interface SpecificRoleSkillInfo extends BasicRoleSkillInfo {
    attackInfo: string,
    defenseInfo: string,
}