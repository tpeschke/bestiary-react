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
                items: weaponType.weapons.map((weapon: ReturnedWeapon): string => {
                    let name = weapon.name

                    // This is a misspelling inherited from the API that needs to be corrected here.
                    if (weapon.name === 'Horsemans Pick') {
                        name = `Horseman's pick`
                    } else if (weapon.name === 'Javelin' && !weapon.range) {
                        name = `Melee Javelin`
                    }

                    const damage = this.processDamage(weapon.dam, weapon.bonus)

                    weaponsDictionary[`${name} (${weapon.type})`] = {
                        name, damage,
                        type: weapon.type
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

    private processDamage(damageString: string, bonus: string): DamageInfo {
        let dice: string[] = []
        let flat = 0

        let diceExpression = ""

        const damageArray = [...damageString.replace(/\s/g, '')]
        
        // We're going from ['d', '8', '+', '1'] to ['d8'] and '1' so its easier to increase damage later.
        damageArray.forEach((element, index, array) => {
            if (index === array.length - 1) {
                diceExpression = diceExpression + element
            } else if (element === '-' || element === '+' || element === '*') {
                if (diceExpression.includes('d')) {
                    dice.push(diceExpression)
                } else {
                    flat += +diceExpression
                }
                diceExpression = ""
            } else {
                diceExpression = diceExpression + element;
            }
        })

        return {
            dice, flat,
            isSpecial: false,
            hasSpecialAndDamage: bonus === 'Yes'
        }
    }
}
