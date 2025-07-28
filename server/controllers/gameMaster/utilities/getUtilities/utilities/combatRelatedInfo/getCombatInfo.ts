import { CalculateCombatStatsReturn } from "../../../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"
import { RawCombatStat } from "../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateCombatStats from "./utilities/sortAndCalculate"
import calculateAttacksAndDefenses from "./utilities/calculate"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    const defenses: RawCombatStat[] = await databaseConnection.beast.defenses.get(beastId)
    
    if (defenses.length > 0) {
        const combatStats: RawCombatStat[] = await databaseConnection.beast.attacks.get(beastId)
        return calculateAttacksAndDefenses(combatStats, defenses, combatPoints, role, size)
    } else {
        const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)
        return calculateCombatStats(combatStats, combatPoints, role, size)
    }
}
