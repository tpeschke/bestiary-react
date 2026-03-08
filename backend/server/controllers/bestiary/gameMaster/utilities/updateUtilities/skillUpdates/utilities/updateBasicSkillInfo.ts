import query from "../../../../../../../db/database";
import SkillInfo from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";

export default async function updateBasicSkillInfo(beastID: number, skillInfo: SkillInfo) {
    const sqlQuery = `update bbIndividualBeast
    set skillSkulls = $2, skillRole = $3, skillSecondary = $4
    where id = $1`

    const { skillSkulls, skillRole, skillSecondary } = skillInfo

    return query(sqlQuery, [beastID, skillSkulls, skillRole, skillSecondary])
}