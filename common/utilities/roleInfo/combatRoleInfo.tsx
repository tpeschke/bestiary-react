import { Strength } from "../../interfaces/calculationInterfaces"

export const primaryCombatRoles: PrimaryCombatRolesObject = {
    'Artillery': {
        weapontype: 'r',
        rangedCombatStats: {
            damage: 'majSt',
            preferreddamage: 'piercingweapons',
            slashingDR: 'majWk',
            staticDR: 'majWk',
            parry: 'majSt',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            flanks: 'majWk',
            cover: 'majWk',
            defense: 'minSt',
            attack: 'minSt',
            initiative: null,
            measure: null,
            panic: 'minSt',
            rangeIncrement: 'majSt',
            recovery: 'minWk',
            vitality: 'minWk',
            movement: 'majWk',
        },
        meleeCombatStats: {
            damage: 'minWk',
            preferreddamage: 'piercingweapons',
            slashingDR: 'majWk',
            staticDR: 'majWk',
            parry: 'minSt',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            flanks: 'majWk',
            cover: 'majWk',
            defense: 'minSt',
            attack: 'minSt',
            initiative: null,
            measure: 'minSt',
            panic: 'minSt',
            rangeIncrement: null,
            recovery: 'majWk',
            movement: 'majWk',
            vitality: 'minWk',
        },
        weapons: [
            {
                label: 'Ranged',
                items: ['Bellybow (P)', 'Crossbow (P)', 'Latchet Crossbow (P)', 'Longbow (P)', 'Warbow (P)']
            },
            {
                label: 'Sidearms',
                items: ['Dagger (P)', 'Dagger (S)']
            }
        ],
        armor: ['Buff Coat'],
        shields: ['Buckler']
    },
    'Brute': {
        weapontype: 'm',
        rangedCombatStats: {
            damage: 'minSt',
            preferreddamage: 'piercingweapons',
            slashingDR: 'majWk',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            flanks: 'majWk',
            cover: 'majWk',
            defense: 'majWk',
            attack: 'majWk',
            initiative: 'minWk',
            measure: null,
            panic: null,
            rangeIncrement: 'minSt',
            recovery: 'majWk',
            vitality: 'majSt',
            movement: 'majWk',
        },
        meleeCombatStats: {
            damage: 'majSt',
            preferreddamage: 'crushingweapons',
            slashingDR: 'majWk',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            flanks: 'majWk',
            cover: 'majWk',
            defense: 'majWk',
            attack: 'majWk',
            initiative: 'minWk',
            measure: 'minSt',
            panic: null,
            rangeIncrement: null,
            recovery: 'majWk',
            vitality: 'majSt',
            movement: 'majWk',
        },
        weapons: [
            {
                label: 'Axes',
                items: ['Bardiche (S)', 'Battle Axe (S)', 'Dane Axe (S)']
            },
            {
                label: 'Polearms',
                items: ['Ranseur (P)', 'War-scythe (P)']
            },
            {
                label: 'Sidearms',
                items: ['Dagger (P)', 'Dagger (S)']
            },
            {
                label: 'Swords',
                items: ['Zweihander (S)']
            },
            {
                label: 'Trauma',
                items: ['Club (C)', 'Mace (C)', 'Maul (C)', 'War Flail (C)', 'War Hammer (C)']
            }
        ],
        armor: ['Chainmail', 'Plated Mail'],
        shields: [],
    },
    'Defender': {
        weapontype: 'm',
        rangedCombatStats: {
            damage: 'minSt',
            preferreddamage: 'piercingweapons',
            defense: 'majWk',
            vitality: null,
            cover: 'majSt',
            staticDR: 'minWk',
            parry: 'majSt',
            parrySlashDR: 'minSt',
            parryStaticDR: 'minWk',
            slashingDR: 'minSt',
            flanks: 'majSt',
            attack: 'majWk',
            initiative: 'noneWk',
            measure: null,
            panic: 'minSt',
            rangeIncrement: 'minSt',
            recovery: 'majWk',
            movement: 'minWk',
        },
        meleeCombatStats: {
            damage: 'minSt',
            preferreddamage: 'piercingweapons',
            defense: 'majWk',
            vitality: null,
            cover: 'majSt',
            staticDR: 'minWk',
            parry: 'majSt',
            parrySlashDR: 'minSt',
            parryStaticDR: 'minWk',
            slashingDR: 'minSt',
            flanks: 'majSt',
            attack: 'majWk',
            initiative: 'noneWk',
            measure: 'majSt',
            panic: 'minSt',
            rangeIncrement: null,
            recovery: 'minWk',
            movement: 'minWk',
        },
        weapons: [
            {
                label: 'Polearms',
                items: ['Bill (S)', 'Guisarme (P)', 'Pike (P)']
            },
            {
                label: 'Sidearms',
                items: ['Dagger (P)', 'Dagger (S)', 'Dusack (S)']
            },
            {
                label: 'Swords',
                items: ['Arming Sword (S)', 'Court Sword (P)', 'Messer (S)', 'Sabre (S)', 'Schiavona (S)']
            }
        ],
        armor: ['Scale', 'Laminar (Banded Mail)', 'Full Plate'],
        shields: ['Heater', 'Figure Eight', 'Kite'],
    },
    'Duelist': {
        weapontype: 'm',
        rangedCombatStats: {
            damage: 'majWk',
            preferreddamage: 'piercingweapons',
            defense: 'noneWk',
            vitality: 'majWk',
            cover: null,
            staticDR: 'minWk',
            parry: 'majSt',
            parrySlashDR: 'majSt',
            parryStaticDR: 'majSt',
            slashingDR: 'majWk',
            flanks: 'noneWk',
            attack: 'minWk',
            initiative: 'minSt',
            measure: null,
            panic: 'minSt',
            rangeIncrement: 'noneWk',
            recovery: 'minSt',
            movement: null,
        },
        meleeCombatStats: {
            damage: 'minWk',
            preferreddamage: 'slashingweapons',
            defense: 'noneWk',
            vitality: 'majWk',
            cover: null,
            staticDR: 'minWk',
            parry: 'majSt',
            parrySlashDR: 'majSt',
            parryStaticDR: 'majSt',
            slashingDR: 'majWk',
            flanks: 'noneWk',
            attack: 'minSt',
            initiative: 'minSt',
            measure: 'noneWk',
            panic: 'minSt',
            rangeIncrement: null,
            recovery: 'majSt',
            movement: null,
        },
        weapons: [
            {
                label: 'Polearms',
                items: ['Halberd (S)', 'Halberd (P)', 'Planson (P)', 'Short Spear (P)', 'Voulge (P)']
            },
            {
                label: 'Sidearms',
                items: ['Dagger (P)', 'Dagger (S)', 'Scourge (S)', 'Stiletto (P)']
            },
            {
                label: 'Swords',
                items: ['Estoc (P)', 'Longsword (S)', 'Rapier (P)']
            },
            {
                label: 'Trauma',
                items: ['Goedendag (P)', 'Quarterstaff (C)']
            }
        ],
        armor: ['Gambeson', 'Leather'],
        shields: ['Buckler']
    },
    'Shock': {
        weapontype: 'm',
        rangedCombatStats: {
            damage: 'majWk',
            preferreddamage: 'piercingweapons',
            defense: 'majWk',
            vitality: 'minWk',
            cover: 'majWk',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            slashingDR: 'majWk',
            flanks: 'majWk',
            attack: 'minWk',
            initiative: 'noneWk',
            measure: null,
            panic: 'majSt',
            rangeIncrement: 'noneWk',
            recovery: 'minSt',
            movement: 'minSt',
        },
        meleeCombatStats: {
            damage: 'majSt',
            preferreddamage: 'slashingweapons',
            defense: 'majWk',
            vitality: 'minWk',
            cover: 'majWk',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            slashingDR: 'majWk',
            flanks: 'majWk',
            attack: 'minSt',
            initiative: 'noneWk',
            measure: 'majSt',
            panic: 'majSt',
            rangeIncrement: null,
            recovery: 'majWk',
            movement: 'minSt',
        },
        weapons: [
            {
                label: 'Axes',
                items: ['Dane Axe (S)', 'Horseman\'s pick (P)', 'Lochaber Axe (S)']
            },
            {
                label: 'Polearms',
                items: ['Glaive (S)', 'Lance (P)', 'Lucerne (C)', 'Sovnya (S)']
            },
            {
                label: 'Sidearms',
                items: ['Cinquedea (S)', 'Dagger (P)', 'Dagger (S)', 'Katzbalger (S)']
            },
            {
                label: 'Trauma',
                items: ['Bludgeon (C)']
            },
            {
                label: 'Swords',
                items: ['Executioner\'s Sword (S)', 'Falchion (S)', 'Koncerz (P)']
            },
            {
                label: 'Trauma',
                items: ['Bec De Corbin (C)', 'Great Hammer (C)', 'Peasant\'s Flail (C)']
            }
        ],
        armor: ['Gambeson', 'Leather', 'Coat of Plates'],
        shields: []
    },
    'Skirmisher': {
        weapontype: 'r',
        rangedCombatStats: {
            damage: 'minWk',
            preferreddamage: 'piercingweapons',
            defense: 'minWk',
            vitality: 'majWk',
            cover: 'minSt',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            slashingDR: 'majWk',
            flanks: 'majWk',
            attack: 'majSt',
            initiative: 'minSt',
            measure: null,
            panic: null,
            rangeIncrement: 'majWk',
            recovery: 'majSt',
            movement: 'majSt',
        },
        meleeCombatStats: {
            damage: 'minSt',
            preferreddamage: 'slashingweapons',
            defense: 'minWk',
            vitality: 'majWk',
            cover: 'minSt',
            staticDR: 'majWk',
            parry: 'majWk',
            parrySlashDR: 'majWk',
            parryStaticDR: 'majWk',
            slashingDR: 'majWk',
            flanks: 'majWk',
            attack: 'minSt',
            initiative: 'minSt',
            measure: 'minSt',
            panic: null,
            rangeIncrement: null,
            recovery: 'majWk',
            movement: 'majSt',
        },
        weapons: [
            {
                label: 'Axes',
                items: ['Handaxe (S)']
            },
            {
                label: 'Neutral Choices',
                items: ['Melee Javelin (P)', 'Short Spear (P)']
            },
            {
                label: 'Ranged',
                items: ['Composite Bow (P)', 'Javelin (P)', 'Sling (C)', 'Throwing Axe (S)', 'Throwing Knife (P)']
            },
            {
                label: 'Sidearms',
                items: ['Dagger (P)', 'Dagger (S)', 'Knife (S)']
            }
        ],
        armor: ['Gambeson', 'Leather'],
        shields: ['Buckler'],
    }
}

export type PreferredWeaponTypes = 'piercingweapons' | 'crushingweapons' | 'slashingweapons'

interface WeaponStats {
    damage: Strength,
    preferreddamage: PreferredWeaponTypes,
    slashingDR: Strength,
    staticDR: Strength,
    parry: Strength,
    parrySlashDR: Strength,
    parryStaticDR: Strength,
    flanks: Strength,
    cover: Strength,
    defense: Strength,
    attack: Strength,
    initiative: Strength,
    measure: Strength,
    panic: Strength,
    rangeIncrement: Strength,
    recovery: Strength,
    vitality: Strength,
    movement: Strength,
}

interface LabelAndItems {
    label: string,
    items: string[]
}

interface PrimaryCombatRole {
    weapontype: 'r' | 'm',
    rangedCombatStats: WeaponStats,
    meleeCombatStats: WeaponStats,
    weapons: LabelAndItems[],
    armor: string[],
    shields: string[]
}

interface PrimaryCombatRolesObject {
    [key: string] : PrimaryCombatRole
}