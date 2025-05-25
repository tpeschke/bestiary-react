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
    name: string,
    sp: number,
    tooltip: string,
    type: 'scroll'
}
export interface ReturnedGenericLoot extends GenericLootObject {
    info: string,
    type: 'generic'
}