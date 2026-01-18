import { Movement, RawMovement } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { calculateMovements } from "@bestiary/common/utilities/scalingAndBonus/combat/movement"
import query from "../../../../../../../../../db/database"
import { getMonsterMovement } from "../../../../../../../../../db/beast/movement"

export default async function getMovement(beastId: number, combatpoints: number, role: string): Promise<(Movement)[]> {
    const movements: RawMovement[] = await query(getMonsterMovement, beastId)
    return calculateMovements(movements, combatpoints, role)
}