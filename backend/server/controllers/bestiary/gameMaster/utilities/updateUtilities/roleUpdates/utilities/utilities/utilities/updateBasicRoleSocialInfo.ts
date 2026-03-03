import { RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleSocialInfo(beastID: number, roleID: string, roleInfo: RoleSocialInfo) {
        const sqlQuery = `update bbRoles
        set socialSkulls = $3, socialRole = $4, socialSecondary = $5, capacity = $6
        where beastID = $1 and id = $2`
    
        const { socialSkulls, socialRole, socialSecondary, capacity } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, socialSkulls, socialRole, socialSecondary, capacity.strength])
}