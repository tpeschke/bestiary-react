import { Strength } from "../../../calculationInterfaces";
import { SystemInfoValue } from "../generalInfoInterfaces";

export interface BasicRoleSocialInfo {
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
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
}

export type AllRoleSocialInfo = NonspecificRoleSocialInfo | SpecificRoleSocialInfo

export interface NonspecificRoleSocialInfo extends BasicRoleSocialInfo {
    attackInfo: SystemInfoValue,
    defenseInfo: SystemInfoValue,
}

export interface SpecificRoleSocialInfo extends BasicRoleSocialInfo {
    attackInfo: string,
    defenseInfo: string,
}