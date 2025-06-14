import { Movement, RawCombatStat, RawMovement } from "../../../../interfaces/beastInterfaces/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../interfaces/beastInterfaces/infoInterfaces/generalInfoInterfaces"
import { CalculateCombatStatsReturn, calculateCombatStats } from "../statCalculators/combatCalculators/combat"
import { calculateMovements } from "../statCalculators/combatCalculators/utilities/movement"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)
    return calculateCombatStats(combatStats, combatPoints, role, size)
}

export async function getMovement(databaseConnection: any, beastId: number, combatpoints: number, role: string): Promise<Movement[]> {
    const movements: RawMovement[] = await databaseConnection.beast.movement.get(beastId)
    return calculateMovements(movements, combatpoints, role)
}