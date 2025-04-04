export default interface SocialInfo {
    traitlimit: number,
    devotionlimit: number,
    flawlimit: number,
    passionlimit: number,
    socialrole: string,
    socialsecondary: string,
    socialpoints: number,
    descriptionshare: number,
    convictionshare: number,
    devotionshare: number,
    atk_conf: string,
    def_conf: string,
    archetypeInfo: ArchetypeInfo,
    conflicts: ConflictObject,
}

export interface ConflictObject {
    descriptions: Conflict[],
    convictions: Conflict[],
    devotions: Conflict[],
    flaws: Conflict[],
    burdens: Conflict[]
}

export interface Conflict {
    id: number,
    beastid: number,
    trait: string,
    value: string,
    type: string,
    socialroleid: string,
    allroles: boolean,
    severity: number,
    strength: string,
    adjustment: number,
    deleted: boolean
}

export interface ArchetypeInfo {
    hasarchetypes: boolean,
    hasmonsterarchetypes: boolean,
    archetypes?: Archetype
}

export type Archetype = ArchetypeObject | string[] | null


export interface ArchetypeObject {
    archetype: string,
    deviation: boolean,
    reverse: boolean
}