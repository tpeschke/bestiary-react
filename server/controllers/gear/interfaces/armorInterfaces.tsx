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

type ArmorCategory = 'Light' | 'Medium' | 'Heavy'

export type ProcessedArmorDictionary = {
    [key: string]: ProcessedArmor
}

export interface ProcessedArmor {
    name: string,
    dr: DamageReductionObject,
    size: SizeCategories,
    type: ArmorCategory
}

export const armorCategoryBySizeDictionary = {
    'Light': 'S',
    'Medium': 'M',
    'Heavy': 'L'
}

export const LIGHT = 0
export const MEDIUM = 1
export const HEAVY = 1