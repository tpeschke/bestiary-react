import { CalculateCombatStatsReturn } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation"
import { RawCombatStat } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateCombatStats from "./utilities/sortAndCalculate"
import calculateAttacksAndDefenses from "./utilities/calculate"
import GearCacheClass from "../../../../../gear/model/GearCacheClass"

export async function getCombatStats(databaseConnection: any, beastId: number, combatPoints: number, role: string, size: Size, gearCache: GearCacheClass | undefined): Promise<CalculateCombatStatsReturn> {
    const defenses: RawCombatStat[] = await databaseConnection.beast.defenses.get(beastId)
    
    if (defenses.length > 0) {
        const combatStats: RawCombatStat[] = await databaseConnection.beast.attacks.get(beastId)
        return calculateAttacksAndDefenses(combatStats, defenses, combatPoints, role, size, gearCache)
    } else {
        const combatStats: RawCombatStat[] = await databaseConnection.beast.combatStat.get(beastId)
        return calculateCombatStats(combatStats, combatPoints, role, size, gearCache)
    }
}
