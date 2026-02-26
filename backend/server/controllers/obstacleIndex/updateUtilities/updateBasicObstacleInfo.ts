import { Obstacle } from "@bestiary/common/interfaces/obstacles/obstacleCatalog"
import query from "../../../db/database"

const addSkullSQL = `insert into obBase (name, skull, prompt, difficulty, time, threshold, failure, success, notes, stringid)
values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`

const updateSkullSQL = `update obBase
set name = $2, skull = $3, prompt = $4, difficulty = $5, time = $6, threshold = $7, failure = $8, success = $9, notes = $10, 
stringid = $11
where id = $1`

export default async function updateBasicObstacleInfo(obstacleId: number, obstacle: Obstacle) {
    const { name, skull, prompt, difficulty, time, threshold, failure, success, notes, stringid } = obstacle

    if (obstacleId === 0) {
        return query(addSkullSQL, [name, skull, prompt, difficulty, time, threshold, failure, success, notes, stringid])
    } else {
        return query(updateSkullSQL, [obstacleId, name, skull, prompt, difficulty, time, threshold, failure, success, notes, stringid])
    }
}