export type Size = 'Fine' | 'Diminutive' | 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Giant' | 'Enormous' | 'Colossal'

interface BasicGeneralInfo {
    name: string,
    canEdit: boolean,
    beastOwnerId: number,
    plural: string,
    intro: string,
    habitat: string,
    scenarios: Scenario[],
    folklores: Folklore[],
    senses: string,
    diet: string,
    meta: string,
    size: Size,
    rarity: Rarity,
    tables: TablesObject,
    palette: Palette
}

export interface SpecificGeneralInfo extends BasicGeneralInfo {
    appearance: string
}

export interface NonspecificGeneralInfo extends BasicGeneralInfo {
    appearance: SystemInfoArray
}

export interface SaveObject {
    label: string,
    rank: string
}

export type SystemInfoArray = [string, undefined, string]
export type SystemInfoValue = SystemInfoArray

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
    difficulty?: string
}

export interface Palette {
    id?: number,
    drives: string | null,
    needs: string | null,
    defenses: string | null,
    logistics: string | null,
    methods: string | null,
    groupDescriptions: string | null,
    commonAllies: CommonAllies[],
}

export interface CommonAllies {
    id: number,
    beastid: number,
    allyid: number,
    name: string,
    plural: string | null
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