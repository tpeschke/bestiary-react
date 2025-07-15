import { SizeCategories } from "./equipmentInterfaces"

export interface ReturnedArmorInfo {
    dr: string,
    size: SizeCategories,
    name: string
}

export interface DamageReductionObject {
    flat: number,
    slash: number
}

export type ProcessedArmorDictionary = {
    [key: string]: ProcessedArmor
}

export interface ProcessedArmor {
    name: string,
    dr: DamageReductionObject,
    size: SizeCategories,
    type: string
}

export const armorCategoryBySizeDictionary = {
    'S': 'Light',
    'M': 'Medium',
    'L': 'Heavy'
}

export const LIGHT = 0
export const MEDIUM = 1
export const HEAVY = 1