import { RoleSocialInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleSocialInfo(beastID: number, roleInfo: RoleSocialInfo) {
        const sqlQuery = `update bbroles
        set socialskulls = $2
        where id = $1`
    
        const { socialSkulls } = roleInfo
    
        return query(sqlQuery, [beastID, socialSkulls])
}