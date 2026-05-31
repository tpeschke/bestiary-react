export interface Encounter {
    verb?: string,
    time?: string,
    reaction?: Reaction,
    signs?: SignObject,
    objectives?: ObjectiveObject,
    complications?: Complication[],
    battlefield?: BattlefieldObject,
    noun?: string,
    milesFromLair?: number,
    group?: GroupInfo,
    archetypeInfo?: ArchetypeInfo
}

export type ArchetypeInfo = MonsterArchetypeObject | NormalArchetypeObject

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

export interface EditEncounter {
    beastID: number,
    reaction: EditReaction
}

export interface EditReaction {
    id?: number,
    temperament: ReactionTemperamentOptions,
}

export interface Reaction {
    id?: number,
    temperament: ReactionTemperamentOptions,
    result: string,
}

export type ReactionTemperamentOptions = "Friendly" | "Neutral" | "Hostile" | "Unpredictable"

export interface ObjectiveObject {
    player: string,
    enemy: string
}

export interface GroupWeight {
    id: number,
    weight: number,
    role: number,
    deleted: boolean
}

export interface Number {
    id: number,
    beastid: number,
    deleted: boolean,
    numbers: string,
    miles: string,
    weight: number
}

export interface SignObject {
    beastSign: Sign,
    allSigns: Sign[]
}

export interface Sign {
    sign: string,
    weight: number,
    id: number,
    beastid: number,
    deleted: boolean
}

export interface VerbObject {
    beastVerbs: Verb[],
    allVerbs: Verb[]
}

export interface Verb {
    verb: string,
    id: number,
    beastid: number,
}

export interface NounObject {
    beastNouns: Noun[],
    allNouns: Noun[]
}

export interface Noun {
    noun: string,
    id: number,
    beastid: number,
}

export interface BattlefieldObject {
    battlefield: string,
    pattern: string
}

export interface GroupInfo {
    label: string,
    roleNumbers: RoleNumbers
}

export interface RoleNumbers {
    [key: string]: number
}

export type Complication = BaseComplication | RivalComplication | WoundedComplication | LostComplication | BackUpComplication

export interface Rival {
    id: number,
    name: string,
    plural: string,
    number: string
}

export interface BaseComplication {
    type: string
}

export interface RivalComplication extends BaseComplication {
    type: 'Rival' | 'Unlikely Allies',
    actors: Rival
}

export interface WoundedComplication extends BaseComplication {
    type: 'Wounded',
    byWhom: Rival,
    amount: string
}

export interface LostComplication extends BaseComplication {
    type: 'Lost',
    distance: string
}

export interface BackUp {
    rank: string,
    name: string,
    plural: string,
    id: number
}

export interface BackUpComplication extends BaseComplication {
    type: 'Back Up Coming',
    id: number
    rank: string,
    name: string,
    plural: string,
    rankPlural: string,
    time: string
}