import { RoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleSkillInfo(beastID: number, roleID: string, roleInfo: RoleSkillInfo) {
        const sqlQuery = `update bbroles
        set skillSkulls = $3, skillrole = $4, skillsecondary = $5
        where beastid = $1 and id = $2`
    
        const { skillSkulls, skillRole, skillSecondary } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, skillSkulls, skillRole, skillSecondary])
}