import { Strength } from "@bestiary/common/interfaces/calculationInterfaces";
import query from "../../../../../../../db/database";
import { NonspecificSkillInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/skillInfoInterfaces";
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";

export default async function updateBasicSkillInfo(beastID: number, skillInfo: NonspecificSkillInfo, everythingElseStrength?: Strength) {
    const sqlQuery = `update bbIndividualBeast
    set skillSkulls = $2, skillEpValue = $3, skillRole = $4, skillSecondary = $5, everythingElseStrength = $6,
    atk_skill = $7, atk_skill_hm = $8, def_skill = $9, def_skill_hm = $10
    where id = $1`

    const { skillSkulls, skillRawEpValue, skillRole, skillSecondary, attackInfo, defenseInfo } = skillInfo

    return query(sqlQuery, [
        beastID, skillSkulls, skillRawEpValue, skillRole, skillSecondary, everythingElseStrength,
        attackInfo[BONFIRE], attackInfo[HACKMASTER], defenseInfo[BONFIRE], defenseInfo[HACKMASTER]
    ])
}