import { DefenseInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateDefense(databaseConnection: any, beastID: number, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    await databaseConnection.beast.defenses.delete([beastID, [0, ...defenses.map(defenses => defenses.id)]])

    defenses.forEach(({ overAllIndex, oldID, id, defensename }) => {
        if (id) {
            promiseArray.push(databaseConnection.beast.defenses.update(id, oldID, overAllIndex, defensename))
        } else {
            promiseArray.push(databaseConnection.beast.defenses.add(oldID, overAllIndex, defensename))
        }
    })

    return Promise.all(promiseArray)
}