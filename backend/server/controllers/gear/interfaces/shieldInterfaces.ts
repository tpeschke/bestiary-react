import { DamageReductionObject } from "./armorInterfaces"
import { SizeCategories } from "./equipmentInterfaces"

export interface ReturnedShieldInfo {
    dr: string,
    name: string,
    size: SizeCategories
}

export type ProcessedShieldDictionary = {
    [key: string]: ProcessedShield
}

export interface ProcessedShield {
    name: string,
    dr: DamageReductionObject,
    size: SizeCategories,
}

export const SMALL = 0
export const MEDIUM = 1
export const LARGE = 1