import { DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../../../db/database"
import { addDefenseToDB, removeMissingDefenseIDsFromDB, updateDefenseInfo } from "../../../../../../../db/beast/defenses"

export default async function updateDefense(beastID: number, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    await query(removeMissingDefenseIDsFromDB, [beastID, [0, ...defenses.map(defense => defense.id)]])

    defenses.forEach(({ overAllIndex, oldID, id, defensename }) => {
        if (id) {
            promiseArray.push(query(updateDefenseInfo, [id, oldID, beastID, overAllIndex, defensename]))
        } else {
            promiseArray.push(query(addDefenseToDB, [oldID, beastID, overAllIndex, defensename]))
        }
    })

    return Promise.all(promiseArray)
}