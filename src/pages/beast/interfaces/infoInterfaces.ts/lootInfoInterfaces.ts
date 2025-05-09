export default interface LootInfo {
    lootnotes: string,
    lairLoot: Loot,
    carriedLoot: Loot
    pleroma: Pleroma[],
    specificLoots?: SpecificLoot[],
}

export interface SpecificLoot {
    id: number,
    beastid: number,
    loot: string,
    price: string,
    deleted: boolean
}

export interface Loot {
    copper?: string,
    silver?: string,
    gold?: string,
    potion?: string,
    relic?: string,
    enchanted?: string,
    scrolls?: Scroll[],
    alms?: Alm[],
    talisman?: string,
    items?: any
}

export interface Scroll {
    id: number, 
    beastid: number, 
    number: string, 
    power: string, 
    deleted: boolean
}

export interface Alm {
    id: number,
    beastid: number,
    number: string,
    favor: string,
    deleted: boolean
}

export interface Item {
    id?: number,
    beastid: number,
    itemcategory: number,
    materialrarity: string,
    detailing: string,
    wear: string,
    chance: string,
    number: number
}
export interface Pleroma {
    id: number,
    beastid: number,
    name: string,
    spell: string,
    difficulty: string,
    harvest: string,
    deleted: boolean
}
