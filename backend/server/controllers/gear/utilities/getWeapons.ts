import axios from "axios"
import { srdEndpoint } from "../../../server-config"
import { GearCategory } from "../interfaces/equipmentInterfaces"
import { ProcessedWeaponDictionary, ReturnedWeaponType, ReturnedWeapon, DamageInfo } from "../interfaces/weaponInterfaces"

export default async function getWeapons() {
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