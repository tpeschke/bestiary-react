import { Strength } from "../../interfaces/calculationInterfaces";
import { primaryCombatRoles } from "../roleInfo/combatRoleInfo";

export function getWeaponName(name: string | null, weapon: string): string | null {
    if (name) {
        return name
    } else if (weapon) {
        return weapon
    }

    return null;
}

export function getDefenseName(name: string, shield: string, armor: string): string {
    if (name) {
        return name
    }

    let displayName = ''
    if (shield) { 
        displayName += `${shield} Shield`  
        armor ? displayName += ', ' : null
    }
    if (armor) { displayName += `${armor} Armor` }

    return displayName;
}

export function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength, role: string): string {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'P' }

    if (role) {
        return primaryCombatRoles[role].meleeCombatStats.preferreddamage.substring(0, 1).toUpperCase();
    }

    return 'S'
}
