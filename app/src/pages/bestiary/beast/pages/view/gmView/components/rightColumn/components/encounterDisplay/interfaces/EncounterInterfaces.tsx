export interface Encounter {
    verb: string,
    time: string,
    reaction: Reaction,
    signs: SignObject,
    objectives: ObjectiveObject,
    complications: Complication[],
    battlefield: BattlefieldObject,
    noun: string,
    milesFromLair: number,
    group: GroupInfo
}

export interface Reaction {
    temperament: string,
    result: string,
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

export interface BaseComplication {
    type: 'Trapped' | 'Insane' | 'Diseased' | 'Powerful Weird-Adept or Servant' | 'Infighting' | 'Large (50% more Vitality)' | 'Enchanted Item' | 'Time Limit'
}

export interface Rival {
    id: number,
    name: string,
    plural: string,
    number: string,
    type: 'Rival' | 'Unlikely Allies'
}

export interface RivalComplication {
    actors: Rival,
    type: 'Rival' | 'Unlikely Allies'
}

export interface WoundedComplication {
    byWhom: Rival,
    amount: string,
    type: 'Wounded'
}

export  interface LostComplication {
    distance: string,
    type: 'Lost'
}

export interface BackUpComplication {
    id: number
    name: string,
    time: string,
    type: 'Back Up Coming'
}