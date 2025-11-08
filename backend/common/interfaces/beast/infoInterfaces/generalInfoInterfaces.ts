export type Size = 'Fine' | 'Diminutive' | 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Giant' | 'Enormous' | 'Colossal'

export default interface GeneralInfo {
    name: string,
    canEdit: boolean,
    beastOwnerId: number,
    plural: string,
    intro: string,
    habitat: string,
    appearance: string,
    scenarios: Scenario[],
    folklores: Folklore[],
    senses: string,
    diet: string,
    meta: string,
    size: Size,
    rarity: Rarity,
    tables: TablesObject
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

export interface Rarity {
    rarityId: number,
    rarityName: string,
    modifier?: string
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