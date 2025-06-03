import axios from 'axios'

import { srdEndpoint } from '../../server-config'
import GearCacheClass from './model/EquipmentCacheClass'

let equipmentCache = new GearCacheClass()

export default async function collectGearCache() {
    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')
    equipmentCache.weaponData = weaponData

    // axios.get(srdEndpoint + 'getArmor').then(req => {
    //     req.data.forEach(armorSet => {
    //         armorSet.dr = processDR(armorSet.dr)
    //         if (armorSet.size === 'S') {
    //             armor[0].items.push(armorSet.name)
    //         } else if (armorSet.size === 'M') {
    //             armor[1].items.push(armorSet.name)
    //         } else if (armorSet.size === 'L') {
    //             armor[2].items.push(armorSet.name)
    //         }
    //         armorObj[armorSet.name] = armorSet
    //     })
    //     console.log('armor done collecting')
    // })

    // axios.get(srdEndpoint + 'getShields').then(req => {
    //     req.data.forEach(shield => {
    //         shield.dr = processDR(shield.dr)
    //         if (shield.size === 'S') {
    //             shields[0].items.push(shield.name)
    //         } else if (shield.size === 'M') {
    //             shields[1].items.push(shield.name)
    //         } else if (shield.size === 'L') {
    //             shields[2].items.push(shield.name)
    //         }
    //         shieldsObj[shield.name] = shield
    //     })
    //     console.log('shields done collecting')
    // })
}
