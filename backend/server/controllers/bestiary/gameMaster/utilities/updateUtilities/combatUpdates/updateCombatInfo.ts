import CombatInfo from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateAttacks from "./utilities/updateAttacks";
import updateDefense from "./utilities/updateDefenses";
import updateBasicCombatInfo from "./utilities/updateBasicCombatInfo";
import updateStrategiesNLimits from "./utilities/updateStrategiesNLimits";
import updateStrategicOptions from "./utilities/updateStrategicOptions";

export default async function updateCombatInfo(beastID: number, combatInfo: CombatInfo) {
    const { attacks, defenses, strategiesNLimits, options } = combatInfo

    let promiseArray: Promise<any>[] = [
        updateBasicCombatInfo(beastID, combatInfo),
        updateStrategiesNLimits(strategiesNLimits),
        updateStrategicOptions(beastID, options),
        updateAttacks(beastID, attacks),
        updateDefense(beastID, defenses)
    ]

    return Promise.all(promiseArray)
}