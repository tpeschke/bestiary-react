import { RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleSocialInfo(beastID: number, roleID: string, roleInfo: RoleSocialInfo) {
        const sqlQuery = `update bbroles
        set socialskulls = $3
        where beastid = $1 and id = $2`
    
        const { socialSkulls } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, socialSkulls])
}