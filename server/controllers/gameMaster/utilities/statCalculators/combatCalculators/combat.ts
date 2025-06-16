import { AttackInfo, DamageType, DefenseInfo, RawCombatStat } from "../../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces";
import { Size } from "../../../../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces";

import { calculateCover, calculateDefense, calculateDR, calculateParryDR, calculateStat, calculateStatWithFormatting } from "./combatScaling/combatCalculator";
import calculateAndFormatAttackInfo from "./utilities/attackCalculators";
import { getDefenseName, getDamageType } from './utilities/formatting'

export interface CalculateCombatStatsReturn {
    initiative: string,
    attacks: AttackInfo[],
    defenses: DefenseInfo[]
}

export function calculateCombatStats(combatStats: RawCombatStat[], combatPoints: number, role: string, size: Size): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []

    combatStats.forEach(stats => {
        calculateSingleCombatInfo(stats, defenses, attacks, size, combatPoints, role)
    })

    const initiative = combatStats.length > 0 ? combatStats[0].initiative : 'minWk'

    return {
        initiative: calculateStatWithFormatting(initiative, 'initiative', role, combatPoints),
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], size: Size, mainCombatPoints: number, mainRole: string): void {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, weapontype, showonlydefenses, recovery, measure, rangeddefense: cover, weaponname: chosenName,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, combatpoints: combatPoints
    } = stats

    const roleToUse = role ? role : mainRole
    
    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, roleToUse)
    
    const pointsToUse = combatPoints ? combatPoints : mainCombatPoints
    const totalPoints = pointsToUse + adjustment

    defenses.push(
        {
            id, beastid, roleid, swarmbonus, armor, shield, eua, tdr,
            name: getDefenseName(chosenName, shield, armor),
            defense: calculateDefense(alldefense, roleToUse, totalPoints, addsizemod, size),
            flanks: calculateStat(flanks, 'flanks', roleToUse, totalPoints),
            parry: calculateStatWithFormatting(parry, 'parry', roleToUse, totalPoints),
            cover: calculateCover(cover, roleToUse, totalPoints),
            parryDR: calculateParryDR(parryStaticDR, parrySlashDR, roleToUse, totalPoints, eua),
            dr: calculateDR(slashingDR, staticDR, roleToUse, totalPoints)
        }
    )

    if (!showonlydefenses) {
        attacks.push(
            {
                id, beastid, roleid, info, swarmbonus, isspecial, weapon,
                ...calculateAndFormatAttackInfo(totalPoints, roleToUse, chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType)
            }
        )
    }
}