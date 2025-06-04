import { ProcessedArmor, ReturnedArmorInfo } from "../interfaces/armorInterfaces";
import { AllLists, AllListsAndDictionaries, AllDictionaries } from "../interfaces/equipmentInterfaces";
import { ProcessedShield, ReturnedShieldInfo } from "../interfaces/shieldInterfaces";
import { ProcessedWeapon, ReturnedWeaponType } from "../interfaces/weaponInterfaces";
import ArmorCacheClass from "./ArmorCacheClass";
import ShieldCacheClass from "./ShieldCacheClass"
import WeaponCacheClass from "./WeaponCacheClass"

// Brody
export default class GearCacheClass {
    private weapons = new WeaponCacheClass(); 
    private shields = new ShieldCacheClass();
    private armor = new ArmorCacheClass();

    get getAll(): AllListsAndDictionaries {
        return {
            lists: this.lists,
            dictionaries: this.dictionaries
        }
    }

    get lists(): AllLists {
        return {
            weapons: this.weapons.list,
            shields: this.shields.list,
            armor: this.armor.list
        }
    }

    get dictionaries(): AllDictionaries {
        return {
            weapons: this.weapons.dictionary,
            shields: this.shields.dictionary,
            armor: this.armor.dictionary
        }
    }

    set weaponData(weaponData: ReturnedWeaponType[]) {
        this.weapons.weaponData = weaponData;
    }

    set armorData(armorData: ReturnedArmorInfo[]) {
        this.armor.armorData = armorData
    }

    set shieldData(shieldData: ReturnedShieldInfo[]) {
        this.shields.shieldData = shieldData
    }

    public getWeaponByName(weaponName: string): ProcessedWeapon {
        return this.weapons.getByName(weaponName)
    }

    public getShieldByName(shieldName: string): ProcessedShield {
        return this.shields.getByName[shieldName]
    }

    public getArmorByName(armorName: string): ProcessedArmor {
        return this.armor.getByName(armorName)
    }
}
