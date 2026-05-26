import { NonspecificCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../../db/database";
import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: NonspecificCombatInfo) {
    const sqlQuery = `update bbIndividualBeast
    set combatSkulls = $2, combatEpValue = $3, role = $4, secondaryRole = $5, tactics = $6, 
    sp_def = $7, sp_def_hm = $8
    where id = $1`

    const { combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, defenseInfo } = combatInfo

    return query(sqlQuery, [
        beastID, combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, 
        defenseInfo[BONFIRE], defenseInfo[HACKMASTER]
    ])
}