export interface ReturnedWeaponType {
    label: string,
    weapons: ReturnedWeapon[]
}

export interface ReturnedWeapon {
    name: string,
    type: string,
    range: string,
    dam: string,
    bonus: any
}

export interface ProcessedWeaponDictionary {
    [key: string]: ProcessedWeapon
}

export interface ProcessedWeapon {
    name: string,
    type: string,
    damage: DamageInfo,
}

export interface DamageInfo {
    dice: string[],
    flat: number,
    isSpecial: boolean,
    hasSpecialAndDamage: boolean
}