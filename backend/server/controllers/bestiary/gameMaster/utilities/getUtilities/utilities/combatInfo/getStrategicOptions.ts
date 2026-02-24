import { StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import getStrategicObstacles from "./utilities/getStrategicObstacles";

export default async function getStrategicOptions(beastID: number): Promise<StrategicOptions> {
    let options: StrategicOptions = {
        obstacles: [],
        commonAllies: [],
        customs: [],
        other: []
    }

    await Promise.all([
        getStrategicObstacles(beastID).then(obstacles => options.obstacles = obstacles)
    ])

    return options
}