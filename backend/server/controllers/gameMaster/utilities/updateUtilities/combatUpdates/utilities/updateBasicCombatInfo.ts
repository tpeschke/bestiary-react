import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import query from "../../../../../../db/database";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const sqlQuery = `update bbindividualbeast
    set combatskulls = $2
    where id = $1`

    const { combatSkulls } = combatInfo

    return query(sqlQuery, [beastID, combatSkulls])
}