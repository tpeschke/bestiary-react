import { Strength } from "../../../../../interfaces/beastInterfaces/beastInterfaces";
import { AttackInfo, DamageType, DefenseInfo, RawCombatStat } from "../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Size } from "../../../../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";
import { getWeaponByName } from "../../../../gear/gear";

import { primaryCombatRoles } from "../roleInfo/combatRoleInfo";
import { calculateCover, calculateDefense, calculateDR, calculateParryDR, calculateStat, calculateStatWithFormatting } from "./combatScaling/combatCalculator";
import calculateAndFormatAttackInfo from "./utilities/attackCalculators";
import { formatNameWithComma } from "./utilities/formatting";

export interface CalculateCombatStatsReturn {
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export function calculateCombatStats(combatStats: RawCombatStat[], combatPoints: number, role: string, size: Size): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []

    combatStats.forEach(stats => calculateSingleCombatInfo(stats, defenses, attacks, combatPoints, role, size))

    const initiative = combatStats.length > 0 ? combatStats[0].initiative : 'minWk'

    return {
        initiative: calculateStatWithFormatting(initiative, 'initiative', role, combatPoints),
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], combatPoints: number, role: string, size: Size): void {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, weapontype, showonlydefenses, recovery, measure, rangeddefense: cover, weaponname: chosenName,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage
    } = stats

    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, role)
    const totalPoints = combatPoints + adjustment

    defenses.push(
        {
            id, beastid, roleid, swarmbonus, armor, shield, eua, tdr,
            name: getDefenseName(chosenName, shield, armor),
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
                id, beastid, roleid, info, swarmbonus, isspecial, weapon,
                ...calculateAndFormatAttackInfo(totalPoints, role, chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType)
            }
        )
    }
}

function getDefenseName(chosenName: string, shield: string, armor: string): string {
    if (chosenName) {
        return chosenName
    }

    let name = ''
    if (shield) { name = formatNameWithComma(name, shield) }
    if (armor) { name = formatNameWithComma(name, armor) }

    return name;
}

function getDamageType(slashingDamage: Strength, crushingDamage: Strength, piercingDamage: Strength, role: string): DamageType {
    if (slashingDamage) { return 'S' }
    if (crushingDamage) { return 'C' }
    if (piercingDamage) { return 'P' }

    return primaryCombatRoles[role].meleeCombatStats.preferreddamage.substring(0, 1).toUpperCase();
}
