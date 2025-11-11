import { RoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../db/database";

export default async function updateBasicRoleSkillInfo(beastID: number, roleInfo: RoleSkillInfo) {
        const sqlQuery = `update bbroles
        set skillSkulls = $2
        where id = $1`
    
        const { skillSkulls } = roleInfo
    
        return query(sqlQuery, [beastID, skillSkulls])
}