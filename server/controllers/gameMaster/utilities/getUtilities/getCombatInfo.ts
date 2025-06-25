import { CalculateCombatStatsReturn, calculateCombatStats } from "../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"
import { calculateMovements } from "../../../../../common/utilities/scalingAndBonus/combat/movement"
import { Movement, RawCombatStat, RawMovement } from "../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)
    return calculateCombatStats(combatStats, combatPoints, role, size)
}

export async function getMovement(databaseConnection: any, beastId: number, combatpoints: number, role: string): Promise<Movement[]> {
    const movements: RawMovement[] = await databaseConnection.beast.movement.get(beastId)
    return calculateMovements(movements, combatpoints, role)
}