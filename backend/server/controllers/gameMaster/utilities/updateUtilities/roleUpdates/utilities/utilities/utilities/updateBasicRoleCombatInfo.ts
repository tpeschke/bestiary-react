import { RoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleCombatInfo(beastID: number, roleInfo: RoleCombatInfo) {
        const sqlQuery = `update bbroles
        set combatSkulls = $2
        where id = $1`
    
        const { combatSkulls } = roleInfo
    
        return query(sqlQuery, [beastID, combatSkulls])
}