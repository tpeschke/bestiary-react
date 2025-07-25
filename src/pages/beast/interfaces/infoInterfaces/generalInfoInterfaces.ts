export type SizeObject = {
    Fine: number,
    Diminutive: number,
    Tiny: number,
    Small: number,
    Medium: number,
    Large: number,
    Huge: number,
    Giant: number,
    Enormous: number,
    Colossal: number
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