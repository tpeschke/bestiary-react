import { DefenseInfo } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"

export default async function updateDefense(databaseConnection: any, beastID: number, defenses: DefenseInfo[]) {
    let promiseArray: any[] = []

    await databaseConnection.beast.defenses.delete([beastID, [0, ...defenses.map(defense => defense.id)]])

    defenses.forEach(({ overAllIndex, oldID, id, defensename }) => {
        if (id) {
            promiseArray.push(databaseConnection.beast.defenses.update(id, oldID, beastID, overAllIndex, defensename))
        } else {
            promiseArray.push(databaseConnection.beast.defenses.add(oldID, beastID, overAllIndex, defensename))
        }
    })

    return Promise.all(promiseArray)
}