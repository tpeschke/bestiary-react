import { CalculateCombatStatsReturn } from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/combatCalculation"
import { RawCombatStat } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { Size } from "@bestiary/common/interfaces/beast/infoInterfaces/generalInfoInterfaces"
import calculateCombatStats from "./utilities/sortAndCalculate"
import calculateAttacksAndDefenses from "./utilities/calculate"
import { getMonsterDefenses } from "../../../../../../../../db/beast/defenses"
import { getMonsterAttacks } from "../../../../../../../../db/beast/attacks"
import { getMonsterCombatStats } from "../../../../../../../../db/beast/combatStat"

type CombatInfoQuery = (text: string, params: number) => Promise<RawCombatStat[]>
let defaultCombatInfoQuery: CombatInfoQuery | undefined

async function queryCombatInfo(text: string, params: number): Promise<RawCombatStat[]> {
    if (!defaultCombatInfoQuery) {
        defaultCombatInfoQuery = (await import("../../../../../../../../db/database")).default
    }

    return defaultCombatInfoQuery(text, params)
}

export async function getCombatStats(
    beastId: number,
    skullIndex: number,
    role: string,
    size: Size,
    gearCache: unknown,
    combatInfoQuery: CombatInfoQuery = queryCombatInfo
): Promise<CalculateCombatStatsReturn> {
    const defenses: RawCombatStat[] = await combatInfoQuery(getMonsterDefenses, beastId)

    if (defenses.length > 0) {
        const attacks: RawCombatStat[] = await combatInfoQuery(getMonsterAttacks, beastId)
        const attacksAndDefenses = calculateAttacksAndDefenses(attacks, defenses, skullIndex, role, size, gearCache)

        if (attacksAndDefenses.attacks.length > 0) {
            return attacksAndDefenses
        }

        const legacyCombatStats: RawCombatStat[] = await combatInfoQuery(getMonsterCombatStats, beastId)
        const legacyAttacks = calculateCombatStats(legacyCombatStats, skullIndex, role, size, gearCache).attacks

        return {
            ...attacksAndDefenses,
            attacks: legacyAttacks
        }
    } else {
        const combatStats: RawCombatStat[] = await combatInfoQuery(getMonsterCombatStats, beastId)
        return calculateCombatStats(combatStats, skullIndex, role, size, gearCache)
    }
}
