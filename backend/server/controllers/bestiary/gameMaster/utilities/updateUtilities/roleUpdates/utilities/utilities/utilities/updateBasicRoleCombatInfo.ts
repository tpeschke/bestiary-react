import { RoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleCombatInfo(beastID: number, roleID: string, roleInfo: RoleCombatInfo) {
        const sqlQuery = `update bbRoles
        set combatSkulls = $3, combatEpValue = $4, role = $5, secondaryRole = $6
        where beastId = $1 and id = $2`
    
        const { combatSkulls, combatRawEpValue, combatRole, combatSecondary } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, combatSkulls, combatRawEpValue, combatRole, combatSecondary])
}