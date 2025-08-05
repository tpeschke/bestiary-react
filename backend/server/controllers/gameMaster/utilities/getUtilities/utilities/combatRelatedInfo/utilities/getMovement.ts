import { Movement, RawMovement } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import { calculateMovements } from "@bestiary/common/utilities/scalingAndBonus/combat/movement"

export default async function getMovement(databaseConnection: any, beastId: number, combatpoints: number, role: string): Promise<(Movement | null)[]> {
    const movements: RawMovement[] = await databaseConnection.beast.movement.get(beastId)
    return calculateMovements(movements, combatpoints, role)
}