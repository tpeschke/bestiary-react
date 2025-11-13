import { RoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleCombatInfo(beastID: number, roleID: string, roleInfo: RoleCombatInfo) {
        const sqlQuery = `update bbroles
        set combatSkulls = $3
        where beastid = $1 and id = $2`
    
        console.log(roleInfo)
        const { combatSkulls } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, combatSkulls])
}