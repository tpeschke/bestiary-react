import { BonfireDefenseInfo, DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../../../db/database"
import { addDefenseToDB, removeMissingDefenseIDsFromDB, updateDefenseInfo } from "../../../../../../../db/beast/defenses"

export default async function updateDefense(beastID: number, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    await query(removeMissingDefenseIDsFromDB, [beastID, [0, ...defenses.map(defense => defense.id)]])

    defenses.forEach((defense, index) => {
        if (defense.system === 'Bonfire') {
            const { oldID, id, defensename, roleid, scalingInfo } = defense as BonfireDefenseInfo
            const { drAdjust } = scalingInfo

            if (id) {
                promiseArray.push(query(updateDefenseInfo, [id, oldID, beastID, index, defensename, drAdjust]))
            } else {
                promiseArray.push(query(addDefenseToDB, [oldID, beastID, index, defensename, roleid, drAdjust]))
            }
        }
    })

    return Promise.all(promiseArray)
}