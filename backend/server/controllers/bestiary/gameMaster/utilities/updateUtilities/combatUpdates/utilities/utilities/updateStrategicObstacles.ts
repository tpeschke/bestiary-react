import { StrategicObstacles } from "@bestiary/common/interfaces/beast/infoInterfaces/combatInfoInterfaces"
import query from "../../../../../../../../db/database"

const addStrategicObstacleSQL = `insert into bbStrategicObstacles (beastID, obstacleID, label)
values ($1, $2, $3)`

const updateStrategicObstacleSQL = `update bbStrategicObstacles
set obstacleID = $3, label = $4
where beastID = $1 and id = $2`

export default async function updateStrategicObstacles(beastID: number, obstacles: StrategicObstacles[]) {
    return obstacles.map(obstacle => {
        const { id, label, obstacleid } = obstacle

        if (id === 0) {
            return query(addStrategicObstacleSQL, [beastID, obstacleid, label])
        } else {
            return query(updateStrategicObstacleSQL, [beastID, id, obstacleid, label])
        }
    })
}