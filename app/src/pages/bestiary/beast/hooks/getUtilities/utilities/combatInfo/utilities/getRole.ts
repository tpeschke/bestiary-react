import { BeastInfo } from "../../../../../interfaces/viewInterfaces"
import { getSelectedRoleIndex } from "../../getRoleInfo"
import { formatSpecificCombatInfo } from "../getCombatInfo"

export function getCombatRoleType(beastInfo: BeastInfo, roleId: string | null): string | null {
    const index = getSelectedRoleIndex(beastInfo, roleId)

    if (index >= 0) {
        return beastInfo.roleInfo.roles[index].combatInfo.combatRole
    }

    return formatSpecificCombatInfo(beastInfo, roleId).combatRole
}