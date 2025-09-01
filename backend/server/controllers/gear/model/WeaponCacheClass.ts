import { GearCategory } from "../interfaces/equipmentInterfaces"
import { DamageInfo, ProcessedWeapon, ProcessedWeaponDictionary, ReturnedWeapon, ReturnedWeaponType } from "../interfaces/weaponInterfaces"

export default class WeaponCacheClass {
    private weaponList: GearCategory[] = []
    private weaponsDictionary: ProcessedWeaponDictionary = {}

    get list(): GearCategory[] {
        return this.weaponList
    }

    get dictionary(): ProcessedWeaponDictionary {
        return this.weaponsDictionary
    }

    public getByName(weaponName: string): ProcessedWeapon {
        return this.weaponsDictionary[weaponName]
    }

    set weaponData(weaponData: ReturnedWeaponType[]) {
        // I can't guarantee that each weapon will remain at the same index, even alphabetically, so I'm generating an index of the keys that I can 
        // use to retrieve a weapon's information. The key is the weapon's name.
        let weaponsDictionary: ProcessedWeaponDictionary = {}

        const weaponsList: GearCategory[] = weaponData.map((weaponType: ReturnedWeaponType): GearCategory => {
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
                    const damage = this.processDamage(dam)

                    weaponsDictionary[`${formattedName} (${type})`] = {
                        damage, type, size, parry, measure, bonus, 
                        range: range ? range : undefined,
                        recovery: rec,
                        name: formattedName,
                    }

                    return name
                })
            }
        })

        this.weaponsList = weaponsList
        this.weaponsDictionary = weaponsDictionary
        console.log('Weapons Finished Caching')
    }

    private set dictionary(weaponsDictionary: ProcessedWeaponDictionary) {
        this.weaponsDictionary = weaponsDictionary
    }

    private set weaponsList(weaponsList: GearCategory[]) {
        this.weaponList = weaponsList
    }

    private processDamage(damageString: string): DamageInfo {
        return {
            dice: damageString.replace(/\s/g, '').split('+'),
            string: damageString
        }
    }
}
