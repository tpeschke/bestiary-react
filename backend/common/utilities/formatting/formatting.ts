import { Strength } from "../../interfaces/calculationInterfaces";

export function getWeaponName(chosenName: string | null, weapon: string): string | null {
    if (chosenName) {
        return chosenName
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

export function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength): string {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'Ps' }

    return 'S'
}
