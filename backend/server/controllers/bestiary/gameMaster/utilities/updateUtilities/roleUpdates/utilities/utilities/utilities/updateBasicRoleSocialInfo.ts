import { AllRoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/socialInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleSocialInfo(beastID: number, roleID: string, roleInfo: AllRoleSocialInfo) {
        const sqlQuery = `update bbRoles
        set socialSkulls = $3, socialEpValue = $4, socialRole = $5, socialSecondary = $6, capacity = $7
        where beastID = $1 and id = $2`
    
        const { socialSkulls, socialRawEpValue, socialRole, socialSecondary, capacity } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, socialSkulls, socialRawEpValue, socialRole, socialSecondary, capacity.strength])
}