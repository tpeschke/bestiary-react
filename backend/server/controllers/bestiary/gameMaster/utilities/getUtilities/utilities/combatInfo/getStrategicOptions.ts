import { StrategicOptions } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces";
import getStrategicObstacles from "./utilities/getStrategicObstacles";
import getStrategicCustoms from "./utilities/getStrategicCustoms";
import getStrategicOther from "./utilities/getStrategicOther";

export default async function getStrategicOptions(beastID: number): Promise<StrategicOptions> {
    let options: StrategicOptions = {
        obstacles: [],
        customs: [],
        other: []
    }

    await Promise.all([
        getStrategicObstacles(beastID).then(obstacles => options.obstacles = obstacles),
        getStrategicCustoms(beastID).then(customs => options.customs = customs),
        getStrategicOther(beastID).then(other => options.other = other)
    ])

    return options
}