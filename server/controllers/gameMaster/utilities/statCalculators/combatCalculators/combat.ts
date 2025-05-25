import { Strength } from "../../../../../interfaces/beastInterfaces/beastInterfaces";
import { AttackInfo, DamageType, DefenseInfo, RawCombatStat } from "../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Size } from "../../../../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";

import { primaryCombatRoles } from "../roleInfo/combatRoleInfo";
import { calculateCover, calculateDefense, calculateDR, calculateParryDR, calculateStat, calculateStatWithFormatting } from "./combatScaling/combatCalculator";
import { calculateDamageAndRecovery } from "./combatScaling/damageAndRecoveryCalculator";

export interface CalculateCombatStatsReturn {
    intiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export function calculateCombatStats(combatStats: RawCombatStat[], combatpoints: number, role: string, size: Size): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []

    combatStats.forEach(stats => calculateSingleCombatInfo(stats, defenses, attacks, combatpoints, role, size))

    const initiative = combatStats.length > 0 ? combatStats[0].initiative : 'minWk'

    return {
        intiative: calculateStatWithFormatting(initiative, 'initiative', role, combatpoints),
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], combatpoints: number, role: string, size: Size): void {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, weapontype, showonlydefenses, recovery, measure, rangeddefense: cover, weaponname,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage
    } = stats

    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, role)
    const totalPoints = combatpoints + adjustment
    const weaponName = getWeaponName(weaponname, weapon, shield, armor)

    defenses.push(
        {
            id, beastid, roleid, swarmbonus, armor, shield, eua, tdr,
            name: weaponName,
            defense: calculateDefense(alldefense, role, totalPoints, addsizemod, size),
            flanks: calculateStat(flanks, 'flanks', role, totalPoints),
            parry: calculateStatWithFormatting(parry, 'parry', role, totalPoints),
            cover: calculateCover(cover, role, totalPoints),
            parryDR: calculateParryDR(parryStaticDR, parrySlashDR, role, totalPoints, eua),
            dr: calculateDR(slashingDR, staticDR, role, totalPoints)
        }
    )

    if (!showonlydefenses) {
        attacks.push(
            {
                id, beastid, roleid, info, swarmbonus, damageType, isspecial, weapon,
                name: weaponName,
                type: weapontype,
                measure: calculateStat(measure, 'measure', role, totalPoints),
                attack: calculateStatWithFormatting(attack, 'attack', role, totalPoints),
                rangeIncrement: calculateStatWithFormatting(rangeIncrement, 'rangeIncrement', role, totalPoints),
                ...calculateDamageAndRecovery(slashingDamage, crushingDamage, piercingDamage, recovery, role, totalPoints, isspecial, damageType)
            }
        )
    }
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

    return primaryCombatRoles[role].meleeCombatStats.preferreddamage.substring(0, 1).toUpperCase();
}
