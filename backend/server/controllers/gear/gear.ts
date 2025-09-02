import axios from 'axios'

import { srdEndpoint } from '../../server-config'
import { GearCategory } from './interfaces/equipmentInterfaces';
import { armorCategoryBySizeDictionary, HEAVY, LIGHT, MEDIUM, ProcessedArmorDictionary, ReturnedArmorInfo } from './interfaces/armorInterfaces';
import { processDR } from './utilities/processingFunctions';
import { ProcessedShieldDictionary, ReturnedShieldInfo, SMALL, LARGE } from './interfaces/shieldInterfaces';
import { DamageInfo, ProcessedWeaponDictionary, ReturnedWeapon, ReturnedWeaponType } from './interfaces/weaponInterfaces';

// TODO REFACTOR THIS ENTIRE FILE (and any place it goes)

export default async function collectGearCache(): Promise<any> {
    let armor: any = {}
    let shields: any = {}
    let weapons: any = {}

    armor = await getArmor()
    shields = await getShield()
    weapons = await getWeapons()

    return {
        armor,
        shields,
        weapons
    }
}

async function getArmor() {
    const { data: armorData } = await axios.get(srdEndpoint + 'getArmor')

    let list: GearCategory[] = [
        {
            label: "Light",
            items: []
        },
        {
            label: "Medium",
            items: []
        },
        {
            label: "Heavy",
            items: []
        }
    ]

    let dictionary: ProcessedArmorDictionary = {}

    armorData.forEach(({ dr, size, name }: ReturnedArmorInfo) => {
        switch (size) {
            case ('S'):
                list[LIGHT].items.push(name)
                break
            case ('M'):
                list[MEDIUM].items.push(name)
                break
            case ('L'):
                list[HEAVY].items.push(name)
                break
        }

        dictionary[name] = {
            name, size,
            type: armorCategoryBySizeDictionary[size],
            dr: processDR(dr)
        }
    })

    console.log('Armor Finished Collecting')

    return {
        dictionary,
        list
    }
}

async function getShield() {
    const { data: shieldData } = await axios.get(srdEndpoint + 'getShields')

    let list: GearCategory[] = [
        {
            label: "Small",
            items: []
        },
        {
            label: "Medium",
            items: []
        },
        {
            label: "Large",
            items: []
        }
    ]
    let dictionary: ProcessedShieldDictionary = {}

    shieldData.forEach(({ dr, name, size }: ReturnedShieldInfo) => {
        switch (size) {
            case ('S'):
                list[SMALL].items.push(name)
                break
            case ('M'):
                list[MEDIUM].items.push(name)
                break
            case ('L'):
                list[LARGE].items.push(name)
                break
        }

        dictionary[name] = {
            name, size,
            dr: processDR(dr)
        }
    })

    console.log('Shields Finished Collecting')

    return {
        dictionary,
        list
    }
}

async function getWeapons() {
    // I can't guarantee that each weapon will remain at the same index, even alphabetically, so I'm generating an index of the keys that I can 
    // use to retrieve a weapon's information. The key is the weapon's name.
    const { data: weaponData } = await axios.get(srdEndpoint + 'getGroupedWeapons')

    let dictionary: ProcessedWeaponDictionary = {}

    const list: GearCategory[] = weaponData.map((weaponType: ReturnedWeaponType): GearCategory => {
        return {
            label: weaponType.label,
            items: weaponType.weapons.map(({ name, size, dam, rec, type, parry, measure, bonus, range }: ReturnedWeapon): string => {
                let formattedName = name

                // This is a misspelling inherited from the API that needs to be corrected here.
                if (name === 'Horsemans Pick') {
                    formattedName = `Horseman's pick`
                } else if (name === 'Javelin' && !range) {
                    formattedName = `Melee Javelin`
                }
                const damage = processDamage(dam)

                dictionary[`${formattedName} (${type})`] = {
                    damage, type, size, parry, measure, bonus,
                    range: range ? range : undefined,
                    recovery: rec,
                    name: formattedName,
                }

                return name
            })
        }
    })

    console.log('Weapons Finished Caching')

    return {
        dictionary,
        list
    }
}

function processDamage(damageString: string): DamageInfo {
    return {
        dice: damageString.replace(/\s/g, '').split('+'),
        string: damageString
    }
}