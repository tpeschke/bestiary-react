import { ReturnedWeaponType } from "../interfaces/weaponInterfaces";
import ArmorCacheClass from "./ArmorCacheClass";
import ShieldCacheClass from "./ShieldCacheClass"
import WeaponCacheClass from "./WeaponCacheClass"

// Brody
export default class GearCacheClass {
    private weapons = new WeaponCacheClass(); 
    private shields = new ShieldCacheClass();
    private armor = new ArmorCacheClass();

    get getAll() {
        return {
            lists: this.indexes,
            objects: this.objects
        }
    }

    get indexes() {
        return {
            weapons: this.weapons.index,
            shields: this.shields.index,
            armor: this.armor.index
        }
    }

    get objects() {
        return {
            weapons: this.weapons.object,
            shields: this.shields.object,
            armor: this.armor.object
        }
    }

    set weaponData(weaponData: ReturnedWeaponType[]) {
        this.weapons.weaponData = weaponData;
    }

    public getWeaponByName(weaponName: string) {
        return this.weapons.getByName(weaponName)
    }

    public getShieldByName(shieldName: string) {
        return this.shields.getByName[shieldName]
    }

    public getArmorByName(armorName: string) {
        return this.armor.getByName(armorName)
    }
}
