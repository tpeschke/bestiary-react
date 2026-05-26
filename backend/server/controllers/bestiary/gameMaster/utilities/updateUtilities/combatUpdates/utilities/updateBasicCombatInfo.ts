import { NonspecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../db/database";
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: NonspecificCombatInfo) {
    const sqlQuery = `update bbIndividualBeast
    set combatSkulls = $2, combatEpValue = $3, role = $4, secondaryRole = $5, tactics = $6, 
    sp_atk = $7, sp_atk_hm = $8, sp_def = $9, sp_def_hm = $10
    where id = $1`

    const { combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, attackInfo, defenseInfo } = combatInfo

    return query(sqlQuery, [
        beastID, combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, 
        attackInfo[BONFIRE], attackInfo[HACKMASTER], defenseInfo[BONFIRE], defenseInfo[HACKMASTER]
    ])
}