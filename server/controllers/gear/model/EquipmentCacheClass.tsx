import { DamageInfo, ProcessedWeaponObject, ProcessedWeaponType, ReturnedWeapon, ReturnedWeaponType } from "../interfaces/weaponInterfaces"

export default class GearCacheClass {
    private weaponIndex: ProcessedWeaponType[] = []
    private armorIndex = []
    private shieldIndex = []

    private weaponsObject: ProcessedWeaponObject = {}
    private armorObject = {}
    private shieldsObject = {}

    get getAll() {
        return {
            lists: this.indexes,
            objects: this.objects
        }
    }

    get indexes() {
        return {
            weapons: this.weaponIndex,
            shields: this.shieldIndex,
            armor: this.armorIndex
        }
    }

    get objects() {
        return {
            weapons: this.weaponsObject,
            shields: this.shieldsObject,
            armor: this.armorObject
        }
    }
    
    public weaponByName(weaponName: string) {
        return this.weaponsObject[weaponName]
    }

    public getArmorByName(armorName: string) {
        return this.armorObject[armorName]
    }

    public getShield(shieldName: string) {
        return this.shieldsObject[shieldName]
    }

    set weaponData(weaponData: ReturnedWeaponType[]) {
        // I can't guarantee that each weapon will remain at the same index so I'm generating an index of the keys that I can 
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
    
        const damageArray = damageString.replace(/\s/g, '').split('')
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
