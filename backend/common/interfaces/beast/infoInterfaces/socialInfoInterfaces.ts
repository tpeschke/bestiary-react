import { Strength } from "../../calculationInterfaces"
import { SystemOption } from "../beast"
import { SystemInfoArray } from "./generalInfoInterfaces"

export interface BasicSocialInfo {
    type: SystemOption,
    socialRole: string,
    socialSecondary: string,
    socialSkulls: number,
    skullIndex: number,
    socialEpValue: number,
    socialRawEpValue: number,
    epValueIndex: number,
    capacity: {
        threshold: number[] | null,
        strength: Strength
    },
    isBeast?: boolean,
    baseConvictionRank: number,
    archetypeInfo: ArchetypeInfo,
    conflicts: ConflictObject,
}

export interface NonspecificSocialInfo extends BasicSocialInfo {
    attackInfo: SystemInfoArray,
    defenseInfo: SystemInfoArray,
}

export interface SpecificSocialInfo extends BasicSocialInfo {
    attackInfo: string,
    defenseInfo: string,
}

export interface ConflictObject {
    socialSkillSuites: SocialSkillSuitesObject,
    convictions: Conflict[],
    relationships: Conflict[],
    flaws: Conflict[],
    burdens: Conflict[]
}

export interface SocialSkillSuitesObject {
    influence: number,
    inform: number,
    inspire: number,
    intimidate: number,
    preferredEmotions: {
        emotions: string[],
        rank: number
    }
}

export interface Conflict {
    id: number,
    beastid: number,
    trait: string,
    rank?: number,
    socialRoleID: string,
    allRoles: boolean,
    strength: Strength,
    adjustment: number,
    deleted?: boolean
}

export interface ArchetypeInfo {
    hasArchetypes: boolean,
    hasMonsterArchetypes: boolean,
    baseRank: number,
    normalArchetypes?: NormalArchetypeObject,
    monsterArchetypes?: MonsterArchetypeObject
}

interface ArchetypeObject {
    type: 'monster' | 'normal'
}

export interface MonsterArchetypeObject extends ArchetypeObject {
    type: 'monster',
    archetype: string[]
}

export interface NormalArchetypeObject extends ArchetypeObject {
    type: 'normal'
    archetype: string,
    deviation: boolean,
    reverse: boolean
}