import axios from 'axios'

import { srdEndpoint } from '../../server-config'
import GearCacheClass from './model/EquipmentCacheClass'

let equipmentCache = new GearCacheClass()

export default async function collectGearCache() {
    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')
    equipmentCache.weaponData = weaponData

    const { data: armorData } = await axios.get(srdEndpoint + 'getArmor')
    equipmentCache.armorData = armorData

    const { data: shieldData } = await axios.get(srdEndpoint + 'getShields')
    equipmentCache.shieldData = shieldData
}
