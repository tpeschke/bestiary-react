import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateAttacks from "./utilities/updateAttacks";
import updateDefense from "./utilities/updateDefenses";

export default async function updateCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const { attacks, defenses, combatSkulls } = combatInfo

    console.log(combatSkulls)

    let promiseArray: Promise<any>[] = [
        updateAttacks(attacks, beastID),
        updateDefense(beastID, defenses)
    ]

    return Promise.all(promiseArray)
}