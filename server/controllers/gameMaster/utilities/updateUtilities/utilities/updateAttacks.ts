import { AttackInfo } from "../../../../../../common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateAttacks(databaseConnection: any, attacks: AttackInfo[]) {
    let promiseArray: any[] = []

    attacks.forEach(({ overAllIndex, oldID, id, situation }) => {
        if (id) {
            promiseArray.push(databaseConnection.beast.attacks.update(id, oldID, overAllIndex, situation))
        } else {
            promiseArray.push(databaseConnection.beast.attacks.add(oldID, overAllIndex, situation))
        }
    })

    return Promise.all(promiseArray)
}