import { DamageType, ProcessedWeapon, SizeCategories } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { GearCategory } from "./equipmentInterfaces"

export interface WeaponsCache {
    list: GearCategory[],
    dictionary: ProcessedWeaponDictionary
}

export interface ReturnedWeaponType {
    label: string,
    weapons: ReturnedWeapon[]
}

export interface ReturnedWeapon {
    name: string,
    size: SizeCategories,
    dam: string,
    rec: number,
    type: DamageType,
    parry: number,
    measure: number,
    bonus: string,
    range: string | undefined
}

export interface ProcessedWeaponDictionary {
    [key: string]: ProcessedWeapon
}

