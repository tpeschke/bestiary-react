import axios from 'axios'

import { srdEndpoint } from '../../server-config'

import GearCacheClass from './model/EquipmentCacheClass'
import { ProcessedArmor } from './interfaces/armorInterfaces'
import { ProcessedShield } from './interfaces/shieldInterfaces'
import { ProcessedWeapon } from './interfaces/weaponInterfaces'

let equipmentCache = new GearCacheClass()

export default async function collectGearCache() {
    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')
    equipmentCache.weaponData = weaponData

    const { data: armorData } = await axios.get(srdEndpoint + 'getArmor')
    equipmentCache.armorData = armorData

    const { data: shieldData } = await axios.get(srdEndpoint + 'getShields')
    equipmentCache.shieldData = shieldData
}

export async function getWeaponByName(weaponName: string): Promise<ProcessedWeapon> {
    const weapon: ProcessedWeapon = equipmentCache.getWeaponByName(weaponName)
    if (weapon) {
        return weapon
    }
    
    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')
    equipmentCache.weaponData = weaponData
    return equipmentCache.getWeaponByName(weaponName)
}

export function getShieldByName(shieldName: string): ProcessedShield {
    return equipmentCache.getShieldByName(shieldName)
}

export function getArmorByName(armorName: string): ProcessedArmor {
    return equipmentCache.getArmorByName(armorName)
}