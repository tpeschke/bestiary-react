import { AllRoleSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/skillInfoInterfaces";
import query from "../../../../../../../../../db/database";

export default async function updateBasicRoleSkillInfo(beastID: number, roleID: string, roleInfo: AllRoleSkillInfo) {
        const sqlQuery = `update bbRoles
        set skillSkulls = $3, skillEpValue = $4, skillRole = $5, skillSecondary = $6, everythingElseStrength = $7
        where beastID = $1 and id = $2`
    
        const { skillSkulls, skillRawEpValue, skillRole, skillSecondary, skills } = roleInfo
    
        return query(sqlQuery, [beastID, roleID, skillSkulls, skillRawEpValue, skillRole, skillSecondary, skills.everythingElseStrength])
}