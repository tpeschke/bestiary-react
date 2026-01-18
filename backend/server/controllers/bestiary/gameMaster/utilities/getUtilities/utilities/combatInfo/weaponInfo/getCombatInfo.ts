import { CalculateCombatStatsReturn } from "@bestiary/common/utilities/scalingAndBonus/combat/combatCalculation"
import { RawCombatStat } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateCombatStats from "./utilities/sortAndCalculate"
import calculateAttacksAndDefenses from "./utilities/calculate"
import query from "../../../../../../../../db/database"
import { getMonsterDefenses } from "../../../../../../../../db/beast/defenses"
import { getMonsterAttacks } from "../../../../../../../../db/beast/attacks"
import { getMonsterCombatStats } from "../../../../../../../../db/beast/combatStat"

export async function getCombatStats(beastId: number, skullIndex: number, role: string, size: Size, gearCache: any | undefined): Promise<CalculateCombatStatsReturn> {
    const defenses: RawCombatStat[] = await query(getMonsterDefenses, beastId)
    
    if (defenses.length > 0) {
        const attacks: RawCombatStat[] = await query(getMonsterAttacks, beastId)
        return calculateAttacksAndDefenses(attacks, defenses, skullIndex, role, size, gearCache)
    } else {
        const combatStats: RawCombatStat[] = await query(getMonsterCombatStats, beastId)
        return calculateCombatStats(combatStats, skullIndex, role, size, gearCache)
    }
}
