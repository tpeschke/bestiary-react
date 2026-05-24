import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { getBonfireSystemInfo } from "@bestiary/common/utilities/get/getSystemInfo";
import query from "../../../../../../../db/database";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const sqlQuery = `update bbIndividualBeast
    set combatSkulls = $2, combatEpValue = $3, role = $4, secondaryRole = $5, tactics = $6, sp_def = $7
    where id = $1`

    const { combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, defenseInfo } = combatInfo

    return query(sqlQuery, [beastID, combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, getBonfireSystemInfo(defenseInfo)])
}