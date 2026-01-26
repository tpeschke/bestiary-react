import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../db/database"

const updateSkullSQL = `update obBase
set name = $2, skull = $3, difficulty = $4, time = $5, threshold = $6, failure = $7, success = $8, notes = $9, stringid = $10
where id = $1`

export default async function updateBasicObstacleInfo(obstacleId: number, obstacle: Obstacle) {
    const { name, skull, difficulty, time, threshold, failure, success, notes, stringid } = obstacle

    return query(updateSkullSQL, [obstacleId, name, skull, difficulty, time, threshold, failure, success, notes, stringid])
}