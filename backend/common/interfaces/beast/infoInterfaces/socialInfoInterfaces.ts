import { Strength } from "../../calculationInterfaces"

export default interface SocialInfo {
    socialRole: string,
    socialSecondary: string,
    socialSkulls: number,
    attackInfo: string,
    defenseInfo: string,
    archetypeInfo: ArchetypeInfo,
    conflicts: ConflictObject,
}

export interface ConflictObject {
    descriptions: Conflict[],
    convictions: Conflict[],
    relationships: Conflict[],
    flaws: Conflict[],
    burdens: Conflict[]
}

export interface Conflict {
    id: number,
    beastid: number,
    trait: string,
    rank?: number,
    socialroleid: string,
    allroles: boolean,
    strength: Strength,
    adjustment: number,
    deleted?: boolean
}

export interface ArchetypeInfo {
    hasArchetypes: boolean,
    hasMonsterArchetypes: boolean,
    difficultyDie: string,
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