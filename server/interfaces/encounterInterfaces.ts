export interface Encounter {
    temperaments: TemperamentObject,
    signs: SignObject,
    nouns: NounObject,
    verbs: VerbObject,
    groups: Group[],
    numbers: Number[]
}

export interface TemperamentObject {
    beastTemperaments: Temperament[],
    allTemperaments: Temperament[]
}

export interface Temperament {
    beastid: number,
    temperament: string,
    weight: number,
    id: number,
    tooltip: string,
    deleted: boolean
}

export interface Group {
    id: number,
    beastid: number,
    deleted: boolean,
    label: string,
    weights: GroupWeight[],
    weight: number
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
    beastSigns: Sign[],
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
    deleted: boolean
}

export interface NounObject {
    beastNouns: Noun[],
    allNouns: Noun[]
}

export interface Noun {
    noun: string, 
    id: number, 
    beastid: number, 
    deleted: boolean
}