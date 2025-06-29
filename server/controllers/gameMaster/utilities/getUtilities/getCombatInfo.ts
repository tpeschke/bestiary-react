import { calculateAttackInfo, CalculateCombatStatsReturn, calculateDefenseInfo, calculateStatWithFormatting } from "../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"
import { calculateMovements } from "../../../../../common/utilities/scalingAndBonus/combat/movement"
import { AttackInfo, DefenseInfo, Movement, RawCombatStat, RawMovement } from "../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import { getDamageType } from "../../../../../common/utilities/formatting/formatting"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)
    return calculateCombatStats(combatStats, combatPoints, role, size)
}

export async function getMovement(databaseConnection: any, beastId: number, combatpoints: number, role: string): Promise<Movement[]> {
    const movements: RawMovement[] = await databaseConnection.beast.movement.get(beastId)
    return calculateMovements(movements, combatpoints, role)
}

function calculateCombatStats(combatStats: RawCombatStat[], combatPoints: number, mainRole: string, size: Size): CalculateCombatStatsReturn {
    let defenses: DefenseInfo[] = []
    let attacks: AttackInfo[] = []
    combatStats.forEach(stats => {
        calculateSingleCombatInfo(stats, defenses, attacks, size, combatPoints, mainRole)
    })

    const firstCombatIndex = combatStats[0]
    const initiative = firstCombatIndex ? firstCombatIndex.initiative : 'minWk'
    const roleToUse = firstCombatIndex && firstCombatIndex.role ? firstCombatIndex.role : mainRole

    return {
        initiative: calculateStatWithFormatting(initiative, 'initiative', roleToUse, combatPoints),
        attacks,
        defenses
    }
}

function calculateSingleCombatInfo(stats: RawCombatStat, defenses: DefenseInfo[], attacks: AttackInfo[], size: Size, mainCombatPoints: number, mainRole: string): void {
    const { id, beastid, roleid, info, adjustment, addsizemod, tdr, swarmbonus, rangedistance: rangeIncrement, showonlydefenses, recovery, measure, rangeddefense: cover, weaponname: chosenName,
        armor, shield, weapon, eua, isspecial, attack, alldefense, flanks, andcrushing: parryStaticDR, andslashing: parrySlashDR, weaponsmallslashing: slashingDR, weaponsmallcrushing: staticDR, weaponsmallpiercing: parry,
        slashingweapons: slashingDamage, crushingweapons: crushingDamage, piercingweapons: piercingDamage, role, combatpoints: combatPoints
    } = stats

    const roleToUse = role ? role : mainRole

    const damageType = getDamageType(slashingDamage, crushingDamage, piercingDamage, roleToUse)

    const pointsToUse = combatPoints ? combatPoints : mainCombatPoints

    defenses.push({
        ...calculateDefenseInfo({ id, beastid, roleid, swarmbonus, armor, shield, eua, tdr, name: chosenName, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR }, pointsToUse, roleToUse, addsizemod, size),
        scalingInfo: { swarmbonus, armor, shield, eua, tdr, name: chosenName, alldefense, adjustment, flanks, parry, cover, parryStaticDR, parrySlashDR, slashingDR, staticDR, addsizemod }
    })

    if (!showonlydefenses) {
        attacks.push({
            ...calculateAttackInfo({ id, beastid, roleid, info, swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, isspecial, damageType, adjustment }, pointsToUse, roleToUse),
            scalingInfo: { swarmbonus, name: chosenName, weapon, measure, attack, rangeIncrement, slashingDamage, crushingDamage, piercingDamage, recovery, damageType, adjustment }
        })
    }
}