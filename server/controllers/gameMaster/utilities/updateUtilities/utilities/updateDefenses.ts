import { DefenseInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateDefense(databaseConnection: any, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    defenses.forEach(({ overAllIndex, oldID, id }) => {
        if (id) {
            promiseArray.push(databaseConnection.beast.defenses.update(id, oldID, overAllIndex))
        } else {
            promiseArray.push(databaseConnection.beast.defenses.add(oldID, overAllIndex))
        }
    })

    return Promise.all(promiseArray)
}