import { AttackInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateAttacks(databaseConnection: any, attacks: AttackInfo[]) {
    let promiseArray: any[] = []

    attacks.forEach(({ overAllIndex, oldID, id }) => {
        promiseArray.push(databaseConnection.beast.attacks.upsert(id, oldID, overAllIndex))
    })

    return Promise.all(promiseArray)
}