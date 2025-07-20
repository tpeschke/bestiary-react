import { CalculateCombatStatsReturn } from "../../../../../../../common/utilities/scalingAndBonus/combat/combatCalculation"
import { RawCombatStat } from "../../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "../../../../../../../common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateCombatStats from "./utilities/sortAndCalculate"
import calculateAttacksAndDefenses from "./utilities/calculate"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size): Promise<CalculateCombatStatsReturn> {
    const defenses: RawCombatStat[] = await databaseConnection.beast.defenses.get(beastId)
    const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)

    if (defenses.length > 0) {
        return calculateAttacksAndDefenses(combatStats, defenses, combatPoints, role, size)
    } else {
        return calculateCombatStats(combatStats, combatPoints, role, size)
    }
}
