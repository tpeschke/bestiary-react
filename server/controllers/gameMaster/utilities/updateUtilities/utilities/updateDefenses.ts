import { DefenseInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateDefense(databaseConnection: any, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    defenses.forEach(({ overAllIndex, oldID, id }) => {
        promiseArray.push(databaseConnection.beast.defenses.upsert(id, oldID, overAllIndex))
    })

    return Promise.all(promiseArray)
}