import { StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateStrategicObstacles from "./utilities/updateStrategicObstacles";
import updateStrategicCustoms from "./utilities/updateStrategicCustoms";
import updateStrategicOther from "./utilities/updateStrategicOther";

export default async function updateStrategicOptions(beastID: number, options: StrategicOptions): Promise<any[]> {
    const { obstacles, customs, other } = options

    return Promise.all([
        updateStrategicObstacles(beastID, obstacles),
        updateStrategicCustoms(beastID, customs),
        updateStrategicOther(beastID, other)
    ])
}