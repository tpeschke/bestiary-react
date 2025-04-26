import { CombatStat, Strength } from "../../../interfaces/beastInterfaces/beastInterfaces";
import { DamageType, RawCombatStat } from "../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Size } from "../../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";

import { primaryCombatRoles } from "../roleInfo/combatRoleInfo";
import { calculateCover, calculateDefense, calculateDR, calculateParryDR, calculateStat, calculateStatWithFormatting } from "./combatScaling/combatCalculator";
import { calculateDamageAndRecovery } from "./combatScaling/damageAndRecoveryCalculator";

export function calculateCombatStats(combatStats: RawCombatStat[], combatpoints: number, role: string, size: Size): CombatStat[] {
    return combatStats.map(stats => calculateSingleCombatInfo(stats, combatpoints, role, size))
}

function calculateSingleCombatInfo(stats: RawCombatStat, combatpoints: number, role: string, size: Size): CombatStat {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, weapontype, showonlydefenses, recovery, measure, initiative, rangeddefense: cover, weaponname,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage
    } = stats

    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, role)
    const totalPoints = combatpoints + adjustment

    let formattedStats: CombatStat = {
        id, beastid, roleid, info, swarmbonus,
        name: getWeaponName(weaponname, weapon, shield, armor),
        defenseInfo: {
            eua, tdr,
            defense: calculateDefense(alldefense, role, totalPoints, addsizemod, size),
            flanks: calculateStat(flanks, 'flanks', role, totalPoints),
            parry: calculateStatWithFormatting(parry, 'parry', role, totalPoints),
            cover: calculateCover(cover, role, totalPoints),
            parryDR: calculateParryDR(parryStaticDR, parrySlashDR, role, totalPoints, eua),
            dr: calculateDR(slashingDR, staticDR, role, totalPoints),
        },
        equipmentInfo: {
            weapon, shield, armor,
        }
    }

    if (!showonlydefenses) {
        formattedStats.attackInfo = {
            damageType, isspecial,
            measure: calculateStat(measure, 'measure', role, totalPoints),
            attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
            type: weapontype,
            initiative: calculateStatWithFormatting(initiative, 'initiative', role, totalPoints),
            rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
            ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recovery, role, totalPoints, isspecial, damageType)
        }
    }

    return formattedStats
}

function getWeaponName(chosenName: string, weapon: string, shield: string, armor: string): string {
    if (chosenName) {
        return chosenName
    }

    let name = ''
    if (weapon) { name = formatNameWithComma(name, weapon) }
    if (shield) { name = formatNameWithComma(name, shield) }
    if (armor) { name = formatNameWithComma(name, armor) }

    return name;
}

function formatNameWithComma(nameString: string, stringToConcat: string) {
    if (nameString !== '') {
        return nameString += stringToConcat
    }
    return nameString += `, ${stringToConcat}`
}

function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength, role: string): DamageType {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'P' }

    return primaryCombatRoles[role].meleeCombatStats.preferreddamage.substring(0, 1).toUppercase();
}
