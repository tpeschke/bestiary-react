import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateAttacks from "./utilities/updateAttacks";
import updateDefense from "./utilities/updateDefenses";
import updateBasicCombatInfo from "./utilities/updateBasicCombatInfo";
import updateStrategiesNLimits from "./utilities/updateStrategiesNLimits";

export default async function updateCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const { attacks, defenses, strategiesNLimits } = combatInfo

    let promiseArray: Promise<any>[] = [
        updateBasicCombatInfo(beastID, combatInfo),
        updateStrategiesNLimits(strategiesNLimits),
        updateAttacks(beastID, attacks),
        updateDefense(beastID, defenses)
    ]

    return Promise.all(promiseArray)
}