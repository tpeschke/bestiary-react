import { DamageInfo, ProcessedWeaponObject, ProcessedWeaponType, ReturnedWeapon, ReturnedWeaponType } from "../interfaces/weaponInterfaces"

export default class WeaponCacheClass {
    private weaponIndex: ProcessedWeaponType[] = []
    private weaponsObject: ProcessedWeaponObject = {}

    get index() {
        return this.weaponIndex
    }

    get object() {
        return this.weaponsObject
    }

    public getByName(weaponName: string) {
        return this.weaponsObject[weaponName]
    }

    set weaponData(weaponData: ReturnedWeaponType[]) {
        // I can't guarantee that each weapon will remain at the same index, even alphabetically, so I'm generating an index of the keys that I can 
        // use to retrieve a weapon's information. The key is the weapon's name.
        let weaponObject: ProcessedWeaponObject = {}

        const weaponsIndex: ProcessedWeaponType[] = weaponData.map((weaponType: ReturnedWeaponType): ProcessedWeaponType => {
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

                    weaponObject[`${name} (${weapon.type})`] = {
                        name, damage,
                        type: weapon.type
                    }

                    return name
                })
            }
        })

        this.weaponObject = weaponObject
        this.weaponsIndex = weaponsIndex
        console.log('Weapons Finished Caching')
    }

    private set weaponObject(weaponObject: ProcessedWeaponObject) {
        this.weaponsObject = weaponObject
    }

    private set weaponsIndex(weaponsIndex: ProcessedWeaponType[]) {
        this.weaponIndex = weaponsIndex
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
