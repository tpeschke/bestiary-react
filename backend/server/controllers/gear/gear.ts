import { ArmorCache } from './interfaces/armorInterfaces';
import { ShieldCache } from './interfaces/shieldInterfaces';
import { WeaponsCache } from './interfaces/weaponInterfaces';

export default async function collectGearCache(): Promise<any> {
    let armor: ArmorCache = {
        list: [],
        dictionary: {}
    }
    let shields: ShieldCache = {
        list: [],
        dictionary: {}
    }
    let weapons: WeaponsCache = {
        list: [],
        dictionary: {}
    }


    // armor = await getArmor()
    // shields = await getShield()
    // weapons = await getWeapons()

    return {
        armor,
        shields,
        weapons
    }
}