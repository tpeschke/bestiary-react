import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../db/database";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const sqlQuery = `update bbIndividualBeast
    set combatSkulls = $2, role = $3, secondaryRole = $4, tactics = $5
    where id = $1`

    const { combatSkulls, combatRole, combatSecondary, limitNotes } = combatInfo

    return query(sqlQuery, [beastID, combatSkulls, combatRole, combatSecondary, limitNotes])
}