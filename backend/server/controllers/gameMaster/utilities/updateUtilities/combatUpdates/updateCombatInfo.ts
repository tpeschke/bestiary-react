import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateAttacks from "./utilities/updateAttacks";
import updateDefense from "./utilities/updateDefenses";
import updateBasicCombatInfo from "./utilities/updateBasicCombatInfo";

export default async function updateCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const { attacks, defenses } = combatInfo

    let promiseArray: Promise<any>[] = [
        updateBasicCombatInfo(beastID, combatInfo),
        updateAttacks(beastID, attacks),
        updateDefense(beastID, defenses)
    ]

    return Promise.all(promiseArray)
}