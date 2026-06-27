import { Movement } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import calculateMovement from "@bestiary/common/utilities/scalingAndBonus/bonfire/combat/movement"

export default function adjustMovementInfo(points: number, roleID: string | null, role: string) {
    return (movementInfo: Movement[], movement: Movement): Movement[] => {
        if (!movement?.roleId || movement?.roleId === roleID || movement?.allRoles) {
            const calculatedMovement = calculateMovement(movement, points, role)
            if (calculatedMovement) { movementInfo.push(calculatedMovement) }
        }
        return movementInfo
    }
}