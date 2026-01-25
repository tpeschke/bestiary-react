import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../db/database"

const updateSkullSQL = `update obBase
set skull = $2, difficulty = $3
where id = $1`

export default async function updateBasicObstacleInfo(obstacleId: number, obstacle: Obstacle) {
    const {skull, difficulty} = obstacle

    return query(updateSkullSQL, [obstacleId, skull, difficulty])
}