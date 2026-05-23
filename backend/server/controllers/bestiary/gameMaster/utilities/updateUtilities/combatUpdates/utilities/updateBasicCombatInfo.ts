import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import { canonicalizeSpecialCombatText } from "@bestiary/common/utilities/formatting/formatting";
import query from "../../../../../../../db/database";

export default async function updateBasicCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const sqlQuery = `update bbIndividualBeast
    set combatSkulls = $2, combatEpValue = $3, role = $4, secondaryRole = $5, tactics = $6, sp_atk = $7, sp_def = $8
    where id = $1`

    const { combatSkulls, combatRawEpValue, combatRole, combatSecondary, limitNotes, attackInfo, defenseInfo } = combatInfo

    return query(sqlQuery, [
        beastID,
        combatSkulls,
        combatRawEpValue,
        combatRole,
        combatSecondary,
        limitNotes,
        canonicalizeSpecialCombatText(attackInfo),
        canonicalizeSpecialCombatText(defenseInfo)
    ])
}
