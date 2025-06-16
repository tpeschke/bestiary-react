import { Strength } from "../beastInterfaces"

export default interface SocialInfo {
    traitlimit: number,
    relationshiplimit: number,
    flawlimit: number,
    passionlimit: number,
    socialrole: string,
    socialsecondary: string,
    socialpoints: number,
    descriptionshare: number,
    convictionshare: number,
    relationshipshare: number,
    atk_conf: string,
    def_conf: string,
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

export interface UnformatedConflict {
    id: number,
    beastid: number,
    trait: string,
    value: string,
    type: string,
    socialroleid: string,
    socialrole: string,
    socialpoints: number,
    allroles: boolean,
    severity: number,
    strength: Strength,
    adjustment: number,
    deleted?: boolean
}

export interface Conflict {
    id: number,
    beastid: number,
    trait: string,
    rank?: number,
    socialroleid: string,
    allroles: boolean,
    deleted?: boolean
}

export interface ArchetypeInfo {
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
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