import { Encounter } from "../../encounterInterfaces"

export default interface GeneralInfo {
    name: string,
    plural: string,
    intro: string,
    habitat: string,
    ecology: string,
    scenarios: Scenario[],
    folklores: Folklore[],
    encounters: Encounter,
    senses: string,
    diet: string,
    meta: string,
    size: string,
    rarity: number,
    tables: TablesObject,
}

export interface Scenario {
    id: number,
    beastid: number,
    scenario: string
}

export interface Folklore {
    id: number,
    beastid: number,
    belief: string,
    truth: string
}

export interface TablesObject {
    appearance: Table[],
    habitat: Table[],
    attack: Table[],
    defense: Table[]
}

export interface Table {
    id: number,
    beastid: number,
    label: string,
    rows: Row[],
    section: string
}

export interface Row {
    id: number,
    weight: number,
    value: string
}