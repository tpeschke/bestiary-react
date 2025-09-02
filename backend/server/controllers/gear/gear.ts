import axios from 'axios'

import { srdEndpoint } from '../../server-config'

import GearCacheClass from './model/GearCacheClass'

export default async function collectGearCache(): Promise<GearCacheClass> {
    let GearCache = new GearCacheClass()

    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')
    GearCache.weaponData = weaponData

    const { data: armorData } = await axios.get(srdEndpoint + 'getArmor')
    GearCache.armorData = armorData

    const { data: shieldData } = await axios.get(srdEndpoint + 'getShields')
    GearCache.shieldData = shieldData

    return GearCache
}