import { Strength } from "../../../../../../interfaces/beastInterfaces/beastInterfaces"
import { DamageType } from "../../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces"
import { primaryCombatRoles } from "../../roleInfo/combatRoleInfo"

export function getWeaponName(chosenName: string, weapon: string): string {
    if (chosenName) {
        return chosenName
    } else if (weapon) {
        return weapon
    }

    return '';
}

export function getDefenseName(chosenName: string, shield: string, armor: string): string {
    if (chosenName) {
        return chosenName
    }

    let name = ''
    if (shield) { 
        name += `${shield} Shield`  
        armor ? name += ', ' : null
    }
    if (armor) { name += `${armor} Armor` }

    return name;
}

export function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength, role: string): DamageType {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'P' }

    return primaryCombatRoles[role].meleeCombatStats.preferreddamage.substring(0, 1).toUpperCase();
}
