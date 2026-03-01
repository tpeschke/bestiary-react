import { Strength } from "../../calculationInterfaces"

export default interface SocialInfo {
    socialRole: string,
    socialSecondary: string,
    socialSkulls: number,
    skullIndex: number,
    capacity: number[],
    baseConvictionRank: number,
    attackInfo: string,
    defenseInfo: string,
    archetypeInfo: ArchetypeInfo,
    conflicts: ConflictObject,
}

export interface ConflictObject {
    socialSkillSuites: SocialSkillSuitesObject,
    convictions: Conflict[],
    relationships: Conflict[],
    flaws: Conflict[],
    burdens: Conflict[]
}

export interface SocialSkillSuitesObject {
    empathize: number,
    intimidate: number,
    lecture: number,
    tempt: number,
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