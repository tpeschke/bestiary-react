import { RoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleCombatInfo(beastID: number, roleID: string, roleInfo: RoleCombatInfo) {
        const sqlQuery = `update bbroles
        set combatSkulls = $3, role = $4, secondaryrole = $5
        where beastid = $1 and id = $2`
    
        const { combatSkulls, combatRole, combatSecondary } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, combatSkulls, combatRole, combatSecondary])
}