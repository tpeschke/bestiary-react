import { DamageType } from "../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { SizeCategories } from "./equipmentInterfaces"

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
    range: string
}

export interface ProcessedWeaponDictionary {
    [key: string]: ProcessedWeapon
}

export interface ProcessedWeapon {
    name: string,
    type: DamageType,
    damage: DamageInfo,
    size: SizeCategories,
    recovery: number,
    parry: number,
    measure: number,
    bonus: string,
    range: string
}

export interface DamageInfo {
    dice: string[],
    string: string,
}