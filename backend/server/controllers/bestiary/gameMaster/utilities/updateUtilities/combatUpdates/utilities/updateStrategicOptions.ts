import { StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import updateStrategicObstacles from "./utilities/updateStrategicObstacles";

export default async function updateStrategicOptions(beastID: number, options: StrategicOptions): Promise<any[]> {
    const { obstacles } = options

    return Promise.all([
        updateStrategicObstacles(beastID, obstacles)
    ])
}