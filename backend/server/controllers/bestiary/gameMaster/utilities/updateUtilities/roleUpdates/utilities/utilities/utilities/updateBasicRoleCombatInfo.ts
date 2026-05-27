import { BONFIRE, HACKMASTER } from "@bestiary/common/utilities/get/getSystemString";
import query from "../../../../../../../../../db/database";
import { AllRoleCombatInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/roleInterfaces/combatInfoInterfaces";

export default async function updateBasicRoleCombatInfo(beastID: number, roleID: string, roleInfo: AllRoleCombatInfo) {
        const sqlQuery = `update bbRoles
        set combatSkulls = $3, combatEpValue = $4, role = $5, secondaryRole = $6,
        attack = $7, attack_hm = $8, defense = $9, defense_hm = $10
        where beastId = $1 and id = $2`

        const { combatSkulls, combatRawEpValue, combatRole, combatSecondary, attackInfo, defenseInfo } = roleInfo
console.log(attackInfo[BONFIRE])
        return query(sqlQuery, [
                beastID, roleID, combatSkulls, combatRawEpValue, combatRole, combatSecondary,
                attackInfo[BONFIRE], attackInfo[HACKMASTER], defenseInfo[BONFIRE], defenseInfo[HACKMASTER]
        ])
}