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
    detail: number, 
    category: number, 
    rarity: number, 
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
    detail: number,
    category: number,
    rarity: number,
    wear: number
}

export interface ScrollsToRequest {
    numberOfScrolls: number,
    power: number
}

export type ReturnedLoot = ReturnedAlmScript | ReturnedEnchantedItem | ReturnedPotion | ReturnedTalisman | ReturnedScroll | ReturnedGenericLoot

interface GenericLootObject {
    type: 'alms' | 'enchanted' | 'potion' | 'talisman' | 'scroll' | 'generic' | null
}

export interface ReturnedAlmScript extends GenericLootObject {
    script: string,
    type: 'alms'
}
export interface ReturnedEnchantedItem extends GenericLootObject {
    id: number,
    name: string,
    type: 'enchanted'
}
export interface ReturnedPotion extends GenericLootObject {
    name: string,
    swigs: number,
    isSalve: boolean,
    effect: string,
    price: number,
    type: 'potion'
}
export interface ReturnedTalisman extends GenericLootObject {
    skill: string,
    explanation: string,
    type: 'talisman'
}
export interface ReturnedScroll extends GenericLootObject {
    scroll: string,
    sp: number,
    breakdown: string,
    type: 'scroll'
}
export interface ReturnedGenericLoot extends GenericLootObject {
    info: string,
    type: 'generic'
}