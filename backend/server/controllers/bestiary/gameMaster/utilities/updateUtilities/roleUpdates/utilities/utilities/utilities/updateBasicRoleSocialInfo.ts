import { RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleSocialInfo(beastID: number, roleID: string, roleInfo: RoleSocialInfo) {
        const sqlQuery = `update bbroles
        set socialskulls = $3, socialrole = $4, socialsecondary = $5
        where beastid = $1 and id = $2`
    
        const { socialSkulls, socialRole, socialSecondary } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, socialSkulls, socialRole, socialSecondary])
}