import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import query from "../../../../../../../db/database";
import { NonspecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";

export default async function updateBasicSkillInfo(beastID: number, skillInfo: NonspecificSkillInfo, everythingElseStrength?: Strength) {
    const sqlQuery = `update bbIndividualBeast
    set skillSkulls = $2, skillEpValue = $3, skillRole = $4, skillSecondary = $5, everythingElseStrength = $6
    where id = $1`

    const { skillSkulls, skillRawEpValue, skillRole, skillSecondary } = skillInfo

    return query(sqlQuery, [beastID, skillSkulls, skillRawEpValue, skillRole, skillSecondary, everythingElseStrength])
}