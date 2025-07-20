import { AttackInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateAttacks(databaseConnection: any, attacks: AttackInfo[]) {
    let promiseArray: any[] = []

    attacks.forEach(({ overAllIndex, oldID, id }) => {
        if (id) {
            promiseArray.push(databaseConnection.beast.attacks.update(id, oldID, overAllIndex))
        } else {
            promiseArray.push(databaseConnection.beast.attacks.add(oldID, overAllIndex))
        }
    })

    return Promise.all(promiseArray)
}