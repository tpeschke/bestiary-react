export interface Encounter {
    verb: string,
    time: string,
    temperament: Temperament,
    signs: SignObject,
    objectives: ObjectiveObject,
    complications: Complication[],
    battlefield: BattlefieldObject,
    noun: string,
    milesFromLair: number,
    group: GroupInfo
}

export interface Temperament {
    temperament: string,
    tooltip: string,
}

export interface ObjectiveObject {
    player: string,
    enemy: string
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
    actors: Rival
}

export interface WoundedComplication extends BaseComplication {
    byWhom: Rival,
    amount: string
}

export  interface LostComplication extends BaseComplication {
    distance: string
}

export interface BackUp {
    rank: string, 
    name: string, 
    plural: string, 
    id: number
}

export interface BackUpComplication extends BaseComplication {
    id: number
    rank: string, 
    name: string, 
    plural: string,
    rankPlural: string,
    time: string
}