export type lootScalingOptions = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g'

export interface LootObject {
    copper?: lootScalingOptions,
    enchanted?: lootScalingOptions,
    potion?: lootScalingOptions,
    items?: LootItem[],
    scrolls?: LootScroll[],
    alms?: LootAlms[],
    talisman?: lootScalingOptions
}

export interface LootItem {
    number: number, 
    chance: lootScalingOptions, 
    detailing: number, 
    itemcategory: number, 
    materialrarity: number, 
    wear: string
}

export interface LootAlms {
    favor: lootScalingOptions,
    number: lootScalingOptions
}

export interface LootScroll {
    power: lootScalingOptions,
    number: lootScalingOptions
}

export type LootToRequest = string | ItemsToRequest

export interface ItemsToRequest {
    detailing: number,
    itemcategory: number,
    materialrarity: number,
    wear: number
}

export interface ScrollsToRequest {
    numberOfScrolls: number,
    power: number
}