import { ProcessedArmorDictionary } from "./armorInterfaces"
import { ProcessedShieldDictionary } from "./shieldInterfaces"
import { ProcessedWeaponDictionary } from "./weaponInterfaces"

export interface GearCategory {
    label: string,
    items: string[]
}

export type SizeCategories = 'S' | 'M' | 'L'

export interface AllListsAndDictionaries {
    lists: AllLists,
    dictionaries: AllDictionaries
}

export interface AllLists {
    weapons: GearCategory[],
    shields: GearCategory[],
    armor: GearCategory[]
}

export interface AllDictionaries {
    weapons: ProcessedWeaponDictionary,
    shields: ProcessedShieldDictionary,
    armor: ProcessedArmorDictionary
}