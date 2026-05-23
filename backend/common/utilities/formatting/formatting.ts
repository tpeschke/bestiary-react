import { DamageType } from "../../interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { Strength } from "../../interfaces/calculationInterfaces";

export function canonicalizeSpecialCombatText(info: string | null | undefined): string {
    if (!info) {
        return ''
    }

    return info
        .replace(/When\s+ToP(?:'|\u2019|&rsquo;)d/gi, 'On a Trauma Check')
        .replace(/ToP(?:'|\u2019|&rsquo;)d/gi, "Trauma'd")
        .replace(/\bToP\b/gi, 'Trauma')
        .replace(/\bHP\b/g, 'Vitality')
        .replace(/\bDamage\b/g, 'Fatigue')
        .replace(/dodges an attack by 5 or more/gi, 'Parries an attack')
        .replace(/\bInt\b/g, 'Mem')
        .replace(/(^|[^\w])\+4(?!\w)/g, '$1+2 Pos')
        .replace(/\bd([0-9X]+)p\b/g, 'd$1!')
        .replace(/-X/g, 'X Wear')
        .replace(/\bPenalty\b/gi, 'Wear')
        .replace(/\bSpeed\b/gi, 'Recovery')
}

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
        if (armor) { displayName += ', ' }
    }
    if (armor) { displayName += `${armor} Armor` }

    return displayName;
}

export function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength): DamageType {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'Ps' }

    return 'S'
}
