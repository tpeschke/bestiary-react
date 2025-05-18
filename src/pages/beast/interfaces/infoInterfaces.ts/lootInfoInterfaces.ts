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

export type lootScalingOptions = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

export interface Loot {
    copper?: lootScalingOptions,
    enchanted?: lootScalingOptions,
    potion?: lootScalingOptions,
    items?: Item[],
    scrolls?: Scroll[],
    alms?: Alm[],
    talisman?: lootScalingOptions
}

export interface Scroll {
    power: lootScalingOptions,
    number: lootScalingOptions
}

export interface Alm {
    favor: lootScalingOptions,
    number: lootScalingOptions
}

export interface Item {
    number: number, 
    chance: lootScalingOptions, 
    detailing: number, 
    itemcategory: number, 
    materialrarity: number, 
    wear: string
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

export type ReturnedLoot = ReturnedAlmScript | ReturnedEnchantedItem | ReturnedPotion | ReturnedTalisman | ReturnedScroll | ReturnedGenericLoot

export type ReturnedAlmScript = string
export interface ReturnedEnchantedItem {
    id: number,
    name: string
}
export interface ReturnedPotion {
    name: string,
    swigs: number,
    isSalve: boolean,
    effect: string,
    price: number
}
export interface ReturnedTalisman {
    skill: string,
    explanation: string
}
export interface ReturnedScroll {
    scroll: string,
    sp: number,
    breakdown: string
}
export type ReturnedGenericLoot = string
