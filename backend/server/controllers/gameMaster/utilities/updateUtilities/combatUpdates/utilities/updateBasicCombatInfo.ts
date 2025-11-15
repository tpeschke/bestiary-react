import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../db/database";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const sqlQuery = `update bbindividualbeast
    set combatskulls = $2, role = $3, secondaryrole = $4
    where id = $1`

    const { combatSkulls, combatRole, combatSecondary } = combatInfo

    return query(sqlQuery, [beastID, combatSkulls, combatRole, combatSecondary])
}